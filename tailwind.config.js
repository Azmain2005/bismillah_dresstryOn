// tailwind.config.js

const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include the new file structure if you moved files
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // Note: Tailwind default colors (like gray-900, amber-500) are still available.
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      keyframes: {
        // Keep existing scroll keyframe
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        
        // 🌟 ADDED: Custom keyframe for the subtle floating image effect
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(0.5deg)' },
        },
      },
      animation: {
        // Keep existing scroll animation
        scroll: "scroll 40s linear infinite",
        
        // 🌟 ADDED: Custom animation utility
        'float-subtle': 'float-subtle 12s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tw-animate-css"),
    heroui(), // ✅ from @heroui/react
  ],
};