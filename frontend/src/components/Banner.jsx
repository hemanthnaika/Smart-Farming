import React from "react";
import { Link } from "react-router";
import { logo } from "../assets/images";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-r from-accent to-tertiary text-white rounded-2xl p-10   shadow-lg overflow-hidden">
      {/* Optional background image overlay */}
      <img
        src=""
        alt="Farming Tech"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text */}
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Transform Your Farm with Smart Tools 🌾
          </h2>
          <p className="mt-2 text-lg font-paragraph">
            Get expert fertilizer suggestions, diagnose plant diseases, and sell
            your produce directly from our platform.
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/register"
          className="bg-white text-accent font-heading px-6 py-3 rounded-md text-lg hover:bg-gray-100 transition"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default Banner;
