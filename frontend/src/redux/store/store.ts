import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slice/categorySlice";
import cartReducer from "../slice/cartSlice";
import orderReducer from "../slice/orderSlice";
import drawerReducer from "../slice/drawerSlice";
import viewOrderDrawerReducer from "../slice/vieworderdrawerSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    drawer: drawerReducer,
    viewOrderDrawer: viewOrderDrawerReducer,
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
