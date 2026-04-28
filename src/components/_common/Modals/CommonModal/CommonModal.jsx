import React from 'react';
import { useLocation, useParams } from 'react-router';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseSvg from '../../../svg/CloseSvg';
import useScroll from '../../../hooks/useScroll';

export default function AuthModal({ isOpen, onClose, children }) {
    const { lang } = useParams();
    const { pathname } = useLocation();
    const isMain = pathname === `/${lang}`;

    useScroll(isOpen);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="common__modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className='modal__main'
                        initial={{ scale: 0.95, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className='modal__close__bar'>
                            <button className='modal__close__bar__button' onClick={onClose}>
                                <span className='container'>
                                    <CloseSvg />
                                </span>
                            </button>
                        </div>

                        <div className='content'>
                            {children}
                        </div>

                    </motion.div>
                </motion.div>

            )}
        </AnimatePresence>
        , document.getElementById('modal-root'))
}
