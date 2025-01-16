import React from "react";

function Header({ setIsModalOpen, title, subtitle, add }) {
  return (
    <div>
      <section className="flex justify-between">
        <div>
          <h1 className="text-[28px] font-bold">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="flex gap-5">
          <div>
            <input
              type="text"
              placeholder="Search User"
              className="border-[1px] rounded-[10px] px-4 py-2"
            />
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#605BFF] border-[1px] border-[#605BFF] px-4 py-2 rounded-[10px]"
            >
              {add}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
