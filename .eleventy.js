const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const cleanCSS = require("clean-css");

module.exports = config => {
    config.addPlugin(eleventyNavigationPlugin);

    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');
    config.addPassthroughCopy('./src/resume.pdf');

    config.addFilter("cssmin", function(code) {
        return new cleanCSS({}).minify(code).styles;
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