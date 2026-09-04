import { useEffect, useRef, useState } from 'react';

// Fade + translateY reveal, triggered once when the element enters the viewport.
// No-ops (renders already-visible) if the user prefers reduced motion, or if
// IntersectionObserver isn't available.
export const useRevealOnScroll = ({ rootMargin = '-80px' } = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
};
