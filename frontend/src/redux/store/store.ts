import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slice/categorySlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer, // <-- here
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
