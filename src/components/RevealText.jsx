import { motion } from "framer-motion";

// Letters rise out of a mask, one after another. Screen readers get the
// plain text through the parent's aria-label.
export default function RevealText({ text, delay = 0, className = "" }) {
  return (
    <span className={`reveal-word ${className}`} aria-hidden="true">
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          className="reveal-char"
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ delay: delay + i * 0.04, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
