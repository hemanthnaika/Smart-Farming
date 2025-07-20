import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import { ProductHero } from "../assets/images";

const Products = () => {
  const [filter, setFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <Layout>
      <div className="py-20">
        {/* Header with overlay */}
        <div className="relative text-center mb-10 rounded-lg overflow-hidden ">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${ProductHero})`,
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-25"></div>

          {/* Text Content */}
          <div className="relative z-10 py-16 px-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Browse Products
            </h1>
            <p className="text-white mt-2 drop-shadow-md">
              Explore fresh and organic produce directly from farmers.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search by product name..."
            value={filter}
            onChange={handleFilterChange}
            className="w-full sm:w-1/3 px-4 py-2 border rounded shadow-sm"
          />

          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full sm:w-1/4 px-4 py-2 border rounded shadow-sm"
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full sm:w-1/4 px-4 py-2 border rounded shadow-sm"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6">
          {/* Sample Cards - Replace with dynamic filtered data */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
