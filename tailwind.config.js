/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,js,jsx,ts}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
};
