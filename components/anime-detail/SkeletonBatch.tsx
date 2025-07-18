export default function SkeletonBatch() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-5 w-36 bg-gray-500/30 rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array(1).fill(0).map((_, i) => (
          <div key={i} className="h-10 bg-gray-600/30 rounded" />
        ))}
      </div>
    </div>
  );
}
