import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import api from "../api/api"
import { useEffect, useState } from "react"
import Device from '../assets/logos/devices.svg'
import DoughnutChart from "../components/DoughnutChart"
import Model from '../assets/logos/model.svg'
import Category from '../assets/logos/category.svg'
import Status from '../assets/logos/status.svg'
import Location from '../assets/logos/location.svg'
import Clock from  '../assets/logos/clock.svg'
import GreenClock from  '../assets/logos/greenClock.svg'
import Map from '../components/Map';
import { formalFormal, formatDate } from "../utils/dateFormation"
import Skeleton from '@mui/material/Skeleton';
import { Input, Modal } from "antd"
import { toast, ToastContainer } from "react-toastify"

const DeviceDetail = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedDeviceName, setEditedDeviceName] = useState("");
    const[loading,setLoading]= useState(false)
    const[data,setData] = useState([])
    const [editingDevice, setEditingDevice] = useState(null);

    const location = useLocation()
    const id = location.pathname.split("/").pop()   

    const getDevice = async() =>{
        setLoading(true)
        try{
            const response = await api.get(`/v1/device/${id}`);
            setData(response?.data?.data)
            setLoading(false)
            
        }catch(error){
            console.log("error in getting detail of dvice",error)
            setLoading(false)
        }
    }

    //////////////////////////edit device////////////////////////////////

  const handleSaveChanges = async() => {
    const payload = {
          name:editedDeviceName,
    }
    try{
      const response = await  api.patch(`/v1/device/${id}`,payload)
      if(response.data.success){
        toast.success("Device Edited Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      }catch(error){
        console.log("error",error);
        const errorMessage =
        error.response?.data?.message ||
        "Failed to edit device. Please try again.";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setIsModalOpen(false);
      setEditingDevice(null);
    };

    useEffect(()=>{
        getDevice()
    },[])
    
return(
   <>
   <div className="w-full h-full flex flex-col ">
        <Header
            title="Device Details"
            subtitle="View Device Information or Edit Details"
            add="Edit Device"
            setIsModalOpen={()=> setIsModalOpen(true)}
        />
        <div className="flex mt-[2rem] md:flex-row flex-col gap-[30px]">
         <div className="md:w-[70%]  grid  md:grid-cols-2 grid-cols-1 w-full  gap-[27px]">
            <div className="h-[7rem] flex items-center gap-[1rem] p-[1rem] bg-white rounded-lg">
                 <div>
                     <img src={Device} alt="" />
                 </div>
                 <div className="flex flex-col">
                     <p className="text-[16px] text-[#9e9ea5]">
                        Devices
                     </p>
                     <h3 className="text-[20px] font-[600] text-[#000]">
                        {loading?
                        <>
                       <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                        </>
                        :
                        data?.name
                        }
                     </h3>
                 </div>
             </div>
             <div className="  h-[7rem] flex items-center gap-[1rem] p-[1rem] bg-white rounded-lg">
                 <div>
                     <img src={Model} alt="" />
                 </div>
                 <div className="flex flex-col">
                     <p className="text-[16px] text-[#9e9ea5]">
                        Model
                     </p>
                     <h3 className="text-[20px] font-[600] text-[#000]">
                     {loading?
                        <>
                       <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                        </>
                        :
                        data?.model
                        }
                     </h3>
                 </div>
             </div>
            <div className="h-[7rem] flex items-center gap-[1rem] p-[1rem] bg-white rounded-lg">
                 <div>
                     <img src={Category} alt="" />
                 </div>
                 <div className="flex flex-col">
                     <p className="text-[16px] text-[#9e9ea5]">
                        Category
                     </p>
                     <h3 className="text-[20px] font-[600] text-[#000]">
                      {loading?
                        <>
                       <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                        </>
                        :
                        data?.category
                        }
                     </h3>
                 </div>
             </div>
            <div className="  h-[7rem] flex items-center gap-[1rem] p-[1rem] bg-white rounded-lg">
                 <div>
                     <img src={Status} alt="" />
                 </div>
                 <div className="flex flex-col">
                     <p className="text-[16px] text-[#9e9ea5]">
                        Status
                     </p>
                     <h3 className="text-[20px] font-[600] text-[#000]">
                       {loading?
                        <>
                       <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                        </>
                        :
                        data?.status
                        }
                     </h3>
                 </div>
             </div>
            {/* <div className="  h-[7rem] flex items-center gap-[1rem] p-[1rem] bg-white rounded-lg">
                 <div>
                     <img src={Location} alt="" />
                 </div>
                 <div className="flex flex-col">
                     <p className="text-[16px] text-[#9e9ea5]">
                        Location
                     </p>
                     <h3 className="text-[20px] font-[600] text-[#000]">
                        {data?.zone?.name}
                     </h3>
                 </div>
             </div> */}
           
           
            
         </div>
         <div className="bg-white md:w-[30%]">
            
            <DoughnutChart percentage={10} /> 
        </div>

        </div>
        <div className="flex md:flex-row flex-col  gap-[30px] ">
            <div className="bg-white w-full md:w-[70%] flex justify-between md:flex-row flex-col mt-[1rem] p-[1rem]">
              <div>
              <p className="text-[20px] mt-[1rem] font-[600] text-[#303030]">Previous Locations</p>
                <div className=" h-[7rem] flex items-center gap-[1rem]  rounded-lg">
                    <div>
                         <img src={Clock} alt="" />
                     </div>
                     <div className="flex flex-col">
                         <p className="text-[16px] text-[#9e9ea5]">
                            Devices
                         </p>
                         <h3 className="text-[20px] font-[600] text-[#000]">
                         {loading?
                        <>
                         <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                         </>
                         :
                         data?.name
                         }
                         </h3>
                     </div>
                </div>
              </div>
              <div className=" flex flex-col mt-[1rem]">
                <Map/>
                <div className=" h-[7rem] flex items-center gap-[1rem]  rounded-lg">
                    <div>
                         <img src={GreenClock} alt="" />
                     </div>
                     <div className="flex flex-col">
                         <p className="text-[16px] text-[#9e9ea5]">
                            Last Update
                         </p>
                         <h3 className="text-[14px] font-[600] text-[#000]">
                         {loading?
                        <>
                       <div className="flex"> <Skeleton width={118} animation="wave" /></div>
                        </>
                        :
                        formalFormal(data?.updatedAt)
                        }
                         </h3>
                     </div>
                </div>
              </div>
            </div>
            <div className="w-full  md:w-[30%]">
            </div>
            
        </div>
        {/* ///////////////////////////edit device/////////////////////////////// */}
      <Modal
        title="Edit Device Name"
        open={isModalOpen}
        onOk={handleSaveChanges}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="mb-4">
          <label htmlFor="deviceName" className="block mb-2">
            Device Name
          </label>
          <Input
            id="deviceName"
            value={editedDeviceName}
            onChange={(e) => setEditedDeviceName(e.target.value)}
          />
        </div>
      </Modal>
      <ToastContainer/>
   </div>
   </>
)
}
export default DeviceDetail