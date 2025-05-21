"use client";

import { useEffect, useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import APiClient from "@/app/api/ApiClient";

interface Category {
  _id: string; // Add the _id property
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface CategoryData {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const CategoriesData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryData | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await APiClient.get("/categories/getcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await APiClient.delete(`/categories/deletecategory/${id}`);
      toast.success("Category deleted successfully", { duration: 1000 });
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category", { duration: 1000 });
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-8">
      {/* Add Button + Modal */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">Categories</span>

           
          </div>
          <div className="flex items-center gap-2">
             <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-700 flex items-center mr-2 text-white px-5 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              <IoMdAdd /> Add New
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded p-2"
            />
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
              <AddCategoryForm
                onClose={() => {
                  setIsModalOpen(false);
                  setEditCategory(undefined); // clear after closing
                }}
                fetchCategories={fetchCategories}
                editData={
                  editCategory
                    ? { ...editCategory, price: (categories.find(c => c._id === editCategory._id)?.price ?? 0) }
                    : undefined
                } // ensure price is included
                setLoading={setLoading} // pass setLoading to modal
                loading={loading} // pass loading state to modal
              />
            </div>
          </div>
        )}
      </div>
      {/*  Table should be structured properly */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">₹{item.price}</td>
                {/* Image */}
                <td className="px-6 py-4">
                  <Image
                    src={item.imageUrl}
                    width={100}
                    height={100}
                    className="w-15 h-15 object-cover rounded"
                    alt="product_image"
                  />
                </td>
                <td className="px-6 py-4 text-right flex gap-2 justify-end">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setEditCategory(item); // Set selected category for editing
                      setIsModalOpen(true); // Open modal
                    }}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                    title="Edit"
                  >
                    <CiEdit className="text-2xl cursor-pointer" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => confirmDelete(item._id)}
                    className="text-red-600 dark:text-red-500 hover:underline"
                    title="Delete"
                  >
                    <MdDelete className="text-2xl cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-[300px] text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-6">
                Are you sure you want to delete this category?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    if (deleteId) handleDelete(deleteId);
                    setShowDeleteModal(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default CategoriesData;
