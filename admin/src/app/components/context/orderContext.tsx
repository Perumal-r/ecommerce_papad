'use client'

import APiClient from "@/app/api/ApiClient";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


type Order = {
  _id: string;
  status: string;
  user: string;
  items: { productId: string; quantity: number }[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};

interface OrderContextType {
  loading: boolean;
  orderStatus: Order[];
  orderDisplay: number;
  refreshOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [orderDisplay, setOrderDisplay] = useState(0);
  const [orderStatus, setOrderStatus] = useState<Order[]>([]);

  const fetchOrderCount = async () => {
    try {
      setLoading(true);
      const res = await APiClient.get("/order/all-orders");
      setOrderDisplay(res.data.length);
      setOrderStatus(res.data);
    } catch (err) {
      toast.error(err as string); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderCount();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        loading,
        orderStatus,
        orderDisplay,
        refreshOrders: fetchOrderCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use context
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
};
