import React from "react";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { Category, Features } from "../constants";
import Card from "../components/Card";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <Layout>
        <h1 className="title">What Would You Like to Do Today, Farmer?</h1>
        {/* Features */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10 px-4 md:scroll-mt-40 scroll-mt-52"
          id="features"
        >
          {Features.map((feature) => (
            <Card key={feature.title} {...feature} />
          ))}
        </div>
        {/* <Banner/> */}
        <h1 className="title">Explore by Category</h1>
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-6 mt-10 px-4">
          {Category.map((feature) => (
            <Card key={feature.title} {...feature} />
          ))}
        </div>
        <h1 className="title">Latest Products from Farmers</h1>
        <div className="grid grid-cols-2  lg:grid-cols-5 md:gap-6 gap-3 mt-10 px-4">
          {Category.map((feature) => (
            <ProductCard key={feature.title} {...feature} />
          ))}
        </div>
      </Layout>

      <div className="mb-10">l</div>
    </div>
  );
};

export default Home;
