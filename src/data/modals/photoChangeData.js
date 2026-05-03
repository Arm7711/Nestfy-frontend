export const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
}

export const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 380, damping: 28 }
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: 12,
        transition: { duration: 0.15 }
    }
}

export const tips = [
    'Your face is well lit, not blurry and fills the frame.',
    "You're facing forward and are the only person in your photo.",
    "Your photo doesn't feature animals or landscapes instead of you."
];

export const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
}

export const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28, delay: 0.05 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.18 } }
}

export const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.15, duration: 0.3 }
    }
}