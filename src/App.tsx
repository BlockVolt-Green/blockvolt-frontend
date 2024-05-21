import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

import DeviceDetail from "./pages/device-details";
import { Toaster } from "@/components/ui/toaster";
import AllDevicesPage from "./pages/all-devices";
import AddDevicesPage from "./pages/add-device";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/devices" element={<AllDevicesPage />} />
        <Route path="/device-detail" element={<DeviceDetail />} />
        <Route path="/add-device" element={<AddDevicesPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
