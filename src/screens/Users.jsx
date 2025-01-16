import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import AddUserModal from "../components/AddUserModal";
import { DeleteOutlined } from "@ant-design/icons"; // Add this import
import Header from "../components/Header";
import api from "../api/api";
import { toast } from "react-toastify";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Initialize users state
  const [users, setUsers] = useState([
    // Existing users can be listed here
    // Example:
    // { key: '1', fullName: 'John Doe', email: 'john@example.com', role: 'Admin' },
  ]);

  const handleDelete = (key) => {
    setUserToDelete(key);
    setIsDeleteModalOpen(true);
  };

  // Handler to confirm deletion
  const confirmDelete = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.key !== userToDelete)
    );
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handler to cancel deletion
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <DeleteOutlined
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];
  
 
  // onSave handler to add a new user
  const handleSave = async(newUser) => {
    console.log(newUser);
    
    setUsers((prevUsers) => [
      ...prevUsers,
      { key: prevUsers.length + 1, ...newUser },
    ]);
    try{
      const res = await api.post("/v1/user/create",newUser)

      if (res.data.success) {
        toast.success("User added Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }catch(error){
      console.error(" error", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create user. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const getAllUsers = async() =>{
    try{
      const response = await api.get("/v1/user/all");
      if(response.data.success){
        setUsers(response.data.users)
      }
    }catch(error){
      console.log("error in getting all users",error)
    }
  }

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
        <div className="bg-white mt-5">
          <Table dataSource={users} columns={columns} />
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
        </div>
      </Modal>
    </>
  );
}

export default Users;
