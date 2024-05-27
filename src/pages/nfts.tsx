import { contractAtom, web3WalletAtom } from "@/atoms/web3";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function NFTPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<any[]>([]);

  const [contract,setContrat] = useAtom(contractAtom);
  const [wallet, setWallet] = useAtom(web3WalletAtom);


  async function getNftInfo(tokenid: number) {
    const tokenId = parseInt(await contract.tokenOfOwnerByIndex((await wallet.getSigner()).address, tokenid));
    const tokenUrl: string = await contract.tokenURI(tokenId);
    const tokenMetadata = await fetch("https://ipfs.io/ipfs/"+tokenUrl.slice(7,tokenUrl.length), {method: "GET"});
    
    let data = await tokenMetadata.json()
    return data

  }

  async function getNFTSOfOwner() {
    try {


      const totalSupply = parseInt(await contract.totalSupply());
      const promises = [];

      for(let i=0; i < totalSupply; i++) {
        promises.push(getNftInfo(i))
      }

      const res = await Promise.all(promises);
      setNfts(res);

    } catch(e) {
      console.log(e)
    }
  }


  useEffect(()=>{

    if(contract !== undefined){
      getNFTSOfOwner();
    }

  },[]) 

  return (
    <DashboardLayout loading={isLoading}>
      <h1 className="text-3xl font-bold">Your NFTs</h1>

      <div className="flex flex-row gap-4 flex-wrap my-6">
        {nfts.map((item) => {
            console.log(item)
            return <Card className="p-4 w-[300px]">
               <img src="https://bafybeidwxzqyksomxn66jdym6whonuvmj6hmohvj527cssikxn6czgxsxe.ipfs.dweb.link/blockvolt.png" className="rounded-md" />
            </Card>
        })}
      </div>
    </DashboardLayout>
  );
}
