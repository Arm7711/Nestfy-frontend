import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import { accountSettingsAsideData } from '../../../data/accountSettingsData/accountSettingsAsideData';
import classNames from 'classnames';

import PersonSvg from '../../../components/svg/PersonSvg';
import PaymentSvg from '../../../components/svg/PaymentSvg';
import NotificationsSvg from '../../../components/svg/NotificationsSvg';
import PrivacySvg from '../../../components/svg/PrivacySvg';
import SecuritySvg from '../../../components/svg/SecuritySvg';

export default function AccountSettingsAside() {
    const { lang } = useParams();
    const [activeSettingsTab, setActiveSettingsTab] = useState('personalInfo');

    return (
        <div className='user__account__settings__aside'>
            <div className='title__container'>
                <h1 className='title'>Account settings</h1>
            </div>

            <div className='tabs__container'>
                {accountSettingsAsideData.map((item, index) => (
                    <NavLink className={classNames('tab__link', { active__tab: item?.tabName === activeSettingsTab })} to={`/${lang}/account-settings/${item?.pathName}`} key={index}>
                        <button className='tab__item' onClick={() => setActiveSettingsTab(item?.tabName)}>
                            {
                                (item?.tabName === 'personalInfo' && <PersonSvg />) ||
                                (item?.tabName === 'loginAndSecurity' && <SecuritySvg />) ||
                                (item?.tabName === 'privacy' && <PrivacySvg />) ||
                                (item?.tabName === 'notifications' && <NotificationsSvg />) ||
                                (item?.tabName === 'payments' && <PaymentSvg />)
                            }
                            <span className='text'>{item?.content}</span>
                        </button>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
