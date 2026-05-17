import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import GradientBlobs from "@shared/components/GradientBlobs";

const NotAuthorized = () => (
  <div className="relative min-h-screen grid place-items-center px-4 py-12 bg-canvas">
    <GradientBlobs />
    <div className="relative bento-tile p-10 max-w-md w-full text-center">
      <div className="h-14 w-14 mx-auto rounded-2xl bg-accent2 text-accent2-ink grid place-items-center">
        <Lock size={22} />
      </div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-display text-6xl mt-6"
      >
        4<span className="italic text-accent3">0</span>3
      </motion.h1>
      <p className="font-display text-2xl mt-2">Access denied.</p>
      <p className="mt-2 text-sm text-muted">
        You don't have permission to view this page. Contact your administrator if you believe this is a mistake.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 font-medium"
      >
        <ArrowLeft size={14} /> Back home
      </Link>
    </div>
  </div>
);

export default NotAuthorized;
