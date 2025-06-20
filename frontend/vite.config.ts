import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@/': path.resolve(__dirname, './src'),
			'@/store': path.resolve(__dirname, './src/assets'),
			'@/components': path.resolve(__dirname, './src/components'),
		},
	},
	plugins: [react()],
});
