declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                abyss: string;
                neon: string;
                flare: string;
                pulse: string;
                mist: string;
            };
            boxShadow: {
                glow: string;
            };
            backgroundImage: {
                grid: string;
            };
            keyframes: {
                float: {
                    '0%, 100%': {
                        transform: string;
                    };
                    '50%': {
                        transform: string;
                    };
                };
                pulseRing: {
                    '0%': {
                        transform: string;
                        opacity: string;
                    };
                    '100%': {
                        transform: string;
                        opacity: string;
                    };
                };
                drift: {
                    '0%, 100%': {
                        transform: string;
                    };
                    '50%': {
                        transform: string;
                    };
                };
            };
            animation: {
                float: string;
                pulseRing: string;
                drift: string;
            };
            fontFamily: {
                display: [string, string];
                sans: [string, string];
            };
        };
    };
    plugins: any[];
};
export default _default;
