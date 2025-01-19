import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, notification } from "antd";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { useRole } from "../utils/token";

function Zones() {
  const canvasRef = useRef(null);
  const [zones, setZones] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const role = useRole();

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentZone({ x, y, width: 0, height: 0 });
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentZone((prev) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y,
    }));
  };

  const stopDrawing = () => {
    if (!drawing) return;
    setDrawing(false);

    if (currentZone && isOverlapping(currentZone)) {
      notification.error({
        message: "Error",
        description:
          "This zone overlaps with an existing zone. Please select another area.",
      });
      setCurrentZone(null); 
      return;
    }
    setIsModalVisible(true); 
  };

  const handleOk = async () => {
    if (zoneName) {
      setZones((prevZones) => [...prevZones, { ...currentZone, name: zoneName }]);
    }
    setZoneName("");
    setCurrentZone(null);
    setIsModalVisible(false);
    await createZone();
  };

  const handleCancel = () => {
    setZoneName("");
    setCurrentZone(null);
    setIsModalVisible(false);
  };

  const isOverlapping = (newZone) => {
    return zones.some((zone) => {
      return !(
        newZone.x + newZone.width <= zone.x ||
        newZone.x >= zone.x + zone.width ||
        newZone.y + newZone.height <= zone.y ||
        newZone.y >= zone.y + zone.height
      );
    });
  };

  const drawZones = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    zones.forEach((zone) => {
      ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(zone.name, zone.x + 5, zone.y + 20);
    });

    if (currentZone) {
      ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
      ctx.fillRect(currentZone.x, currentZone.y, currentZone.width, currentZone.height);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(currentZone.x, currentZone.y, currentZone.width, currentZone.height);
    }
  };

  const transformToCoordinates = (zone) => {
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    const mapXToLongitude = (x) => {
      const minLongitude = -74.0;
      const maxLongitude = -73.9;
      return minLongitude + (x / canvasWidth) * (maxLongitude - minLongitude);
    };

    const mapYToLatitude = (y) => {
      const minLatitude = 40.76;
      const maxLatitude = 40.77;
      return maxLatitude - (y / canvasHeight) * (maxLatitude - minLatitude);
    };

    const { x, y, width, height } = zone;

    return [
      [mapXToLongitude(x), mapYToLatitude(y)],
      [mapXToLongitude(x), mapYToLatitude(y + height)],
      [mapXToLongitude(x + width), mapYToLatitude(y + height)],
      [mapXToLongitude(x + width), mapYToLatitude(y)],
      [mapXToLongitude(x), mapYToLatitude(y)],
    ];
  };

  const createZone = async () => {
    try {
      const formattedCoordinates = zones.map((zone) => transformToCoordinates(zone));
      const payload = {
        name: zoneName,
        coordinates: formattedCoordinates[formattedCoordinates.length - 1],
      };
      
      const response = await api.post("/v1/zone/create", payload);

      if (response.data.success) {
        toast.success("Zone created successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create zone. Please try again.";
      console.error(error);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    drawZones();
  }, [zones, currentZone]);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        {role === "admin" ? (
          <Button type="primary" onClick={() => alert("Select Area")}>
            Select Area
          </Button>
        ) : null}
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth - 400}
        height={window.innerHeight - 100}
        style={{
          display: "block",
          margin: "0 auto",
          backgroundImage: "url('/zone.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onMouseDown={role === "admin" ? startDrawing : null}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      ></canvas>

      <Modal
        title="Name the Zone"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
          placeholder="Enter zone name"
          className="w-full p-2 border rounded"
        />
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Zones;
