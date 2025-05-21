"use client";
import { useEffect, useState } from "react";
import APiClient from "@/app/api/ApiClient";
import toast from "react-hot-toast";
import { IoSave } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

interface ProductItem {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    price: number;
  };
}

interface Order {
  _id: string;
  status: string;
  paymentMode: string;
  totalAmount: number;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  products: ProductItem[];
}

const ProductIndex = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await APiClient.get(`/order/all-orders`);
      setOrders(res.data);
      setFilteredOrders(res.data);
      const statusData: { [key: string]: string } = {};
      res.data.forEach((order: Order) => {
        statusData[order._id] = order.status;
      });
      setStatusMap(statusData);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (orderId: string) => {
    try {
      setLoading(true);
      await APiClient.put(`/order/update-order/${orderId}`, {
        status: statusMap[orderId],
      });
      toast.success("Order status updated", { duration: 1000 });
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const matchesOrderId = order._id
        .toLowerCase()
        .includes(searchOrderId.toLowerCase());
      const matchesName = order.shippingAddress.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesStatus = order.status
        .toLowerCase()
        .includes(searchStatus.toLowerCase());
      return matchesOrderId && matchesName && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchOrderId, searchName, searchStatus, orders]);

  if (!orders.length) return <p className="p-4">Loading...</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Order Details</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full sm:w-1/4"
        />
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full sm:w-1/4"
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full sm:w-1/4 pr-10 appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-right bg-[length:1rem_1rem]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Shipping Details</th>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Payment Mode</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">
                  <div>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.shippingAddress.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.shippingAddress.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <ul className="list-disc ml-4">
                    {order.products.map((item) => (
                      <li key={item._id}>
                        {item.productId.name} x {item.quantity} = ₹
                        {item.productId.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border">₹{order.totalAmount}</td>
                <td className="px-4 py-2 border">{order.paymentMode}</td>
                <td className="px-4 py-2 border">
                  {editingOrderId === order._id ? (
                    <select
                      className="border rounded px-2 py-1 cursor-pointer"
                      value={statusMap[order._id] || ""}
                      onChange={(e) =>
                        setStatusMap({
                          ...statusMap,
                          [order._id]: e.target.value,
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`capitalize font-semibold px-2 py-1 rounded
                      ${
                        order.status === "completed"
                          ? "text-green-600 bg-green-100"
                          : order.status === "pending"
                          ? "text-blue-600 bg-blue-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingOrderId === order._id ? (
                    <button
                      onClick={() => {
                        updateStatus(order._id);
                        setEditingOrderId(null);
                      }}
                      disabled={loading}
                      className="text-green-600 hover:text-green-800 ml-2 cursor-pointer"
                    >
                      <IoSave size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingOrderId(order._id)}
                      className="text-gray-600 hover:text-gray-800 ml-2 cursor-pointer"
                    >
                      <LuPencilLine size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="text-center p-4 text-gray-500">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductIndex;
