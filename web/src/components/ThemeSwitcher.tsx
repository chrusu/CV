import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../themes';

export const ThemeSwitcher: React.FC = () => {
    const { currentTheme, setTheme } = useTheme();

    return (
        <div className="flex gap-4 text-sm mt-2 flex-wrap">
            {themes.map(theme => {
                const isSelected = currentTheme.id === theme.id;
                return (
                    <button
                        key={theme.id}
                        onClick={() => setTheme(theme.id)}
                        className={`
                            px-3 py-1.5 border rounded transition-all duration-300
                            ${isSelected ? 'font-bold shadow-md scale-105' : 'opacity-80 hover:opacity-100 hover:scale-105'}
                        `}
                        style={{
                            background: isSelected 
                                ? theme.colors['--color-ui-highlight'] 
                                : (theme.backgroundImage || theme.colors['--color-bg-primary']),
                            color: isSelected ? theme.colors['--color-bg-primary'] : theme.colors['--color-ui-highlight'],
                            borderColor: theme.colors['--color-border-ui'],
                            fontFamily: theme.font,
                        }}
                    >
                        [{theme.key}] {theme.name}
                    </button>
                );
            })}
        </div>
    );
};
