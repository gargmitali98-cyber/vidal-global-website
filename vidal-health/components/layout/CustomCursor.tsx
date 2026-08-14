'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Touch devices have no cursor to replace — bail out before starting the
    // rAF loop rather than running it forever behind an invisible element.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top  = `${my}px`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const animate = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      raf = requestAnimationFrame(animate);
    };

    const onHover = () => {
      dot.style.width  = '14px';
      dot.style.height = '14px';
      ring.style.width  = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(0,112,113,0.60)';
    };

    const onLeave = () => {
      dot.style.width  = '8px';
      dot.style.height = '8px';
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(0,112,113,0.40)';
    };

    const targets = Array.from(
      document.querySelectorAll('button, a, .pcard, .prob-card, .why-card, .fc, .mm-item, .svc-card, .trust-pill')
    );

    document.addEventListener('mousemove', onMove);
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
