import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Theme, themes } from '../themes';

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

    useEffect(() => {
        // Apply theme variables to root
        const root = document.documentElement;
        Object.entries(currentTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        root.style.setProperty('--font-mono', currentTheme.font);
        root.style.setProperty('--radius-ui', currentTheme.borderRadius);
        root.style.setProperty('--bg-image', currentTheme.backgroundImage || currentTheme.colors['--color-bg-primary']);
    }, [currentTheme]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const key = e.key.toUpperCase();
            const theme = themes.find(t => t.key === key);
            if (theme) {
                setCurrentTheme(theme);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const setTheme = (themeId: string) => {
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            setCurrentTheme(theme);
        }
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
