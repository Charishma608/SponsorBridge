/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
                inter: ['Inter'],
                code: ['Source Code Pro', 'monospace'],
            },
            colors: {
                'primary-green': '#3EB96F',
                primary: '#0280D4',
                'primary-dark': '#075185',
                'gray-light': '#F7F7F7',
                'primary-grey': '#60656B4D',
                dark: '#040345',
                "primary-submit": "#5F9A6F",
                "primary-skip": "#EF6D36"
            },
            animation: {
                'zoom-in': 'zoom-in 0.2s ease-in-out',
                'zoom-out': 'zoom-out 0.2s ease-in-out',
                'flow-in': 'flow-in .2s ease-in-out'
            },
            keyframes: {
                'zoom-in': {
                    '0%': {
                        opacity: 0,
                        transform: 'scale(0.8)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'zoom-out': {
                    '0%': {
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'scale(0.8)',
                    },
                },
                'flow-in': {
                    '0%': {
                        top: "-10%"
                    },
                }
            },
        },
    },
    plugins: [],
};
