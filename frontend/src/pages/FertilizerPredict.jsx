import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const soilTypes = ["Black", "Clayey", "Loamy", "Red", "Sandy"];
const cropTypes = [
  "Barley",
  "Cotton",
  "Ground Nuts",
  "Maize",
  "Millets",
  "Oil seeds",
  "Paddy",
  "Pulses",
  "Sugarcane",
  "Tobacco",
  "Wheat",
];

const Fertilizer = () => {
  const [formData, setFormData] = useState({
    soil: "0",
    crop: "0",
    temperature: "",
    humidity: "",
    moisture: "",
  });

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/predict-fertilizer`,
        fd
      );

      return res.data;
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🌾 Fertilizer Recommendation
        </h2>

        <div className="grid gap-5 bg-white p-6 rounded shadow-md">
          <div>
            <label className="block font-medium mb-1">Select Soil Type</label>
            <select
              name="soil"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {soilTypes.map((s, i) => (
                <option value={i} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Select Crop Type</label>
            <select
              name="crop"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {cropTypes.map((c, i) => (
                <option value={i} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              🌡️ Temperature (°C)
            </label>
            <input
              type="number"
              step="0.1"
              name="temperature"
              placeholder="Enter temperature"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">💧 Humidity (%)</label>
            <input
              type="number"
              step="0.1"
              name="humidity"
              placeholder="Enter humidity"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">🌫️ Moisture (%)</label>
            <input
              type="number"
              step="0.1"
              name="moisture"
              placeholder="Enter soil moisture"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={mutate}
            disabled={isPending}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {isPending ? "Predicting..." : "Predict Fertilizer"}
          </button>
        </div>
        {data && (
          <div className="mt-6 p-4 bg-green-100 rounded">
            <h3 className="text-lg font-semibold mb-2">✅ Prediction Result</h3>
            <p>🧪 Nitrogen: {data.nitrogen} kg/acre</p>
            <p>🧪 Phosphorous: {data.phosphorous} kg/acre</p>
            <p>🧪 Potassium: {data.potassium} kg/acre</p>
            <p className="mt-3 font-bold text-green-900">
              🌿 Recommended Fertilizer: {data.fertilizer}
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-8 p-5 bg-red-100 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 text-red-800">❌ Error</h3>
          <p>{error.message}</p>
        </div>
      )}
    </Layout>
  );
};

export default Fertilizer;
