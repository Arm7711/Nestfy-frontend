import React, { useEffect, useState } from 'react';
import { Outlet, useParams, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DEFAULT_LANG } from '../../utils/getLanguageByCode.js';

import Api from '../../api/Api.js';
import Header from '../../components/layout/Header/Header';
import Footer from "../../components/layout/Footer/Footer.jsx"
import classNames from 'classnames';
import WelcomeToasty from '../../components/WelcomeToasty/WelcomeToasty.jsx';

export default function Layout() {
    const { lang } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMainPage =
        matchPath({ path: '/:lang/home' }, pathname) ||
        matchPath({ path: '/:lang/services' }, pathname) ||
        matchPath({ path: '/:lang' }, pathname);
    const isHelpPage = pathname === `/${lang}/help-center`;
    const isProfilePage = pathname === `/${lang}/profile` || pathname === `/${lang}/messages` || pathname.startsWith(`/${lang}/account-settings`);
    const profileEndpoints = pathname === `/${lang}/messages` || pathname.startsWith(`/${lang}/account-settings`);
    const onlyProfilePage = pathname === `/${lang}/profile`;
    const isSettingsPage = pathname.startsWith(`/${lang}/account-settings`);

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData') || null));
    const status = useSelector(state => state.authReducer.status);

    const [userSelectedLang, setUserSelectedLang] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('lang') || DEFAULT_LANG;

        if (!lang) return;

        if (lang !== stored) {
            navigate(`/${stored}`, { replace: true });
        }
    }, [lang]);

    useEffect(() => {
        (async () => {
            if (status === 'auth') {
                try {
                    const { data } = await Api.getUserSettings();

                    setUserSelectedLang(data.language);

                    const updated = { ...userData, avatar: data.avatar };
                    localStorage.setItem('userData', JSON.stringify(updated));

                    localStorage.setItem('langAndCurrency', userSelectedLang);
                } catch (e) {
                    console.log(e);
                }
            }
        })()
    }, [])


    return (
        <div className='nestfy__page'>
            <Header
                isProfilePage={isProfilePage}
                isHelpPage={isHelpPage}
                isAuth={status === 'auth'}
                isMainPage={isMainPage}
                isSettingsPage={isSettingsPage}
            />

            <main className={classNames('nestfy__main', { only__profile__page: onlyProfilePage, profile__page: isProfilePage, main__page: isMainPage })}>
                {<Outlet />}
                {isMainPage && <WelcomeToasty />}
            </main>

            {!profileEndpoints && <Footer isMainPage={isMainPage} />}
        </div>
    )
}
