import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import classNames from 'classnames';

import useIsAtTop from '../../../hooks/useIsAtTop';
import Api from '../../../api/Api';

import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderTabList from './HeaderTabList/HeaderTabList';
import HeaderTools from './HeaderTools/HeaderTools';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';

import { headerMenuData, authHeaderMenuData } from '../../../data/headerData';

export default function Header({ isProfilePage, isHelpPage, isAuth, isMainPage, isSettingsPage }) {
    const { lang } = useParams();
    const isTop = useIsAtTop();
    const userData = JSON.parse(localStorage.getItem('userData') || null);


    const [activeScrollHeader, setActiveScrollHeader] = useState(false);
    const [activeSearchBar, setActiveSearchBar] = useState(false);
    const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [whereOptionValue, setWhereOptionValue] = useState('');


    const [headerActiveTab, setHeaderActiveTab] = useState({ tabName: 'homeTab', tabIndex: 0 });
    const [tabWidth, setTabWidth] = useState(0);
    const [translateX, setTranslateX] = useState(0);


    const [searchActiveTab, setSearchActiveTab] = useState({ tabName: 'where', tabIndex: 0 });
    const [searchTabWidth, setSearchTabWidth] = useState(0);
    const [searchSliceTX, setSearchSliceTX] = useState(0);


    const tabRef = useRef(new Map());
    const searchTabRef = useRef(new Map());
    const searchBarRef = useRef(null);
    const headerMenuRef = useRef(null);


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
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
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

    const logOut = async () => {
        try {
            await Api.logout();
            setOpenHeaderMenu(false);
            localStorage.removeItem('userData');
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearchBarClick = () => {
        if (!isTop) setActiveScrollHeader(true);
        setActiveSearchBar(true);
    };

    const scrollClass = !isTop && isMainPage;
    const scrollHeaderClass = !isTop && activeScrollHeader;

    const sharedScrollClasses = {
        profile__page__header: isProfilePage,
        help__page__header: isHelpPage,
        account__settings__header: isSettingsPage,
        scroll: scrollClass,
        scroll__header: scrollHeaderClass,
    };

    return (
        <>
            <header className={classNames('header', sharedScrollClasses)}>
                <div className={classNames('header__section__first', sharedScrollClasses)}>
                    <div className={classNames('header__section__first__content', sharedScrollClasses)}>

                        <HeaderLogo
                            lang={lang}
                            isHelpPage={isHelpPage}
                            isProfilePage={isProfilePage}
                            isSettingsPage={isSettingsPage}
                        />

                        <HeaderTabList
                            lang={lang}
                            tabRef={tabRef}
                            tabWidth={tabWidth}
                            translateX={translateX}
                            headerActiveTab={headerActiveTab}
                            setHeaderActiveTab={setHeaderActiveTab}
                            isProfilePage={isProfilePage}
                            isHelpPage={isHelpPage}
                            isSettingsPage={isSettingsPage}
                            isTop={isTop}
                            activeScrollHeader={activeScrollHeader}
                        />

                        <HeaderTools
                            lang={lang}
                            isAuth={isAuth}
                            isProfilePage={isProfilePage}
                            isSettingsPage={isSettingsPage}
                            userData={userData}
                            openHeaderMenu={openHeaderMenu}
                            setOpenHeaderMenu={setOpenHeaderMenu}
                            isAuthModalOpen={isAuthModalOpen}
                            setIsAuthModalOpen={setIsAuthModalOpen}
                            headerMenuRef={headerMenuRef}
                            menuData={isAuth ? authHeaderMenuData : headerMenuData}
                            onLogout={logOut}
                        />

                    </div>
                </div>

                <HeaderSearchBar
                    searchBarRef={searchBarRef}
                    isTop={isTop}
                    isProfilePage={isProfilePage}
                    isHelpPage={isHelpPage}
                    isSettingsPage={isSettingsPage}
                    activeSearchBar={activeSearchBar}
                    activeScrollHeader={activeScrollHeader}
                    searchActiveTab={searchActiveTab}
                    setSearchActiveTab={setSearchActiveTab}
                    searchTabRef={searchTabRef}
                    searchTabWidth={searchTabWidth}
                    searchSliceTX={searchSliceTX}
                    whereOptionValue={whereOptionValue}
                    setWhereOptionValue={setWhereOptionValue}
                    onBarClick={handleSearchBarClick}
                />
            </header>

            <div className={classNames('backdrop__header', { active: scrollHeaderClass })} />
        </>
    );
}
