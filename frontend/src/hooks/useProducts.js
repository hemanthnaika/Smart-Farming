// hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/all-products`
  ); // Adjust if you use a different baseURL
  return data;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
