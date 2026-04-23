import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { DEFAULT_LANG, isValidLang } from '../utils/lang';

export function useLanguageSync() {
    const { lang } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedLang = localStorage.getItem('lang') || DEFAULT_LANG;

        if (!lang || !isValidLang(lang)) {
            navigate(`/${storedLang}`, { replace: true });
            return;
        }

        if (lang !== storedLang) {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    return lang || DEFAULT_LANG;
}