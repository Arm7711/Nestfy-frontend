import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Api from '../../../api/Api';
import useValidateEmail from '../../../hooks/useValidateEmail';
import useScroll from '../../../hooks/useScroll';
import { setSendCodeInputValue } from '../../../redux/reducers/inputsValueReducer';

import CloseSvg from '../../svg/CloseSvg';
import siteLogo from '../../../assets/images/logo/site-logo.webp'
import GoogleSvg from '../../svg/GoogleSvg';
import AppleSvg from '../../svg/AppleSvg';
import ErrorSvg from '../../svg/ErrorSvg';
import BackArrowSvg from '../../svg/BackArrowSvg';

import Button from '../Button/Button';
import CodeInput from '../CodeInput/CodeInput';
import AuthModalInput from '../Inputs/AuthModalInput';
import { NavLink } from 'react-router';
import LoadingDot from '../Loaders/LoadingDot';

export default function AuthModal({ isOpen, onClose, children }) {
    const { lang } = useParams();
    const { pathname } = useLocation();
    const isMain = pathname === `/${lang}`;

    const dispatch = useDispatch();

    const { authInputValue, sendCodeInputValue } = useSelector(reducers => reducers.inputsValueReducer);
    const [code, setCode] = useState('');

    const [showInfoBlock, setShowInfoBlock] = useState(false);

    const [userAuthStatus, setUserAuthStatus] = useState({ success: false, flow: null });
    const [activeVerifyCode, setActiveVerifyCode] = useState(false);
    const [showErrorToasty, setShowErrorToasty] = useState({ active: false, message: '' });

    const [loadings, setLoadings] = useState({ loadingAuth: false });
    const { loadingAuth } = loadings;
    const [submitResult, setSubmitResult] = useState({
        is: true,
        message: '',
    })
    const { is, message } = submitResult;

    useScroll(isOpen);

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

                const resultReq = await Api.authUser(authInputValue, sendCodeInputValue, data?.flow);

                console.log(resultReq);

            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                resetInternalState();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (!activeVerifyCode || sendCodeInputValue.length !== 6) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') sendCode();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeVerifyCode, sendCodeInputValue]);

    const resetInternalState = () => {
        setActiveVerifyCode(false);
        dispatch(setSendCodeInputValue(''));
        setShowErrorToasty({ active: false, message: '' });
        setShowInfoBlock(false);
        setCode('');
    };

    const clearStates = () => {
        resetInternalState();
        onClose();
    };

    const backClickClear = () => {
        setActiveVerifyCode(false);
        dispatch(setSendCodeInputValue(''));
        setShowErrorToasty({ active: false, message: '' });
    }

    const handleCodeChange = (val) => {
        setCode(val);
        dispatch(setSendCodeInputValue(val));
    };


    const sendCode = async () => {
        if (sendCodeInputValue.length === 6) {
            try {
                const { data } = await Api.userVerfiyAuth(authInputValue, sendCodeInputValue);
                localStorage.setItem('userData', JSON.stringify(data.user));
                clearStates();

                if (isMain) {
                    window.location.reload();
                }

                window.location.replace(`/${lang}`);

            } catch (e) {
                setShowErrorToasty({ active: true, message: e.response.data.message });
            }
        }
    }
    const sendNewCode = async () => {
        try {
            const resultReq = await Api.authUser(authInputValue, sendCodeInputValue, userAuthStatus?.flow);
        } catch (e) {
            setShowErrorToasty({ active: true, message: e.response.data.message });
        }
    }


    return createPortal(
        <div className={classNames('auth__modal', { modal__active: isOpen })}>
            <div className='backdrop' role='button' onClick={clearStates} />

            <div className={classNames('modal__main', { active__verify__child: activeVerifyCode, max__height: sendCodeInputValue, active__error: showErrorToasty.active })}>
                <div className='modal__close__bar'>
                    <button className={classNames('back', { active: activeVerifyCode })} onClick={backClickClear}>
                        <BackArrowSvg />
                    </button>

                    <button className='modal__close__bar__button' onClick={clearStates}>
                        <span className='container'>
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
                        <AuthModalInput onSubmit={submitForm} onClick={() => setShowInfoBlock(true)} activeError={is} loaderAuth={loadingAuth} />
                        <p className={classNames('error__message', { active__error: !is })}>
                            <ErrorSvg />
                            {message === 'empty' ? 'Please enter a phone number or email.' : 'Please enter a valid email address or phone number.'}
                        </p>
                    </div>

                    <div className={classNames('content__information', { show: showInfoBlock })}>
                        <p className='text'>
                            We’ll send a confirmation code by text or email. Message and data rates apply.
                            <NavLink to='/privacy-policy' className='link'>Privacy Policy</NavLink>
                        </p>
                    </div>

                    <div className={classNames('button__container', { show__info__block: showInfoBlock })}>
                        <Button
                            className={classNames('submit__button', { loading__button: loadingAuth })}
                            type='submit'
                            form='auth__form'
                            disabled={loadingAuth}
                        >
                            {loadingAuth ? <LoadingDot /> : 'Continue'}
                        </Button>
                    </div>

                    <div className={classNames('container__info', { show__info__block: showInfoBlock })}>
                        <span className='line' />
                        <p className='or'>or</p>
                        <span className='line' />
                    </div>

                    <div className={classNames('other__options__container', { show__info__block: showInfoBlock })}>
                        <button className='option__button' disabled={loadingAuth}>
                            <GoogleSvg />
                        </button>

                        <button className='option__button' disabled={loadingAuth}>
                            <AppleSvg />
                        </button>
                    </div>
                </div>

                <div className={classNames('verify__content', { active__verify__content: activeVerifyCode })}>
                    <div className={classNames('error__toasty', { show: showErrorToasty.active })}>
                        <ErrorSvg />
                        <p className='error__text'>{showErrorToasty.message}</p>

                        <button className='close__toasty' onClick={() => setShowErrorToasty({ active: false, message: '' })}>
                            <CloseSvg className='close__svg' />
                        </button>
                    </div>

                    <div className='info__container'>
                        <h1 className='title'>Confirm it’s you</h1>
                        <p className='info'>We sent a code to {authInputValue}</p>

                        <div className='code__input__container'>
                            <CodeInput
                                value={code}
                                onChange={handleCodeChange}
                                isActive={activeVerifyCode}
                                error={false}
                            />
                        </div>

                        <div className='send__new__code__container'>
                            <p className='info'>Didn’t get it?</p>
                            <button className='send__code' onClick={sendNewCode}>Send a new code</button>
                        </div>

                        <div className={classNames('send__result__button__container', { active: sendCodeInputValue })}>
                            <button className='send__result__button' onClick={sendCode} disabled={sendCodeInputValue.length < 6}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('root'))
}
