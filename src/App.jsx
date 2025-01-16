import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./screens/Login";
import MainLayout from "./layouts/MainLayout";
import Users from "./screens/Users";
import Inventory from "./screens/Inventory";
import Zones from "./screens/Zones";
import OtpVerification from "./screens/VerifyOtp";
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" />;
// };

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/users" element={<Users />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/" element={<Inventory />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOtp" element={<OtpVerification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
