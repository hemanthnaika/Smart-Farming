const ProductDetailsSkeleton = () => {
  return (
    <div className="px-4 max-w-7xl mx-aut mt-15">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 bg-secondary rounded-lg px-5 py-10 animate-pulse">
        <div className="w-full h-[400px] bg-gray-300 rounded-lg" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-6 bg-gray-300 rounded w-2/3" />
          <div className="h-5 bg-gray-300 rounded w-1/3" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="space-y-2">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-300 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
