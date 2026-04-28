import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion'
import SettingsApi from '../../../api/settings.api';
import CommonSwitch from '../../../components/_common/Switchs/CommonSwitch';
import AnimatedCollapse from './AnimatedCollapse';
import FloatingInput from './FloatingInput';

const FULL_NAME_KEYS = ['first_name', 'last_name'];

export default function SettingsItem({ item, tabName, serverData, onSaveSuccess, editingMetaKey, onStartEdit, onEndEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saved, setSaved] = useState(false);

    const rawValue = serverData?.[item.metaKey];
    const hasError = Boolean(error && isEditing);

    const isActiveEdit = editingMetaKey === item.metaKey;
    const isOtherEditing = editingMetaKey !== null && editingMetaKey !== item.metaKey;


    const normalizeDisplayValue = () => {
        if (rawValue == null) return item.contentDefault;

        if (item.metaKey === 'fullName') {
            if (typeof rawValue === 'string') return rawValue;

            const first = rawValue?.first_name || '';
            const last = rawValue?.last_name || '';
            return `${first} ${last}`.trim();
        }

        return typeof rawValue === 'object'
            ? JSON.stringify(rawValue)
            : String(rawValue);
    };

    const displayValue = normalizeDisplayValue();

    const isEmpty =
        displayValue === 'Not provided' ||
        displayValue === 'Not set' ||
        displayValue === 'Not requested';

    const setField = useCallback((key, val) => {
        if (error) setError(null);

        setFormValues(prev => ({ ...prev, [key]: val }));
    }, [error]);

    useEffect(() => {
        if (!isActiveEdit) {
            setFormValues({});
            setError(null);
            setLoading(false);
            setSaved(false);
        }
    }, [isActiveEdit]);


    const handleEdit = () => {
        if (isOtherEditing) return;

        setError(null);

        const value = rawValue ?? '';

        if (item.metaKey === 'fullName') {
            if (typeof value === 'string') {
                const [first = '', ...rest] = value.trim().split(' ');

                setFormValues({
                    first_name: first,
                    last_name: rest.join(' ')
                });
            } else {
                setFormValues({
                    first_name: value?.first_name ?? '',
                    last_name: value?.last_name ?? ''
                });
            }
        }

        else if (item.metaKey === 'dateOfBirth') {
            const digits = String(value).replace(/\D/g, '').slice(0, 8);

            const formatted = [
                digits.slice(0, 2),
                digits.slice(2, 4),
                digits.slice(4, 8),
            ]
                .filter(Boolean)
                .join('/');

            setFormValues({
                [item.metaKey]: formatted
            });
        }

        else if (item.mask === 'date-slash') {
            const digits = String(value).replace(/\D/g, '').slice(0, 8);

            const formatted = [
                digits.slice(0, 2),
                digits.slice(2, 4),
                digits.slice(4, 8),
            ]
                .filter(Boolean)
                .join('/');

            setFormValues({
                [item.metaKey]: formatted
            });
        }

        else if (item.type === 'text' && item.inputLabels.length > 1) {
            setFormValues(
                value && typeof value === 'object'
                    ? value
                    : {}
            );
        }

        else {
            setFormValues({
                [item.metaKey]: value
            });
        }

        setIsEditing(true);
        onStartEdit(item.metaKey);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormValues({});
        setError(null);
        onEndEdit();
    };

    const buildPayload = () => {
        if (item.metaKey === 'fullName') {
            const first = formValues.first_name || '';
            const last = formValues.last_name || '';

            return {
                [item.metaKey]: `${first} ${last}`.trim()
            };
        }

        let value = formValues[item.metaKey];

        if (item.mask === 'date-slash') {
            value = value ? value.replace(/\D/g, '') : '';
        }

        return {
            [item.metaKey]: value
        };
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = buildPayload();

            await SettingsApi.updateSetting(
                item.metaKey,
                tabName,
                payload
            );

            onSaveSuccess?.(item.metaKey, payload[item.metaKey]);
            onEndEdit();

            setSaved(true);
            setIsEditing(false);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong.');
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
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'spring' }}
            viewport={{ once: false, margin: '-20px' }}
            className={classNames('settings_item', {
                'settings_item--open': isEditing,
                'settings_item--saved': saved,
                'settings_item--disabled': isOtherEditing,
            })}
        >
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
                            disabled={isOtherEditing}
                        >
                            {isEmpty ? 'Add' : 'Edit'}
                        </button>
                    )}
                </div>
            </div>

            <AnimatedCollapse open={isEditing} isError={error}>
                <div className='settings_item__form'>

                    {item.metaKey === 'fullName' && (
                        <div className='settings_item__row_inputs'>
                            {FULL_NAME_KEYS.map((key, i) => (
                                <FloatingInput
                                    key={key}
                                    id={`${item.metaKey}_${key}`}
                                    label={item.inputLabels[i]}
                                    value={formValues[key] ?? ''}
                                    onChange={val => setField(key, val)}
                                />
                            ))}
                        </div>
                    )}

                    {item.type === 'text' &&
                        item.inputLabels.length === 1 &&
                        item.metaKey !== 'fullName' && (

                            <FloatingInput
                                id={`${item.metaKey}_0`}
                                label={item.inputLabels[0]}
                                value={formValues[item.metaKey] ?? ''}
                                onChange={val => setField(item.metaKey, val)}
                                mask={item.mask}
                                maxLength={item.maxLength}
                            />

                        )}

                    {item.type === 'text' &&
                        item.inputLabels.length > 1 &&
                        item.metaKey !== 'fullName' && (
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

                    {item.type === 'toggle' && (
                        <div className='toggle_row'>
                            <span className='toggle_row__label'>{item.inputLabels[0]}</span>
                            <CommonSwitch
                                checked={
                                    formValues[item.metaKey] !== undefined
                                        ? Boolean(formValues[item.metaKey])
                                        : item.contentDefault === 'Enabled'
                                }
                                onChange={val => setField(item.metaKey, val)}
                            />
                        </div>
                    )}

                    <p className={classNames('settings_item__error', { active: error })}>{error}</p>

                    <button
                        className={classNames('settings_item__save_btn', {
                            'settings_item__save_btn--loading': loading,
                            'settings_item__save_btn--error': hasError
                        })}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? <span className='settings_item__spinner' /> : 'Save'}
                    </button>
                </div>
            </AnimatedCollapse>
        </motion.div>
    );
}