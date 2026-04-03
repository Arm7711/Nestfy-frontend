import { useLayoutEffect } from 'react';

let lockCount = 0;
let scrollY = 0;

export default function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return;

    lockCount++;

    if (lockCount === 1) {
      scrollY = window.scrollY;
      const scrollBarCompensation =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollBarCompensation}px`;
    }

    return () => {
      lockCount--;

      if (lockCount === 0) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';

        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollY);
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, [active]);
}