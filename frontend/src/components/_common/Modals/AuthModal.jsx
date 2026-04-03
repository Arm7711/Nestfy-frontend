import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Api from '../../../api/Api';
import useValidateEmail from '../../../hooks/useValidateEmail';
import useScroll from '../../../hooks/useScroll';

import CloseSvg from '../../svg/CloseSvg';
import siteLogo from '../../../assets/images/logo/site-logo.webp'
import GoogleSvg from '../../svg/GoogleSvg';
import AppleSvg from '../../svg/AppleSvg';
import ErrorSvg from '../../svg/ErrorSvg';

import AuthModalInput from '../Inputs/AuthModalInput';
import { NavLink } from 'react-router';
import LoadingDot from '../Loaders/LoadingDot';

export default function AuthModal({ isOpen, onClose, children }) {
    const { authInputValue } = useSelector(reducers => reducers.inputsValueReducer);
    const [userAuthStatus, setUserAuthStatus] = useState({ success: false, flow: null });
    const [activeVerifyCode, setActiveVerifyCode] = useState(false)

    const [loadings, setLoadings] = useState({ loadingAuth: false });
    const { loadingAuth } = loadings;
    const [submitResult, setSubmitResult] = useState({
        is: true,
        message: '',
    })
    const { is, message } = submitResult;
    useScroll();

    useEffect(() => {
        setSubmitResult({ is: true, message: '' })
    }, [authInputValue])

    const submitForm = async (e) => {
        e.preventDefault();

        const { is, message } = useValidateEmail(authInputValue);
        setSubmitResult({ is, message });

        if (is && message === 'valid') {
            try {
                setLoadings(prev => ({ ...prev, loadingAuth: true }));
                const { data } = await Api.checkUserAuthStatus(authInputValue);
                setLoadings(prev => ({ ...prev, loadingAuth: false }));

                setUserAuthStatus(data);
                setActiveVerifyCode(data?.success);

            } catch (e) {
                console.log(e);
            }
        }
    }

    const clearStates = () => {
        setActiveVerifyCode(false)
    }

    console.log(userAuthStatus);


    return createPortal(
        <div className={classNames('auth__modal', { modal__active: isOpen })}>
            <div className='backdrop' role='button' onClick={onClose} />

            <div className={classNames('modal__main', { active__verify__child: activeVerifyCode })}>
                <div className='modal__close__bar'>
                    <button className='modal__close__bar__button' onClick={onClose}>
                        <span className='container' onClick={clearStates}>
                            <CloseSvg />
                        </span>
                    </button>
                </div>

                <div className={classNames('content', { hidden: activeVerifyCode })}>
                    <div className='content__logo__block'>
                        <img src={siteLogo} className='site__logo' draggable={false} alt="Nestfy site logo" />
                    </div>
                    <div className='content__title'>
                        <h3 className='title'>Log in or sign up</h3>
                    </div>

                    <div className={classNames('content__auth__block', { active__error__container: !is })}>
                        <AuthModalInput onSubmit={submitForm} activeError={is} loaderAuth={loadingAuth} />
                        <p className={classNames('error__message', { active__error: !is })}>
                            <ErrorSvg />
                            {message === 'empty' ? 'Please enter a phone number or email.' : 'Please enter a valid email address or phone number.'}
                        </p>
                    </div>

                    <div className='content__information'>
                        <p className='text'>
                            We’ll send a confirmation code by text or email. Message and data rates apply.
                            <NavLink to='/privacy-policy' className='link'>Privacy Policy</NavLink>
                        </p>
                    </div>

                    <div className='button__container'>
                        <button
                            className={classNames('submit__button', { loading__button: loadingAuth })}
                            type='submit'
                            form='auth__form'
                        >
                            {loadingAuth ? <LoadingDot /> : 'Continue'}
                        </button>
                    </div>

                    <div className='container__info'>
                        <span className='line' />
                        <p className='or'>or</p>
                        <span className='line' />
                    </div>

                    <div className='other__options__container'>
                        <button className='option__button'>
                            <GoogleSvg />
                        </button>

                        <button className='option__button'>
                            <AppleSvg />
                        </button>
                    </div>
                </div>

                <div className={classNames('verify__content', { active__verify__content: activeVerifyCode })}>
                    <div className='info__container'>
                        <h1 className='title'>Confirm it’s you</h1>
                        <p className='info'>We sent a code to {authInputValue}</p>
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('root'))
}
