"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOrders } from "@/redux/slice/orderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image";
import successImage from "../../images/ordersuccess.jpg";

const useAppDispatch = () => useDispatch<AppDispatch>();

const InvoicePage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (id) {
        try {
          const result = await dispatch(fetchOrders(id)).unwrap();
          setOrder(result);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    loadOrder();
  }, [id, dispatch]);

  if (!order) return <div>Loading invoice...</div>;

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 p-6 gap-6">
      {/* Left Side - Invoice */}
      <div className="w-full md:w-1/2 border rounded shadow p-6 font-sans text-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl text-green-700 font-bold">SPP PAPAD</h1>
            <p className="text-sm">37/A North Street Annupanadi, Madurai-625009, India</p>
            <div className="mt-4">
              <p className="font-semibold">BILL TO</p>
              <p>Name: {order.shippingAddress.name}</p>
              <p>
                Address:{" "}
                {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.pincode}`}
              </p>
              <p>Email: {order.shippingAddress.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p><strong>Invoice No.:</strong> {order._id.slice(-6).toUpperCase()}</p>
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
            {order.products.map((item: any) => (
              <tr key={item._id}>
                <td className="p-2 border">{item.productId.name}</td>
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
  );
};

export default InvoicePage;



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { fetchOrders } from "@/redux/slice/orderSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store/store";
// import Image from "next/image";
// import successImage from "../../images/ordersuccess.jpg";

// const useAppDispatch = () => useDispatch<AppDispatch>();

// const InvoicePage = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const id = params?.id as string;

//   const [order, setOrder] = useState<any>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const loadOrder = async () => {
//       if (id) {
//         try {
//           const result = await dispatch(fetchOrders(id)).unwrap();
//           setOrder(result);
//         } catch (error) {
//           console.error("Failed to fetch orders:", error);
//         }
//       }
//     };

//     loadOrder();
//   }, [id, dispatch]);

//   if (!order) return <div>Loading invoice...</div>;

//   return (
//     <div className="p-6">
//       {/* Button to open modal */}
//       <div className="text-center mt-10">
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
//         >
//           View Invoice
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-full max-w-4xl rounded-lg p-6 overflow-auto max-h-[90vh] relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             {/* Invoice Content */}
//             <div className="flex justify-center items-center mb-4">
//               <Image src={successImage} width={300} height={300} alt="Success" />
//             </div>

//             <div className="border rounded shadow font-sans text-gray-800">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h1 className="text-2xl text-green-700 font-bold">SPP PAPAD</h1>
//                   <p className="text-sm">37/A North Street Annupanadi, Madurai-625009, India</p>
//                   <div className="mt-4">
//                     <p className="font-semibold">BILL TO</p>
//                     <p>Name: {order.shippingAddress.name}</p>
//                     <p>
//                       Address:{" "}
//                       {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.pincode}`}
//                     </p>
//                     <p>Email: {order.shippingAddress.email}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p><strong>Invoice No.:</strong> {order._id.slice(-6).toUpperCase()}</p>
//                   <p><strong>Issue date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Due date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Reference:</strong> {order._id.slice(-6).toUpperCase()}</p>
//                 </div>
//               </div>

//               <table className="w-full text-left border-collapse mb-4">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-2 border">Product Name</th>
//                     <th className="p-2 border">Quantity</th>
//                     <th className="p-2 border">Unit Price (₹)</th>
//                     <th className="p-2 border">Amount (₹)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.products.map((item: any) => (
//                     <tr key={item._id}>
//                       <td className="p-2 border">{item.productId.name}</td>
//                       <td className="p-2 border">{item.quantity}</td>
//                       <td className="p-2 border">{item.productId.price.toFixed(2)}</td>
//                       <td className="p-2 border">{(item.productId.price * item.quantity).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="text-right">
//                 <p><strong>Subtotal:</strong> ₹{(order.totalAmount - 50).toFixed(2)}</p>
//                 <p><strong>Shipping:</strong> ₹50.00</p>
//                 <p className="text-xl font-bold"><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoicePage;
