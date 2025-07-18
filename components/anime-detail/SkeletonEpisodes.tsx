export default function SkeletonEpisodes() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-5 w-28 bg-gray-500/30 rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-10 bg-gray-600/30 rounded" />
        ))}
      </div>
    </div>
  );
}
