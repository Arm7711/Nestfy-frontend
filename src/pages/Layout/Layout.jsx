import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/layout/Header/Header';
import Footer from "../../components/layout/Footer/Footer.jsx"
import classNames from 'classnames';

export default function Layout() {
    const { lang } = useParams();
    const { pathname } = useLocation();
    const isMainPage = pathname === `/${lang}` || pathname === `/${lang}/home` || pathname === `/${lang}/services`;
    const isHelpPage = pathname === `/${lang}/help-center`;
    const isProfilePage = pathname === `/${lang}/profile`;

    const status = useSelector(state => state.authReducer.status);

    console.log(status);


    return (
        <div className='nestfy__page'>
            <Header isProfilePage={isProfilePage} isHelpPage={isHelpPage} isAuth={status === 'auth'} />

            <main className={classNames('nestfy__main', { profile__page: isProfilePage, main__page: isMainPage })}>
                {<Outlet />}
            </main>

            <Footer />
        </div>
    )
}
