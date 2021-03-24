const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: [
        './hugo_stats.json',
        themeDir + '/hugo_stats.json',
        'exampleSite/hugo_stats.json',
    ],
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
})

//console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
	plugins: [
		require("tailwindcss")("./themes/tailwind/assets/css/tailwind.config.js"),
		require("autoprefixer")({
			grid: false,
			browsers: [">1%"]
		}),
		...(process.env.NODE_ENV !== "development"
			? [
					require("@fullhuman/postcss-purgecss")({
						content: ["./layouts/**/*.html", "./components/**/**/*.html"],
						extractors: [
							{
								extractor: class {
									static extract(content) {
										//console.log(process.env.NODE_ENV);
										//return content.match(/[a-zA-Z0-9-:_/]+/g) || [];
										return content.match(/[A-z0-9-:\/]+/g) || [];
									}
								},
								extensions: ["vue", "html"]
							}
						]
					})
			  ]
			: []) //If Development, do not use PurgeCSS
	]
};
