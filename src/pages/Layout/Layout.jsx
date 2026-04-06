import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/layout/Header/Header';
import Footer from "../../components/layout/Footer/Footer.jsx"

export default function Layout() {
    return (
        <div className='nestfy__page'>
            <Header />
            
            <main className='antiplace__main'>
                {<Outlet />}
            </main>
            <Footer />
        </div>
    )
}
