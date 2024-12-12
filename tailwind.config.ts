import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./containers/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transitionTimingFunction: {
                "custom": "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            transitionDuration: {
                "custom": "1200ms",
            },
            borderRadius: {
                "8": "8px",
            },
            boxShadow: {
                "side": "0px 4px 40px 0px rgba(29, 33, 38, 0.08)",
            },
            letterSpacing: {
                wider: "0.02em",
                normal: "0.01em",
                merge: "0.04em",  /* 4% */
            },
            lineHeight: {
                "3.5": "14px", /* 14px */
                "5.5": "22px",  /* 22px */

            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            screens: {
                xs: "360px", // Mobile Size
                sm: "480px",
                md: "768px", // Tablet Size
                lg: "976px",
                xl: "1280px", //  Desktop Size
                tablet: {"max": "1279px"},
                mobile: {"max": "767px"},
            },
            colors: {
                "white80": "rgba(255, 255, 255, 0.8)",
                "white60": "rgba(255, 255, 255, 0.6)",
                "sidebar": "#F1EEEA",
                "hover-sidebar": "#F5F4F2",
                "hover-payment": "#3363af",
                "main": "#F1EEEA",
                "primary": "#1a202c",
                "secondary": "#2d3748",
                "accent": "#4fd1c5",
                "green": "#5D977B",
                "orange": "#FF3F32",
                "default": "#2B2A28",
                "lable-title": "#1C1E1E",
                "gray-light": "#d3dce6",
                "grey-extra-light": "#E8E5E1",
                "grey-exrta-ligth-extra": "#F8F8F7",
                "green-extra-dark": "#365848",
                "grey-tertiary": "#868583",
                "grey-seccondary": "#686765",
                "modal-backdrop": "rgba(0, 0, 0, .4)",
                "error": "#F60909",
                "info-badge-orange": "#FEDB90",
                "chart-orange": "#FFB109",
                "chart-percent": "#D9F1DA",
                "info-badge": "rgba(43, 42, 40, 0.08)",
                "red-dark": "#B31D14",
                "orange-extra-light": "#EBEEE2",
                "sidebar-info": "rgba(29, 33, 38, 0.08)",
                "gray-40": "rgb(102 102 102 / 40%);",
                "leverage-dark": "#604201",
                "green-check": "#02272B",
                "chart-blue": "#054354",
                "grey-extra-dark": "#2B2A2814",
                // Color  blue Wep
                "blue-wep-80": "#00255D",
                "blue-wep-60": "#1A76FF",
                "blue-wep-40": "#079FFF",
                "blue-wep-10": "#F1FAFF",
                // Color Green
                "green-80": "#422300",
                "green-60": "#FFBD3D",
                "green-40": "#FF8904",
                "green-10": "#FFFCF5",
                // Color Yellow
                "yellow-80": "#0B3D03",
                "yellow-60": "#119200",
                "yellow-40": "#65DB4",
                "yellow-10": "#F2FDEF",
                // Color Blue
                "blue-80": "#27163C",
                "blue-60": "#7835CF",
                "blue-50": "#BC6DFB",
                "blue-20": "#E2E8EE",
                "blue-10": "#FAF4FF",
                // Color others
                "green-success": "#B3ADFF",
                "red-error": "#B3ADFF",
                // Grey
                "grey-100": "#1D2126",
                "grey-80": "#505459",
                "grey-60": "#86898C",
                "grey-40": "#BFBEBA",
                "grey-20": "#E8E7E2",
                "grey-10": "#F7F6F4",
                "grey-profile": "#ACABAA",

                // Chart Collors
                "pallet-15": "#033442",
                "pallet-14": "#054354",
                "pallet-13": "#095468",
                "pallet-12": "#086C87",
                "pallet-11": "#097B9A",
                "pallet-10": "#1D88A5",
                "pallet-9": "#1996B8",
                "pallet-8": "#0CA2CA",
                "pallet-7": "#0DB5E2",
                "pallet-6": "#22C6F2",
                "pallet-5": "#66D8F7",
                "pallet-4": "#81DFF8",
                "pallet-3": "#B5ECFB",
                "pallet-2": "#E4F8FD",
                "pallet-1": "#FAFEFF"
            },
            spacing: {
                "0.5": "0.125rem", /* 2px */
                "0.75": "0.188rem", /* 3px */
                "1.25": "0.313rem", /* 5px */
                "1.5": "0.375rem", /* 6px */
                "16": "4rem",  /* 64px */
                "18": "4.5rem",  /* 72px */
                "24": "6rem",  /* 96px */
                "23.5": "5.875rem", /* 94px */
                "132": "8.25rem", /* 132px  */
                "128": "32rem",   /* 512px */
                "144": "36rem",  /* 576px */
            },
            height: {
                "132": "8.25rem",
                "148": "9.25rem",
                "286": "17.875rem",
                "375": "23.438rem",
                "390": "24.375rem",
            },
            fontFamily: {
                gaisyr: ["Gaisyr-fonts"], // Font for Number
                aeonik: ["Aeonik-fonts"],  // Font for Text
            },
            width: {
                "w-full": "100vw",
            },
            fontSize: {
                "xxs": "11px",
                "3.5xl": "32px"
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
    ],
};

export default config;
