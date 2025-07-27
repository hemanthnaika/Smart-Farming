import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../api/productApi";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

const SellProduct = () => {
  const { token } = useSelector((auth) => auth.auth);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    location: "",
    contact: "",
    description: "",
    image: null,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        quantity: "",
        location: "",
        contact: "",
        description: "",
        image: null,
      });
    },
    onError: (error) => {
      alert(error?.response?.data?.error || "Failed to add product.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData, token });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-heading mb-8 text-center">
          Sell Your Product
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

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price (per kg)"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
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

          <input
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
            {mutation.isLoading ? "Submitting..." : "Submit Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SellProduct;
