// store/slices/orderSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APiClient from "@/api/ApiClient";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  _id?: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt?: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Get all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (id:string) => {
    const response = await APiClient.get(`/order/place-order/${id}`);
    return response.data;
  }
);

// Place new order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData: { items: OrderItem[]; totalAmount: number }) => {
    const response = await APiClient.post("/order/place-order", orderData);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })

      // placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to place order";
      });
  },
});

export default orderSlice.reducer;
