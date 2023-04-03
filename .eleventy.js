// get package.json
const packageVersion = require('./package.json').version;

// import filters
const {
    limit,
    toHtml,
    toIsoString,
    mdInline,
    minifyCss
} = require('./config/filters/index.js');

// import shortcodes
const {
    imageShortcodePlaceholder,
    liteYoutube
} = require('./config/shortcodes/index.js');

// plugins
const markdownLib = require('./config/plugins/markdown.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const {slugifyString} = require('./config/utils');

module.exports = config => {
    // 	--------------------- Custom Watch Targets -----------------------
    config.addWatchTarget('./src/assets');
    config.addWatchTarget('./utils/*.js');

    // --------------------- layout aliases -----------------------
    config.addLayoutAlias('base', 'base.njk');
    config.addLayoutAlias('page', 'page.njk');
    config.addLayoutAlias('home', 'home.njk');
    config.addLayoutAlias('collection', 'collection.njk');

    // ---------------------  Custom filters -----------------------
    config.addFilter('limit', limit);
    config.addFilter('toHtml', toHtml);
    config.addFilter('toIsoString', toIsoString);
    config.addFilter('md', mdInline);
    config.addFilter("cssmin", minifyCss);

    // --------------------- Custom shortcodes ---------------------
    config.addAsyncShortcode("imagePlaceholder", imageShortcodePlaceholder);
    config.addShortcode('year', () => `${new Date().getFullYear()}`); 
    config.addShortcode('packageVersion', () => `v${packageVersion}`);
    config.addShortcode('youtube', liteYoutube);

    // --------------------- Plugins ---------------------
    config.addPlugin(eleventyNavigationPlugin);

    // --------------------- Passthrough File Copy ---------------------
    ['./src/fonts/', './src/assets/images/', './src/favicon*', './src/resume.pdf'].forEach(path =>
        config.addPassthroughCopy(path)
    );

    return {
        // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_layouts'
        }
    };
}