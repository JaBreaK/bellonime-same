export default function GenreScrollerSkeleton() {
  // Buat array placeholder, misal 10 item
  const skeletonItems = Array.from({ length: 20 });

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-3 animate-pulse">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-2 h-[40px] w-[100px] bg-gray-700/50 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}