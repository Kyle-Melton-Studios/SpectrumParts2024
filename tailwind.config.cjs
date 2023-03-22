/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
		  {
			mytheme: {
			
   "primary": "#F0C43F",
			
   "secondary": "#ffffff",
			
   "accent": "#343232",
			
   "neutral": "#272626",
			
   "base-100": "#161616",
			
   "info": "#45aaf2",
			
   "success": "#26de81",
			
   "warning": "#fed330",
			
   "error": "#fc5c65",
			},
		  },
		],
	  },
	plugins: [require("daisyui")],
}
