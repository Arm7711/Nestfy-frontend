import { useMemo } from 'react';
import { FLEX_OPTS } from '../constants.jsx';

export function useChipWidths() {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = '450 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        return Object.fromEntries(
            FLEX_OPTS.map(opt => [
                opt.value,
                Math.ceil(ctx.measureText(opt.label).width) + 35,
            ])
        );
    }, []);
}