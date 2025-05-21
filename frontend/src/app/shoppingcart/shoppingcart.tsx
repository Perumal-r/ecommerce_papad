"use client";

import { RootState } from "@/redux/store/store";
import Image from "next/image";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { fetchCart } from "@/redux/slice/cartSlice";
import APiClient from "@/api/ApiClient";
import toast from "react-hot-toast";
import SuccessPage from "../successpage.tsx/success";

const useAppDispatch = () => useDispatch<AppDispatch>();

const ShoppingCartPage = () => {
  const dispatch = useAppDispatch();

  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item?.productId?.price * item?.quantity,
    0
  );

  useEffect(() => {
    const userId_send = window.localStorage.getItem("user") || "";
    dispatch(fetchCart(userId_send));
  }, [dispatch]);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = localStorage.getItem("user");

    const form = e.currentTarget;
    const shippingAddress = {
      name: (form[0] as HTMLInputElement).value,
      email: (form[1] as HTMLInputElement).value,
      phone: (form[2] as HTMLInputElement).value,
      street: (form[3] as HTMLInputElement).value,
      city: (form[4] as HTMLInputElement).value,
      pincode: (form[5] as HTMLInputElement).value,
      state: (form[6] as HTMLInputElement).value,
      country: (form[7] as HTMLInputElement).value,
    };

    const paymentMode = "Cash on Delivery";

    const orderData = {
      userId,
      cartItems,
      shippingAddress,
      paymentMode,
    };

    const res = await APiClient.post("/order/place-order", orderData);

    if (res.status === 200 || res.status === 201) {
      toast.success("Order placed successfully");
      <SuccessPage />
      window.location.href = `/invoice/${res.data.orderId}`;
    } else {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Shipping Form */}
        <div className="md:col-span-2">
          <h4 className="text-lg mb-4 font-bold border-b" style={{ color: "gray" }}>
            SHIPPING DETAILS
          </h4>
          <form className="space-y-4" onSubmit={handlePlaceOrder}>
            {[
              "Name",
              "Email",
              "Phone",
              "Street",
              "City",
              "Pincode",
              "State",
              "Country",
            ].map((label, index) => (
              <input
                key={index}
                type="text"
                placeholder={label}
                defaultValue={
                  label === "State"
                    ? "Tamil Nadu"
                    : label === "Country"
                    ? "India"
                    : ""
                }
                className="w-full border border-gray-300 p-3 rounded focus:border-green-600 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors"
                required
              />
            ))}

            <h2 className="text-lg font-semibold mt-6">PAYMENT MODE</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-6 rounded mt-4 hover:bg-green-600 transition cursor-pointer"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">ORDER SUMMARY</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-4">
              <Image
                src={item?.productId?.imageUrl || "/dummy-image.jpg"}
                alt={item?.productId?.name || "Product"}
                width={100}
                height={100}
                className="object-cover mr-4"
              />
              <div className="grid grid-cols-4 gap-4 w-full items-center">
                <div className="relative group">
                  <p className="font-medium truncate">
                    {item?.productId?.name}
                  </p>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {item?.productId?.name}
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">{item.quantity}</p>
                <p className="text-sm text-gray-600 text-right">
                  ₹{item.productId.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 text-right">
                  ₹{(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <hr className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sub-Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>₹50.00</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t">
              <span>Total</span>
              <span>₹{(subtotal + 50).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
