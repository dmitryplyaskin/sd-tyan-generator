import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/sd-tyan-generator',
	server: {
		open: true,
	},
	plugins: [react()],
})
