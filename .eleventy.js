const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const cleanCSS = require("clean-css");

async function imageShortcode(src, classes, alt, sizes = "100vw") {
    if (alt === undefined) {
        throw new Error('Missing \'alt\` on responsiveimae from: ${src}');
    }

    let metadata = await Image(src, {
        width: [300, 600],
        formats: ['webp', 'jpeg'],
        outputDir: "./dist/images/",
        urlPath: "/images/"
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
                loading="lazy"
                decoding="async">
        </picture>`;
}

module.exports = config => {
    config.addPlugin(eleventyNavigationPlugin);
    config.addAsyncShortcode("image", imageShortcode);

    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');
    config.addPassthroughCopy('./src/favicon*');
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