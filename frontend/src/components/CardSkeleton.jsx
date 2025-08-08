const CardSkeleton = () => {
  return (
    <div className="bg-secondary px-3 py-8 flex flex-col items-center rounded-xl w-full max-w-xs gap-4 shadow-md animate-pulse">
      <div className="w-10 h-10 bg-gray-300 rounded-full" />
      <div className="h-4 w-3/4 bg-gray-300 rounded" />
    </div>
  );
};

export default CardSkeleton;
