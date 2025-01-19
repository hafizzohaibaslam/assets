import React from 'react';

const Button = ({ text, icon, bgColor, borderColor, textColor, onClick }) => {
    return (
        <button
            className={`flex items-center w-full md:h-[3rem] h-[2.5rem] rounded-[2rem] justify-center px-4 py-2  border ${bgColor} ${borderColor}`}
            style={{ borderColor: borderColor, backgroundColor: bgColor }}
            onClick={onClick}
        >
            <span className="mr-2">{icon}</span>
            <span
                className={`font-bold text-[0.8rem] ${textColor}`}
                style={{ color: textColor }}
            >{text}</span>
        </button>
    );
};

export default Button;
