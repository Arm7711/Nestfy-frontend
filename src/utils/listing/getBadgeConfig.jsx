import React from 'react'
import { Medal, Award } from 'lucide-react'

export const BADGE_CONFIG = {
    guest_favorite: {
        label: 'Guest favorite',
        icon: <Medal size={12} strokeWidth={2} />,
    },
    superhost: {
        label: 'Superhost',
        icon: <Award size={12} strokeWidth={2} />,
    },
}

/**
 * @param {string | undefined} badge
 * @returns {{ label: string, icon: React.ReactNode } | null}
 */
export function getBadgeConfig(badge) {
    return badge ? (BADGE_CONFIG[badge] ?? null) : null
}