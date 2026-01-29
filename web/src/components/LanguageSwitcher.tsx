import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 border border-ui-border-ui rounded-md p-1 bg-bg-primary/50 backdrop-blur-sm">
            <button
                onClick={() => setLanguage('de')}
                className={`px-2 py-0.5 rounded text-sm font-mono transition-colors ${
                    language === 'de'
                        ? 'bg-ui-highlight text-text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary'
                }`}
            >
                DE
            </button>
            <div className="w-px h-4 bg-ui-border-ui"></div>
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-sm font-mono transition-colors ${
                    language === 'en'
                        ? 'bg-ui-highlight text-text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary'
                }`}
            >
                EN
            </button>
        </div>
    );
};
