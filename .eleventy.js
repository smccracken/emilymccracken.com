require("dotenv").config();

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

// Variables
const now = new Date();
const IS_PRODUCTION = process.env.ELEVENTY_ENV === "production";

// Filters
const dateReadable = require("./src/filters/date-readable.js");

module.exports = function (config) {
    // Markdown
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        .use(markdownItAnchor, {
            permalink: true,
            permalinkClass: "heading-permalink",
            permalinkSymbol: "∞",
        })
        .use(markdownItFootnote);
    config.setLibrary("md", markdownLibrary);

    let markdownItOpts = {
        html: true,
        linkify: false,
        typographer: true,
    };
    let markdownItAnchorOpts = {
        permalink: true,
        permalinkClass: "direct",
        permalinkSymbol: "",
    };

    const md = markdownIt(markdownItOpts);
    md.use(markdownItFootnote);
    md.use(markdownItAnchor);

    //Add Filters
    config.addFilter("dateReadable", dateReadable);

    // Plugins
    config.addPlugin(pluginRss);
    config.addPlugin(pluginNavigation);

    // Asset Watch Targets
    config.addWatchTarget("./src/assets");

    // Base Config
    return {
        templateFormats: ["html", "njk", "md"],
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            data: "_data",
        },
    };
};
