"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchOrders } from "@/redux/slice/orderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image";
import successImage from "../../images/ordersuccess.jpg";

const useAppDispatch = () => useDispatch<AppDispatch>();

// Define the OrderProduct type based on the usage in your code
interface OrderProduct {
  _id: string;
  quantity: number;
  productId: {
    name: string;
    price: number;
  };
}

interface Order {
  _id: string;
  products: OrderProduct[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  createdAt: string;
}

const InvoicePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (id) {
        try {
          const result = await dispatch(fetchOrders(id)).unwrap();
          setOrder(result.orders[0]);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    loadOrder();
  }, [id, dispatch]);

  const handleRouter = () => {
  router.push("/")
}


  if (!order) {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 p-6 gap-6 animate-pulse">
      {/* Left Side - Skeleton Invoice */}
      <div className="w-full md:w-1/2 border rounded shadow p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        <div className="space-y-2 mt-6">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-3/5" />
        </div>

        <div className="mt-8 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-full" />
        </div>

        <div className="text-right space-y-2 mt-6">
          <div className="h-4 bg-gray-200 rounded w-1/3 ml-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/4 ml-auto" />
          <div className="h-6 bg-gray-300 rounded w-1/2 ml-auto" />
        </div>
      </div>

      {/* Right Side - Image Placeholder */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-gray-200 rounded shadow w-[400px] h-[400px]" />
      </div>
    </div>
  );
}


  return (
    <>
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 p-6 gap-6">
      {/* Left Side - Invoice */}
      <div className="w-full md:w-1/2 border rounded shadow p-6 font-sans text-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl text-green-700 font-bold">SPP PAPAD</h1>
            <p className="text-sm">37/A North Street Annupanadi, Madurai-625009, India</p>
            <div className="mt-4">
              <p className="font-semibold">BILL TO</p>
              <p>Name: {order.shippingAddress?.name}</p>
              <p>
                Address:{" "}
                {`${order.shippingAddress?.street}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state}, ${order.shippingAddress?.country}, ${order.shippingAddress?.pincode}`}
              </p>
              <p>Email: {order.shippingAddress?.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p><strong>Invoice No:</strong> {order._id.slice(-6).toUpperCase()}</p>
            <p><strong>Issue date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Due date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Reference:</strong> {order._id.slice(-6).toUpperCase()}</p>
          </div>
        </div>

        <table className="w-full text-left border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit Price (₹)</th>
              <th className="p-2 border">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item: OrderProduct) => (
              <tr key={item._id}>
              <td className="p-2 border">{item.productId?.name}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.productId.price.toFixed(2)}</td>
                <td className="p-2 border">
                  {(item.productId.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p><strong>Subtotal:</strong> ₹{(order.totalAmount - 50).toFixed(2)}</p>
          <p><strong>Shipping:</strong> ₹50.00</p>
          <p className="text-xl font-bold">
            <strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src={successImage}
          width={500}
          height={500}
          alt="Order Success"
          className="rounded shadow"
        />
      </div>
    </div>
    <div className="flex justify-center mt-6">
      <button className="border bg-green-600 hover:bg-green-500 cursor-pointer text-white rounded-md px-4 py-2 my-4" onClick={handleRouter}>Continue Shopping</button>
    </div>
    </>
  );
};

export default InvoicePage;