import React from "react";
import { logo } from "../assets/images";

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-800 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-auto h-20" />
          <div>
            {" "}
            <h2 className="text-2xl font-bold text-black">Smart Framing</h2>
            <p className="mt-2 text-sm text-gray-700">
              Connecting Farmers to Smart Solutions
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="font-paragraph font-bold tracking-wide text-xl">
          <h3 className="font-semibold mb-3 text-black">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/sell-product" className="hover:underline">
                Sell Product
              </a>
            </li>
            <li>
              <a href="/browse-products" className="hover:underline">
                Browse Products
              </a>
            </li>
            <li>
              <a href="/detect-disease" className="hover:underline">
                Detect Disease
              </a>
            </li>
            <li>
              <a href="/fertilizer-guide" className="hover:underline">
                Fertilizer Guide
              </a>
            </li>
            <li>
              <a href="/market-prices" className="hover:underline">
                Market Prices
              </a>
            </li>
          </ul>
        </div>

        {/* Support & Info */}
        <div className="font-paragraph font-bold tracking-wide text-2xl">
          <h3 className="font-semibold mb-3 text-black">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="font-paragraph">
          <h3 className="font-semibold mb-3 text-black">Follow Us</h3>
          <div className="flex space-x-4 text-gray-800">
            <a href="#" className="hover:text-gray-600">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-600">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-600">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-600">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-sm text-gray-600 font-heading tracking-wide">
        © 2025 Smart Framing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
