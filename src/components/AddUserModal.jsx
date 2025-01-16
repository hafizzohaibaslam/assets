import React, { useState } from "react";
import { Button, Modal, Select, Input, Result } from "antd"; // Import Result

const AddUserModal = ({ isModalOpen, setIsModalOpen, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Add success modal state

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleOk = () => {
    if (onSave) {
      onSave(formData); // Pass the form data back to the parent component
    }
    setIsModalOpen(false);
    setIsSuccessModalOpen(true); // Open success modal
    // Reset form data after saving
    setFormData({
      fullName: "",
      email: "",
      role: "User",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false); // Close success modal
  };

  return (
    <>
      <Modal
        title="Add User"
        open={isModalOpen}
        onOk={handleOk}
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
            Add New User
          </Button>,
        ]}
      >
        <div className="mb-[20px]">
          <h1 className="text-[24px] leading-[29px] font-[500] pb-[10px] text-center">
            Add New User
          </h1>
          <p className="text-center pb-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's.
          </p>

          <label
            htmlFor="fullName"
            className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
          >
            Full Name
          </label>
          <Input
            className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
            id="fullName"
            type="text"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="email"
            className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
          >
            Email Address
          </label>
          <Input
            className="w-full text-[16px] p-[14px_16px] text-[#6B7280] border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
            id="email"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="role"
            className="font-[500] text-[14px] leading-[20px] pb-[8px] block"
          >
            Role
          </label>
          <Select
            className="w-full text-[16px] h-[48px]  border border-[#ECECEC] rounded-[12px] focus:border-primary outline-none transition-all"
            id="role"
            value={formData.role}
            onChange={handleSelectChange}
            options={[
              { value: "technician", label: "Technician" },
            ]}
          />
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={isSuccessModalOpen}
        footer={null}
        onCancel={handleSuccessOk}
        closable={false}
      >
        <Result
          status="success"
          title="User added successfully"
          // Icon is included by default in Result for success status
          extra={[
            <Button type="primary" key="ok" onClick={handleSuccessOk}>
              OK
            </Button>,
          ]}
        />
      </Modal>
    </>
  );
};

export default AddUserModal;
