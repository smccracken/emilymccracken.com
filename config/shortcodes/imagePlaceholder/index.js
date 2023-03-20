const Image = require('@11ty/eleventy-img');

const imageShortcodePlaceholder = async (src, classes, alt, sizes="100vw", loading="lazy") => {
  if (alt === undefined) {
      throw new Error('Missing \'alt\` on responsiveimae from: ${src}');
  }

  let metadata = await Image(src, {
      width: [300, 600],
      formats: ['webp', 'jpeg'],
      outputDir: "./dist/images/",
      urlPath: "/images/",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="${classes}">
      ${Object.values(metadata).map(imageFormat => {
          return `    <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
          <img
              src="${lowsrc.url}"
              width="${highsrc.width}"
              height="${highsrc.height}"
              alt="${alt}"
              loading="${loading}"
              decoding="async">
      </picture>`;
};

module.exports = imageShortcodePlaceholder;
