import { LANGUAGES } from '../data/languagesData';

export const DEFAULT_LANG = 'en';

export function getLanguageByCode(code) {
    return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}

export function isValidLang(code) {
    return LANGUAGES.some(l => l.code === code);
}