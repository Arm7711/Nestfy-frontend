import React, { useState, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import CommonModal from '../../../components/_common/Modals/CommonModal/CommonModal';
import { useQueryParams } from '../../../hooks/useQueryParams';

import MessageSvg from '../../../components/svg/MessageSvg';
import CloseSvg from '../../../components/svg/CloseSvg';
import SearchSvg from '../../../components/svg/SearchSvg';
import SettingsSvg from '../../../components/svg/SettingsSvg';
import ArchiveSvg from '../../../components/svg/ArchiveSvg';
import FeedbackSvg from '../../../components/svg/FeedbackSvg';
import Chevron from '../../../components/svg/ArrowSvg';
import MessageAllSvg from '../../../components/svg/MessageAllSvg';
import SiteLogo from '../../../assets/images/logo/site-logo-n.svg?react';
import BackArrowSvg from '../../../components/svg/BackArrowSvg';
import { NavLink, useParams } from 'react-router';

const FILTER_OPTIONS = [
    { label: 'All', value: null, Icon: MessageAllSvg },
    { label: 'Support', value: 'support', Icon: SiteLogo },
];

const DEFAULTS = {
    inbox_type: null,
    unread: null,
    archived: null,
};

export default function MessagesAside() {
    const { get, set, remove } = useQueryParams(DEFAULTS);
    const { lang } = useParams();

    const inboxType = get('inbox_type') ?? null;
    const isUnread = get('unread');
    const isArchived = get('archived');

    const [flag, setFlag] = useState(false);
    const [activeSearchInput, setActiveSearchInput] = useState(false);
    const [messagesInputValue, setMessagesInputValue] = useState('');
    const [openMessagesModal, setOpenMessagesModal] = useState(false);
    const [isOpenOptionsMenu, setIsOpenOptionsMenu] = useState(false);

    const menuRef = useRef(null);
    const firstFilterRef = useRef(null);
    const [filterWidth, setFilterWidth] = useState(0);

    useLayoutEffect(() => {
        if (!firstFilterRef.current || isOpenOptionsMenu) return;

        const el = firstFilterRef.current;
        let frameId;

        const measure = () => {
            frameId = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.width < 300) {
                    setFilterWidth(rect.width);
                }
            });
        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);

        return () => {
            cancelAnimationFrame(frameId);
            observer.disconnect();
        };
    }, [inboxType, isArchived, isOpenOptionsMenu, flag]);

    useLayoutEffect(() => {
        const handleOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpenOptionsMenu(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const handleSettingsClick = () => {
        if (activeSearchInput) {
            setActiveSearchInput(false);
        } else {
            setOpenMessagesModal(true);
        }
    };

    const handleSelectFilter = (value) => {
        if (value === null) {
            remove('inbox_type');
        } else {
            set('inbox_type', value);
        }
        setIsOpenOptionsMenu(false);
    };

    const handleUnreadToggle = () => {
        if (isUnread) {
            remove('unread');
        } else {
            set('unread', true);
        }
    };

    const handleOpenArchived = () => {
        setOpenMessagesModal(false);
        set('archived', true);
    };

    const handleBackFromArchived = () => {
        remove('archived');
    };

    const activeFilter = FILTER_OPTIONS.find(f => f.value === inboxType) ?? FILTER_OPTIONS[0];

    if (isArchived) {
        return (
            <div className='nestfy__messages__aside'>
                <div className='nestfy__messages__aside__header'>
                    <div className={classNames('chats__tools', { active__input: activeSearchInput })}>
                        <div className={classNames('search__container', { active: activeSearchInput })}>
                            <div className='input__container'>
                                <input
                                    type='text'
                                    id='messages__input'
                                    className='messages__search__input'
                                    value={messagesInputValue}
                                    onChange={({ target }) => setMessagesInputValue(target.value)}
                                    placeholder='Search all messages'
                                />
                                <button
                                    className={classNames('clear__messages__search__input__value', { active: messagesInputValue })}
                                    onClick={() => setMessagesInputValue('')}
                                >
                                    <CloseSvg />
                                </button>
                            </div>
                            <button
                                className={classNames('search__button', { active: activeSearchInput })}
                                onClick={() => setActiveSearchInput(true)}
                            >
                                <label htmlFor='messages__input' className={classNames('icon__container', { active: activeSearchInput })}>
                                    <SearchSvg />
                                </label>
                            </button>
                        </div>

                        <div
                            role='button'
                            className={classNames('settings__button', { cancle__button: activeSearchInput })}
                            onClick={() => {
                                if (activeSearchInput) {
                                    setActiveSearchInput(false);
                                } else {
                                    handleBackFromArchived();
                                }
                            }}
                        >
                            <p className={classNames('cancle__text', { active: activeSearchInput })}>Cancel</p>
                            <span className={classNames('icon__container', { hidden: activeSearchInput })}>
                                <BackArrowSvg />
                            </span>
                        </div>
                    </div>

                    <div className='messages__title__container'>
                        <h1 className={classNames('title', { hidden: activeSearchInput })}>Archived</h1>
                    </div>
                </div>

                <div className='chats__container'>
                    <div className='chat__message__iono__container'>
                        <MessageSvg />
                    </div>
                    <div className='info__no__chats'>
                        <h1 className='title'>You don't have any archived messages</h1>
                        <p className='desc'>When you archive a message, it will appear here.</p>
                        <NavLink
                            to={`/${lang}/messages`}
                            onClick={() => setFlag(prev => !prev)}
                            className={classNames('show__all__messages', { active__no__chats: inboxType !== null || isUnread || isArchived })}
                        >
                            Show all messages
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='nestfy__messages__aside'>
            <div className='nestfy__messages__aside__header'>
                <div className={classNames('chats__tools', { active__input: activeSearchInput })}>
                    <div className={classNames('search__container', { active: activeSearchInput })}>
                        <div className='input__container'>
                            <input
                                type='text'
                                id='messages__input'
                                className='messages__search__input'
                                value={messagesInputValue}
                                onChange={({ target }) => setMessagesInputValue(target.value)}
                                placeholder='Search all messages'
                            />
                            <button
                                className={classNames('clear__messages__search__input__value', { active: messagesInputValue })}
                                onClick={() => setMessagesInputValue('')}
                            >
                                <CloseSvg />
                            </button>
                        </div>
                        <button
                            className={classNames('search__button', { active: activeSearchInput })}
                            onClick={() => setActiveSearchInput(true)}
                        >
                            <label htmlFor='messages__input' className={classNames('icon__container', { active: activeSearchInput })}>
                                <SearchSvg />
                            </label>
                        </button>
                    </div>

                    <div
                        role='button'
                        className={classNames('settings__button', { cancle__button: activeSearchInput })}
                        onClick={handleSettingsClick}
                    >
                        <span className={classNames('icon__container', { hidden: activeSearchInput })}>
                            <SettingsSvg />
                        </span>
                        <p className={classNames('cancle__text', { active: activeSearchInput })}>Cancel</p>
                    </div>
                </div>

                <CommonModal
                    isOpen={openMessagesModal}
                    onClose={() => setOpenMessagesModal(false)}
                    title='Messaging settings'
                    width={570}
                    height={245}
                >
                    <div className='messages__settings__modal__option__container'>
                        <button className='messages__settings__modal__option' onClick={handleOpenArchived}>
                            <ArchiveSvg />
                            <p className='text'>Archived</p>
                        </button>
                        <button className='messages__settings__modal__option'>
                            <FeedbackSvg />
                            <p className='text'>Give feedback</p>
                        </button>
                    </div>
                </CommonModal>

                <div className='messages__title__container'>
                    <h1 className={classNames('title', { hidden: activeSearchInput })}>Messages</h1>
                </div>
            </div>

            <div className='messages__filters__container'>
                <div className='option__filter'>
                    <div
                        ref={menuRef}
                        role='button'
                        className={classNames('filter menu__filter', { active: isOpenOptionsMenu })}
                        onClick={(e) => { e.stopPropagation(); setIsOpenOptionsMenu(p => !p); }}
                    >
                        <button ref={firstFilterRef} className='option__button'>
                            <p className='selected'>{activeFilter.label}</p>
                            <Chevron className={classNames('icon', { active: isOpenOptionsMenu })} />
                        </button>

                        <div
                            className={classNames('option__menu__list__container', { active: isOpenOptionsMenu })}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {FILTER_OPTIONS.map(({ label, value, Icon }) => (
                                <button
                                    key={label}
                                    className='data'
                                    onClick={() => handleSelectFilter(value)}
                                >
                                    {Icon && <Icon className='icon' />}
                                    <p className='text'>{label}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className='option__filter'
                    style={{
                        transform: `translateX(${isOpenOptionsMenu ? -12 : filterWidth}px)`,
                    }}
                >
                    <button
                        className={classNames('filter outline', { active: isUnread })}
                        onClick={handleUnreadToggle}
                    >
                        <p className='selected'>Unread</p>
                    </button>
                </div>
            </div>

            <div className='chats__container'>
                <div className='chat__message__iono__container'>
                    <MessageSvg />
                </div>
                <div className='info__no__chats'>
                    <h1 className='title'>You don't have any messages</h1>
                    <p className='desc'>When you receive a new message, it will appear here.</p>
                    <NavLink
                        to={`/${lang}/messages`}
                        onClick={() => setFlag(prev => !prev)}
                        className={classNames('show__all__messages', { active__no__chats: inboxType !== null || isUnread || isArchived })}
                    >
                        Show all messages
                    </NavLink>
                </div>
            </div>
        </div>
    );
}