/**
 * Property types.
 * isRental — rental (shows bedrooms/beds/bathrooms) vs non-rental (area/floor).
 */
export const PROPERTY_TYPES = {
    apartment: { label: 'Apartment', isRental: true },
    house: { label: 'House', isRental: true },
    villa: { label: 'Villa', isRental: true },
    commercial: { label: 'Commercial', isRental: false },
    land: { label: 'Land', isRental: false },
    office: { label: 'Office', isRental: false },
    garage: { label: 'Garage', isRental: false },
}

/**
 * @param {string | undefined} type
 * @returns {{ label: string, isRental: boolean }}
 */
export function getPropertyTypeMeta(type) {
    return PROPERTY_TYPES[type] ?? { label: 'Property', isRental: true }
}