import { motion } from "framer-motion";
import { bentoTileEnter, staggerContainer } from "@shared/lib/motion";

const sizeMap = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "md:col-span-2 row-span-1",
  "1x2": "col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
  "3x1": "md:col-span-3 row-span-1",
  "3x2": "md:col-span-3 md:row-span-2",
  "4x1": "md:col-span-4 row-span-1",
  full: "col-span-full",
};

const accentMap = {
  surface: "bg-surface text-ink",
  elevated: "bg-elevated text-ink",
  accent: "bg-accent text-accent-ink",
  accent2: "bg-accent2 text-accent2-ink",
  accent3: "bg-accent3 text-accent3-ink",
  ink: "bg-ink text-canvas",
  outline: "bg-transparent text-ink border-2 border-line",
};

const Grid = ({ children, className = "", cols = 4, gap = "md", ...rest }) => {
  const gapClass = { sm: "gap-3", md: "gap-4 md:gap-5", lg: "gap-5 md:gap-6" }[gap] || "gap-4";
  const colClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  }[cols] || "grid-cols-1 md:grid-cols-4";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`grid auto-rows-[minmax(140px,auto)] ${colClass} ${gapClass} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const Tile = ({
  children,
  size = "1x1",
  accent = "surface",
  className = "",
  interactive = false,
  glow = false,
  ...rest
}) => {
  const sizeCls = sizeMap[size] || sizeMap["1x1"];
  const accentCls = accentMap[accent] || accentMap.surface;
  const glowCls = glow ? `glow-${accent === "accent2" ? "accent2" : accent === "accent3" ? "accent3" : "accent"}` : "";

  return (
    <motion.div
      variants={bentoTileEnter}
      whileHover={interactive ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } } : undefined}
      className={`bento-tile ${accentCls} ${sizeCls} ${glowCls} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const Bento = { Grid, Tile };
