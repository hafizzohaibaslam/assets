import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import api from '../api/api'
function LoginComponent() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  
  const [loader, setLoader] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await api.post("/v1/auth/login", auth);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.userRole);
        toast.success("User Login Successfully", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorMessage =
          res?.data?.message || "Failed to login user. Please try again.";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      }
     
      setLoader(false);
    } catch (error) {
      toast.error( error?.response?.data?.message || "Failed to login user. Please try again." , {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("signin error", error);
      setLoader(false);
    } 
  };

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

        <div className=" w-[90%] md:w-[30%] relative drop-shadow-lg bg-white rounded-[20px] p-[44px]">
          <div className=" z-10">
            <h1 className="text-center text-[32px]  leading-[38px] pb-[25px]">
              Welcome back
            </h1>

            <form action="">
              <div className="mb-4">
                <label className=" text-[16px] leading-[20px] pb-[10px]">
                  Email
                </label>
                <input
                  className=" w-full text-[16px] appearance-none rounded-full border lg:w-full py-4 px-3 leading-[24px] mt-1.5 "
                  id="login"
                  type="text"
                  placeholder="name@email.com"
                  value={auth.email}
                  onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="text-[16px] leading-[20px] pb-[10px]">
                  Password
                </label>
                <input
                  className=" w-full text-[16px] appearance-none rounded-full border  lg:w-full py-4 px-3 leading-[24px] mt-1.5"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={auth.password}
                  onChange={(e) =>
                    setAuth({ ...auth, password: e.target.value })
                  }
                />
              </div>

              <button
                onClick={onSubmit}
                className="bg-[#605BFF] w-full text-[16px] rounded-full leading-[24px] my-10 flex justify-center items-center h-[56px] text-black"
              >
                {loader ? (
                  <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#ffffff"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <p className="font-bold text-white">Continue</p>
                )}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default LoginComponent;
