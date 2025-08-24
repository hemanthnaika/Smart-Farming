// SellProduct.jsx

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, getSingleProduct, updateProduct } from "../api/productApi";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoginImage } from "../assets/images";
import { useNavigate, useParams, useLocation } from "react-router";
import { FaUpload, FaTrash } from "react-icons/fa"; // Added icons for file upload and remove

const categories = [
  "Grains",
  "Vegetables",
  "Fruits",
  "Herbs & Spices",
  "Pulses & Beans",
  "Dairy Products",
  "Others",
];

const categoryUnits = {
  Grains: "kg",
  Vegetables: "kg",
  Fruits: "kg",
  "Herbs & Spices": "bundles",
  "Pulses & Beans": "kg",
  "Dairy Products": "liters",
  Others: "units",
};

const SellProduct = () => {
  const { token } = useSelector((auth) => auth.auth);
  const { id } = useParams();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    location: "",
    contact: "",
    description: "",
    image: null,
    category: "",
    customCategory: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!id) {
      setFormData({
        name: "",
        price: "",
        quantity: "",
        location: "",
        contact: "",
        description: "",
        category: "",
        customCategory: "",
        image: null,
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [location.pathname, id]);

  const { data: productData, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && isSuccess && productData) {
      const product = productData;
      setFormData({
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        location: product.location || "",
        contact: product.contact || "",
        description: product.description || "",
        category: product.category || "",
        image: null,
      });

      if (product.image) {
        setImagePreview(`${import.meta.env.VITE_BASE_URL}/${product.image}`);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [id, isSuccess, productData]);

  const mutation = useMutation({
    mutationFn: id ? updateProduct : addProduct,
    onSuccess: () => {
      toast.success(id ? "Product updated!" : "Product added!", {
        style: {
          background: "#10B981",
          color: "#fff",
          fontWeight: "500",
        },
      });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Operation failed", {
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUnit = categoryUnits[formData.category] || "units";

    const finalData = { ...formData, unit: selectedUnit };

    const payload = id
      ? { id, formData: finalData, token }
      : { formData: finalData, token };
    mutation.mutate(payload);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to sell a product", {
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
    }
  }, [token]);

  if (!token) {
    return (
      <Layout>
        <div className="min-h-[80dvh] flex flex-col items-center justify-center p-6 pt-15 ">
          <img
            src={LoginImage}
            alt="Login required"
            className="w-full max-w-md h-80 object-contain mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">
            Please Login to Continue
          </h2>
          <p className="text-gray-600 text-lg">
            You must be logged in to sell a product.
          </p>
        </div>
      </Layout>
    );
  }

  const selectedUnit = categoryUnits[formData.category] || "units";

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center font-poppins">
          {id ? "Update Your Product" : "Sell Your Product"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per {selectedUnit} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder={`Price per ${selectedUnit}`}
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Stock ({selectedUnit}){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder={`Total Stock`}
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe your product"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            {imagePreview ? (
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-xs h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xs h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 mb-4">
                <span className="text-gray-500">No image selected</span>
              </div>
            )}
            <label className="w-full flex items-center justify-center bg-blue-100 text-blue-600 px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-200 transition-all duration-200">
              <FaUpload className="mr-2" />
              Upload Image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {id ? "Updating..." : "Submitting..."}
              </>
            ) : id ? (
              "Update Product"
            ) : (
              "Submit Product"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SellProduct;
