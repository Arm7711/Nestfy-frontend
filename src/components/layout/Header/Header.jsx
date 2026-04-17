import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router';
import classNames from 'classnames';
import AuthModal from '../../_common/Modals/AuthModal';
import V1Calendar from '../../_common/V1Calendar/V1Calendar';
import MenuIcon from '../../_common/MenuIcon/MenuIcon';
import useIsAtTop from '../../../hooks/useIsAtTop';

import SiteLogo from '../../../assets/images/logo/nestfy-site-logo.svg?react';
import SiteLogoSvg from '../../../assets/images/logo/site-logo-n.svg?react'

import HomeIcon from '../../HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../HeaderVideoIcons/ServicesIcon/ServicesIcon';
import SearchSvg from '../../svg/SearchSvg';
import LangSvg from '../../svg/LangSvg';

import { tabFields, searchTabFields, headerMenuData, authHeaderMenuData, searchTabFieldsInScroll } from '../../../data/headerData';
import { locations } from '../../../data/loacationsData';
import LocationsBlock from '../../LocationsBlock/LocationsBlock';
import Api from '../../../api/Api';

export default function Header({ isProfilePage, isHelpPage, isAuth, isMainPage }) {
    const { lang } = useParams();
    const { selectedDays } = useSelector((reducers) => reducers.calendarChDays);
    const isTop = useIsAtTop();
    const [activeScrollHeader, setActiveScrollHeader] = useState(false);

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

    const [whereOptionValue, setWhereOptionValue] = useState('');
    const userData = JSON.parse(localStorage.getItem("userData") || null);

    useEffect(() => {
        function handleClick(event) {
            if (openHeaderMenu && headerMenuRef.current) {
                if (!headerMenuRef.current.contains(event.target)) {
                    setOpenHeaderMenu(false);
                }
            }
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setActiveSearchBar(false);
                setActiveScrollHeader(false);
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [openHeaderMenu]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (!isTop) setActiveSearchBar(false);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isTop]);

    useLayoutEffect(() => {
        const el = tabRef.current.get(headerActiveTab.tabName);
        const elS = searchTabRef.current.get(searchActiveTab.tabName);

        if (!el || !elS) return;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const parentRect = el.parentElement.getBoundingClientRect();

            setTabWidth(rect.width);
            setTranslateX(rect.left - parentRect.left);

            if (isTop || activeScrollHeader) {
                const rectS = elS.getBoundingClientRect();
                const sParentRect = elS.parentElement.getBoundingClientRect();

                setSearchTabWidth(rectS.width);
                setSearchSliceTX(rectS.left - sParentRect.left);
            }
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(el);
        ro.observe(elS);

        return () => ro.disconnect();
    }, [headerActiveTab, searchActiveTab, isTop, activeScrollHeader]);

    const changeTab = (item) => {
        setWhereOptionValue(item?.title);
        setSearchAtiveTab({ tabName: 'when', tabIndex: 1 })
    }

    const authModalOpen = (itemName) => {
        if (itemName === 'auth') {
            setIsAuthModalOpen(true);
            setOpenHeaderMenu(false);
        }
    }
    const logOut = async () => {
        try {
            await Api.logout();
            setOpenHeaderMenu(false);
            window.location.reload();
            localStorage.removeItem("userData")
        } catch (e) {
            console.log(e);
        }
    };

    const searchBarFunciton = () => {
        if (!isTop) {
            setActiveScrollHeader(true);
        }
        setActiveSearchBar(true);
    }
    

    return (
        <>
            <header className={classNames('header', { profile__page__header: isProfilePage, help__page__header: isHelpPage, scroll: !isTop && isMainPage, scroll__header: !isTop && activeScrollHeader })}>
                <div className={classNames('header__section__first', { profile__page__header: isProfilePage, help__page__header: isHelpPage, scroll: !isTop && isMainPage, scroll__header: !isTop && activeScrollHeader })}>
                    <div className={classNames('header__section__first__content', { profile__page__header: isProfilePage, help__page__header: isHelpPage, scroll: !isTop && isMainPage, scroll__header: !isTop && activeScrollHeader })}>
                        <NavLink to={`/${lang}`} className='header__section__first__logo__block'>
                            {isHelpPage
                                ?
                                <>
                                    <SiteLogoSvg className='header__section__first__logo' />
                                    <h1 className='help__title'>Help center</h1>
                                </>
                                :
                                <SiteLogo className={classNames('header__section__first__logo', { profile__page__header: isProfilePage })} />
                            }
                        </NavLink>

                        <div className={classNames('header__section__first__tab__list', { profile__page__header: isProfilePage, help__page__header: isHelpPage, scroll: !isTop && isMainPage, scroll__header: !isTop && activeScrollHeader })}
                        >
                            <span
                                className='active__tab'
                                style={{
                                    width: tabWidth,
                                    transform: `translateX(${translateX}px)`
                                }}
                            />

                            {tabFields?.map(({ tabName, tab, title }, index) => (
                                <NavLink className='tab__list__item' key={index} ref={
                                    el => {
                                        if (el) {
                                            tabRef.current.set(tabName, el);
                                        } else {
                                            tabRef.current.delete(tabName);
                                        }
                                    }}
                                    to={`/${lang}/${tab}`}
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
                                </NavLink>
                            ))}
                        </div>

                        <div className='header__section__tab__bar__tools'>

                            {
                                isAuth
                                    ?
                                    <NavLink to={`/${lang}/profile`} className='header__section__tab__bar__tools__item profile'>
                                        <p className='user__letter'>{userData ? userData?.name[0] : 'U'}</p>
                                    </NavLink>
                                    :
                                    <div className='header__section__tab__bar__tools__item lang'>
                                        <LangSvg />
                                    </div>
                            }

                            <div
                                className={classNames('header__section__tab__bar__tools__item menu',
                                    {
                                        active__menu: openHeaderMenu,
                                        is__auth: isAuth,
                                        profile__page__header: isProfilePage
                                    }
                                )}
                                ref={headerMenuRef}
                            >
                                <button className={classNames('toggle', { close: openHeaderMenu })} onClick={() => setOpenHeaderMenu(prev => !prev)}>
                                    <MenuIcon
                                        checked={openHeaderMenu}
                                        onChange={() => setOpenHeaderMenu(prev => !prev)}
                                    />
                                </button>

                                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

                                <div className={classNames('header__section__menu__content', { acitve__menu__content: openHeaderMenu })}>
                                    {(isAuth ? authHeaderMenuData : headerMenuData).map((item, index) => (
                                        <button className='menu__item' key={index} onClick={() => authModalOpen(item?.filedName)}>
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
                                                    onClick={() => item?.action === 'logout' && logOut()}
                                                >
                                                    {item.content}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div
                    className={classNames('header__search__form__container', { active__bar: activeSearchBar, profile__page__header: isProfilePage, help__page__header: isHelpPage, scroll: !isTop && isMainPage, scroll__header: !isTop && activeScrollHeader })}
                    ref={searchBarRef}
                    onClick={searchBarFunciton}
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
                            className={classNames('tab__item', { active__tab__search: searchActiveTab?.tabName === item?.tabName, in__scroll: !isTop })}
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
                            <h2 className='title'>{isTop || activeScrollHeader ? item?.title : searchTabFieldsInScroll[index]?.title}</h2>
                            <p className={classNames('desc', { in__scroll: !isTop && !activeScrollHeader })}>{
                                index === 0 ? (whereOptionValue || item?.content)
                                    : index === 1 ? (selectedDays || item?.content)
                                        : item?.content
                            }</p>
                        </div>
                    ))}

                    <div
                        className={
                            classNames(
                                'option__container',
                                {
                                    active: activeSearchBar,
                                    first__active__tab: searchActiveTab.tabIndex === 0,
                                    middle__active__tab: searchActiveTab.tabIndex === 1,
                                    last__active__tab: searchActiveTab.tabIndex === 2,
                                })}
                        style={{
                            width: searchActiveTab.tabIndex === 1 ? '100%' : '50%',
                            left: searchActiveTab.tabIndex === 2 ? '50%' : '0%',
                        }
                        }
                    >
                        {searchActiveTab.tabIndex === 0 && <div className={classNames('option__tab__content', { active: searchActiveTab.tabIndex === 0 })}>
                            <div className='locations__container'>
                                <h1 className='title'>Suggested destinations</h1>
                                {locations.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <LocationsBlock item={item} onClick={() => changeTab(item)} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>}

                        {searchActiveTab.tabIndex === 1 && <div className={classNames('option__tab__content option__tab__content__calendar', { active: searchActiveTab.tabIndex === 1 })}>
                            <V1Calendar />
                        </div>}
                    </div>


                    <button className={classNames('search__button', { active__button: activeSearchBar })}>
                        <SearchSvg />

                        <p className='search__text'>Search</p>
                    </button>
                </div>
            </header >

            <div className={classNames('backdrop__header', { active: !isTop && activeScrollHeader })} />
        </>
    )
}
