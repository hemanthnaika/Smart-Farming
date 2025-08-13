// Fertilizer.jsx
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
    nitrogen: "",
    potassium: "",
    phosphorous: "",
    soil: "0",
    crop: "0",
  });

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/predict-fertilizer`,
        {
          nitrogen: formData.nitrogen,
          potassium: formData.potassium,
          phosphorous: formData.phosphorous,
          soil: formData.soil,
          crop: formData.crop,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onError: () => {
      toast.error("Failed to get fertilizer prediction");
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
              value={formData.soil}
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
              value={formData.crop}
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
            <label className="block font-medium mb-1">🧪 Nitrogen</label>
            <input
              type="number"
              name="nitrogen"
              placeholder="Enter nitrogen value"
              value={formData.nitrogen}
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">🧪 Potassium</label>
            <input
              type="number"
              name="potassium"
              placeholder="Enter potassium value"
              value={formData.potassium}
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">🧪 Phosphorous</label>
            <input
              type="number"
              name="phosphorous"
              placeholder="Enter phosphorous value"
              value={formData.phosphorous}
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

            <p className="mt-3 font-bold text-green-900">
              🌿 Recommended Fertilizer: {data.recommended_fertilizer}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-5 bg-red-100 rounded shadow">
            <h3 className="text-xl font-semibold mb-2 text-red-800">
              ❌ Error
            </h3>
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Fertilizer;
