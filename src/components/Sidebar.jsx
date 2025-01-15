import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
// import { Close } from 'your-icon-library'; // Uncomment and replace with your Close icon if needed

const Sidebar = ({ setOpen }) => {
  const location = useLocation(); // Get the current location

  const links = [
    {
      title: "Inventory",
      href: "/",
      // Icon: DashboardIcon, // Replace with your Dashboard icon
    },
    {
      title: "Users",
      href: "/users",
      // Icon: UsersIcon, // Replace with your Users icon
    },
    {
      title: "Zones",
      href: "/zones",
    },
    // Add more links as needed
  ];

  return (
    <div className="bg-white md:top-0 md:left-0 z-50 pb-0 h-screen max-h-screen overflow-y-hidden overflow-x-hidden p-4 rounded-[0_20px_20px_0] min-w-[200px]">
      <div className="flex justify-between items-center ">
        <div className="pl-2 mt-2 flex items-center gap-[3px]">
          <img src="/logo.svg" alt="Logo" className="w-[40px]" />
          <h1 className="font-bold">Asset Management</h1>
        </div>
        <div
          className="min-w-fit lg:hidden block"
          onClick={() => setOpen(false)}
        >
          {/* Uncomment and replace with your Close icon if needed */}
          {/* <Close /> */}
        </div>
      </div>

      <div className="pl-2 mt-[80px] ">
        <div className="flex flex-col gap-5 ">
          {links.map(({ title, href, onClick, Icon }, i) => {
            const isActive = location.pathname === href;

            return (
              <Link
                key={i}
                to={href || "#"}
                onClick={onClick}
                className={`w-full p-[22px] rounded-[14px] font-bold transition-all flex items-center gap-3 ${
                  isActive
                    ? "bg-[#605BFF] text-white opacity-100"
                    : "hover:bg-[#605BFF] hover:text-white opacity-[60%]"
                }`}
              >
                <span className="flex items-center">
                  {/* Render the Icon if provided */}
                  {Icon && <Icon />}
                </span>
                <span>{title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
