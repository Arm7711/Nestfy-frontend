import { useState } from 'react';
import { NavLink } from 'react-router';
import classNames from 'classnames';
import Api from '../../../../api/Api';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import LangSvg from '../../../svg/LangSvg';
import ImageSkeleton from '../../../_common/Skeletions/ImageSkeletion';

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
    const [langSelectedUserAccount, setLangSelectedUserAccount] = useState('');

    const handleSaveLangCurrency = async ({ language, region, languageCode, currency }) => {
        if (isAuth) {
            try {
                const { data } = await Api.getUserSettings();
                setLangSelectedUserAccount(data.language);

                await Api.editUserSettings({ language: languageCode });
                localStorage.setItem('lang', languageCode);

                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        } else {
            localStorage.setItem('lang', languageCode);
            window.location.reload();
        }
        setIsLangCurrencyOpen(false);
    };

    const openLangModal = () => {
        setIsLangCurrencyOpen(true);
    };

    return (
        <>
            <div className={classNames('header__section__tab__bar__tools', { hidden: isSettingsPage })}>
                {isAuth ? (
                    userData?.avatar ?
                        (
                            <NavLink to={`/${lang}/profile`}>
                                <ImageSkeleton
                                    src={userData?.avatar}
                                    figureClass={'header__section__tab__bar__tools__item profile'}
                                    imgClass={'header__section__tab__bar__tools__item__img'}
                                    rounded='full'
                                />
                            </NavLink>
                        )
                        : (
                            <NavLink
                                to={`/${lang}/profile`}
                                className='header__section__tab__bar__tools__item profile'
                            >
                                <p className='user__letter'>{userData?.name?.[0] ?? 'U'}</p>
                            </NavLink>
                        )
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
            </div >

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