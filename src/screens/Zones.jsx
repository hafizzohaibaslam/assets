import React, { useRef, useState } from "react";
import { Modal, Button, notification } from "antd";

function Zones() {
  const canvasRef = useRef(null);
  const [zones, setZones] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [zoneName, setZoneName] = useState("");

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
      setCurrentZone(null); // Reset the current zone
      return;
    }

    setIsModalVisible(true); // Show modal for naming the zone
  };

  const handleOk = () => {
    if (zoneName) {
      setZones([...zones, { ...currentZone, name: zoneName }]);
    }
    setZoneName("");
    setCurrentZone(null);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setZoneName("");
    setCurrentZone(null);
    setIsModalVisible(false);
  };

  const isOverlapping = (newZone) => {
    return zones.some((zone) => {
      return !(
        (
          newZone.x + newZone.width <= zone.x || // New zone is to the left
          newZone.x >= zone.x + zone.width || // New zone is to the right
          newZone.y + newZone.height <= zone.y || // New zone is above
          newZone.y >= zone.y + zone.height
        ) // New zone is below
      );
    });
  };

  const drawZones = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Redraw all saved zones
    zones.forEach((zone) => {
      ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(zone.name, zone.x + 5, zone.y + 20);
    });

    // Draw current zone if in progress
    if (currentZone) {
      ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
      ctx.fillRect(
        currentZone.x,
        currentZone.y,
        currentZone.width,
        currentZone.height
      );
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        currentZone.x,
        currentZone.y,
        currentZone.width,
        currentZone.height
      );
    }
  };

  React.useEffect(() => {
    drawZones();
  }, [zones, currentZone]);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <Button type="primary" onClick={() => alert("Select Area")}>
          Select Area
        </Button>
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
        onMouseDown={startDrawing}
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
    </div>
  );
}

export default Zones;
