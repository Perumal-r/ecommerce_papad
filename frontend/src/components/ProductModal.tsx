// ProductModal.tsx
"use client";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  // Add other properties if needed (e.g., category, rating, etc.)
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative shadow-lg">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoClose className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" />
        </button>

        {/* Show product details from your modal design */}
        <div className="grid md:grid-cols-2 gap-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded"
          />
          <div>
            <p className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded w-fit mb-2">
              Sale on
            </p>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-yellow-600 my-1">⭐⭐⭐⭐☆ (32 reviews)</p>
            <p className="text-green-700 text-3xl font-bold">
              ${product.price}{" "}
              <span className="line-through text-gray-400 text-lg ml-2">
                ${Math.round(product.price * 1.26)}
              </span>
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Production: <span className="text-green-700">SPP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
