const SkeletonTile = ({ className = "", lines = 0 }) => (
  <div className={`bento-tile p-5 ${className}`}>
    <div className="h-6 w-1/3 rounded-full skeleton-shimmer" />
    {lines > 0 && (
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-full skeleton-shimmer"
            style={{ width: `${80 - i * 12}%` }}
          />
        ))}
      </div>
    )}
  </div>
);

export default SkeletonTile;
