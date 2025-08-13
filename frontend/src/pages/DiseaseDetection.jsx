import React, { useState } from "react";
import Layout from "../components/Layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const mutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/predict-crop-disease`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      const formattedResult = data.result
        .replace(/___/g, " - ")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      setResult(formattedResult);
      setSearchTerm(formattedResult);
      setAccuracy(data.accuracy);
    },
    onError: (err) => {
      console.error(err);
      alert("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload a plant image.");
    mutation.mutate(image);
  };

  // Extract disease part from result to hide link if Healthy
  const diseaseOnly = searchTerm?.includes(" - ")
    ? searchTerm.split(" - ")[1]?.trim()
    : searchTerm;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Crop Disease Detection
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Upload a photo of your crop leaf to detect potential diseases using
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
            disabled={mutation.isPending}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {mutation.isPending ? "Analyzing..." : "Detect Disease"}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-green-50 border border-green-300 p-4 rounded">
            <h4 className="text-lg font-semibold text-green-700 mb-2">
              Detection Result:
            </h4>
            <p className="text-gray-700">{result}</p>
            <p className="text-gray-700">Accuracy: {accuracy} %</p>
          </div>
        )}

        {diseaseOnly && diseaseOnly.toLowerCase() !== "healthy" && (
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              searchTerm + " treatment"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline"
          >
            View More Treatments on Google
          </a>
        )}
      </div>
    </Layout>
  );
};

export default DiseaseDetection;
