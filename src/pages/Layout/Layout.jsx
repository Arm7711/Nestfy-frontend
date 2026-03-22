import React from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <main className='antiplace__main'>
            {<Outlet />}
        </main>
    )
}
