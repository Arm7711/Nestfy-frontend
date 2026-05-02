import React from 'react';
import ListingSection from './ListingSection';

import { SECTIONS } from '../../data/listing/lisitingData';

export default function ListingProductsContainer() {
    const handleViewAll = (sectionId) => console.log('[ListingProductsContainer] View all:', sectionId)
    const handleCardClick = (item) => console.log('[ListingProductsContainer] Card clicked:', item.id)

    return (
        <div className='listing__container'>
            <div className='main__content__section'>
                {SECTIONS.map((section) => (
                    <ListingSection
                        key={section.id}
                        title={section.title}
                        items={section.items}
                        onViewAll={() => handleViewAll(section.id)}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    )
}
