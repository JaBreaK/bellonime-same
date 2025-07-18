export default function SkeletonSynopsis() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-5 w-24 bg-gray-500/30 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-600/30 rounded" />
        <div className="h-4 w-5/6 bg-gray-600/30 rounded" />
        <div className="h-4 w-2/3 bg-gray-600/30 rounded" />
      </div>
    </div>
  );
}
