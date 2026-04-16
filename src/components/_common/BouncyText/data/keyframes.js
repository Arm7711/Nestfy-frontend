export const KEYFRAMES = {
    wave: [
      { transform: "translateY(0) scaleY(1)", offset: 0 },
      { transform: "translateY(var(--lift)) scaleY(0.92)", offset: 0.4 },
      { transform: "translateY(calc(var(--lift) * 0.4)) scaleY(1.05)", offset: 0.6 },
      { transform: "translateY(0) scaleY(1)", offset: 1 },
    ],
    bounce: [
      { transform: "translateY(0)", offset: 0 },
      { transform: "translateY(var(--lift))", offset: 0.5 },
      { transform: "translateY(0)", offset: 1 },
    ],
    jelly: [
      { transform: "translateY(0) scaleX(1) scaleY(1)", offset: 0 },
      { transform: "translateY(var(--lift)) scaleX(1.2) scaleY(0.8)", offset: 0.3 },
      { transform: "translateY(calc(var(--lift) * 0.3)) scaleX(0.85) scaleY(1.1)", offset: 0.6 },
      { transform: "translateY(0) scaleX(1) scaleY(1)", offset: 1 },
    ],
    flip: [
      { transform: "translateY(0) rotateX(0deg)", offset: 0 },
      { transform: "translateY(var(--lift)) rotateX(180deg)", offset: 0.5 },
      { transform: "translateY(0) rotateX(360deg)", offset: 1 },
    ],
    rubber: [
      { transform: "translateY(0) scaleX(1) scaleY(1)", offset: 0 },
      { transform: "translateY(calc(var(--lift) * 1.3)) scaleX(0.7) scaleY(1.3)", offset: 0.2 },
      { transform: "translateY(0) scaleX(1.3) scaleY(0.7)", offset: 0.5 },
      { transform: "translateY(calc(var(--lift) * -0.15)) scaleX(1) scaleY(1)", offset: 0.8 },
      { transform: "translateY(0) scaleX(1) scaleY(1)", offset: 1 },
    ],
  };