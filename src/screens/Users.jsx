import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import AddUserModal from "../components/AddUserModal";
import { DeleteOutlined } from "@ant-design/icons"; // Add this import
import Header from "../components/Header";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRole } from "../utils/token";
import { Audio, Grid } from 'react-loader-spinner'

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([ ]);
  const [loading,setLoading] = useState(false)
  const role = useRole()
 const columns = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => new Date(text).toLocaleDateString(),
  },
  ...(role === "admin" ? [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <DeleteOutlined
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ] : []), 
];
 
  // Handler to confirm deletion
  const confirmDelete = async() => {
        try{
          const response = await api.delete(`/v1/user/${userToDelete}`)
          toast.success("User deleted successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.key !== userToDelete)
          );
          getAllUsers()
        }catch(error){
          console.error(" error", error);
          const errorMessage =
            error.response?.data?.message ||
            "Failed to delete user. Please try again.";
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
          });
        }finally{
          setIsDeleteModalOpen(false);
        }
  };

  const handleSave = async(newUser) => {
    try{
      const res = await api.post("/v1/user/create",newUser)
      if (res.data.success) {
        toast.success("User added Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setUsers((prevUsers) => [...prevUsers, res.data.user]);
        getAllUsers()
      }
    } catch (error) {
      console.error(" error", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create user. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
   
    }
  };

  const getAllUsers = async() =>{
    setLoading(true)
    try{
      const response = await api.get("/v1/user/all");
      if(response.data.success){
        setUsers(response.data.users.map(user => ({ ...user, key: user.id })));
      }
      setLoading(false)
    }catch(error){
      console.log("error in getting all users",error)
      setLoading(false)
    }
  }
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  }; 

  useEffect(()=>{
    getAllUsers()
  },[])
  
  return (
    <>
      <div className="p-[34px]">
        <Header
          title="User Management"
          subtitle="View Users & Add New User"
          setIsModalOpen={setIsModalOpen}
          add="Add User"
        />
   <div className="bg-white mt-5 overflow-x-auto flex w-full items-center justify-center min-h-[22rem]">
      {loading ? (
        <Grid color="#605bff"/>
      ) : (
       <div className="w-full">
         <Table dataSource={users} columns={columns} />
       </div>
      )}
</div>

      </div>

      {/* Pass onSave handler to AddUserModal */}
      <AddUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={handleSave}
      />

      <Modal
        title={null}
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        footer={null}
        width={350}
        centered
        bodyStyle={{
          borderRadius: "12px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        {/* Modal Header */}
        <h3 className="text-xl font-bold mb-4">Warning!</h3>
        {/* Modal Body */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user?
        </p>
        {/* Modal Footer (Custom Buttons) */}
        <div className="flex justify-center gap-4">
          <button
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-white border border-gray-300 text-gray-600 py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-200"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <ToastContainer />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Users;
