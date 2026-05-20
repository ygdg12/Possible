import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], .card, .btn-primary, .btn-ghost, .nav-link, .footer-link, .contact-card, .service-cell';

export default function CustomCursor() {
  const rootRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;

      const root = rootRef.current;
      if (root) {
        const dot = root.querySelector(".cursor-dot");
        const ring = root.querySelector(".cursor-ring");
        if (dot) {
          dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        }
        if (ring) {
          ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) setHovering(true);
    };

    const onOut = (e) => {
      const from = e.target.closest(INTERACTIVE);
      const to = e.relatedTarget?.closest?.(INTERACTIVE);
      if (from && from !== to) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  const rootClass = [
    "cursor-root",
    visible && "is-visible",
    hovering && "is-hovering",
    clicking && "is-clicking",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden="true">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </div>
  );
}
