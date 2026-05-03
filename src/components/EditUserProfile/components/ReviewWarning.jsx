import { motion } from 'framer-motion'

const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.15, duration: 0.3 }
    }
}

function ReviewWarning({ onChooseNew }) {
    return (
        <motion.div
            className="review-warning"
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            <div className="review-warning__body">
                <p className="review-warning__title">Please review this photo</p>
                <p className="review-warning__desc">
                    Check to make sure this photo clearly shows your face.
                </p>
            </div>
            <button className="review-warning__btn" onClick={onChooseNew}>
                Choose new photo
            </button>
        </motion.div>
    )
}

export default ReviewWarning