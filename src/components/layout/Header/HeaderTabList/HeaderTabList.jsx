import { NavLink } from 'react-router';
import classNames from 'classnames';
import HomeIcon from '../../..//HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../../HeaderVideoIcons/ServicesIcon/ServicesIcon';
import { tabFields } from '../../../../data/headerData';

export default function HeaderTabList({
    lang,
    tabRef,
    tabWidth,
    translateX,
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
            <span
                className='active__tab'
                style={{
                    width: tabWidth,
                    transform: `translateX(${translateX}px)`,
                }}
            />

            {tabFields?.map(({ tabName, tab, title }, index) => (
                <NavLink
                    className='tab__list__item'
                    key={index}
                    ref={el => {
                        if (el) tabRef.current.set(tabName, el);
                        else tabRef.current.delete(tabName);
                    }}
                    to={`/${lang}/${tab}`}
                    role='button'
                    onClick={() => setHeaderActiveTab({ tabName, tabIndex: index })}
                >
                    <div
                        className={classNames('icon__container', {
                            active__tab__icon: headerActiveTab.tabName === tabName,
                        })}
                    >
                        {tab === 'home' ? (
                            <HomeIcon selected={headerActiveTab.tabName === tabName} />
                        ) : (
                            <ServicesIcon selected={headerActiveTab.tabName === tabName} />
                        )}
                    </div>

                    <div
                        className={classNames('list__item__title', {
                            active__tab__title: headerActiveTab.tabName === tabName,
                        })}
                    >
                        <p className='title'>{title}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}
