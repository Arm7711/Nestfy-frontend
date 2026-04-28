import React, { useState } from 'react';
import classNames from 'classnames';
import SearchSvg from '../../../components/svg/SearchSvg';
import SettingsSvg from '../../../components/svg/SettingsSvg';

export default function MessagesAside() {
    const [activeSearchInput, setActiveSearchInput] = useState(false);

    return (
        <div className='nestfy__messages__aside'>
            <div className={classNames('chats__tools', {active__input: activeSearchInput})}>

                <div className={classNames('search__container', { active: activeSearchInput })}>
                    <button className='search__button' onClick={() => setActiveSearchInput(true)}>
                        <span className='icon__container'>
                            <SearchSvg />
                        </span>
                    </button>
                </div>

                <button className={classNames('settings__button', { cancle__button: activeSearchInput })} onClick={() => setActiveSearchInput(false)}>
                    <span className={classNames('icon__container', { hidden: activeSearchInput })}>
                        <SettingsSvg />
                    </span>

                    <p className={classNames('cancle__text', { active: activeSearchInput })}>Cancle</p>
                </button>
            </div>

            <div className='messages__title__container'>
                <h1 className={classNames('title', { hidden: activeSearchInput })}>Messages</h1>
            </div>
        </div>
    )
}
