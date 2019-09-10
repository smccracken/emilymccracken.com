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
	eleventyConfig.addPassthroughCopy('_src/assets/fonts');
	eleventyConfig.addPassthroughCopy('_src/assets/img');
	eleventyConfig.addPassthroughCopy('_src/assets/css/main.css');

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
		  data: '_data',
	      input: '_src',
	      output: 'dist'
	    },
	    passthroughFileCopy: true
	  };
};