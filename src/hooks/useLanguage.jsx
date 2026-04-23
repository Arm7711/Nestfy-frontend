import { useMemo } from 'react';
import { useLanguageSync } from './useLanguageSync';
import { getLanguageByCode } from '../utils/lang';

export function useLanguage() {
    const lang = useLanguageSync();

    const language = useMemo(() => {
        return getLanguageByCode(lang);
    }, [lang]);

    return {
        code: language.code,
        name: language.name,
        region: language.region,
    };
}