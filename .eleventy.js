const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = config => {
    config.addPlugin(eleventyNavigationPlugin);

    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        passthroughFileCopy: true,
        htmlTemplateEngine: "njk"
    };
}