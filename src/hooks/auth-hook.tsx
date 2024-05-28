import { isLoggedInAtom, userDataAtom } from "@/atoms/auth";
import { useAtom } from "jotai";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [userData,] = useAtom(userDataAtom);

  const login = ({ token }: { token: string }) => {
    // setUserData(userData);
    // setUserData({
    //   token,
    //   firstName: "",
    //   lastName: "",
    // });
    console.log(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // setUserData(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, userData, login, logout };
};
