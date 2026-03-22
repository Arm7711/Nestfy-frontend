import React from 'react';
import { Outlet } from 'react-router';

import Header from '../../components/layout/Header/Header';

export default function Layout() {
    return (
        <div className='nestfy__page'>
            <Header />
            
            <main className='antiplace__main'>
                {<Outlet />}
            </main>
        </div>
    )
}
