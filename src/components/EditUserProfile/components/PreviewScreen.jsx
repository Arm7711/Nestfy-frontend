import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhotoTipsModal from './PhotoTipsModal'
import ReviewWarning from './ReviewWarning'

function PreviewScreen({ imageSrc, onClose, onEdit, onChooseNew, onUse }) {
    const [showTips, setShowTips] = useState(false)

    return (
        <div className="preview-screen">
            {/* Header */}
            <div className="preview-screen__header">
                <button className="preview-screen__icon-btn" onClick={onClose} aria-label="Close">
                    ×
                </button>
                <span className="preview-screen__title">Preview</span>
                <button
                    className="preview-screen__tips-btn"
                    onClick={() => setShowTips(true)}
                >
                    Tips
                </button>
            </div>

            {/* Photo preview area */}
            <div className="preview-screen__photo-area">
                <div className="preview-screen__circle">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Profile preview" />
                    ) : (
                        <div className="preview-screen__placeholder" />
                    )}
                </div>
            </div>

            {/* Review warning */}
            <div className="preview-screen__warning-wrap">
                <ReviewWarning onChooseNew={onChooseNew} />
            </div>

            {/* Footer */}
            <div className="preview-screen__footer">
                <button className="preview-screen__edit-btn" onClick={onEdit}>
                    Edit photo
                </button>
                <button className="preview-screen__use-btn" onClick={onUse}>
                    Use this photo
                </button>
            </div>

            {/* Tips overlay */}
            <AnimatePresence>
                {showTips && (
                    <PhotoTipsModal onClose={() => setShowTips(false)} />
                )}
            </AnimatePresence>
        </div>
    )
}

export default PreviewScreen