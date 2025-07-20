import React from "react";
import { Link } from "react-router";

const FeaturesCard = ({ title, image, path }) => {
  return (
    <Link
      to={path}
      className="bg-secondary px-3 py-8 flex flex-col items-center rounded-xl hover:-translate-y-1 ease-in duration-200 w-full max-w-xs hover:bg-tertiary hover:text-white gap-4 shadow-md"
    >
      <img src={image} alt={title} className="w-10 h-10" />
      <h3 className="font-paragraph font-bold text-lg text-center">{title}</h3>
    </Link>
  );
};

export default FeaturesCard;
