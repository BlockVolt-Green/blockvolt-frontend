import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

import DeviceDetail from "./pages/device-details";
import { Toaster } from "@/components/ui/toaster";
import AllDevicesPage from "./pages/all-devices";
import AddDevicesPage from "./pages/add-device";
import { useEffect } from "react";
import { checkLogin } from "./apis";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "./atoms/auth";
import NFTPage from "./pages/nfts";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  let navigate = useNavigate();

  const checkLoginCallback = async () => {
    let isLoggedin = await checkLogin();
    console.log(isLoggedIn);
    setIsLoggedIn(isLoggedin);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkLoginCallback();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/devices" element={<AllDevicesPage />} />
        <Route path="/device-detail" element={<DeviceDetail />} />
        {/* <Route path="/add-device" element={<AddDevicesPage />} /> */}
        <Route path="/nfts" element={<NFTPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
