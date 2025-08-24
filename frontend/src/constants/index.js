import {
  Beans,
  Dairy,
  Fruits,
  Grains,
  Others,
  Spices,
  Vegetables,
} from "../assets/icons";

export const NavbarLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
  {
    name: "Sell Product",
    path: "/sell-Product",
  },
];

export const Features = [
  {
    title: "Sell Product",
    image: "https://agrisens.netlify.app/explore-now/assets/img/prod4.png",
    path: "/sell-product",
  },
  {
    title: "Browse Products",
    image: "https://agrisens.netlify.app/explore-now/assets/img/prod1.png",
    path: "/products",
  },
  {
    title: "Detect Diseases",
    image: "https://agrisens.netlify.app/explore-now/assets/img/prod6.png",
    path: "/detect-disease",
  },
];

export const Category = [
  {
    title: "Grains",
    image: Grains,
    path: "/products?category=Grains",
  },
  {
    title: "Vegetables",
    image: Vegetables,
    path: "/products?category=Vegetables",
  },
  {
    title: "Fruits",
    image: Fruits,
    path: "/products?category=Fruits",
  },
  {
    title: "Herbs & Spices",
    image: Spices,
    path: "/products?category=Herbs & Spices",
  },
  {
    title: "Pulses & Beans",
    image: Beans,
    path: "/products?category=Pulses & Beans",
  },
  {
    title: "Dairy Products",
    image: Dairy,
    path: "/products?category=Dairy Products",
  },

  {
    title: "Others",
    image: Others,
    path: "/products?category=Others",
  },
];
