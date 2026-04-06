import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Header from '../../components/layout/Header/Header';
import HelpHeaderPage from '../../components/layout/Header/HelpHeaderPage.jsx';
import Footer from "../../components/layout/Footer/Footer.jsx"

export default function Layout() {
    const { pathname } = useLocation();
    const isHelpPage = pathname === '/en/help';

    return (
        <div className='nestfy__page'>
            {isHelpPage
                ? <HelpHeaderPage isHelpPage={isHelpPage}/>
                : <Header />
            }

            <main className='antiplace__main'>
                {<Outlet />}
            </main>
            <Footer />
        </div>
    )
}
