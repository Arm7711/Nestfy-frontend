import { NavLink } from 'react-router';
import LangSvg from '../../../svg/LangSvg';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import classNames from 'classnames';
import { useState } from 'react';

export default function HeaderTools({
    lang,
    isAuth,
    isProfilePage,
    isSettingsPage,
    userData,
    openHeaderMenu,
    setOpenHeaderMenu,
    isAuthModalOpen,
    setIsAuthModalOpen,
    headerMenuRef,
    menuData,
    onLogout,
}) {
    const [isLangCurrencyOpen, setIsLangCurrencyOpen] = useState(false);

    const handleSaveLangCurrency = ({ language, currency }) => {
        localStorage.setItem('langAndCurrency', JSON.stringify({language,currency}));
        setIsLangCurrencyOpen(false);
    };

    const openLangModal = () => {
        setIsLangCurrencyOpen(true);
    };

    return (
        <>
            <div className={classNames('header__section__tab__bar__tools', { hidden: isSettingsPage })}>
                {isAuth ? (
                    <NavLink
                        to={`/${lang}/profile`}
                        className='header__section__tab__bar__tools__item profile'
                    >
                        <p className='user__letter'>{userData?.name?.[0] ?? 'U'}</p>
                    </NavLink>
                ) : (
                    <div
                        role='button'
                        className='header__section__tab__bar__tools__item lang'
                        onClick={openLangModal}
                    >
                        <LangSvg />
                    </div>
                )}

                <HeaderMenu
                    lang={lang}
                    isAuth={isAuth}
                    isProfilePage={isProfilePage}
                    openHeaderMenu={openHeaderMenu}
                    setOpenHeaderMenu={setOpenHeaderMenu}
                    isAuthModalOpen={isAuthModalOpen}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                    headerMenuRef={headerMenuRef}
                    menuData={menuData}
                    onLogout={onLogout}
                    handleSaveLangCurrency={handleSaveLangCurrency}
                    isLangCurrencyOpen={isLangCurrencyOpen}
                    setIsLangCurrencyOpen={setIsLangCurrencyOpen}
                />
            </div>

            <div className={classNames('settings__done__container', { active: isSettingsPage })}>
                <NavLink
                    to={`/${lang}/profile`}
                    className={classNames('settings__done__button', {
                        active: isSettingsPage
                    })}
                >
                    <span className='text'>Done</span>
                </NavLink>
            </div>
        </>
    );
}