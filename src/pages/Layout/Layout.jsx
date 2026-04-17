import React from 'react';
import { Outlet, useParams, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/layout/Header/Header';
import Footer from "../../components/layout/Footer/Footer.jsx"
import classNames from 'classnames';
import WelcomeToasty from '../../components/WelcomeToasty/WelcomeToasty.jsx';

export default function Layout() {
    const { lang } = useParams();
    const { pathname } = useLocation();
    const isMainPage =
        matchPath({ path: '/:lang/home' }, pathname) ||
        matchPath({ path: '/:lang/services' }, pathname) ||
        matchPath({ path: '/:lang' }, pathname);
    const isHelpPage = pathname === `/${lang}/help-center`;
    const isProfilePage = pathname === `/${lang}/profile`;

    const status = useSelector(state => state.authReducer.status);

    console.log(status);


    return (
        <div className='nestfy__page'>
            <Header isProfilePage={isProfilePage} isHelpPage={isHelpPage} isAuth={status === 'auth'} isMainPage={isMainPage} />

            <main className={classNames('nestfy__main', { profile__page: isProfilePage, main__page: isMainPage })}>
                {<Outlet />}
                <WelcomeToasty />
            </main>

            <Footer />
        </div>
    )
}
