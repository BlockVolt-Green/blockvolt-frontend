import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
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
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const checkLoginCallback = async () => {
    let isLoggedin = await checkLogin();
    console.log(isLoggedIn);
    setIsLoggedIn(isLoggedin);
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    checkLoginCallback();
  }, []);

  if (isLoggedIn) {

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/devices" element={<AllDevicesPage />} />
          <Route path="/device-detail" element={<DeviceDetail />} />
          <Route path="/add-device" element={<AddDevicesPage />} />
          <Route path="/nfts" element={<NFTPage />} />
        </Routes>
        <Toaster />
      </div>
    );
  }

  else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Toaster />
      </div>
    );
  }

}

export default App;
