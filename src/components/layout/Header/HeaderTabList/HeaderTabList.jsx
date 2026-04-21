import { NavLink } from 'react-router';
import classNames from 'classnames';
import { motion } from "framer-motion";
import HomeIcon from '../../..//HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../../HeaderVideoIcons/ServicesIcon/ServicesIcon';
import { tabFields } from '../../../../data/headerData';

export default function HeaderTabList({
    lang,
    headerActiveTab,
    setHeaderActiveTab,
    isProfilePage,
    isHelpPage,
    isTop,
    activeScrollHeader,
    isSettingsPage
}) {
    return (
        <div
            className={classNames('header__section__first__tab__list', {
                profile__page__header: isProfilePage,
                help__page__header: isHelpPage,
                account__settings__header: isSettingsPage,
                scroll: !isTop,
                scroll__header: !isTop && activeScrollHeader,
            })}
        >

            {tabFields?.map(({ tabName, tab, title }, index) => {
                const isActive = headerActiveTab.tabName === tabName;

                return (
                    <NavLink
                        className='tab__list__item'
                        key={index}
                        to={`/${lang}/${tab}`}
                        role='button'
                        onClick={() => setHeaderActiveTab({ tabName, tabIndex: index })}
                        style={{ position: "relative" }}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="header-tab-indicator"
                                className="active__tab"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35
                                }}
                            />
                        )}

                        <div
                            className={classNames('icon__container', {
                                active__tab__icon: isActive,
                            })}
                        >
                            {tab === 'home' ? (
                                <HomeIcon selected={isActive} />
                            ) : (
                                <ServicesIcon selected={isActive} />
                            )}
                        </div>

                        <div
                            className={classNames('list__item__title', {
                                active__tab__title: isActive,
                            })}
                        >
                            <p className='title'>{title}</p>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
}
