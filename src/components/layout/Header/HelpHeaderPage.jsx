import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import classNames from 'classnames';
import AuthModal from '../../_common/Modals/AuthModal';
import MenuIcon from '../../_common/MenuIcon/MenuIcon';

import SiteLogo from '../../../assets/images/logo/site-logo-n.svg?react'
import LangSvg from '../../svg/LangSvg';

import { headerMenuData } from '../../../data/headerData';

export default function HelpHeaderPage({ isHelpPage }) {
    const { lang } = useParams();

    const headerMenuRef = useRef(null);
    const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


    useEffect(() => {
        function handleClick(event) {
            if (openHeaderMenu && headerMenuRef.current) {
                if (!headerMenuRef.current.contains(event.target)) {
                    setOpenHeaderMenu(false);
                }
            }
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [openHeaderMenu]);

    const authModalOpen = (itemName) => {
        if (itemName === 'auth') {
            setIsAuthModalOpen(true);
            setOpenHeaderMenu(false);
        }
    }
    return (
        <header className={classNames('header', { help__header: isHelpPage })}>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <div className='header__section__first'>
                <div className='header__section__first__content'>
                    <NavLink to={`/${lang}`} className='header__section__first__logo__block'>
                        <SiteLogo className='header__section__first__logo' />

                        <h1 className='help__title'>Help center</h1>
                    </NavLink>

                    <div className='header__section__tab__bar__tools'>
                        <div className='header__section__tab__bar__tools__item lang'>
                            <LangSvg />
                        </div>

                        <div className={classNames('header__section__tab__bar__tools__item menu', { active__menu: openHeaderMenu })} ref={headerMenuRef}>
                            <button className={classNames('toggle', { close: openHeaderMenu })} onClick={() => setOpenHeaderMenu(prev => !prev)}>
                                <MenuIcon
                                    checked={openHeaderMenu}
                                    onChange={() => setOpenHeaderMenu(prev => !prev)}
                                />
                            </button>

                            <div className={classNames('header__section__menu__content', { acitve__menu__content: openHeaderMenu })}>
                                {headerMenuData.map((item, index) => {
                                    if (item?.navigationTo) {
                                        return (
                                            <NavLink
                                                key={index}
                                                to={`/${lang}${item.navigationTo}`}
                                                onClick={() => setOpenHeaderMenu(false)}
                                                className="menu__item content"
                                            >
                                                {item.content}
                                            </NavLink>
                                        );
                                    }

                                    return (
                                        <button
                                            key={index}
                                            className="menu__item content"
                                            onClick={() => authModalOpen(item?.filedName)}
                                        >
                                            {item.content}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
