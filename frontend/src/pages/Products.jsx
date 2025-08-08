import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import { ProductHero } from "../assets/images";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router";
import CardSkeleton from "./../components/CardSkeleton";

const fetchProducts = async ({ queryKey }) => {
  const [_key, category] = queryKey;
  const url = category
    ? `${
        import.meta.env.VITE_BASE_URL
      }/products-by-category?category=${category}`
    : `${import.meta.env.VITE_BASE_URL}/all-products`;
  const { data } = await axios.get(url);
  return data.products;
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [filter, setFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [dynamicMax, setDynamicMax] = useState(500);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: fetchProducts,
    select: (data) => (Array.isArray(data) ? data : []),
  });

  useEffect(() => {
    if (products.length > 0) {
      const highest = Math.max(...products.map((p) => p.price));
      setDynamicMax(highest);
      setMaxPrice(highest);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchesMin = product.price >= Number(minPrice);
      const matchesMax = product.price <= Number(maxPrice);
      return matchesName && matchesMin && matchesMax;
    });
  }, [products, filter, minPrice, maxPrice]);

  return (
    <Layout>
      <div className="py-20">
        <div className="relative text-center mb-10 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ProductHero})` }}
          />
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative z-10 py-16 px-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              {category ? `Browse ${category}` : "Browse Products"}
            </h1>
            <p className="text-white mt-2 drop-shadow-md">
              Explore fresh and organic produce directly from farmers.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4 px-4">
          <input
            type="text"
            placeholder="Search by product name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border rounded shadow-sm"
          />

          <div className="w-full sm:w-1/4">
            <label className="block text-sm text-gray-600 mb-1">
              Min Price: ₹{minPrice}
            </label>
            <input
              type="range"
              min={0}
              max={dynamicMax}
              step={1}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full sm:w-1/4">
            <label className="block text-sm text-gray-600 mb-1">
              Max Price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min={0}
              max={dynamicMax}
              step={1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6 px-4">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton product={i} />
            ))}
          {isError && <p>Error loading products.</p>}
          {!isLoading && filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No products match your search.
            </p>
          )}
          {!isLoading &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
