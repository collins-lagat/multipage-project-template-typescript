const tailwindcss = require("tailwindcss")
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')
const purgecss = require("@fullhuman/postcss-purgecss")

/**
 * the env exposed by postcss thought the ctx was always undefined. Therefore look at ctx.webpack.mode
 * to find out whether webpack is in 'production' or in 'development' mode.
 * SOURCE
 * Thread: https://github.com/postcss/postcss-loader/issues/368
 * Exact Solution used: https://github.com/postcss/postcss-loader/issues/368#issuecomment-403476091
 */

module.exports = ({ webpack }) => ({
    plugins: [
        tailwindcss,
        webpack.mode === "production"? purgecss({
            content: ["./src/*.html"],
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-z0-9-:\/]+/g) || [];
                        }
                    },
                    extensions: ["html"]
                }
            ]
        }): "",
        autoprefixer,
        postcssNested
    ]
})