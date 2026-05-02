import { getPropertyTypeMeta } from './getPropertyTypeMeta'

/**
 * Builds a detail string depending on property type.
 *
 * Rental (apartment / house / villa):
 *   "2 bedrooms · 3 beds · 1 bathroom"
 *
 * Non-rental (commercial / land / office / garage):
 *   "120 m² · Floor 3"
 *
 * @param {{
 *   type?: string,
 *   bedrooms?: number,
 *   beds?: number,
 *   bathrooms?: number,
 *   area?: number,
 *   floor?: number,
 * }} item
 * @returns {string}
 */
export function buildDetails(item) {
    const { type, bedrooms, beds, bathrooms, area, floor } = item
    const { isRental } = getPropertyTypeMeta(type)

    if (isRental) {
        return [
            bedrooms != null && `${bedrooms} ${pluralize(bedrooms, 'bedroom', 'bedrooms')}`,
            beds != null && `${beds} ${pluralize(beds, 'bed', 'beds')}`,
            bathrooms != null && `${bathrooms} ${pluralize(bathrooms, 'bathroom', 'bathrooms')}`,
        ]
            .filter(Boolean)
            .join(' · ')
    }

    return [
        area != null && `${area} m²`,
        floor != null && `Floor ${floor}`,
    ]
        .filter(Boolean)
        .join(' · ')
}

/**
 * Simple English pluralization.
 * 1 → singular, else → plural.
 */
function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural
}