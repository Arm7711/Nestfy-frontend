import classNames from 'classnames';
import { locations } from '../../../../data/loacationsData';
import LocationsBlock from '../../../LocationsBlock/LocationsBlock';
import V1Calendar from '../../../_common/V1Calendar/V1Calendar';

export default function SearchOptions({ active, searchActiveTab, onLocationClick }) {
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

            {searchActiveTab.tabIndex === 1 && (
                <div
                    className={classNames(
                        'option__tab__content option__tab__content__calendar',
                        { active: true }
                    )}
                >
                    <V1Calendar />
                </div>
            )}
        </div>
    );
}
