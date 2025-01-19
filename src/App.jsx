import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./screens/Login";
import MainLayout from "./layouts/MainLayout";
import Users from "./screens/Users";
import Inventory from "./screens/Inventory";
import Zones from "./screens/Zones";
import OtpVerification from "./screens/VerifyOtp";
import DeviceDetail from './screens/[id]'

function App() {
  const [isAuthenticated,setIsAuthenticated] =useState(
    !!localStorage.getItem("token")
  )
  const location = useLocation();
  useEffect(()=>{
    setIsAuthenticated(!!localStorage.getItem("token"));
  },[location.pathname])

  return (
    <>
       <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<MainLayout />}>
            <Route path="/users" element={<Users />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/" element={<Inventory />} />
            <Route path="/detail/:id" element={<DeviceDetail />} />
          </Route>
          <Route path="/verifyOtp" element={<OtpVerification />} />
        </>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
    </>
  );
}

export default App;
