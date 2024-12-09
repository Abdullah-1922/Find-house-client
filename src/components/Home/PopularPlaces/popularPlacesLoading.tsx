const PopularPlacesLoading = () => {
  return (
    <div className="relative h-[200px] rounded-lg overflow-hidden">
      {/* Featured badge skeleton */}

      <div className="absolute top-2 left-2 w-16 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />

      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse" />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
        {/* City name skeleton */}
        <div className="h-8 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse" />

        {/* Properties count skeleton */}
        <div className="h-4 w-1/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-1 animate-pulse" />

        {/* Date skeleton */}
        <div className="h-4 w-1/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default PopularPlacesLoading;
