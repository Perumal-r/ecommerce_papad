"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { fetchCategories } from "../../redux/slice/categorySlice";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import APiClient from "@/api/ApiClient";

interface FormProps {
  onClose: () => void; // To close modal after submit
}

const useAppDispatch = () => useDispatch<AppDispatch>();

const CategoriesAddForm = ({ onClose }: FormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !image) {
      toast.error("Please fill all fields!", { duration: 1000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await APiClient.post(`/categories/addcategory`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", formData, res);
      toast.success("Category added successfully!", { duration: 1000 });
      dispatch(fetchCategories());
      onClose(); // Close modal after submit
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category.", { duration: 1000 });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoriesAddForm;
