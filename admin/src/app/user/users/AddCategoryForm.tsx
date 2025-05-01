"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface FormProps {
  onClose: () => void; // To close modal after submit
  fetchCategories: () => void; // Function to fetch categories after adding/updating
  editData?: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
  }; // Optional prop for editing
  loading?: boolean; // Optional prop for loading state
  setLoading?: (loading: boolean) => void; // Optional prop for loading state setter
}

const AddCategoryForm = ({
  onClose,
  fetchCategories,
  editData,
  loading,
  setLoading,
}: FormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description);
      // setImage(editData.imageUrl); // Commented out as imageUrl is a string
    }
  }, [editData]);

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
      if (setLoading) {
        setLoading(true);
      }
      let res;

      if (editData) {
        // Editing: call update API
        formData.append("id", editData._id); // or use route param depending on backend
        res = await axios.post(
          `http://localhost:5000/categories/updatecategory/${editData._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Category updated successfully!", { duration: 1000 });
      } else {
        // Adding: call add API
        res = await axios.post(
          "http://localhost:5000/categories/addcategory",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Category added successfully!", { duration: 1000 });
      }

      console.log("Success:", formData, res);
      fetchCategories();
      if (setLoading) {
        setLoading(false);
      }
      onClose(); // Close modal after submit
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit category.", { duration: 1000 });
    }
  };

  return (
    <div className="rounded-lg w-full max-w-md relative">
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
            maxLength={250}
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
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold text-white cursor-pointer ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
