import React from 'react';
import AccountSettingsAside from './AccountSettingsAside/AccountSettingsAside';
import AccountSettingsSection from './AccountSettingsSection/index';

export default function AccountSettings() {
    return (
        <div className='user__account__settings'>
            <AccountSettingsAside />
            <AccountSettingsSection />
        </div>
    )
}
