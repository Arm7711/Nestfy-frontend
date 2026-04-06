import { fromKey } from './dateUtils.jsx';
import { MONTHS_GEN } from '../constants.jsx';

export function fmtKey(k) {
    const d = fromKey(k);
    return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`;
}

export function nightsWord(n) {
    const t = n % 10, h = n % 100;
    if (t === 1 && h !== 11) return 'ночь';
    if (t >= 2 && t <= 4 && (h < 10 || h > 20)) return 'ночи';
    return 'ночей';
}