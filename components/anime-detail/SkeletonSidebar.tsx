export default function SkeletonSidebar() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="aspect-[2/3]  rounded" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-full  rounded" />
        ))}
      </div>
    </div>
  );
}
