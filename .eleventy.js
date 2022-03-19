const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const CleanCSS = require("clean-css");

module.exports = config => {
    config.addPlugin(eleventyNavigationPlugin);

    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');

    config.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
      });

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        passthroughFileCopy: true,
        htmlTemplateEngine: "njk"
    };
}