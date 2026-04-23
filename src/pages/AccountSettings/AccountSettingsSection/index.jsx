import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { accountSettingsSectionData } from '../../../data/accountSettingsData/accountSettingsSectionData';
import SettingsApi from '../../../api/settings.api';
import SettingsItem from './SettingsItem';

export default function AccountSettingsSection() {
    const { activeTab } = useParams();

    const [selectedTab, setSelectedTab] = useState(accountSettingsSectionData[0]);
    const [serverData, setServerData] = useState({});
    const [fetchError, setFetchError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const [editingMetaKey, setEditingMetaKey] = useState(null);
    const startEdit = (metaKey) => setEditingMetaKey(metaKey);
    const endEdit = () => setEditingMetaKey(null);

    useEffect(() => {
        if (!activeTab) return;
        const match = accountSettingsSectionData.find(
            s => s.pathName.toLowerCase().trim() === activeTab.toLowerCase().trim()
        );
        if (match) setSelectedTab(match);
    }, [activeTab]);

    useEffect(() => {
        if (!selectedTab?.tabName) return;

        setFetching(true);
        setFetchError(null);

        SettingsApi.getSettings(selectedTab.tabName)
            .then(data => {
                setServerData(prev => ({ ...prev, ...data }));
            })
            .catch(err => {
                setFetchError(err?.response?.data?.message || 'Failed to load settings.');
            })
            .finally(() => setFetching(false));
    }, [selectedTab?.tabName]);

    const handleSaveSuccess = (metaKey, value) => {
        setServerData(prev => ({ ...prev, [metaKey]: value }));
    };

    return (
        <div className='account_settings_section_container'>
            <div className='account_settings_section'>
                <div className='account_settings_section__heading'>
                    <h1 className='account_settings_section__title'>
                        {selectedTab?.title ?? ''}
                    </h1>
                </div>

                <div className='account_settings_section__list'>
                    {fetching && (
                        <div className='account_settings_section__skeleton'>
                            {[1, 2, 3].map(n => (
                                <div key={n} className='skeleton_row'>
                                    <div className='skeleton_row__line skeleton_row__line--short' />
                                    <div className='skeleton_row__line skeleton_row__line--long' />
                                </div>
                            ))}
                        </div>
                    )}

                    {!fetching && fetchError && (
                        <p className='account_settings_section__fetch_error'>{fetchError}</p>
                    )}

                    {!fetching && !fetchError && selectedTab?.items?.map(item => (
                        <SettingsItem
                            key={item.metaKey}
                            item={item}
                            tabName={selectedTab.tabName}
                            serverData={serverData}
                            onSaveSuccess={handleSaveSuccess}
                            editingMetaKey={editingMetaKey}
                            onStartEdit={startEdit}
                            onEndEdit={endEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}