import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/layout/Header/Header';
import HelpHeaderPage from '../../components/layout/Header/HelpHeaderPage.jsx';
import Footer from "../../components/layout/Footer/Footer.jsx"

export default function Layout() {
    const {lang} = useParams();
    const { pathname } = useLocation();
    const isHelpPage = pathname === `/${lang}/help`;
    const isProfilePage = pathname === `/${lang}/profile`;

    const status = useSelector(state => state.authReducer.status);

    console.log(status);
    

    return (
        <div className='nestfy__page'>
            {isHelpPage
                ? <HelpHeaderPage isHelpPage={isHelpPage} />
                : <Header isProfilePage={isProfilePage} isAuth={status === 'auth'} />
            }

            <main className='antiplace__main'>
                {<Outlet />}
            </main>
            <Footer />
        </div>
    )
}
