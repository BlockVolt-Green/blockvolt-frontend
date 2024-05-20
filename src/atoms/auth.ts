import { atom } from "jotai";

export const isLoggedInAtom = atom(false);
export const userDataAtom = atom<User | null>(null);
