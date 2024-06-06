import { contractAtom, nftsAtom, web3WalletAtom } from "@/atoms/web3";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NFT } from "@/interface";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { verifyCID } from "@/apis";
import { useToast } from "@/components/ui/use-toast";

const opensea_url = import.meta.env.VITE_OPENSEA_URL;
const contract_address = import.meta.env.VITE_CONTRACT_ADDRESS;


export default function NFTPage() {
  const [isLoading,] = useState(false);
  const [nfts, setNfts] = useAtom(nftsAtom);
  const [pagination, setPagination] = useState(5);
  const [dialogNFT, setDialogNFT] = useState<NFT | null>(null);

  const [contract,] = useAtom(contractAtom);
  const [wallet,] = useAtom(web3WalletAtom);
  const toast = useToast();


  async function getNftInfo(tokenid: number) {

    if (typeof wallet === 'number' || typeof contract === 'number') {
      return;
    }

    try {
      const tokenId = parseInt(await contract.tokenOfOwnerByIndex((await wallet.getSigner()).address, tokenid));
      const tokenUrl: string = await contract.tokenURI(tokenId);
      const tokenMetadata = await fetch("https://jade-content-mollusk-671.mypinata.cloud/ipfs/" + tokenUrl.slice(7, tokenUrl.length), { method: "GET" });
  
      let data = await tokenMetadata.json()
      data["tokenid"] = tokenId
      return data
    }

    catch (e) {
       
    }

  }

  async function getNFTSOfOwner() {
    try {

      if (typeof wallet === 'number' || typeof contract === 'number') {
        return;
      }

      const totalSupply = parseInt(await contract.totalSupply());
      console.log(totalSupply)
      const promises = [];

      for (let i = 0; i < totalSupply; i++) {
        promises.push(getNftInfo(i))
      }

      const res = await Promise.all(promises);
      setNfts(res);

    } catch (e) {
      console.log(e)
    }
  }

  const incrementPagination = () => {
    if (pagination > nfts.length) return
    setPagination(pagination * 2);
  }

  const verify = async (cid: string) => {
    let res = await verifyCID(cid);

    if (res) {
      toast.toast({ title: "Token Verification", description: "Token Verified" });
    } else {
      toast.toast({ title: "Token Verification", description: "Invalid Token" })
    }
  }


  useEffect(() => {

    if (contract !== undefined) {
      getNFTSOfOwner();
    }

  }, [contract])

  return (
    <DashboardLayout loading={isLoading}>
      <h1 className="text-3xl font-bold">Your NFTs</h1>

      <Dialog>

        <div className="flex flex-row gap-4 flex-wrap my-6">
          {nfts.slice(0, pagination).map((item) => {
            console.log(item)
            return (
              <DialogTrigger onClick={() => setDialogNFT(item)} asChild>
                <Card className="p-4 w-[200px]">
                  <CardDescription className="flex justify-center">
                    <img src="https://bafybeidwxzqyksomxn66jdym6whonuvmj6hmohvj527cssikxn6czgxsxe.ipfs.dweb.link/blockvolt.png" className="rounded-md" />
                  </CardDescription>
                  <CardFooter className="flex flex-col items-start pt-4 px-1">
                    <p className="text-md font-semibold text-gray-600 ml-[1px]">{item.tokenid}</p>
                    <p className="text-sm font-semibold text-gray-600">Blockvolt</p>
                  </CardFooter>
                </Card>
              </DialogTrigger>
            )
          })}
        </div>

        {/* NFT Detail dialog box */}
        {
          dialogNFT !== null &&

          (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Blockvolt {dialogNFT?.tokenid}</DialogTitle>
                <DialogDescription>
                  Blockvolt carbon tokens can be exchanged easily.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap justify-between">

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">CID</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">{dialogNFT.attributes.cid.slice(0, 17)}...</HoverCardTrigger>
                    <HoverCardContent className="break-words">
                      {dialogNFT.attributes.cid}
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">LOCATION</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">{dialogNFT.attributes.location}</HoverCardTrigger>
                  </HoverCard>
                </div>

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">MACHINE ADDRESS</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">{dialogNFT.attributes.machine_address.slice(0, 17)}...</HoverCardTrigger>
                    <HoverCardContent className=" break-words">
                      {dialogNFT.attributes.machine_address.toString()}
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">MACHINE CID</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">{dialogNFT.attributes.machine_cid.slice(0, 17)}...</HoverCardTrigger>
                    <HoverCardContent className="break-words">
                      {dialogNFT.attributes.machine_address}
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">PROVIDER</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">{dialogNFT.attributes.provider}</HoverCardTrigger>
                  </HoverCard>
                </div>

                <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                  <p className="text-[12px] text-gray-600 font-semibold">TIMESTAMP</p>
                  <HoverCard>
                    <HoverCardTrigger className="text-[14px] font-light">
                      {new Date(dialogNFT.attributes.timestamp.toString()).toLocaleString(undefined, {
                        timeZone: "Asia/Kolkata",
                      })}
                    </HoverCardTrigger>
                  </HoverCard>
                </div>


              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>

                <Button onClick={() => verify(dialogNFT.attributes.cid)} type="button" variant="outline">
                  Verify
                </Button>
                <Button onClick={() => window.open(`${opensea_url}/${contract_address}/${dialogNFT.tokenid}`,"_blank",'noopener,noreferrer')} type="button" variant="outline">
                  View on Opensea
                </Button>
              </DialogFooter>
            </DialogContent>
          )
        }

      </Dialog>

      <div className="flex justify-center">
        <Button className="w-[120px]" onClick={incrementPagination}>
          See More
        </Button>
      </div>
    </DashboardLayout>
  );
}
