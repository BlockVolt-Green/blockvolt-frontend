import React from "react";

import { marketingConfig } from "@/config/marketing";
import { useEffect, useState } from "react";

import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/atoms/auth";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { web3WalletAtom,contractAtom } from "@/atoms/web3";

import abi from "../../../abi.json";

const CONTRACT_ADDRESS: string = import.meta.env.VITE_CONTRACT_ADDRESS;

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [color, setcolor] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  let [wallet, setWallet] = useAtom(web3WalletAtom);
  let [, setContract] = useAtom(contractAtom);


  const [_, setIsLoggedin] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();

  async function handleWalletConnect() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).ethereum) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );

      const nftContract = new ethers.Contract(CONTRACT_ADDRESS,abi, provider)

      setWallet(provider);
      setContract(nftContract);
      
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (e) {
      console.error("failed to connect", e);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate("/login");
  }

  const changeNavBg = () => {
    window.scrollY >= 90 ? setcolor(true) : setcolor(false);
  };

  const getWalletAddress = async () => {
    if (typeof wallet !== 'number') {
      setWalletAddress((await wallet.getSigner()).address);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);

    getWalletAddress();

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* fixed left-0 top-0 */}
      <header
        style={color ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        className="z-10 w-full backdrop-blur duration-300  ease-in"
      >
        <div className="m-auto flex h-20 items-center justify-between p-5 py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav className="flex flex-row gap-2">
            {/* <Link to="/pay">
              <Button variant="secondary" className="mr-4">
                Pay
              </Button>
            </Link> */}

            <Button onClick={handleLogout} className="max-w-32">
              Logout
            </Button>

            <Button
              onClick={handleWalletConnect}
              className="max-w-32 overflow-x-clip text-ellipsis"
            >
              {walletAddress
                ? walletAddress.slice(0, 10) + "..."
                : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
