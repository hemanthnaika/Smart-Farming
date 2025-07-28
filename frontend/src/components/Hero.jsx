import React from "react";
import { Link } from "react-router";
import { hero } from "../assets/images";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${hero})`, // replace with your image path
      }}
    >
      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center   px-4 top-36">
        <h1 className="text-4xl md:text-4xl font-heading text-center  leading-tight">
          Empowering Farmers with <br className="hidden sm:block" />
          <span className="text-accent">Smart Technology</span>
        </h1>
        <p className="mt-4 text-lg md:text-md font-paragraph text-center max-w-xl ">
          Sell your crops, detect plant diseases, and get fertilizer advice —
          all in one place.
        </p>
        <Link
          to="/register"
          className="bg-tertiary hover:bg-accent text-white py-3 px-10 rounded-md mt-8 transition duration-300 ease-in-out font-heading"
        >
          Get Started
        </Link>
        <button
          onClick={scrollToNextSection}
          className="mt-10 animate-bounce text-black cursor-pointer"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
