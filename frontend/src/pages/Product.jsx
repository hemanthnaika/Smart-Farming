import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const Product = () => {
  return (
    <Layout>
      <div className="py-20 px-4 max-w-7xl mx-auto">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 bg-secondary rounded-lg px-5 py-10">
          {/* Product Image */}
          <div className="w-full h-[400px]  rounded-lg overflow-hidden">
            <img
              src="https://source.washu.edu/app/uploads/2015/11/Tomato250.jpg"
              alt="Product"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">
              Fresh Organic Tomatoes
            </h2>

            <p className="text-gray-600 text-lg mb-1">
              <span className="line-through text-red-400 mr-2">₹30/kg</span>
              <span className=" font-semibold">₹25/kg</span>
            </p>

            <p className="text-gray-700 mb-4">
              Grown without pesticides in the rich soil of Tamil Nadu farms.
              Perfect for salads, cooking, and juicing.
            </p>

            {/* Farmer Info */}
            <div className="mb-2 space-y-2">
              <p>
                <span className="font-semibold text-gray-700">Farmer:</span>{" "}
                Kumar Organic Farms
              </p>
              <p>
                <span className="font-semibold text-gray-700">Contact:</span>{" "}
                <a href="tel:+919876543210" className=" hover:underline">
                  +91 9876543210
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-700">From:</span> Erode
                District
              </p>
              <p>
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-5">
          <h3 className="text-2xl font-bold font-heading mb-6">
            Related Products
          </h3>
          <div className="grid grid-cols-2  md:grid-cols-5 gap-2 md:gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
