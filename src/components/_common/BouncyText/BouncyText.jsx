// BouncyText.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import Letter from './Letter/Letter';

export default function BouncyText({
    text = "Nestfy",
    color = "#9b75ff",
    baseColor = "#ffffff",
    speed = 500,
    lift = 36,
    delay = 70,
    mode = "wave",
    fontSize = "17px",
    autoPlay = true,
    loop = false,
    loopPause = 1200,
    startAfter = 0,
    onLetterClick,
}) {
    const chars = [...text];
    const letterRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const loopTimer = useRef(null);
    const running = useRef(false);

    const runWave = useCallback(
        async (letters) => {
            if (running.current) return;
            running.current = true;
            const nonSpace = letters.filter((el) => el != null);
            for (let i = 0; i < nonSpace.length; i++) {
                const el = nonSpace[i];
                const charIndex = letterRefs.current.indexOf(el);
                setActiveIndex(charIndex);
                const anim = el._bounceAnimate?.();
                await new Promise((r) => setTimeout(r, delay));
                anim?.then(() => {
                    setActiveIndex((prev) => (prev === charIndex ? null : prev));
                });
            }
            await new Promise((r) => setTimeout(r, speed));
            setActiveIndex(null);
            running.current = false;
        },
        [delay, speed]
    );

    const play = useCallback(() => {
        const els = letterRefs.current.filter(Boolean);
        runWave(els);
    }, [runWave]);

    useEffect(() => {
        if (!autoPlay) return;
        const t = setTimeout(play, 200 + startAfter);
        return () => clearTimeout(t);
    }, [autoPlay, play, startAfter]);

    useEffect(() => {
        if (!loop) return;
        const total = chars.filter((c) => c !== " ").length * delay + speed + loopPause;
        loopTimer.current = setInterval(play, total);
        return () => clearInterval(loopTimer.current);
    }, [loop, play, chars, delay, speed, loopPause]);

    return (
        <span
            className="animation__text"
            style={{
                display: "inline-flex",
                flexWrap: "wrap",
                fontSize,
                fontWeight: 700,
                letterSpacing: "0.02em",
                perspective: "600px",
            }}
        >
            {chars.map((char, i) => (
                <Letter
                    key={i}
                    char={char}
                    isActive={activeIndex === i}
                    color={color}
                    baseColor={baseColor}
                    lift={lift}
                    speed={speed}
                    mode={mode}
                    onClickLetter={() => {
                        setActiveIndex(i);
                        setTimeout(() => setActiveIndex((p) => (p === i ? null : p)), speed);
                        onLetterClick?.(i, char);
                    }}
                    ref={(el) => {
                        if (el) letterRefs.current[i] = el;
                    }}
                />
            ))}
        </span>
    );
}