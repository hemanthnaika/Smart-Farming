import React from "react";
import Layout from "../components/Layout";
import { FlaskConical, Search, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
    title: "Sell Product",
  },
  {
    icon: <Search className="h-8 w-8 text-blue-600" />,
    title: "Browse Products",
  },
  {
    icon: <Search className="h-8 w-8 text-red-600" />,
    title: "Detect Diseases",
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-purple-600" />,
    title: "Fertilizer Guide",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="bg-white min-h-screen py-20 px-6 md:px-20">
        <h1 className="text-4xl font-bold text-center text-tertiary mb-12">
          What You Can Do with Smart Farming
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
