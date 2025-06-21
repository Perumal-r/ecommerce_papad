import APiClient from "@/api/ApiClient";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
import { GiCardPickup } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import noOrderFoundImg from "@/app/images/no-order-found-image-removebg-preview.png";

interface ProductId {
  _id: string;
  name: string;
  price: string | number;
}

interface ProductInfo {
  productId: ProductId;
  quantity: number;
  price?: string | number;
}

interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

interface OrderDetails {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: "pending" | "shipping" | "completed" | "cancelled";
  userId: string;
  paymentMode: string;
  companyName: string;
  products: ProductInfo[];
  shippingAddress: ShippingAddress;
}

const statusSteps = ["pending", "shipping", "completed", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-gray-400",
  shipping: "bg-yellow-400",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const OrderDisplay = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = sessionStorage.getItem("user");
      if (!userId) {
        toast.error("User not found in session.");
        return;
      }

      try {
        const res = await APiClient.get(`/order/place-order/${userId}`);

        if (res?.data?.orders && Array.isArray(res.data.orders)) {
          if (res.data.orders.length === 0) {
            setOrders([]);
          } else {
            setOrders(res.data.orders);
          }
        } else {
          setOrders([]); // If response is malformed or no orders key
          toast.error("No orders found for this user.");
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        toast.error("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 p-4">
        <Image
          width={200}
          height={200}
          src={noOrderFoundImg} // Make sure this image exists in your public folder
          alt="No Orders"
          className="w-120 h-auto"
        />
        <h2 className="text-xl font-semibold text-gray-700">No Orders Found</h2>
        <p className="text-gray-500">
          Looks like you haven&apos;t placed any orders yet.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-500 cursor-pointer text-white px-6 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleCancelOrder = async (orderId: string) => {
    try {
      const res = await APiClient.put(`/order/update-order/${orderId}`, {
        status: "cancelled",
        createdAt: new Date().toISOString(), // optional: backend uses it, so include it if needed
      });

      if (res.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
        toast.success("Order cancelled successfully");
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="ml-6 mt-5 font-bold" style={{ fontSize: "2rem" }}>
        Your Order
      </h1>
      <div className="p-6 space-y-6">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-md p-6 space-y-4 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Confirmed</h2>
                  <p className="text-sm mt-3">
                    Order Id: <strong>{order._id}</strong>
                  </p>
                  <p className="text-sm">
                    Order Date: <strong>{order.createdAt.split("T")[0]}</strong>
                  </p>
                  <p className="text-sm">
                    ETA:
                    <strong className="ml-1">
                      {
                        new Date(
                          new Date(order?.createdAt)?.setDate(
                            new Date(order?.createdAt)?.getDate() + 3
                          )
                        )
                          ?.toISOString()
                          .split("T")[0]
                      }
                    </strong>
                  </p>
                </div>
              </div>
              {/* Step Tracker */}
              <div className="flex items-center justify-between mt-4">
                {statusSteps?.length > 0 &&
                  statusSteps.map((step, index) => {
                    const isActive = index <= statusSteps.indexOf(order.status);
                    const nextIsActive =
                      index + 1 <= statusSteps.indexOf(order.status);
                    return (
                      <div
                        key={step}
                        className="flex-1 flex flex-col items-center relative"
                      >
                        {index < statusSteps.length - 1 && (
                          <div className="absolute top-3 left-1/2 w-full h-1 z-0">
                            <div
                              className={`h-1 ${
                                nextIsActive
                                  ? statusColors[statusSteps[index + 1]]
                                  : "bg-gray-200"
                              } w-full`}
                            ></div>
                          </div>
                        )}
                        <div
                          className={`w-6 h-6 rounded-full ${
                            isActive ? statusColors[step] : "bg-gray-200"
                          } z-10`}
                        ></div>
                        <span
                          className={`mt-2 text-xs ${
                            isActive
                              ? "text-black font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
              </div>{" "}
              {/* Order Info */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2 flex">
                  <FaInfoCircle
                    className="text-blue-900 mr-1"
                    style={{ fontSize: "30px" }}
                  />
                  <span className="mt-1"> Order Info</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Customer ID:</strong> {order.userId}
                  </div>
                  <div>
                    <strong>Payment Mode:</strong> {order.paymentMode}
                  </div>
                  <div>
                    <strong>Company:</strong> Sri Priya Papad
                  </div>
                  <div>
                    <strong>Total Amount:</strong> &#8377; {order.totalAmount}
                  </div>
                </div>
              </div>
              {/* Product Table */}
              <div className="mt-4">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1 text-left">
                        Product Name
                      </th>
                      <th className="border px-2 py-1">Quantity</th>
                      <th className="border px-2 py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order &&
                      order?.products.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border px-2 py-1">
                            {item?.productId?.name}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            &#8377; {item?.productId?.price} x {item.quantity}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            ₹ {Number(item?.productId?.price) * item.quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>{" "}
              {/* Action Buttons */}
              {order.status === "pending" && (
                <div className="flex flex-wrap gap-3 mt-4 justify-end">
                  <button
                    className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
              {/* Pickup Info */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2 flex">
                  <GiCardPickup
                    className="text-blue-900 mr-1"
                    style={{ fontSize: "30px" }}
                  />
                  <span className="mt-1"> Pickup Info</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Pickup Person:</strong>{" "}
                    {order.shippingAddress?.name}
                  </div>
                  <div>
                    <strong>Phone:</strong> {order.shippingAddress?.phone}
                  </div>
                  <div>
                    <strong>Address Info:</strong>{" "}
                    {order.shippingAddress?.street},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center my-5">
        <button
          className="border bg-green-600 hover:bg-green-500 cursor-pointer text-white rounded-md px-4 py-2 my-4"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default OrderDisplay;
