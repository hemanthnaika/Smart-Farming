import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [solution, setSolution] = useState("");
  const resultRef = useRef(null);

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
      setSolution(data.solution);
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

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const diseaseOnly = searchTerm?.includes(" - ")
    ? searchTerm.split(" - ")[1]?.trim()
    : searchTerm;

  return (
    <Layout>
      <div className="py-20">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold text-green-900 tracking-tight  animate-fade-in-down">
            Crop Disease Detection
          </h2>
          <p className="mt-5 text-xl text-gray-600 leading-relaxed animate-fade-in-up">
            Discover potential crop diseases by uploading a leaf image. Our
            AI-powered tool provides accurate diagnostics and solutions.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-2xl space-y-8 transform transition-all duration-500 hover:shadow-3xl bg-opacity-90 backdrop-blur-md"
          >
            <div className="relative group">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700 mb-2 transition-all duration-300 group-hover:text-green-700"
              >
                Upload Crop Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 file:transition-all file:duration-300 cursor-pointer"
                required
              />
            </div>

            {previewUrl && (
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt="Crop Preview"
                  className="w-52 h-52 object-cover rounded-2xl border-4 border-green-100 shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full py-3 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md ${
                mutation.isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Detect Disease"
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        {result && (
          <div
            ref={resultRef}
            className="mt-12 max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 p-8 rounded-2xl shadow-lg animate-fade-in-up"
          >
            <h4 className="text-2xl font-bold text-green-900 mb-4">
              Detection Result
            </h4>
            <div className="space-y-4 text-gray-800">
              <p className="text-lg">
                <span className="font-semibold text-green-700">Disease:</span>{" "}
                {result}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-green-700">Accuracy:</span>{" "}
                {accuracy}%
              </p>
              <p className="text-lg">
                <span className="font-semibold text-green-700">Solution:</span>{" "}
                {solution}
              </p>
            </div>
          </div>
        )}

        {/* Google Search Link */}
        {diseaseOnly && diseaseOnly.toLowerCase() !== "healthy" && (
          <div className="mt-8 text-center">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                searchTerm + " treatment"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              Explore Treatment Options
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DiseaseDetection;
