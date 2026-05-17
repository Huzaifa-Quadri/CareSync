import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AuthContext } from "@features/auth/context/auth.context";
import Reveal from "@shared/components/Reveal";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <Reveal>
      <div className="relative mt-16 md:mt-24 bento-tile bg-ink text-canvas p-8 md:p-14 overflow-hidden">
        {/* Animated gradient sweep background */}
        <div className="absolute inset-0 -z-0 opacity-20 animate-gradient-sweep"
             style={{
               backgroundImage:
                 "linear-gradient(120deg, var(--accent-1), var(--accent-2), var(--accent-3), var(--accent-1))",
             }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">
              / / / Get started
            </p>
            <h3 className="font-display text-4xl md:text-6xl mt-3 leading-[0.95]">
              100+ doctors,<br />
              <span className="text-accent">one click</span> away.
            </h3>
          </div>
          {!token && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-7 py-3.5 font-medium"
            >
              Create account
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.button>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default Banner;
