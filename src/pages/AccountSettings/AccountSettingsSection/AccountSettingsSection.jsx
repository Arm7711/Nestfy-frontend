import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { accountSettingsSectionData } from '../../../data/accountSettingsData/accountSettingsSectionData';

export default function AccountSettingsSection() {
    const { lang, activeTab } = useParams();
    const [selectedTab, setSelectedTab] = useState(accountSettingsSectionData[0]);

    useEffect(() => {
        if (activeTab) {
            const activeSection = accountSettingsSectionData.filter((item) => item?.pathName?.toLowerCase()?.trim() === activeTab?.toLowerCase()?.trim());
            setSelectedTab(activeSection[0]);
        }
    }, [activeTab]);


    return (
        <div className='user__account__settings__section'>
            <div className='container'>
                <div className='title__container'>
                    <h1 className='title'>{selectedTab?.title || 'None'}</h1>
                </div>
            </div>
        </div>
    )
}
