import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Api from '../../../../api/Api';
import useScroll from '../../../../hooks/useScroll';

import CloseSvg from '../../../svg/CloseSvg';

import Button from '../../Button/Button';
import ImageSkeleton from '../../Skeletions/ImageSkeletion';

export default function AuthModal({ isOpen, onClose, children }) {
    const { lang } = useParams();
    useScroll(isOpen);
    const userData = JSON.parse(localStorage.getItem("userData") || null);
    const userDataInfo = JSON.parse(localStorage.getItem("userDataInfo") || null);


    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="user__card__modal"
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
                        className={classNames('user__card__modal__main')}
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

                        <div className='container__card'>
                            <div className='user__card__front'>
                                <div className='about__me__user'>
                                    {userData?.avatar ? (
                                        <ImageSkeleton
                                            src={userData?.avatar}
                                            figureClass={'user__me__figure'}
                                            imgClass={'user__img__me'}
                                            rounded='full'
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <p className='user'>{userData?.name[0]}</p>
                                    )}
                                </div>

                                <p className='user__name'>{userDataInfo?.fullName || userDataInfo?.preferredFirstName || userData?.name}</p>
                                <p className='status'>Guest</p>
                            </div>

                            <div className='user__card__back'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas necessitatibus cumque provident, rem accusantium unde delectus vitae architecto odit consequuntur explicabo quisquam magnam. Ratione aut voluptas ut. Doloremque, modi quae?
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        , document.getElementById('modal-root'))
}
