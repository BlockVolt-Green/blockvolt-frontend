import { BrowserProvider, Contract } from "ethers";
import { atom } from "jotai";


export const web3WalletAtom = atom<BrowserProvider | number>(0);
export const contractAtom = atom<Contract | number>(0);