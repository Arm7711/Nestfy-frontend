import { toKey, addDays, fromKey } from './dateUtils.jsx';

export function calcRange(startKey, endKey, hovKey, flex) {
    if (!startKey) return { effStart: null, effEnd: null, rangeMin: null, rangeMax: null };

    const effStart = flex ? toKey(addDays(fromKey(startKey), -flex)) : startKey;

    let effEnd = null;
    if (endKey) {
        effEnd = flex ? toKey(addDays(fromKey(endKey), flex)) : endKey;
    } else if (hovKey && hovKey > startKey) {
        effEnd = flex ? toKey(addDays(fromKey(hovKey), flex)) : hovKey;
    }

    if (!effEnd) return { effStart, effEnd: null, rangeMin: null, rangeMax: null };

    return {
        effStart,
        effEnd,
        rangeMin: Math.min(effStart, effEnd),
        rangeMax: Math.max(effStart, effEnd),
    };
}