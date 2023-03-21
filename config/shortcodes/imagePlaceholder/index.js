const Image = require('@11ty/eleventy-img');
const path = require('path');
const htmlmin = require('html-minifier-terser');

const imageShortcodePlaceholder = async (src, classes, alt, sizes="100vw", loading="lazy") => {
  if (alt === undefined) {
      throw new Error('Missing \'alt\` on responsiveimae from: ${src}');
  }

    let metadata = await Image(src, {
        widths: [400, 700, 1280],
        formats: ['webp', 'jpeg'],
        outputDir: "./dist/images/",
        urlPath: "/images/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
      
            return `${name}-${width}w.${format}`;
        }
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  // getting the url  to use
  let imgSrc = src;
  if (!imgSrc.startsWith('.')) {
    const inputPath = this.page.inputPath;
    const pathParts = inputPath.split('/');
    pathParts.pop();
    imgSrc = pathParts.join('/') + '/' + src;
  }

  return htmlmin.minify(`<picture class="${classes}">
      ${Object.values(metadata)
        .map(imageFormat => {
          return `    <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
            .map(entry => entry.srcset)
            .join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
          <img
              src="${highsrc.url}"
              width="${highsrc.width}"
              height="${highsrc.height}"
              alt="${alt}"
              loading="${loading}"
              decoding="async">
      </picture>`,
        {collapseWhitespace: true}
    );
};

module.exports = imageShortcodePlaceholder;
