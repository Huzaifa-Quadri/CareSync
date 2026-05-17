import { motion } from "framer-motion";
import { pageTransition } from "@shared/lib/motion";

const PageTransition = ({ children, className = "" }) => (
  <motion.div
    initial={pageTransition.initial}
    animate={pageTransition.animate}
    exit={pageTransition.exit}
    className={className}
  >
    {children}
  </motion.div>
);

export default PageTransition;
