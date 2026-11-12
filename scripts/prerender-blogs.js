import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const apiBaseUrl = "https://api.collegedrishti.com/api";
const siteUrl = "https://collegedrishti.com";
const distDirectory = path.resolve("dist");
const templatePath = path.join(distDirectory, "index.html");

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function plainText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function metaTag(attribute, value, content) {
  return `<meta ${attribute}="${value}" content="${escapeHtml(content)}">`;
}

const [template, response] = await Promise.all([
  readFile(templatePath, "utf8"),
  fetch(`${apiBaseUrl}/blogs`),
]);

if (!response.ok) {
  throw new Error(
    `Could not fetch blogs for prerendering: HTTP ${response.status}`,
  );
}

const result = await response.json();
if (!result.success || !Array.isArray(result.data)) {
  throw new Error(
    "Blog API returned an invalid response; metadata pages were not generated.",
  );
}

for (const blog of result.data) {
  if (
    typeof blog.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(blog.slug) ||
    !blog.title
  ) continue;

  const title = String(blog.title);
  const description = plainText(blog.meta_dis) || title;
  const canonical = `${siteUrl}/blog/${encodeURIComponent(blog.slug)}`;
  const image = blog.image ? new URL(blog.image, siteUrl).href : "";
  const tags = [
    `<title>${escapeHtml(title)} | College Drishti</title>`,
    metaTag("name", "description", description),
    metaTag(
      "name",
      "keywords",
      Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
    ),
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    metaTag("property", "og:type", "article"),
    metaTag("property", "og:site_name", "College Drishti"),
    metaTag("property", "og:title", title),
    metaTag("property", "og:description", description),
    metaTag("property", "og:url", canonical),
    ...(image
      ? [
          metaTag("property", "og:image", image),
          metaTag("property", "og:image:alt", title),
        ]
      : []),
    metaTag("name", "twitter:card", "summary_large_image"),
    metaTag("name", "twitter:title", title),
    metaTag("name", "twitter:description", description),
    ...(image ? [metaTag("name", "twitter:image", image)] : []),
  ].join("\n    ");

  const html = template
    .replace(/<title>.*?<\/title>/is, "")
    .replace("</head>", `    ${tags}\n  </head>`);
  const outputDirectory = path.join(distDirectory, "blog", blog.slug);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, "index.html"), html);
}

console.log(`Prerendered metadata for ${result.data.length} blogs.`);
