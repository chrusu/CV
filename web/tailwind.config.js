/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            mono: ['var(--font-mono)', 'monospace'],
            sans: ['var(--font-mono)', 'monospace'], // Force monospace everywhere as per design
        },
        colors: {
            bg: {
                primary: 'var(--color-bg-primary)',
                secondary: 'var(--color-bg-secondary)',
            },
            text: {
                body: 'var(--color-text-body)',
                heading: 'var(--color-text-heading)',
            },
            ui: {
                link: 'var(--color-link)',
                'border-outer': 'var(--color-border-outer)',
                'border-ui': 'var(--color-border-ui)',
                'item-folder': 'var(--color-item-folder)',
                'item-file': 'var(--color-item-file)',
                'item-selected': 'var(--color-item-selected)',
                highlight: 'var(--color-ui-highlight)',
            }
        },
        borderRadius: {
            'ui': 'var(--radius-ui)',
            'lg': '0.5rem',
            'md': '0.375rem',
            'sm': '0.125rem',
            'full': '9999px',
        },
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    color: theme('colors.text.body'),
                    fontFamily: theme('fontFamily.mono'),
                    a: {
                        color: theme('colors.ui.link'),
                        '&:hover': {
                            color: theme('colors.ui.link'),
                            textDecoration: 'underline',
                        },
                    },
                    h1: { color: theme('colors.text.heading') },
                    h2: { color: theme('colors.text.heading') },
                    h3: { color: theme('colors.text.heading') },
                    h4: { color: theme('colors.text.heading') },
                    strong: { color: theme('colors.text.body') },
                    code: { color: theme('colors.ui.highlight') },
                    blockquote: { 
                        color: theme('colors.gray.400'),
                        borderLeftColor: theme('colors.ui.link'),
                    },
                },
            },
        }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
