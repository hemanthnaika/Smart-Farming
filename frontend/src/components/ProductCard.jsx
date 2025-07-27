import { Link } from "react-router";

export default function ProductCard({ product }) {
  if (!product) return null; // Prevent crash if product is undefined

  const imageUrl = product.image
    ? `http://localhost:5000/${product.image.replace("\\", "/")}`
    : "https://source.washu.edu/app/uploads/2015/11/Tomato250.jpg";

  return (
    <div className="flex flex-col bg-white shadow-md w-full max-w-xs font-[Poppins] rounded overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer">
      <img
        className="w-full h-48 object-contain"
        src={imageUrl}
        alt={product.name || "Product"}
      />
      <div className="p-4 text-sm font-semibold">
        <div className="flex justify-between flex-col md:flex-row">
          <p className="text-slate-600 text-md md:text-lg line-through">
            ₹ {product.price + 10} / kg
          </p>
          <p className="text-slate-600 text-lg md:text-xl">
            ₹ {product.price} / kg
          </p>
        </div>
        <p className="text-slate-800 text-base font-medium my-1.5">
          {product.name}
        </p>
        <p className="text-slate-500">
          Seller: {product.user?.name || "Unknown"}
        </p>
        <p className="text-slate-500">Location: {product.location}</p>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link
            to={`/products/${product.id}`}
            className="bg-slate-100 text-slate-600 py-2 rounded text-center"
          >
            View
          </Link>
          <button className="bg-slate-800 text-white py-2 rounded">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
