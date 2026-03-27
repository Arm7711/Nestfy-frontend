import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';

import SiteLogo from '../../../assets/images/logo/nestfy-site-logo.svg?react'
import HomeIcon from '../../HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../HeaderVideoIcons/ServicesIcon/ServicesIcon';
import SearchSvg from '../../svg/SearchSvg';
import LangSvg from '../../svg/LangSvg';

import { tabFields, searchTabFields, headerMenuData } from '../../../data/headerData';
import AuthModal from '../../_common/Modals/AuthModal';

export default function Header() {
    const tabRef = useRef(new Map());
    const [headerActiveTab, setHeaderActiveTab] = useState(
        {
            tabName: 'homeTab',
            tabIndex: 0
        }
    );
    const [tabWidth, setTabWidth] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const searchTabRef = useRef(new Map());
    const [searchActiveTab, setSearchAtiveTab] = useState(
        {
            tabName: "where",
            tabIndex: 0
        }
    );
    const [searchTabWidth, setSearchTabWidth] = useState(0);
    const [searchSliceTX, setSearchSliceTX] = useState(0);

    const [activeSearchBar, setActiveSearchBar] = useState(false);
    const searchBarRef = useRef(null);

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
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setActiveSearchBar(false);
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [openHeaderMenu]);

    useLayoutEffect(() => {
        const el = tabRef.current.get(headerActiveTab.tabName);
        const elS = searchTabRef.current.get(searchActiveTab.tabName);
        if (!el || !elS) return;

        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();

        const rectS = elS.getBoundingClientRect();
        const sParentReact = elS.parentElement.getBoundingClientRect();

        setSearchTabWidth(rectS.width);
        setSearchSliceTX(rectS.left - sParentReact.left);

        setTabWidth(rect.width);
        setTranslateX(rect.left - parentRect.left);
    }, [headerActiveTab, searchActiveTab]);

    const authModalOpen = (itemName) => {
        if (itemName === 'auth'){
            setIsAuthModalOpen(true);
            setOpenHeaderMenu(false);
        }
    }

    return (
        <header className='header'>
            <div className='header__section__first'>
                <div className='header__section__first__content'>
                    <div className='header__section__first__logo__block'>
                        <SiteLogo className='header__section__first__logo' />
                    </div>

                    <div className='header__section__first__tab__list'>
                        <span
                            className='active__tab'
                            style={{
                                width: tabWidth,
                                transform: `translateX(${translateX}px)`
                            }}
                        />

                        {tabFields?.map(({ tabName, tab, title }, index) => (
                            <div className='tab__list__item' key={index} ref={
                                el => {
                                    if (el) {
                                        tabRef.current.set(tabName, el);
                                    } else {
                                        tabRef.current.delete(tabName);
                                    }
                                }}
                                role='button'
                                onClick={() => setHeaderActiveTab({ tabName, tabIndex: index })}
                            >
                                <div className={classNames('icon__container', { active__tab__icon: headerActiveTab.tabName === tabName })}>
                                    {tab === 'home'
                                        ?
                                        <HomeIcon
                                            selected={headerActiveTab.tabName === tabName}
                                        />
                                        :
                                        <ServicesIcon
                                            selected={headerActiveTab.tabName === tabName}

                                        />
                                    }
                                </div>
                                <div className={classNames('list__item__title', { active__tab__title: headerActiveTab.tabName === tabName })}>
                                    <p className='title'>{title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='header__section__tab__bar__tools'>
                        <div className='header__section__tab__bar__tools__item lang'>
                            <LangSvg />
                        </div>

                        <div className={classNames('header__section__tab__bar__tools__item menu', { active__menu: openHeaderMenu })} ref={headerMenuRef}>
                            <button className={classNames('toggle', { close: openHeaderMenu })} onClick={() => setOpenHeaderMenu(prev => !prev)}>
                                <span className='line line--1' />
                                <span className='line line--2' />
                                <span className='line line--3' />
                            </button>

                            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

                            <div className={classNames('header__section__menu__content', { acitve__menu__content: openHeaderMenu })}>
                                {headerMenuData.map((item, index) => (
                                    <button className='menu__item' key={index} onClick={() => authModalOpen(item?.filedName)}>
                                        <p className='content'>{item?.content}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={classNames('header__search__form__container', { active__bar: activeSearchBar })}
                ref={searchBarRef}
                onClick={() => setActiveSearchBar(true)}
            >
                <div
                    className={classNames('selected__slice', { active: activeSearchBar })}
                    style={
                        {
                            width: searchTabWidth,
                            transform: `translateX(${searchSliceTX}px)`
                        }
                    }
                />

                {searchTabFields?.map((item, index) => (
                    <div
                        className={classNames('tab__item', { active__tab__search: searchActiveTab?.tabName === item?.tabName })}
                        key={index}
                        onClick={() => setSearchAtiveTab({ tabName: item?.tabName, tabIndex: index })}
                        ref={el => {
                            if (el) {
                                searchTabRef.current.set(item.tabName, el);
                            } else {
                                searchTabRef.current.delete(item.tabName);
                            }
                        }}
                    >
                        <h2 className='title'>{item?.title}</h2>
                        <p className='desc'>{item?.content}</p>
                    </div>
                ))}

                <button className={classNames('search__button', { active__button: activeSearchBar })}>
                    <SearchSvg />

                    <p className='search__text'>Search</p>
                </button>
            </div>
        </header>
    )
}
