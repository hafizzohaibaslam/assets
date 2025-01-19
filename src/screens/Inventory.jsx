import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Dropdown, Menu, Modal, Input, Select } from "antd";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { useRole } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";


const Inventory = () => {
  const navigate = useNavigate()
  const[loading,setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editedDeviceName, setEditedDeviceName] = useState("");
  const [data, setData] = useState([
    
  ]);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    category: "Sensor", 
    status: "available",
    latitude: "",
    longitude: "",
  });

    const role = useRole()
  const handleEdit = (record) => {
    setEditingDevice(record);
    setEditedDeviceName(record.name);
    setIsModalOpen(true);
    
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,  
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,  
    }));
  };
  const handleCancel = () => {
    setIsAddModalOpen(false);
  };


  const columns = [
    {
      title: "Devices",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        if (status === "Available") color = "green";
        else if (status === "Under Maint.") color = "red";
        else if (status === "In Use") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(), 
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" className="text-blue-600" onClick={()=> navigate(`/detail/${record.id}`)}>
            View
          </Button>
          {role === "admin" ?
        <>
        <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </>  
        :
        null
        }
        </div>
      ),
    },
  ];

////////////////////////////////////////get All devices///////////////////
  const getAllDevices = async() =>{
    setLoading(true)
    try{
      const response = await api.get("/v1/device/all");
      if(response.data.success){
        setData(response.data.data);
      }
      console.log(response);
      setLoading(false)
      
    }catch(error){
      console.log("error in getting all devices",error)
      setLoading(false)
    }
  }

  //////////////////////////edit device////////////////////////////////

  const handleSaveChanges = async() => {
    const payload = {
          name:editedDeviceName,
          model:editingDevice.model,
          category:editingDevice.category
    }
    console.log(payload);
    
    try{
      const response = await  api.patch(`/v1/device/${editingDevice.id}`,payload)
      console.log(response);
      
      if(response.data.success){
        toast.success("Device Edited Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        getAllDevices()
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
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingDevice.key
            ? { ...item, device: editedDeviceName }
            : item
        )
      );
      setIsModalOpen(false);
      setEditingDevice(null);
    };

/////////////////////////////add device///////////////////////

    const handleOk = async() =>{
      const payload = {
        name: formData.name,
        model: formData.model,
        category : formData.category,
        status: formData.status,
        latitude : parseFloat(formData.latitude),
        longitude : parseFloat(formData.longitude)
      }
      console.log(payload);
      try{
        const response = await api.post(`/v1/device/create`,payload)
        console.log(response);
        toast.success("Device added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
     
      getAllDevices()
    }catch(error){
      console.error(" error", error);
      const errorMessage =
      error.response?.data?.message ||
      "Failed to add device. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }finally{
      setIsAddModalOpen(false); 
    }
   }




useEffect(()=>{
  getAllDevices()
},[])

console.log(role);

  return (
    <div className="p-6">
      <Header
        title="Device Inventory"
        subtitle="Find the Device or add new Device"
        setIsModalOpen={setIsAddModalOpen}
        add="Add Inventory"
      />
    <div className="bg-white">
     <div className="my-4 flex flex-wrap gap-5 items-center p-4">
       <div className="w-full sm:w-auto mb-4 sm:mb-0">
         <Dropdown overlay={<Menu items={[{ label: "Option 1", key: "1" }]} />}>
           <Button className="w-full sm:w-auto">
             Device Type <DownOutlined />
           </Button>
         </Dropdown>
       </div>
       <div className="w-full sm:w-auto mb-4 sm:mb-0">
         <Dropdown overlay={<Menu items={[{ label: "Available", key: "1" }]} />}>
           <Button className="w-full sm:w-auto">
             Available <DownOutlined />
           </Button>
         </Dropdown>
       </div>
       <div className="w-full sm:w-auto mb-4 sm:mb-0">
         <Dropdown overlay={<Menu items={[{ label: "Location 1", key: "1" }]} />}>
           <Button className="w-full sm:w-auto">
             Location <DownOutlined />
           </Button>
         </Dropdown>
       </div>
       <div className="w-full sm:w-auto mb-4 sm:mb-0">
         <Dropdown overlay={<Menu items={[{ label: "Latest", key: "1" }]} />}>
           <Button className="w-full sm:w-auto">
             Latest <DownOutlined />
           </Button>
         </Dropdown>
       </div>
     </div>

  {/* Wrap Table for Responsiveness */}
    <div className="bg-white mt-5 overflow-x-auto flex w-full items-center justify-center min-h-[22rem]">
        {loading ? (
          <Grid color="#605bff"/>
          ) : (
          <div className="w-full h-full">
          <Table
              columns={columns}
              dataSource={data}
              pagination={{
                defaultPageSize: 5,
                pageSizeOptions: ["5", "10", "20"],
              }}
              scroll={{ x: 'max-content' }} // Enables horizontal scrolling when necessary
            />
            </div>
           )}
          </div>
      </div>


      {/* ///////////////////add device/////////// */}
      <Modal
      title="Add Device"
      open={isAddModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          style={{
            backgroundColor: "#605BFF",
            borderColor: "#605BFF",
            height: "48px",
          }}
        >
          Add New Device
        </Button>,
      ]}
    >
      <div className="mb-[20px]">
        <h1 className="text-[24px] leading-[29px] font-[500] pb-[10px] text-center">
          Add New Device
        </h1>
        <p className="text-center pb-5">
          Please provide the necessary details for the new device.
        </p>

        <label
          htmlFor="name"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Device Name
        </label>
        <Input
          className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="name"
          type="text"
          placeholder="Enter device name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-[20px]">
        <label
          htmlFor="model"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Device Model
        </label>
        <Input
          className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="model"
          type="text"
          placeholder="Enter device model"
          value={formData.model}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-[20px]">
        <label
          htmlFor="category"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Category
        </label>
        <Select
          className="w-full text-[16px] h-[48px] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="category"
          value={formData.category}
          onChange={(value) => handleSelectChange("category", value)}
          options={[
            { value: "Sensor", label: "Sensor" },
            { value: "Camera", label: "Camera" },
            { value: "Thermostat", label: "Thermostat" },
          ]}
        />
      </div>

      <div className="mb-[20px]">
        <label
          htmlFor="status"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Status
        </label>
        <Select
          className="w-full text-[16px] h-[48px] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="status"
          value={formData.status}
          onChange={(value) => handleSelectChange("status", value)}
          options={[
            { value: "available", label: "Available" },
            { value: "in_use", label: "In Use" },
            { value: "under_maintenance", label: "Under Maintenance" },
          ]}
        />
      </div>

      <div className="mb-[20px]">
        <label
          htmlFor="latitude"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Latitude
        </label>
        <Input
          className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="latitude"
          type="text"
          placeholder="Enter latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-[20px]">
        <label
          htmlFor="longitude"
          className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
        >
          Longitude
        </label>
        <Input
          className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
          id="longitude"
          type="text"
          placeholder="Enter longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        />
      </div>
    </Modal>

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
      <ToastContainer />
    </div>
  );
};

export default Inventory;
