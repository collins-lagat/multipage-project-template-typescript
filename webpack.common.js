module.exports = {
	entry: {
		app: './src/index.ts',
		vendor: './src/vendor.ts'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: '/node_modules',
				use: [
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|svg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets'
					}
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets'
					}
				}
			}
		]
	}
}
