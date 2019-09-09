const CleanCSS = require('clean-css');
const { DateTime } = require('luxon');
const htmlmin = require('html-minifier');
const UglifyJS = require('uglify-js');
const markdownIt = require('markdown-it')({
	html: true,
	breaks: true,
	linkify: true
}).use(require('markdown-it-anchor'), {
	permalink: true, 
	permalinkClass: 'direct', 
	permalinkSymbol: ''
});

const parseDate = str => {
  if (str instanceof Date) {
    return str
  }
  const date = DateTime.fromISO(str, { zone: 'utc' })
  return date.toJSDate()
}


module.exports = {
  cssmin: function(code) {
    return new CleanCSS({}).minify(code).styles
  },

  format: function(date, format) {
      return DateTime.fromJSDate(date).toFormat(String(format))
  },

  date_to_permalink: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy')
  },

  date_formatted: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('DD')
  },

  date_time: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('ff')
  },

  // Minify HTML Output
  htmlmin: function(content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  },

  jsmin: function(code) {
    let minified = UglifyJS.minify(code)
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  },

  markdownify: function(str) {
  	return markdownIt.render(str)
  },

  markdownify_inline: function(str) {
    return markdownIt.renderInline(str)
  },

  strip_html: function(str) {
    return str.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, '')
  }
};