import classNames from 'classnames';
import { locations } from '../../../../data/loacationsData';
import { optionGuestData } from '../../../../data/optionGuestsData';
import LocationsBlock from '../../../LocationsBlock/LocationsBlock';
import V1Calendar from '../../../_common/V1Calendar/V1Calendar';
import Quantity from '../../../_common/Quantity/Quantity';

export default function SearchOptions({ active, searchActiveTab, onLocationClick, calendarRef }) {
    return (
        <div
            className={classNames('option__container', {
                active,
                first__active__tab: searchActiveTab.tabIndex === 0,
                middle__active__tab: searchActiveTab.tabIndex === 1,
                last__active__tab: searchActiveTab.tabIndex === 2,
            })}
            style={{
                width: searchActiveTab.tabIndex === 1 ? '100%' : '50%',
                left: searchActiveTab.tabIndex === 2 ? '50%' : '0%',
            }}
        >
            {searchActiveTab.tabIndex === 0 && (
                <div className={classNames('option__tab__content', { active: true })}>
                    <div className='locations__container'>
                        <h1 className='title'>Suggested destinations</h1>
                        {locations.map((item, index) => (
                            <LocationsBlock
                                key={index}
                                item={item}
                                onClick={() => onLocationClick(item)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div
                className={classNames('option__tab__content option__tab__content__calendar', { active: true })}
                style={{ display: searchActiveTab.tabIndex === 1 ? 'block' : 'none' }}
            >
                <V1Calendar ref={calendarRef} />
            </div>

            {searchActiveTab.tabIndex === 2 && (
                <div
                    className={classNames(
                        'option__tab__content option__tab__content__guest',
                        { active: true }
                    )}
                >
                    <div className='guest__container'>
                        {optionGuestData.map((item, index) => (
                            <div className='option__guest'>
                                <div className='info__block'>
                                    <h1 className='title__option'>{item?.title}</h1>
                                    <p className='desc__option'>{item?.desc}</p>
                                </div>

                                <div className='quantity__block'>
                                    <Quantity />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
