import React, { useState } from "react";
import { Table, Tag, Button, Dropdown, Menu, Modal, Input } from "antd";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import Header from "../components/Header";

const Inventory = () => {
  const [data, setData] = useState([
    {
      key: "1",
      device: "Potwierzdrone",
      model: "12345",
      category: "Type X",
      status: "In Use",
      location: "The Village London Bridge Tower",
    },
    {
      key: "2",
      device: "Defibrillator",
      model: "12345",
      category: "Type X",
      status: "Available",
      location: "The Village London Bridge Tower",
    },
    {
      key: "3",
      device: "Patient Monitor",
      model: "12345",
      category: "Type X",
      status: "Available",
      location: "The Village London Bridge Tower",
    },
    {
      key: "4",
      device: "Ventilator",
      model: "12345",
      category: "Type X",
      status: "Under Maint.",
      location: "The Village London Bridge Tower",
    },
    {
      key: "5",
      device: "Ultrasound Machine",
      model: "12345",
      category: "Type X",
      status: "Available",
      location: "The Village London Bridge Tower",
    },
    {
      key: "6",
      device: "X-ray Machine",
      model: "12345",
      category: "Type X",
      status: "Available",
      location: "The Village London Bridge Tower",
    },
    {
      key: "7",
      device: "ECG Machine",
      model: "12345",
      category: "Type X",
      status: "Under Maint.",
      location: "The Village London Bridge Tower",
    },
    {
      key: "8",
      device: "Surgical Table",
      model: "12345",
      category: "Type X",
      status: "In Use",
      location: "The Village London Bridge Tower",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editedDeviceName, setEditedDeviceName] = useState("");

  const handleEdit = (record) => {
    setEditingDevice(record);
    setEditedDeviceName(record.device);
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
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

  const columns = [
    {
      title: "Devices",
      dataIndex: "device",
      key: "device",
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
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" className="text-blue-600">
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Header
        title="Device Inventory"
        subtitle="Find the Device or add new Device"
        setIsModalOpen={setIsModalOpen}
        add="Add Inventory"
      />
      <div className="bg-white">
        <div className="my-4 flex gap-5 items-center p-4">
          <Dropdown
            overlay={<Menu items={[{ label: "Option 1", key: "1" }]} />}
          >
            <Button>
              Device Type <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown
            overlay={<Menu items={[{ label: "Available", key: "1" }]} />}
          >
            <Button>
              Available <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown
            overlay={<Menu items={[{ label: "Location 1", key: "1" }]} />}
          >
            <Button>
              Location <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={<Menu items={[{ label: "Latest", key: "1" }]} />}>
            <Button>
              Latest <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </div>
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
    </div>
  );
};

export default Inventory;
