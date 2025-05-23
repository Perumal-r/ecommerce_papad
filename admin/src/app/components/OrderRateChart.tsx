// components/OrderRateChart.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import APiClient from "../api/ApiClient";
import toast from "react-hot-toast";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Product {
  _id: string;
  name: string;
}

interface OrderProduct {
  productId: Product;
  // Add other fields if needed
}

interface Order {
  products: OrderProduct[];
  // Add other fields if needed
}

export default function OrderRateChart() {
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [categoriesList, setCategoriesList] = useState<Product[]>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const fetcchCategoriesData = async () => {
    try {
      setLoading(true);
      const res = await APiClient.get("/categories/getcategories");
      setCategoriesList(res.data);
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductCountprice = async () => {
    setLoading(true);
    try {
      const res = await APiClient.get(
        `/order/orders-by-date?date=${date}&productId=${selectedProductId}`
      );
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcchCategoriesData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProductCountprice();
    }
  }, [selectedProductId]);

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
    <>
    {loading && <p>Loading...</p>}
    <div className="bg-white p-4 rounded shadow border-1 border-gray-200 w-full">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          className="w-full mb-2 border border-gray-300 rounded p-2"
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">-- Select Product --</option>
          {categoriesList.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-lg font-semibold mb-2">Order Rate</h2>
      <ApexChart
        options={chartData}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
    </>
  );
}
