import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import monkey, {cdn, util} from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({

	plugins: [
		tailwindcss(),
		vue(),
		monkey({
			entry: 'src/main.js',
			userscript: {
				name: '阿里云盘批量重命名',
				namespace: 'https://github.com/sherlocknieh/',
				version: '2026.9.13.0',
				author: 'sherlocknieh',
				description: '对阿里云盘里的剧集进行批量重命名',
				license: 'GPL',
				icon: 'https://www.alipan.com/favicon.ico',
				match: [
					'*://*.alipan.com/*',
					'https://www.aliyundrive.com/*',
				],
				noframes: true,
			},
			build: {
        fileName: 'alipan-batch-rename.user.js',
				externalGlobals: {
					vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
						await util.fn2dataUrl(() => {
							// @ts-ignore
							window.Vue = Vue;
						})
					),
					'element-plus': cdn.jsdelivr(
						'ElementPlus',
						'dist/index.full.min.js'
					)
				},
				externalResource: {
					'vuedraggable/dist/vuedraggable.umd.min.js': cdn.jsdelivr(),
					'element-plus/dist/index.css': cdn.jsdelivr()
				}
			}
		})
	]
});
