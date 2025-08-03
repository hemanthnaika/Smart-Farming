import {
  Beans,
  Browse,
  Dairy,
  Diseases,
  Fertilizer,
  Fruits,
  Grains,
  Livestock,
  Market,
  Others,
  shop,
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
    image: shop,
    path: "/sell-product",
  },
  {
    title: "Browse Products",
    image: Browse,
    path: "/products",
  },
  {
    title: "Detect Diseases",
    image: Diseases,
    path: "/detect-disease",
  },
  {
    title: "Fertilizer Guide",
    image: Fertilizer,
    path: "/fertilizer-guide",
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
