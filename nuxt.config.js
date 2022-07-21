const webpack = require('webpack');
export default {
	mode: 'spa',
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			// { rel: 'icon', type: 'image/x-icon', href: '../node_note/favicon.ico' }
		]
	},
	// 解析靜態頁用
	// router: {
	// 	base: '../node_note/',
	// 	mode: 'hash'
	// },
	/*
	** Customize the progress-bar color
	*/
	loading: '~/components/loading.vue',
	/*
	** Global CSS
	*/
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'vue-embed-gist/dist/vue-embed-gist.css',
		'@/assets/sass/app.scss'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'@/plugins/element-ui',
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
	],
	/*
	** Build configuration
	*/
	build: {
		transpile: [/^element-ui/],
		plugins: [
			new webpack.ProvidePlugin({
				'$' : 'jquery'
			})
		],
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		}
	}
}
