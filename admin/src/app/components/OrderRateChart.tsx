// components/OrderRateChart.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OrderRateChart() {
  const [chartData] = useState<ApexCharts.ApexOptions>({
    series: [
      {
        name: "This Month",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Last Month",
        data: [20, 30, 45, 32, 34, 52, 41, 60, 90],
      },
    ],
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#FFB703", "#FB8500"],
  });

  return (
    <div className="bg-white p-4 rounded shadow border-1 border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-2">Order Rate</h2>
      <ApexChart
        options={chartData}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
}
