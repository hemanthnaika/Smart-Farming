import React, { useState } from "react";
import Layout from "../components/Layout";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please upload a plant image.");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Replace with your actual backend endpoint
      const res = await fetch("/api/detect-disease", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result);

      // Add to history
      setHistory((prev) => [
        {
          id: Date.now(),
          image: previewUrl,
          result: data.result,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Plant Disease Detection
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Upload a photo of your plant leaf to detect potential diseases using
          AI.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-6"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-60 h-60 object-cover rounded-md border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Analyzing..." : "Detect Disease"}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-green-50 border border-green-300 p-4 rounded">
            <h4 className="text-lg font-semibold text-green-700 mb-2">
              Detection Result:
            </h4>
            <p className="text-gray-700">{result}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold">Detection History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt="History"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-gray-700">{item.result}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DiseaseDetection;
