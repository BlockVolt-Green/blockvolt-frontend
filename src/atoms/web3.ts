import { BrowserProvider, Contract } from "ethers";
import { atom } from "jotai";


export const web3WalletAtom = atom<BrowserProvider>(undefined);
export const contractAtom = atom<Contract>(undefined);