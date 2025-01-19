import React from "react";
import { useRole } from "../utils/token";

function Header({ setIsModalOpen, title, subtitle, add }) {
  const role = useRole();

  return (
    <div className="p-4">
      {/* Section Container */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-[24px] lg:text-[28px] font-bold">{title}</h1>
          <p className="text-sm lg:text-[16px] text-gray-600">{subtitle}</p>
        </div>

        {/* Search and Button Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Search Input */}
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search User"
              className="w-full sm:w-auto border-[1px] rounded-[10px] px-4 py-2 text-sm"
            />
          </div>

          {/* Add Button (Admin Only) */}
          {role === "admin" && (
            <div className="w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto text-[#605BFF] border-[1px] border-[#605BFF] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#605BFF] hover:text-white transition"
              >
                {add}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Header;
