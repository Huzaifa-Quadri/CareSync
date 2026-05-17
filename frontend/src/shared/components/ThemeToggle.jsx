import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useTheme } from "@shared/context/theme.context";

const ThemeToggle = () => {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-sm text-ink hover:border-accent"
        aria-label="Switch theme"
      >
        <Palette size={16} />
        <span className="hidden md:inline font-mono uppercase tracking-wider text-xs">{theme}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-64 rounded-3xl border border-line bg-surface p-2 shadow-2xl"
          >
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted">
              / / / Themes
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-elevated ${
                  theme === t.id ? "bg-elevated" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {t.swatches.map((sw, i) => (
                      <span
                        key={i}
                        className="h-4 w-4 rounded-full -ml-1 first:ml-0 ring-2 ring-surface"
                        style={{ background: sw }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{t.label}</div>
                    <div className="text-xs text-muted">{t.description}</div>
                  </div>
                </div>
                {theme === t.id && <Check size={16} className="text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
