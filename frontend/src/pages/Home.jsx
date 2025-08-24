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
import { Link } from "react-router";

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
          className=" md:scroll-mt-40 scroll-mt-60 cards flex justify-center items-center gap-15 my-10 flex-wrap"
          id="features"
        >
          {Features.map((feature) => (
            <Link
              to={feature.path}
              className="hover:bg-tertiary px-1 md:hover:px-15 hover:px-1 md:hover:py-5  py-10  hover:rounded-full hover:text-white transition-all duration-300 ease-in "
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-36 h-36  "
              />
              <h3 className="font-paragraph font-bold text-lg text-center">
                {feature.title}
              </h3>
            </Link>
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
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton product={i} />
            ))}
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
