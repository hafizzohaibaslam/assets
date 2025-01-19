import { useNavigate } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import { ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const otpVerification = () => {

    const navigate = useNavigate()
    const handleVerification = () => {
        navigate('/')
    }

    return (
        <>
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <img
                  src="ellipse1.svg"
                  alt="elipse1"
                  className="absolute top-0 right-0"
                />
                <img
                  src="ellipse2.svg"
                  alt="elipse1"
                  className="absolute bottom-0 left-0"
                />
                    <div className="flex w-[70%] flex-col md:gap-[2rem] gap-[0rem] items-center justify-center  shadow-lg  md:w-[30%] relative drop-shadow-lg bg-white rounded-[20px] p-[44px]">
                    <h2 className="text-center text-[32px]  leading-[38px] pb-[25px]">Verify Your OTP</h2>
                    <h3 className="font-normal mb-4 text-[#4a4a4a] text-[0.9rem] text-center">
                        Empower your experience. Enter the OTP sent to your email or phone to sign in for a free account today.
                    </h3>
                    <OtpInput
                        onVerify={handleVerification}
                    />
                </div>
                <ToastContainer />
        </div>
         </>
    );
}

export default otpVerification;
