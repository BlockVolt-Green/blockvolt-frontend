import { isLoggedInAtom, userDataAtom } from "@/atoms/auth";
import { useAtom } from "jotai";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [userData, setUserData] = useAtom(userDataAtom);

  const login = ({ token }: { token: string }) => {
    // setUserData(userData);
    // setUserData({
    //   token,
    //   firstName: "",
    //   lastName: "",
    // });
    setIsLoggedIn(true);
  };

  const logout = () => {
    // setUserData(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, userData, login, logout };
};
