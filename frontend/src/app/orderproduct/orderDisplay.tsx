import APiClient from "@/api/ApiClient";
import React, { useEffect, useState } from "react";

interface OrderDetails {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: "pending" | "shipping" | "completed" | "cancelled";
  // Add other fields as needed based on your API response
}

const OrderDisplay = () => {
  const [orderDetailsData, setOrderDetailsData] = useState<OrderDetails[]>([]);

  const orderGet = async () => {
    const userId = localStorage.getItem("user");
    const res = await APiClient.get(`/order/place-order/${userId}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch order details");
    }
    setOrderDetailsData(res.data);
  };

  useEffect(() => {
    orderGet();
  }, []);

  const steps = ["pending", "shipping", "completed", "cancelled"];

  type ColorCode = {
    pending: string;
    shipping: string;
    completed: string;
    cancelled: string;
  };

  const statusColors: ColorCode = {
    pending: "bg-gray-400",
    shipping: "bg-yellow-400",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return (
    <div className="p-4 space-y-6">
      {orderDetailsData.map((order: any) => {
        const currentStatus = order.status;

        return (
          <div key={order._id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-bold mb-1">Order ID: {order._id}</h2>
            <p className="text-sm text-gray-600">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm font-semibold mt-1">
              Total Amount: ₹{order.totalAmount}
            </p>

            {/* Status Tracker */}
            <div className="flex items-center justify-between mt-6 px-2">
              {steps.map((step, index) => {
                const isActive = index <= steps.indexOf(currentStatus);
                const nextIsActive = index + 1 <= steps.indexOf(currentStatus);

                const circleColor = isActive
                  ? statusColors[step as keyof ColorCode]
                  : "bg-gray-200";
                const textColor = isActive
                  ? "text-black font-semibold"
                  : "text-gray-400";

                return (
                  <div
                    key={step}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {/* Line to next step */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-3 left-1/2 w-full h-1 z-0">
                        <div
                          className={`h-1 ${
                            nextIsActive
                              ? statusColors[steps[index + 1] as keyof ColorCode]
                              : "bg-gray-200"
                          } w-full`}
                        ></div>
                      </div>
                    )}

                    {/* Circle */}
                    <div
                      className={`w-6 h-6 rounded-full ${circleColor} z-10`}
                    ></div>

                    {/* Label */}
                    <span className={`mt-2 text-xs ${textColor}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDisplay;
