'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    /* ── Navbar scroll state ── */
    const nav = document.getElementById('nav');
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 40) {
        nav.classList.remove('at-top');
        nav.classList.add('scrolled');
      } else {
        nav.classList.add('at-top');
        nav.classList.remove('scrolled');
      }
    };

    /* ── Scroll reveal ── */
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

    /* ── Counter animations ── */
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && el.dataset.t) {
            const target   = parseInt(el.dataset.t, 10);
            const suffix   = el.dataset.s || '';
            const duration = 1800;
            const start    = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased    = 1 - Math.pow(1 - progress, 4);
              const value    = Math.floor(eased * target);
              el.textContent = target >= 1000
                ? `${value.toLocaleString()}${suffix}`
                : `${value}${suffix}`;
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-n[data-t]').forEach((el) => counterObs.observe(el));

    /* ── Hero parallax (eco diagram) — smoothed ── */
    const eco = document.getElementById('heroEco');
    let targetRx = 0, targetRy = 0, currentRx = 0, currentRy = 0;
    let rafParallax: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animateParallax = () => {
      currentRx = lerp(currentRx, targetRx, 0.08);
      currentRy = lerp(currentRy, targetRy, 0.08);
      if (eco) eco.style.transform = `perspective(1000px) rotateY(${currentRx}deg) rotateX(${-currentRy}deg)`;
      rafParallax = requestAnimationFrame(animateParallax);
    };
    rafParallax = requestAnimationFrame(animateParallax);

    const onMove = (e: MouseEvent) => {
      targetRx = (e.clientX / window.innerWidth  - 0.5) * 7;
      targetRy = (e.clientY / window.innerHeight - 0.5) * 5;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', onMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafParallax);
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return null;
}
