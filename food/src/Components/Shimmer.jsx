const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {Array(10).fill("").map((_, index) => (
        <div
          key={index}
          className="w-64 h-64 bg-gray-200 animate-pulse rounded-xl shadow-md"
        >
          {/* Optional: Simulate image and text */}
          <div className="h-40 bg-gray-300 rounded-t-xl"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
