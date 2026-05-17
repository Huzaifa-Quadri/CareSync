const Marquee = ({ items = [], speed = 40, separator = "·", className = "" }) => {
  const list = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 gap-12 whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-muted font-mono uppercase tracking-widest text-sm">
            {item}
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
