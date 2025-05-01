// components/PerformanceDonut.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PerformanceDonut() {
  const [chartData] = useState<ApexCharts.ApexOptions>({
    series: [75],
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "20px",
            color: "#111",
            offsetY: 5,
          },
        },
      },
    },
    colors: ["#00A63E"],
    labels: ["Performance"],
  });

  return (
    <div className="bg-white p-4 rounded shadow border-1 border-gray-200 w-full ">
      <h2 className="text-lg font-semibold mb-2">Performance</h2>
      <ApexChart
        options={chartData}
        series={chartData.series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}
