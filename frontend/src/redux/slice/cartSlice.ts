import APiClient from "@/api/ApiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  userId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  cart: {
    quantity: number;
  };
}

type AddToCartPayload = {
  userId: string;
  productId: string;
  quantity: number;
};
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "/cart/getUserCart",
  async (id: string | null | undefined) => {
    if (id) {
      const response = await APiClient.get<CartItem[]>(`/cart/user/${id}`);
      return response.data;
    }
  }
);

export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (item: AddToCartPayload) => {
    console.log("itemss", item);
    const response = await APiClient.post<CartItem>("/cart/add", item);
    return response.data;
  }
);

export const updateCartQuantityAPI = createAsyncThunk(
  "cart/updateCartQuantityAPI",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const response = await APiClient.put<CartItem>(`/cart/update/${id}`, {
      quantity,
    });
    return response.data;
  }
);

export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (id: string) => {
    await APiClient.delete(`/cart/delete/${id}`);
    return id;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cart";
      })

      .addCase(addToCartAPI.fulfilled, (state, action) => {
        const existing = state.items.find(
          (i) => i.productId === action.payload.productId
        );
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      })

      .addCase(updateCartQuantityAPI.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.productId === action.payload.productId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })

      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId._id !== action.payload
        );
      });
  },
});

export default cartSlice.reducer;
