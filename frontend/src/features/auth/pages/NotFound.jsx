import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import GradientBlobs from "@shared/components/GradientBlobs";

const NotFound = () => {
  return (
    <div className="relative min-h-screen grid place-items-center px-4 py-12 bg-canvas">
      <GradientBlobs density="dense" />
      <div className="relative text-center max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted"
        >
          / / / Error 404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(7rem,18vw,16rem)] leading-[0.85] tracking-tight"
        >
          <span className="text-ink">4</span>
          <span className="italic text-accent3">0</span>
          <span className="text-ink">4</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="font-display text-3xl md:text-4xl mt-4"
        >
          You took a <span className="italic text-accent3">wrong turn.</span>
        </motion.p>
        <p className="mt-3 text-muted max-w-md mx-auto">
          The page you're looking for moved, vanished, or never existed. Let's get you back.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 font-medium"
          >
            <ArrowLeft size={16} /> Back home
          </Link>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium"
          >
            <Compass size={16} /> Browse doctors
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
