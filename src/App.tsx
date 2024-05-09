import { useEffect } from 'react'
import './App.css'
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import { useAtom } from 'jotai'
import { loginAtom } from './atoms'
import DeviceDetail from './pages/DeviceDetial'
import { Toaster } from "@/components/ui/toaster"

function App() {

  const [login,_] = useAtom(loginAtom);
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{

    if (login) {
      navigate("/")
    }
    else{
      navigate("/login")
    }    

  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="device-detail" element={ <DeviceDetail/> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
