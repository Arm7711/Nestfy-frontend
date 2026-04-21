import { useState } from 'react';
import { NavLink } from 'react-router';
import classNames from 'classnames';
import AuthModal from '../../../_common/Modals/AuthModal';
import MenuIcon from '../../../_common/MenuIcon/MenuIcon';
import LangCurrenciesModal from '../../../_common/Modals/LangCurrenciesModal/LangCurrenciesModal';

export default function HeaderMenu({
    lang,
    isAuth,
    isProfilePage,
    openHeaderMenu,
    setOpenHeaderMenu,
    isAuthModalOpen,
    setIsAuthModalOpen,
    headerMenuRef,
    menuData,
    onLogout,
    handleSaveLangCurrency,
    isLangCurrencyOpen,
    setIsLangCurrencyOpen,
}) {
    const handleMenuItemClick = (itemName) => {
        if (itemName === 'auth') {
            setIsAuthModalOpen(true);
            setOpenHeaderMenu(false);
        }
    };

    const allActions = (action) => {
        if (action === 'logout') {
            onLogout();
        }

        if (action === 'language') {
            setIsLangCurrencyOpen(true);
        }
    };

    return (
        <div
            className={classNames('header__section__tab__bar__tools__item menu', {
                active__menu: openHeaderMenu,
                is__auth: isAuth,
                profile__page__header: isProfilePage,
            })}
            ref={headerMenuRef}
        >
            <LangCurrenciesModal
                isOpen={isLangCurrencyOpen}
                onClose={() => setIsLangCurrencyOpen(false)}
                onSave={handleSaveLangCurrency}
            />

            <button
                className={classNames('toggle', { close: openHeaderMenu })}
                onClick={() => setOpenHeaderMenu(prev => !prev)}
            >
                <MenuIcon
                    checked={openHeaderMenu}
                    onChange={() => setOpenHeaderMenu(prev => !prev)}
                />
            </button>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />

            <div
                className={classNames('header__section__menu__content', {
                    acitve__menu__content: openHeaderMenu,
                })}
            >
                {menuData.map((item, index) => (
                    <button
                        className='menu__item'
                        key={index}
                        onClick={() => handleMenuItemClick(item?.filedName)}
                    >
                        {item?.navigationTo ? (
                            <NavLink
                                to={`/${lang}${item.navigationTo}`}
                                onClick={() => setOpenHeaderMenu(false)}
                                className='content'
                            >
                                {item.content}
                            </NavLink>
                        ) : (
                            <p
                                role='button'
                                className='content'
                                onClick={() => allActions(item?.action)}
                            >
                                {item.content}
                            </p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}