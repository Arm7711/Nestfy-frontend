import { NavLink } from 'react-router';
import classNames from 'classnames';
import SiteLogo from '../../../../assets/images/logo/nestfy-site-logo.svg?react';
import SiteLogoSvg from '../../../../assets/images/logo/site-logo-n.svg?react';

export default function HeaderLogo({ lang, isHelpPage, isProfilePage, isSettingsPage }) {
    return (
        <NavLink to={`/${lang}`} className={classNames('header__section__first__logo__block', { settings__page__logo: isSettingsPage })}>
            {isHelpPage || isSettingsPage ? (
                <>
                    <SiteLogoSvg className='header__section__first__logo' />
                    {!isSettingsPage && <h1 className='help__title'>Help center</h1>}
                </>
            ) : (
                <SiteLogo
                    className={classNames('header__section__first__logo', {
                        profile__page__header: isProfilePage,
                    })}
                />
            )}
        </NavLink>
    );
}
