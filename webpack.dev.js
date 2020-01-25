const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const HTMLWebpackPluginWrapper = require('./webpack.loadHTML')

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [...new HTMLWebpackPluginWrapper('./src').templates]
})
