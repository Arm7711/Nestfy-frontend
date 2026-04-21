import { useState } from 'react';
import ToggleSwitch from '../../../Switchs/CommonSwitch';
import LanguageItem from './LanguageItem';
import { SUGGESTED_LANGUAGES, LANGUAGES } from '../../../../../data/languagesData';

export default function LanguageTab({ selectedLang, onSelect }) {
    const [translate, setTranslate] = useState(false);

    const langKey = (l) => `${l.name}/${l.region}`;

    return (
        <div>
            <div className="translation_toggle">
                <div className="translation_toggle__info">
                    <div className="translation_toggle__label">Translation</div>
                    <div className="translation_toggle__desc">
                        Automatically translate descriptions and reviews to English.
                    </div>
                </div>
                <ToggleSwitch
                    checked={translate}
                    onChange={setTranslate}
                />
            </div>

            <div className="section_title">Suggested languages and regions</div>
            <div className="language_grid">
                {SUGGESTED_LANGUAGES.map((lang, index) => (
                    <LanguageItem
                        key={langKey(lang)}
                        name={lang.name}
                        region={lang.region}
                        index={index}
                        langs={true}
                        isActive={selectedLang === langKey(lang)}
                        onClick={() => onSelect(langKey(lang))}
                    />
                ))}
            </div>

            <hr className="section_divider" />

            <div className="section_title">Choose a language and region</div>
            <div className="language_grid">
                {LANGUAGES.map((lang, index) => (
                    <LanguageItem
                        key={langKey(lang)}
                        name={lang.name}
                        index={index}
                        region={lang.region}
                        isActive={selectedLang === langKey(lang)}
                        onClick={() => onSelect(langKey(lang))}
                    />
                ))}
            </div>
        </div>
    );
}