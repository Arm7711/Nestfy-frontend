import { motion } from 'framer-motion'

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
}

const cardVariants = {
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

const tips = [
    'Your face is well lit, not blurry and fills the frame.',
    "You're facing forward and are the only person in your photo.",
    "Your photo doesn't feature animals or landscapes instead of you."
]

function PhotoTipsModal({ onClose }) {
    return (
        <motion.div
            className="tips-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                className="tips-card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="tips-card__header">
                    <button className="tips-card__close" onClick={onClose} aria-label="Close tips">
                        ×
                    </button>
                    <span className="tips-card__title">Photo tips</span>
                </div>

                <p className="tips-card__lead">
                    Here are a few things we use to evaluate a good profile photo.{' '}
                    <a className="tips-card__link" href="#">Learn more</a>
                </p>

                <ul className="tips-card__list">
                    {tips.map((tip, i) => (
                        <li key={i} className="tips-card__item">
                            {tip}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    )
}

export default PhotoTipsModal