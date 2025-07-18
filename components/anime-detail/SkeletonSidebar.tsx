export default function SkeletonSidebar() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="aspect-[2/3] bg-gray-600/30 rounded" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-500/30 rounded" />
        ))}
      </div>
    </div>
  );
}
