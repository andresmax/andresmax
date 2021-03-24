module.exports = {
    plugins: [
        require('postcss-import')({
            path: ["themes/tailwind/assets/css"]
        }),
        require('tailwindcss')('themes/tailwind/assets/css/tailwind.config.js'),
        require('autoprefixer')
    ]
}
