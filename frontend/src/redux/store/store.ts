import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slice/categorySlice";
import cartReducer from "../slice/cartSlice";
import orderReducer from "../slice/orderSlice"
import drawerReducer from "../slice/drawerSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer, // <-- here
    cart: cartReducer, // <-- here
    order: orderReducer,
    drawer: drawerReducer, // <-- here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// type support
// export const { dispatch } = store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
