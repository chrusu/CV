export interface Theme {
    id: string;
    name: string;
    key: string;
    colors: {
        '--color-bg-primary': string;
        '--color-bg-secondary': string;
        '--color-text-body': string;
        '--color-text-heading': string;
        '--color-link': string;
        '--color-border-outer': string;
        '--color-border-ui': string;
        '--color-item-folder': string;
        '--color-item-file': string;
        '--color-item-selected': string;
        '--color-ui-highlight': string;
    };
    font: string;
    borderRadius: string;
    backgroundImage?: string;
}

export const themes: Theme[] = [
    {
        id: 'dark',
        name: 'Dark',
        key: 'D',
        colors: {
            '--color-bg-primary': '#1c0f21', // Brand Deep Purple
            '--color-bg-secondary': '#150b19', // Darker shade
            '--color-text-body': '#e9e9e9', // Brand Off-white
            '--color-text-heading': '#ffa200ff', // White for contrast
            '--color-link': '#ffa200ff', // Brand Electric Purple
            '--color-border-outer': '#ffa200ff', // Lighter Purple
            '--color-border-ui': '#ffa200ff', // Brand Electric Purple
            '--color-item-folder': '#ffa200ff', // Lighter Purple
            '--color-item-file': '#a8a8a8ff', // Brand Electric Purple
            '--color-item-selected': '#5c4215ff', // Gold/Yellow complement
            '--color-ui-highlight': '#ffd700', // Gold/Yellow
        },
        font: '"Share Tech Mono", monospace',
        borderRadius: '0.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 0%, #2d1835 0%, #1c0f21 100%)',
    },
    {
        id: 'light',
        name: 'Light',
        key: 'L',
        colors: {
            '--color-bg-primary': '#fffdf7', // Very light beige (Paper)
            '--color-bg-secondary': '#f5f2eb', // Slightly darker beige
            '--color-text-body': '#57534e', // Stone 600 - Warm gray, lighter weight feel
            '--color-text-heading': '#1c1917', // Stone 900 - Sharp contrast for headings
            '--color-link': '#7c3aed', // Violet 600
            '--color-border-outer': '#a8a29e', // Stone 400 - Technical drawing line
            '--color-border-ui': '#d6d3d1', // Stone 300 - Subtle inner lines
            '--color-item-folder': '#292524', // Stone 800 - High contrast for sidebar
            '--color-item-file': '#44403c', // Stone 700 - Readable files
            '--color-item-selected': '#7c3aed', // Violet 600
            '--color-ui-highlight': '#7c3aed', // Violet 600 - High contrast for text
        },
        font: '"Share Tech Mono", monospace',
        borderRadius: '0.75rem',
        backgroundImage: 'linear-gradient(to bottom right, #fcf9ee, #dcd5c6)',
    },
    // {
    //     id: 'nerd',
    //     name: 'Nerd',
    //     key: 'N',
    //     colors: {
    //         '--color-bg-primary': '#0f0518', // Very dark violet
    //         '--color-bg-secondary': '#08020d',
    //         '--color-text-body': '#39ff14', // Neon Green
    //         '--color-text-heading': '#ff00ff', // Neon Magenta
    //         '--color-link': '#39ff14', // Neon Green
    //         '--color-border-outer': '#39ff14', // Neon Green
    //         '--color-border-ui': '#39ff14', // Neon Green
    //         '--color-item-folder': '#39ff14', // Neon Green
    //         '--color-item-file': '#39ff14', // Neon Green
    //         '--color-item-selected': '#ffff00', // Neon Yellow
    //         '--color-ui-highlight': '#ffff00', // Neon Yellow
    //     },
    //     font: '"Courier Prime", monospace',
    //     borderRadius: '0px',
    // },
    {
        id: 'neon-violet',
        name: 'Neon Violet',
        key: 'V',
        colors: {
            '--color-bg-primary': '#130019', // Deep Dark Violet
            '--color-bg-secondary': '#0a000e', // Almost Black
            '--color-text-body': '#e0d0ff', // Light Lavender - Much lighter for readability
            '--color-text-heading': '#ff00ff', // Magenta
            '--color-link': '#d600ff', // Electric Violet
            '--color-border-outer': '#9900cc', // Purple
            '--color-border-ui': '#ff00cc', // Hot Pink
            '--color-item-folder': '#d600ff', // Electric Violet
            '--color-item-file': '#b080e0', // Lighter Violet for better contrast
            '--color-item-selected': '#000000ff', // Magenta
            '--color-ui-highlight': '#ff00cc', // Hot Pink
        },
        font: '"Courier Prime", monospace',
        borderRadius: '0px',
        backgroundImage: 'radial-gradient(circle at 20% 50%, #510267ff 0%, transparent 70%), radial-gradient(circle at 80% 30%, #600537ff 0%, transparent 70%), radial-gradient(circle at 50% 80%, #390072ff 0%, transparent 70%), linear-gradient(to bottom right, #1a0024, #050008)',
    },
];
