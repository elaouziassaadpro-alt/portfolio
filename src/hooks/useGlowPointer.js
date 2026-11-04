import { useEffect } from "react";

// Feeds the pointer position to every .glow-card as --mx / --my (relative
// to the card), so borders light up near the cursor, even across cards.
export default function useGlowPointer() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame = null;
    let last = null;
    const update = () => {
      frame = null;
      document.querySelectorAll(".glow-card").forEach((card) => {
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        card.style.setProperty("--mx", `${last.clientX - r.left}px`);
        card.style.setProperty("--my", `${last.clientY - r.top}px`);
      });
    };
    const handleMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
