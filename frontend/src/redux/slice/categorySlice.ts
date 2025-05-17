import APiClient from "@/api/ApiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Category {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// GET Categories
export const fetchCategories = createAsyncThunk(
  "categories/getcategories",
  async () => {
    const response = await APiClient.get("/categories/getcategories");
    return response.data;
  }
);

// ADD Category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (formData: FormData) => {
    const response = await APiClient.post("/categories/addCategory", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      // add
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
