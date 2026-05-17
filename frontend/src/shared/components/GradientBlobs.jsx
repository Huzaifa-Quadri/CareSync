const GradientBlobs = ({ density = "normal" }) => {
  const blobs =
    density === "dense"
      ? [
          { cls: "bg-accent", top: "-10%", left: "-5%", size: 520, delay: "0s" },
          { cls: "bg-accent2", top: "30%", right: "-10%", size: 460, delay: "5s" },
          { cls: "bg-accent3", bottom: "-10%", left: "20%", size: 540, delay: "10s" },
        ]
      : [
          { cls: "bg-accent", top: "-10%", left: "-5%", size: 500, delay: "0s" },
          { cls: "bg-accent3", bottom: "-15%", right: "-5%", size: 440, delay: "8s" },
        ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${b.cls} opacity-20 blur-3xl animate-blob`}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
};

export default GradientBlobs;
