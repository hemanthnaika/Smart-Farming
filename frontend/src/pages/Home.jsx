import React from "react";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { Category, Features } from "../constants";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CardSkeleton from "./../components/CardSkeleton";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const Home = () => {
  const { data: products, isLoading, isError } = useProducts();

  useGSAP(() => {
    const split = new SplitText(".title", { type: "words" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".title",
        start: "start center",
      },
    });

    tl.from(split.words, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.03,
    });

    tl.from(
      ".cards",
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    );
  }, []);

  return (
    <div className="mb-10">
      <Hero />
      <Layout>
        {/* Title */}
        <h1 className="title">What Would You Like to Do Today, Farmer?</h1>

        {/* Features */}
        <div
          className="top-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4 md:scroll-mt-40 scroll-mt-52 cards"
          id="features"
        >
          {Features.map((feature) => (
            <Card {...feature} />
          ))}
        </div>

        {/* Category Section */}
        <h1 className="title ">Explore by Category</h1>
        <div className="bottom-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 cards">
          {Category.map((feature) => (
            <Card {...feature} />
          ))}
        </div>

        {/* Products Section */}
        <h1 className="title">Latest Products from Farmers</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:gap-6 gap-3 mt-10 px-4 cards">
          {isLoading && Array.from({ length: 4 }).map((_, i) =>  <CardSkeleton product={i} />)}
          {isError && <p>Failed to fetch products</p>}
          {products?.products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
