// SellProduct.jsx

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, getSingleProduct, updateProduct } from "../api/productApi";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoginImage } from "../assets/images";
import { useNavigate, useParams, useLocation } from "react-router";

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
      toast.success(id ? "Product updated!" : "Product added!");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Operation failed");
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

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to sell a product");
    }
  }, [token]);

  if (!token) {
    return (
      <Layout>
        <div className="min-h-[80dvh] flex flex-col items-center justify-center p-6 pt-15">
          <img
            src={LoginImage}
            alt="Login required"
            className="w-full h-80 object-contain mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Please login to continue
          </h2>
          <p className="text-gray-500">
            You must be logged in to sell a product.
          </p>
        </div>
      </Layout>
    );
  }

  const selectedUnit = categoryUnits[formData.category] || "units";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-heading mb-8 text-center">
          {id ? "Update Product" : "Sell Your Product"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              name="price"
              placeholder={`Price per ${selectedUnit}`}
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="number"
              name="quantity"
              placeholder={`Total Stock `}
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border px-4 py-2 rounded"
          />

          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover border rounded"
              />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-tertiary text-white py-2 rounded"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading
              ? id
                ? "Updating..."
                : "Submitting..."
              : id
              ? "Update Product"
              : "Submit Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SellProduct;
