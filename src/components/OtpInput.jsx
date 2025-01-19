import { useEffect, useRef, useState } from 'react';
import CusomizedButton from '../components/CustomizedButton';

const OtpInput = ({ numInputs = 4, initialTime = 30, onVerify, onResendOtp }) => {
    const [otp, setOtp] = useState(""); 
    const inputRefs = useRef([]); 
    const [time, setTime] = useState(initialTime);
    
    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp(prev => {
            const newOtp = prev.split("");
            newOtp[index] = value;
            return newOtp.join("");
        });
    };

    useEffect(() => {
        const filledInputLength = otp.length;
        if (inputRefs.current[filledInputLength]) {
            inputRefs.current[filledInputLength]?.focus();
        }
    }, [otp]);
        
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);

    return (
        <div className="flex flex-col gap-2 items-center ">
            <div className="w-full h-[5rem] flex gap-4 items-center justify-center">
                {Array(numInputs).fill("").map((_, index) => (
                    <div key={index} className="md:h-full mt-[2rem] md:w-full w-11 h-11 border border-gray-300 rounded-[1.2rem] flex items-center justify-center">
                        <input
                            value={otp[index] || ""}
                            onChange={(e) => handleChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            maxLength={1}
                            type="text"
                            className="w-full h-full bg-transparent text-center outline-none text-xl font-semibold text-gray-700"
                        />
                    </div>
                ))}
            </div>
            <div className='mt-[3rem] w-[90%]'>
                <CusomizedButton
                    text="Verify"
                    icon={""}
                    bgColor="bg-[#605BFF]"
                    borderColor="border-transparent"
                    textColor="#fff"
                    onClick={onVerify}
                />
            </div>
            <div className='mb-[4rem]'>
                {time === 0 ? (
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Didn’t receive the OTP? <span className="text-primary cursor-pointer hover:underline" onClick={onResendOtp || (() => setTime(initialTime))}>Resend OTP</span>
                    </p>
                ) : (
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Resend OTP after <span className="text-primary font-semibold">{time}s</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default OtpInput;
