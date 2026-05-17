import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  open = true,
}) => {
  const isDestructive = title?.toLowerCase().includes("cancel") || title?.toLowerCase().includes("delete");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-sm px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bento-tile w-full max-w-md p-6 md:p-7"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-10 w-10 rounded-2xl grid place-items-center ${isDestructive ? "bg-accent2 text-accent2-ink" : "bg-accent text-accent-ink"}`}>
                <AlertTriangle size={18} />
              </div>
              <button
                onClick={onCancel}
                className="h-9 w-9 rounded-full grid place-items-center hover:bg-elevated text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <h2 className="font-display text-2xl leading-tight text-ink">{title}</h2>
            {message && <p className="mt-2 text-sm text-muted">{message}</p>}
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink hover:bg-elevated"
              >
                {cancelText}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                  isDestructive ? "bg-accent2 text-accent2-ink" : "bg-ink text-canvas"
                }`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
