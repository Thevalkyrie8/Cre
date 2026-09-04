import { useEffect } from 'react';

const useMasterInteractions = (scopeKey) => {
  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    const titleItems = [...document.querySelectorAll('[data-title-reveal]')];
    let revealObserver;
    let contentObserver;
    const registeredReveals = new WeakSet();
    const registeredTitles = new WeakSet();

    const registerTitle = (element, index = 0) => {
      if (registeredTitles.has(element)) return;
      registeredTitles.add(element);
      element.style.setProperty('--title-delay', `${index * 80}ms`);
      requestAnimationFrame(() => element.classList.add('master-title-ready'));
    };

    const registerReveal = (element, index = 0) => {
      if (registeredReveals.has(element)) return;
      registeredReveals.add(element);
      element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 260)}ms`);
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('master-reveal-ready');
    };

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('master-reveal-ready');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    }

    titleItems.forEach(registerTitle);
    revealItems.forEach(registerReveal);

    contentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches?.('[data-title-reveal]')) registerTitle(node);
        if (node.matches?.('[data-reveal]')) registerReveal(node);
        node.querySelectorAll?.('[data-title-reveal]').forEach(registerTitle);
        node.querySelectorAll?.('[data-reveal]').forEach(registerReveal);
      }));
    });
    contentObserver.observe(document.body, { childList: true, subtree: true });

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const target = event.target.closest?.('[data-magnetic]');
      if (!target || target.disabled) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--magnetic-x', `${(event.clientX - rect.left - rect.width / 2) * 0.16}px`);
      target.style.setProperty('--magnetic-y', `${(event.clientY - rect.top - rect.height / 2) * 0.16}px`);
    };

    const handlePointerOut = (event) => {
      const target = event.target.closest?.('[data-magnetic]');
      if (!target || target.contains(event.relatedTarget)) return;
      target.style.setProperty('--magnetic-x', '0px');
      target.style.setProperty('--magnetic-y', '0px');
    };

    const handleRipple = (event) => {
      const target = event.target.closest?.('[data-ripple]');
      if (!target || target.disabled) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'master-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 680);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.addEventListener('click', handleRipple);

    return () => {
      revealObserver?.disconnect();
      contentObserver?.disconnect();
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('click', handleRipple);
    };
  }, [scopeKey]);
};

export default useMasterInteractions;
