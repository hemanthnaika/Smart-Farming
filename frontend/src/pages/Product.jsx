import { useParams } from "react-router";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProductDetails = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/all-products/${id}`
  );
  return data;
};

const Product = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id, // Ensures query only runs if `id` exists
  });
  console.log(data, isLoading, isError, error);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 text-center text-xl font-medium">Loading...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="py-20 text-center text-red-600 text-lg">
          Error: {error.message}
        </div>
      </Layout>
    );
  }

  const product = data?.product;

  return (
    <Layout>
      {product ? (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 bg-secondary rounded-lg px-5 py-10">
            {/* Product Image */}
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">
                {product.name}
              </h2>

              <p className="text-gray-600 text-lg mb-1">
                <span className="line-through text-red-400 mr-2">
                  ₹{(product.price + 5).toFixed(2)}/kg
                </span>
                <span className=" font-semibold">₹{product.price}/kg</span>
              </p>

              <p className="text-gray-700 mb-4">{product.description}</p>

              {/* Farmer Info */}
              <div className="mb-2 space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">Farmer:</span>{" "}
                  {product.user.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Contact:</span>{" "}
                  <a
                    href={`tel:${product.contact}`}
                    className="hover:underline"
                  >
                    {product.contact}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {product.user.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  {product.location}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products (static for now) */}
          <div className="mt-5">
            <h3 className="text-2xl font-bold font-heading mb-6">
              Related Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default Product;
