import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

import DeviceDetail from "./pages/DeviceDetial";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/device-detail" element={<DeviceDetail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
