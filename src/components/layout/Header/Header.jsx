import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';

import SiteLogo from '../../../assets/images/logo/nestfy-site-logo.svg?react'
import HomeIcon from '../../HeaderVideoIcons/HomeIcon/HomeIcon';
import ServicesIcon from '../../HeaderVideoIcons/ServicesIcon/ServicesIcon';
import LangSvg from '../../svg/LangSvg';

const tabFields = [
    {
        tabName: 'homeTab',
        tab: 'home',
        title: 'Housing',
    },
    {
        tabName: 'servicesTab',
        tab: 'services',
        title: 'Services',
    },
];

export default function Header() {
    const tabRef = useRef(new Map());
    const [headerActiveTab, setHeaderActiveTab] = useState(
        {
            tabName: 'homeTab',
            tabIndex: 0
        }
    );
    const [tabWidth, setTabWidth] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    useLayoutEffect(() => {
        const el = tabRef.current.get(headerActiveTab.tabName);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();

        setTabWidth(rect.width);
        setTranslateX(rect.left - parentRect.left);
    }, [headerActiveTab]);

    return (
        <header className='header'>
            <div className='header__section__first'>
                <div className='header__section__first__content'>
                    <div className='header__section__first__logo__block'>
                        <SiteLogo className='header__section__first__logo' />
                    </div>

                    <div className='header__section__first__tab__list'>
                        <span
                            className='active__tab'
                            style={{
                                width: tabWidth,
                                transform: `translateX(${translateX}px)`
                            }}
                        />

                        {tabFields?.map(({ tabName, tab, title }, index) => (
                            <div className='tab__list__item' key={index} ref={
                                el => {
                                    if (el) {
                                        tabRef.current.set(tabName, el);
                                    } else {
                                        tabRef.current.delete(tabName);
                                    }
                                }}
                                role='button'
                                onClick={() => setHeaderActiveTab({ tabName, tabIndex: index })}
                            >
                                <div className={classNames('icon__container', { active__tab__icon: headerActiveTab.tabName === tabName })}>
                                    {tab === 'home'
                                        ?
                                        <HomeIcon
                                            selected={headerActiveTab.tabName === tabName}
                                        />
                                        :
                                        <ServicesIcon
                                            selected={headerActiveTab.tabName === tabName}

                                        />
                                    }
                                </div>
                                <div className={classNames('list__item__title', { active__tab__title: headerActiveTab.tabName === tabName })}>
                                    <p className='title'>{title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='header__section__tab__bar__tools'>
                        <div className='header__section__tab__bar__tools__item lang'>
                            <LangSvg />
                        </div>

                        <div className='header__section__tab__bar__tools__item menu'>
                            <button className='toggle'>
                                <span className='line line--1' />
                                <span className='line line--2' />
                                <span className='line line--3' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
