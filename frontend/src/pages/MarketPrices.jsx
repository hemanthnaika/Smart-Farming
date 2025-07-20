import React, { useState } from "react";
import Layout from "../components/Layout";

const mockPrices = [
  {
    crop: "Tomato",
    location: "Erode, Tamil Nadu",
    min: 1800,
    max: 2300,
    modal: 2100,
    trend: "up",
  },
  {
    crop: "Wheat",
    location: "Lucknow, Uttar Pradesh",
    min: 2000,
    max: 2500,
    modal: 2300,
    trend: "down",
  },
  {
    crop: "Rice",
    location: "Kolkata, West Bengal",
    min: 2200,
    max: 2700,
    modal: 2500,
    trend: "stable",
  },
];

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("");

  const filteredPrices = selectedCrop
    ? mockPrices.filter((item) =>
        item.crop.toLowerCase().includes(selectedCrop.toLowerCase())
      )
    : mockPrices;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Market Prices
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by crop (e.g. Tomato, Rice)"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded shadow-sm text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Min Price (₹)</th>
                <th className="py-3 px-4">Max Price (₹)</th>
                <th className="py-3 px-4">Modal Price (₹)</th>
                <th className="py-3 px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{item.crop}</td>
                  <td className="py-2 px-4">{item.location}</td>
                  <td className="py-2 px-4">{item.min}</td>
                  <td className="py-2 px-4">{item.max}</td>
                  <td className="py-2 px-4 font-semibold text-green-700">
                    {item.modal}
                  </td>
                  <td className="py-2 px-4">
                    {item.trend === "up" && "📈"}
                    {item.trend === "down" && "📉"}
                    {item.trend === "stable" && "➖"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPrices;
