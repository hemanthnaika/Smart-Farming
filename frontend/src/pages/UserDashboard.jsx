import React from "react";
import Layout from "../components/Layout";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-700 mb-10 text-center">
          Your Dashboard
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              My Products
            </h2>
            <p className="text-3xl font-bold text-green-600">5</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Disease Checks
            </h2>
            <p className="text-3xl font-bold text-green-600">3</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Fertilizer Queries
            </h2>
            <p className="text-3xl font-bold text-green-600">2</p>
          </div>
        </div>

        {/* My Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            My Products
          </h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p>🍅 Fresh Tomatoes – ₹25/kg – 50kg – Erode</p>
            <div className="flex gap-2 mt-2">
              <button className="text-sm text-blue-600">Edit</button>
              <button className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        </section>

        {/* My Disease Reports */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            My Disease Reports
          </h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p>🌿 Leaf Blight detected on Tomato – 17 July 2025</p>
            <div className="text-sm text-gray-600">Status: Reviewed</div>
          </div>
        </section>

        {/* My Fertilizer Requests */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            My Fertilizer Requests
          </h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p>🌾 Crop: Rice – Soil: Sandy – Recommendation: Urea & Potash</p>
            <div className="text-sm text-gray-600">
              Submitted on: 15 July 2025
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserDashboard;
