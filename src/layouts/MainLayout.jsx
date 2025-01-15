import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#fafbff] flex justify-start items-start max-w-[100vw]">
      <div
        className={`h-[100vh] ${
          open ? "z-10 bg-white w-[50%] sidebar-open" : "hidden"
        }  lg:block lg:w-[40%] xl:w-[30%] lg:sticky lg:top-0`}
      >
        <Sidebar setOpen={setOpen} />
      </div>
      <div className="w-full px-5 pb-5">
        {/* <Header setOpen={setOpen} /> */}
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
