import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import PreviewScreen from './PreviewScreen'
import EditPhotoScreen from './EditPhotoScreen'
import useScrollLock from '../../../hooks/useScroll'

import { backdropVariants, modalVariants } from '../../../data/modals/photoChangeData';


function PhotoUploadModal({ imageSrc, fileInputRef, onClose, onConfirm, isOpen }) {
    const [screen, setScreen] = useState('preview')
    const [direction, setDirection] = useState(1)
    const [croppedPreview, setCroppedPreview] = useState(null)
    const [croppedBlob, setCroppedBlob] = useState(null)

    useScrollLock(isOpen);

    const goToEdit = () => { setDirection(1); setScreen('edit') }
    const goToPreview = () => { setDirection(-1); setScreen('preview') }

    const handleChooseNew = () => {
        fileInputRef.current?.click()
        onClose()
    }

    const handleUsePhoto = () => {
        if (croppedBlob) {
            onConfirm(croppedBlob)
        } else {
            fetch(imageSrc)
                .then(r => r.blob())
                .then(blob => onConfirm(blob))
                .catch(() => onConfirm(null))
        }
    }

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 32 } },
        exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.22, ease: 'easeInOut' } })
    }

    return createPortal(
        <motion.div
            className="pum-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                className="pum-container"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="pum-screens">
                    <AnimatePresence mode="wait" custom={direction}>
                        {screen === 'preview' && (
                            <motion.div
                                key="preview"
                                className="pum-screen"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <PreviewScreen
                                    imageSrc={croppedPreview || imageSrc}
                                    onClose={onClose}
                                    onEdit={goToEdit}
                                    onChooseNew={handleChooseNew}
                                    onUse={handleUsePhoto}
                                />
                            </motion.div>
                        )}
                        {screen === 'edit' && (
                            <motion.div
                                key="edit"
                                className="pum-screen"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <EditPhotoScreen
                                    imageSrc={imageSrc}
                                    onCancel={goToPreview}
                                    onDone={({ previewUrl, blob }) => {
                                        setCroppedPreview(previewUrl)
                                        setCroppedBlob(blob)
                                        goToPreview()
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
        , document.getElementById('modal-root'))
}

export default PhotoUploadModal