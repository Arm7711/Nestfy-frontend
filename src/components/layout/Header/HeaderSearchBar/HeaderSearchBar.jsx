import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import SearchSvg from '../../../svg/SearchSvg';
import SearchOptions from '../SearchOptions/SearchOptions';
import { searchTabFields, searchTabFieldsInScroll } from '../../../../data/headerData';

export default function HeaderSearchBar({
    searchBarRef, isTop, isProfilePage, isHelpPage, isSettingsPage,
    activeSearchBar, activeScrollHeader, searchActiveTab, setSearchActiveTab,
    searchTabRef, searchTabWidth, searchSliceTX,
    whereOptionValue, setWhereOptionValue, onBarClick,
}) {
    const { selectedDays } = useSelector((reducers) => reducers.calendarChDays);
    const isFirstOpen = useRef(true);
    const [noAnimation, setNoAnimation] = useState(false);

    useEffect(() => {
        if (activeSearchBar && isFirstOpen.current) {
            setNoAnimation(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setNoAnimation(false));
            });
            isFirstOpen.current = false;
        }
    }, [activeSearchBar]);

    useEffect(() => {
        if (activeScrollHeader) {
            setNoAnimation(true);

            const el = searchBarRef.current;
            if (!el) return;

            const handleTransitionEnd = (e) => {
                if (e.propertyName === 'width') {
                    setNoAnimation(false);
                    el.removeEventListener('transitionend', handleTransitionEnd);
                }
            };

            el.addEventListener('transitionend', handleTransitionEnd);
            return () => el.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [activeScrollHeader]);

    const handleLocationClick = (item) => {
        setWhereOptionValue(item?.title);
        setSearchActiveTab({ tabName: 'when', tabIndex: 1 });
    };

    return (
        <div
            className={classNames('header__search__form__container', {
                active__bar: activeSearchBar,
                profile__page__header: isProfilePage,
                help__page__header: isHelpPage,
                account__settings__header: isSettingsPage,
                scroll: !isTop,
                scroll__header: !isTop && activeScrollHeader,
            })}
            ref={searchBarRef}
            onClick={onBarClick}
        >
            <div
                className={classNames('selected__slice', {
                    active: activeSearchBar,
                    no__animation: noAnimation,
                })}
                style={{
                    width: searchTabWidth,
                    transform: `translateX(${searchSliceTX}px)`,
                }}
            />

            {searchTabFields?.map((item, index) => (
                <div
                    className={classNames('tab__item', {
                        active__tab__search: searchActiveTab?.tabName === item?.tabName,
                        in__scroll: !isTop,
                    })}
                    key={index}
                    onClick={() => setSearchActiveTab({ tabName: item?.tabName, tabIndex: index })}
                    ref={el => {
                        if (el) searchTabRef.current.set(item.tabName, el);
                        else searchTabRef.current.delete(item.tabName);
                    }}
                >
                    <h2 className='title'>
                        {isTop || activeScrollHeader ? item?.title : searchTabFieldsInScroll[index]?.title}
                    </h2>
                    <p className={classNames('desc', { in__scroll: !isTop && !activeScrollHeader })}>
                        {index === 0
                            ? whereOptionValue || item?.content
                            : index === 1
                                ? selectedDays || item?.content
                                : item?.content}
                    </p>
                </div>
            ))}

                <SearchOptions active={activeSearchBar} searchActiveTab={searchActiveTab} onLocationClick={handleLocationClick} />

            <button className={classNames('search__button', { active__button: activeSearchBar })}>
                <SearchSvg />
                <p className='search__text'>Search</p>
            </button>
        </div>
    );
}