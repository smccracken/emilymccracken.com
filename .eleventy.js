const filters = require('./_11ty/filters');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
	// Filters
	Object.keys(filters).forEach(filterName => {
    	eleventyConfig.addFilter(filterName, filters[filterName])
  	});

 	// Plugins
	eleventyConfig.addPlugin(pluginRss);

	// Passthrough
	eleventyConfig.addPassthroughCopy('/assets/**/*.css');

	// Collections
  eleventyConfig.addCollection('nav', function(collection) {
      return collection.getFilteredByTag('nav').sort(function(a, b) {
          return a.data.navorder - b.data.navorder
      })
  });

  eleventyConfig.addCollection('posts', function(collection) {
    return collection.getFilteredByGlob('**/posts/*.md').reverse();
  });

	return {
	    templateFormats: ['njk','md','html'],
	    markdownTemplateEngine: 'njk',
	    htmlTemplateEngine: 'njk',
	    dataTemplateEngine: 'njk',
	    dir: {
	      input: '_src',
	      output: '_site',
	      data: '_data'
	    },
	    passthroughFileCopy: true
	  };
};