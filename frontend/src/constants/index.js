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
    path: "/about",
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
    path: "/sell",
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
    path: "/sell",
  },
  {
    title: "Vegetables",
    image: Vegetables,
    path: "/sell",
  },
  {
    title: "Fruits",
    image: Fruits,
    path: "/sell",
  },
  {
    title: "Herbs & Spices",
    image: Spices,
    path: "/sell",
  },
  {
    title: "Pulses & Beans",
    image: Beans,
    path: "/sell",
  },
  {
    title: "Dairy Products",
    image: Dairy,
    path: "/sell",
  },
  {
    title: "Livestock             ",
    image: Livestock,
    path: "/sell",
  },
  {
    title: "Others",
    image: Others,
    path: "/sell",
  },
];
