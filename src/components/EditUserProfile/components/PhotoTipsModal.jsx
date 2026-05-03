import { motion } from 'framer-motion'
import { cardVariants, overlayVariants, tips } from '../../../data/modals/photoChangeData';

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