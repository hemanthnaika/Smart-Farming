import { Link, useParams } from "react-router";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/CardSkeleton";
import ProductDetailsSkeleton from "../components/DetailsSkeleton";

const fetchProductDetails = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/all-products/${id}`
  );
  return data;
};

const fetchRelatedProducts = async ({ category, excludeId }) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/products-by-category?category=${category}`
  );
  return data.products.filter((prod) => prod.id !== excludeId);
};

const Product = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id,
  });

  const product = data?.product;

  const { data: relatedProducts = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: () =>
      fetchRelatedProducts({
        category: product?.category,
        excludeId: product?.id,
      }),
    enabled: !!product?.category,
  });

  if (isLoading) {
    return (
      <Layout>
        <ProductDetailsSkeleton />
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

  return (
    <Layout>
      <>
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-500 font-medium mt-15 mb-5">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category}
          </Link>
          <span>{">"}</span>
          <p className="text-indigo-500">{product.name}</p>
        </div>

        {/* Product Details */}
        <div className="px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 bg-secondary rounded-lg px-5 py-10">
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-lg mb-1">
                <span className="line-through text-red-400 mr-2">
                  ₹{(product.price + 5).toFixed(2)}/kg
                </span>
                <span className="font-semibold">
                  ₹{product.price}/{product.unit}
                </span>
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="mb-2 space-y-2">
                <p>
                  <span className="font-semibold">Farmer:</span>{" "}
                  {product.user.name}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  <a
                    href={`tel:${product.contact}`}
                    className="hover:underline"
                  >
                    {product.contact}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {product.user.email}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {product.location}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-5 mb-10">
            <h3 className="text-2xl font-bold mb-6">Related Products</h3>
            {relatedLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            ) : relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Product;
