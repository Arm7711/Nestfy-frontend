import { useEffect, useRef, useCallback, forwardRef } from "react";
import { KEYFRAMES } from "../data/keyframes";

const Letter = forwardRef(function Letter({ char, isActive, color, baseColor, lift, speed, mode, onClickLetter }, forwardedRef) {
  const innerRef = useRef(null);
  const animRef = useRef(null);

  const setRef = useCallback((el) => {
    innerRef.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  }, [forwardedRef]);

  const animate = useCallback(() => {
    const el = innerRef.current;
    if (!el || char === " ") return;
    animRef.current?.cancel();
    const frames = KEYFRAMES[mode] ?? KEYFRAMES.wave;

    const resolved = frames.map((f) => ({
      ...f,
      transform: f.transform
        .replace(/var\(--lift\)/g, `-${lift}px`)
        .replace(/calc\(var\(--lift\) \* ([\d.]+)\)/g, (_, m) => `${-lift * parseFloat(m)}px`)
        .replace(/calc\(var\(--lift\) \* -([\d.]+)\)/g, (_, m) => `${lift * parseFloat(m)}px`),
    }));

    animRef.current = el.animate(resolved, {
      duration: speed,
      easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      fill: "none",
    });
    return animRef.current.finished;
  }, [char, lift, speed, mode]);

  useEffect(() => {
    if (innerRef.current) innerRef.current._bounceAnimate = animate;
  }, [animate]);

  if (char === " ") return <span style={{ display: "inline-block", width: "0.35em" }} />;

  return (
    <span
      ref={setRef}
      onClick={() => {
        animate();
        onClickLetter?.();
      }}
      style={{
        display: "inline-block",
        willChange: "transform",
        cursor: "pointer",
        color: isActive ? color : baseColor,
        transition: `color ${speed * 0.4}ms ease`,
        userSelect: "none",
        lineHeight: 1,
      }}
    >
      {char}
    </span>
  );
});

export default Letter;