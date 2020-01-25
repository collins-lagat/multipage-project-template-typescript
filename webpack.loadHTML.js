/* eslint-disable class-methods-use-this */
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class HTMLWebpackPluginWrapper {
	constructor(root, prod = false) {
		this.htmlFiles = []
		if (prod) {
			this.config = {
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			}
		} else {
			this.config = {}
		}
		this.traverse(root)
	}

	get templates() {
		return this.htmlFiles
	}

	isHTML(name) {
		const arr = String(name).split('.')
		if (arr[arr.length - 1].toLocaleLowerCase() === 'html') {
			return true
		}
		return false
	}

	isDirectory(root, node) {
		return fs.statSync(path.join(root, node)).isDirectory()
	}

	traverse(root) {
		const htmlFiles = []
		const allFiles = child => fs.readdirSync(child)

		Array.from(allFiles(root)).forEach(file => {
			if (this.isDirectory(root, file)) {
				this.traverse(`${root}/${file}`)
			} else if (this.isHTML(file)) {
				this.htmlFiles.push(
					new HtmlWebpackPlugin({
						template: `${root}/${file}`,
						...this.config
					})
				)
			}
		})
		return htmlFiles
	}
}

module.exports = HTMLWebpackPluginWrapper
