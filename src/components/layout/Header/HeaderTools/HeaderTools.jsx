import { NavLink } from 'react-router';
import LangSvg from '../../../svg/LangSvg';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import classNames from 'classnames';

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
                    <div className='header__section__tab__bar__tools__item lang'>
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
                />
            </div>

            <div className={classNames('settings__done__container', { active: isSettingsPage })}>
                <NavLink to={`/${lang}/profile`}>
                    <button className='settings__done__button'>
                        Done
                    </button>
                </NavLink>
            </div>
        </>
    );
}
