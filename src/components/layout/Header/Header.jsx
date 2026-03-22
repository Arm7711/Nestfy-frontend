import React from 'react';
import SiteLogo from '../../../assets/images/logo/nestfy-site-logo.svg?react'
import HomeIcon from '../../HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../HeaderVideoIcons/ServicesIcon/ServicesIcon';

export default function Header() {
    return (
        <header className='header'>
            <div className='header__section__first'>
                <div className='header__section__first__content'>
                    <div className='header__section__first__logo__block'>
                        <SiteLogo className='header__section__first__logo' />
                    </div>
                </div>
            </div>
        </header>
    )
}
