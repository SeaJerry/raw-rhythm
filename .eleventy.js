const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("src/assets/css/style.css");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("404.html");

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Markdown Filters and Libraries
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addFilter("markdownify", markdownString =>
    markdownLib.render(markdownString)
  );

  return {
    templateFormats: ["md", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: ["liquid"],
    dataTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};

