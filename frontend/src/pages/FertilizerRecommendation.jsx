import React, { useState } from "react";
import Layout from "../components/Layout";

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    landSize: "",
    soilType: "",
    cropType: "",
    location: "",
  });

  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example mock result. Replace with actual ML/DL model result from backend.
    setRecommendation({
      npk: "N: 80, P: 60, K: 40",
      product: "Urea + DAP Mix",
      instructions:
        "Apply in 3 splits: 50% at sowing, 25% after 3 weeks, 25% at flowering.",
      note: "Recommendation is based on standard practice for Tomato in Loamy soil.",
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Fertilizer Recommendation
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-6 space-y-4"
        >
          <input
            type="number"
            name="landSize"
            placeholder="Land Size (in acres)"
            value={formData.landSize}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Soil Type</option>
            <option value="Loamy">Loamy</option>
            <option value="Sandy">Sandy</option>
            <option value="Clayey">Clayey</option>
            <option value="Silty">Silty</option>
          </select>

          <input
            type="text"
            name="cropType"
            placeholder="Crop or Plant Type"
            value={formData.cropType}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location (optional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Get Recommendation
          </button>
        </form>

        {recommendation && (
          <div className="mt-10 bg-green-50 border border-green-200 p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Suggested Fertilizer Plan:
            </h2>
            <p>
              <strong>NPK Ratio:</strong> {recommendation.npk}
            </p>
            <p>
              <strong>Product:</strong> {recommendation.product}
            </p>
            <p>
              <strong>Instructions:</strong> {recommendation.instructions}
            </p>
            <p className="text-sm text-gray-500 mt-2 italic">
              {recommendation.note}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FertilizerRecommendation;
