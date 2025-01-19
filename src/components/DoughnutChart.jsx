import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        data: [30, 50, 20], // Example percentages
        backgroundColor: ["#5b93ff", "#ffd66b", "#ff8f6b"],
        hoverBackgroundColor: ["#3367D6", "#F9A825", "#D93025"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // Creates the hollow center
    plugins: {
      legend: {
        display: false, // Hide legend (optional)
      },
    },
  };

  return (
    <div className="relative w-full h-full items-center justify-center  mx-auto p-6 bg-white rounded-lg px-[29px] py-[26px]">
      {/* Title */}
    <div className="w-full mb-[1rem]">
    <h3 className="text-lg  font-semibold text-gray-700 mb-4">
        Usage Statistics
      </h3>
    </div>

      {/* Chart */}
      <div className="relative  w-full flex flex-col items-center">
        <div className="h-[177px]">
            <Doughnut data={data} options={options} />
        </div>
        {/* Legend */}
        <div className="flex justify-around mt-4 gap-[16px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#5b93ff]" />
            <p className="text-[16px] text-gray-600">Daily</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ffd66b]" />
            <p className="text-[16px] text-gray-600">Weekly</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff8f6b]" />
            <p className="text-[16px] text-gray-600">Monthly</p>
          </div>
        </div>
      </div>

      {/* 1200 hrs Label */}
      <div className="absolute top-0 mt-[8rem] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-[19.6px] font-bold text-gray-800">1200 hrs</p>
        <p className="text-sm text-gray-500">Total Hours</p>
      </div>
    </div>
  );
};

export default DoughnutChart;
