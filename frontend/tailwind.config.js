/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#3b82f6",
          600: "#2563eb"
        }
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)"
      }
    }
  },
  plugins: []
};
