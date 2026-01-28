/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                heaven: {
                    dark: '#020402', // Void Black / Deep Forest
                    emerald: '#10B981', // Vibrant Emerald Green
                    forest: '#064E3B', // Deep Green
                    starlight: '#ECFDF5', // Pale Mint/White
                    accent: '#34D399', // Bright Green Accent
                    soft: '#065F46', // Soft Green Overlay
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
