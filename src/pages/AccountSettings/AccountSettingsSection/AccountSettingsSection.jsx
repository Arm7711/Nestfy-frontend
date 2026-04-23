import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import { accountSettingsSectionData } from '../../../data/accountSettingsData/accountSettingsSectionData';
import classNames from 'classnames';
import axios from 'axios';

// ─── API config ───────────────────────────────────────────────────────────────

const API_BASE = '/api/settings';

const TAB_ENDPOINTS = {
    personalInfo:     `${API_BASE}/profile`,
    loginAndSecurity: `${API_BASE}/security`,
    privacy:          `${API_BASE}/privacy`,
    notifications:    `${API_BASE}/notifications`,
    payments:         `${API_BASE}/payment`,
};

// Items that require a dedicated endpoint / method instead of the tab-level PUT
const SPECIAL_ENDPOINTS = {
    twoFactorEnabled: { method: 'post', url: `${API_BASE}/security/2fa` },
};

// ─── Animated expand/collapse ─────────────────────────────────────────────────

function AnimatedCollapse({ open, children }) {
    const innerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (open && innerRef.current) {
            setHeight(innerRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [open]);

    return (
        <div
            className='animated_collapse'
            style={{
                height: `${height}px`,
                overflow: 'hidden',
                transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div ref={innerRef}>{children}</div>
        </div>
    );
}

// ─── Floating-label input ─────────────────────────────────────────────────────

function FloatingInput({ id, label, value, onChange, type = 'text' }) {
    return (
        <div className='floating_input'>
            <input
                id={id}
                className='floating_input__field'
                type={type}
                placeholder=' '
                value={value}
                onChange={e => onChange(e.target.value)}
                autoComplete='off'
            />
            <label className='floating_input__label' htmlFor={id}>
                {label}
            </label>
        </div>
    );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────

function ToggleSwitch({ checked, onChange, label }) {
    return (
        <div className='toggle_row'>
            <span className='toggle_row__label'>{label}</span>
            <label className='toggle_switch'>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                />
                <span className='toggle_switch__track'>
                    <span className='toggle_switch__thumb' />
                </span>
            </label>
        </div>
    );
}

// ─── Single settings item ─────────────────────────────────────────────────────

function SettingsItem({ item, tabName, serverData, onSaveSuccess }) {
    const [isEditing, setIsEditing]   = useState(false);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading]       = useState(false);
    const [error, setError]           = useState(null);
    const [saved, setSaved]           = useState(false);

    // Derive display value from server data or fall back to contentDefault
    const rawValue = serverData?.[item.metaKey];
    const displayValue =
        rawValue !== undefined && rawValue !== null
            ? String(rawValue)
            : item.contentDefault;

    const isEmpty =
        displayValue === 'Not provided' ||
        displayValue === 'Not set'      ||
        displayValue === 'Not requested';

    // Pre-populate form when opening
    const handleEdit = () => {
        if (item.type === 'text' && item.inputLabels.length > 1) {
            // fullName: expects { first_name, last_name } etc. from server
            setFormValues(typeof rawValue === 'object' ? rawValue ?? {} : {});
        } else {
            setFormValues({ [item.metaKey]: rawValue ?? '' });
        }
        setError(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormValues({});
        setError(null);
    };

    const setField = useCallback((key, val) => {
        setFormValues(prev => ({ ...prev, [key]: val }));
    }, []);

    const buildPayload = () => {
        if (item.type === 'text' && item.inputLabels.length > 1) {
            return { [item.metaKey]: formValues };
        }
        return { [item.metaKey]: formValues[item.metaKey] };
    };

    const handleSave = async () => {
        const special  = SPECIAL_ENDPOINTS[item.metaKey];
        const endpoint = special?.url ?? TAB_ENDPOINTS[tabName];
        const method   = special?.method ?? 'put';
        if (!endpoint) return;

        setLoading(true);
        setError(null);

        try {
            const payload = buildPayload();
            await axios[method](endpoint, payload);

            onSaveSuccess?.(item.metaKey, payload[item.metaKey]);
            setSaved(true);
            setIsEditing(false);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            setError(
                err?.response?.data?.message || 'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (item.type === 'readonly') {
        return (
            <div className='settings_item settings_item--readonly'>
                <div className='settings_item__header'>
                    <div className='settings_item__meta'>
                        <span className='settings_item__title'>{item.title}</span>
                        <span className='settings_item__value settings_item__value--muted'>
                            {displayValue}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames('settings_item', {
                'settings_item--open':  isEditing,
                'settings_item--saved': saved,
            })}
        >
            {/* ── Collapsed row ── */}
            <div className='settings_item__header'>
                <div className='settings_item__meta'>
                    <span className='settings_item__title'>{item.title}</span>
                    {!isEditing && (
                        <span
                            className={classNames('settings_item__value', {
                                'settings_item__value--empty': isEmpty,
                            })}
                        >
                            {displayValue}
                        </span>
                    )}
                    {isEditing && (
                        <span className='settings_item__desc'>{item.descInfo}</span>
                    )}
                </div>

                <div className='settings_item__ctrl'>
                    {isEditing ? (
                        <button
                            className='settings_item__btn settings_item__btn--cancel'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            className='settings_item__btn settings_item__btn--edit'
                            onClick={handleEdit}
                        >
                            {isEmpty ? 'Add' : 'Edit'}
                        </button>
                    )}
                </div>
            </div>

            {/* ── Animated form ── */}
            <AnimatedCollapse open={isEditing}>
                <div className='settings_item__form'>

                    {/* text: single */}
                    {item.type === 'text' && item.inputLabels.length === 1 && (
                        <FloatingInput
                            id={`${item.metaKey}_0`}
                            label={item.inputLabels[0]}
                            value={formValues[item.metaKey] ?? ''}
                            onChange={val => setField(item.metaKey, val)}
                        />
                    )}

                    {/* text: multiple (e.g. Full Name) */}
                    {item.type === 'text' && item.inputLabels.length > 1 && (
                        <div className='settings_item__row_inputs'>
                            {item.inputLabels.map((label, i) => {
                                const subKey = label.toLowerCase().replace(/\s+/g, '_');
                                return (
                                    <FloatingInput
                                        key={i}
                                        id={`${item.metaKey}_${i}`}
                                        label={label}
                                        value={formValues[subKey] ?? ''}
                                        onChange={val => setField(subKey, val)}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* select */}
                    {item.type === 'select' && (
                        <div className='floating_input'>
                            <select
                                className='floating_input__field floating_input__field--select'
                                value={formValues[item.metaKey] ?? ''}
                                onChange={e => setField(item.metaKey, e.target.value)}
                            >
                                <option value='' disabled>
                                    {item.inputLabels[0]}
                                </option>
                                {/* Extend with real options per metaKey if needed */}
                            </select>
                            <label className='floating_input__label floating_input__label--raised'>
                                {item.inputLabels[0]}
                            </label>
                        </div>
                    )}

                    {/* toggle */}
                    {item.type === 'toggle' && (
                        <ToggleSwitch
                            label={item.inputLabels[0]}
                            checked={
                                formValues[item.metaKey] !== undefined
                                    ? Boolean(formValues[item.metaKey])
                                    : item.contentDefault === 'Enabled'
                            }
                            onChange={val => setField(item.metaKey, val)}
                        />
                    )}

                    {error && (
                        <p className='settings_item__error'>{error}</p>
                    )}

                    <button
                        className={classNames('settings_item__save_btn', {
                            'settings_item__save_btn--loading': loading,
                        })}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className='settings_item__spinner' />
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            </AnimatedCollapse>
        </div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function AccountSettingsSection() {
    const { lang, activeTab } = useParams();

    const [selectedTab, setSelectedTab] = useState(accountSettingsSectionData[0]);
    const [serverData,  setServerData]  = useState({});
    const [fetchError,  setFetchError]  = useState(null);
    const [fetching,    setFetching]    = useState(false);

    // Sync tab from URL
    useEffect(() => {
        if (!activeTab) return;
        const match = accountSettingsSectionData.find(
            s => s.pathName.toLowerCase().trim() === activeTab.toLowerCase().trim()
        );
        if (match) setSelectedTab(match);
    }, [activeTab]);

    // Fetch server data when tab changes
    useEffect(() => {
        const endpoint = TAB_ENDPOINTS[selectedTab?.tabName];
        if (!endpoint) return;

        setFetching(true);
        setFetchError(null);

        axios
            .get(endpoint)
            .then(res => {
                setServerData(prev => ({ ...prev, ...res.data }));
            })
            .catch(err => {
                setFetchError(
                    err?.response?.data?.message || 'Failed to load settings.'
                );
            })
            .finally(() => setFetching(false));
    }, [selectedTab?.tabName]);

    const handleSaveSuccess = (metaKey, value) => {
        setServerData(prev => ({ ...prev, [metaKey]: value }));
    };

    return (
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

                {!fetching &&
                    !fetchError &&
                    selectedTab?.items?.map(item => (
                        <SettingsItem
                            key={item.metaKey}
                            item={item}
                            tabName={selectedTab.tabName}
                            serverData={serverData}
                            onSaveSuccess={handleSaveSuccess}
                        />
                    ))}
            </div>
        </div>
    );
}