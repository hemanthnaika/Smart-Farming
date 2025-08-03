import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { LoginImage } from "../assets/images";
import toast from "react-hot-toast";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
const getMyProducts = async (token) => {
  const res = await axios(`${import.meta.env.VITE_BASE_URL}/my-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.products;
};
const deleteProduct = async ({ productId, token }) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/delete-product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const UserProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-products"],
    queryFn: () => getMyProducts(token),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      // Refetch products after deletion
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
    },
    onError: (err) => {
      toast.error(
        "Delete failed: " + err?.response?.data?.error || "Something went wrong"
      );
    },
  });

  const handleDelete = (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      mutation.mutate({ productId, token });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to view your profile");
    }
  }, [token]);

  if (!token) {
    return (
      <Layout>
        <div className="min-h-[60dvh] flex flex-col items-center justify-center p-6 pt-15">
          <img
            src={LoginImage}
            alt="Login"
            className="h-60 object-contain mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Please login to view your profile
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-15">
        <h2 className="text-3xl font-heading mb-6">My Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-2">User Info</h3>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
        <h3 className="text-xl font-semibold mb-4">My Products</h3>
        {isLoading && <p>Loading products...</p>}
        {isError && <p className="text-red-500">Failed to fetch products.</p>}
        {data?.length === 0 && (
          <p className="text-gray-500">You have not added any products yet.</p>
        )}
        {data?.length > 0 && (
          <table className="bg-secondary rounded-md md:w-full">
            <thead className="text-gray-900 text-sm md:text-base  text-left ">
              <tr>
                <th className="md:px-4 py-3 font-bold truncate md:pl-10 pl-5">
                  Product
                </th>
                <th className="md:px-4 py-3 font-bold truncate">Category</th>
                <th className="md:px-4 py-3 font-bold truncate">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-bold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base   ">
              {data?.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-10 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={`http://localhost:5000/${product.image.replace(
                          "\\",
                          "/"
                        )}`}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="md:px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">₹{product.price}</td>

                  {/* New Action buttons */}
                  <td className="flex md:flex-row flex-col gap-5 pb-5 pr-5">
                    <Link
                      to={`/update-product/${product.id}`}
                      className="flex items-center space-x-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm shadow-sm transition"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center space-x-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm shadow-sm transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
