/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Mono'", "monospace"],
        serif: ["'Playfair Display'", "serif"],
      },
      colors: {
        void: "#080808",
        ash: "#111111",
        smoke: "#1a1a1a",
        ember: "#FF3B1F",
        acid: "#C8FF00",
        ghost: "#F0EDE8",
        muted: "#555555",
        wire: "#2a2a2a",
      },
      animation: {
        "flicker": "flicker 3s linear infinite",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "scan": "scan 8s linear infinite",
        "pulse-ember": "pulseEmber 2s ease-in-out infinite",
      },
      keyframes: {
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%": { opacity: "0.8" },
          "97%": { opacity: "1" },
          "98%": { opacity: "0.6" },
          "99%": { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseEmber: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,59,31,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,59,31,0.7)" },
        },
      },
    },
  },
  plugins: [],
};
