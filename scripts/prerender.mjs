// Runs after `vite build`: writes one real HTML page per language plus the
// crawler files, all generated from src/data so they can't drift from the site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "src/data", `${name}.json`), "utf8"));

const site = readJson("site");
const languages = { en: readJson("en"), fr: readJson("fr"), es: readJson("es") };
const { render } = await import(pathToFileURL(path.join(root, ".ssr/entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const pagePath = (lang) => (lang === site.defaultLanguage ? "/" : `/${lang}/`);
const pageUrl = (lang) => site.url + pagePath(lang);
const asset = (file) => site.url + file;
const attr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function structuredData(lang) {
  const t = languages[lang];
  const { profile, person } = site;
  const personId = `${site.url}/#person`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: `${profile.name} Portfolio`,
      inLanguage: Object.keys(languages),
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl(lang)}#profile`,
      url: pageUrl(lang),
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: lang,
      dateModified: site.lastUpdated,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: person.givenName,
      familyName: person.familyName,
      jobTitle: t.intro.role,
      description: t.meta.description,
      url: pageUrl(lang),
      image: asset(profile.photoJpg),
      email: `mailto:${profile.email}`,
      telephone: person.telephone,
      address: { "@type": "PostalAddress", addressLocality: person.locality, addressCountry: person.country },
      worksFor: { "@type": "Organization", name: person.worksFor },
      alumniOf: person.alumniOf.map(({ type, name }) => ({ "@type": type, name })),
      knowsAbout: person.knowsAbout,
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl(lang)}#projects`,
      name: t.projects.heading,
      itemListElement: t.projects.items.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          keywords: site.projectMeta[i].tags.join(", "),
          creator: { "@id": personId },
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl(lang)}#faq`,
      inLanguage: lang,
      mainEntity: t.faq.items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
  // "<" can't appear raw inside a script tag
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

function headTags(lang) {
  const { meta } = languages[lang];
  const image = asset(site.profile.ogImage);
  const alternates = Object.keys(languages)
    .map((code) => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}" />`)
    .join("\n    ");
  const otherLocales = Object.keys(languages)
    .filter((code) => code !== lang)
    .map((code) => `<meta property="og:locale:alternate" content="${languages[code].meta.locale}" />`)
    .join("\n    ");

  return `<meta name="description" content="${attr(meta.description)}" />
    <meta name="author" content="${attr(site.profile.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${pageUrl(lang)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${pageUrl(site.defaultLanguage)}" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="${attr(site.profile.name)}" />
    <meta property="og:title" content="${attr(meta.title)}" />
    <meta property="og:description" content="${attr(meta.description)}" />
    <meta property="og:url" content="${pageUrl(lang)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${attr(meta.ogImageAlt)}" />
    <meta property="og:locale" content="${meta.locale}" />
    ${otherLocales}
    <meta property="profile:first_name" content="${attr(site.person.givenName)}" />
    <meta property="profile:last_name" content="${attr(site.person.familyName)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${attr(meta.title)}" />
    <meta name="twitter:description" content="${attr(meta.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${structuredData(lang)}</script>`;
}

function write(relative, content) {
  const file = path.join(dist, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

for (const lang of Object.keys(languages)) {
  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace(/<title>.*?<\/title>/, () => `<title>${attr(languages[lang].meta.title)}</title>`)
    .replace("<!--app-head-->", () => headTags(lang))
    .replace("<!--app-html-->", () => render(lang));
  write(`${pagePath(lang).slice(1)}index.html`, html);
}

// Sitemap with every language version cross-linked
const urls = Object.keys(languages)
  .map((lang) => {
    const links = Object.keys(languages)
      .map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(code)}" />`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(site.defaultLanguage)}" />`)
      .join("\n");
    return `  <url>\n    <loc>${pageUrl(lang)}</loc>\n    <lastmod>${site.lastUpdated}</lastmod>\n${links}\n  </url>`;
  })
  .join("\n");
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
);

// llms.txt (summary) and llms-full.txt (everything). Google Search ignores these;
// other AI assistants may read them.
const t = languages[site.defaultLanguage];
const facts = `## Key facts

- Name: ${site.profile.name}
- Role: ${t.intro.role} at ${site.person.worksFor}
- Location: ${t.contact.location}
- Technologies: ${site.person.knowsAbout.join(", ")}
- Email: ${site.profile.email}
- Phone: ${site.profile.phone}
- GitHub: ${site.profile.github}
- LinkedIn: ${site.profile.linkedin}
- Last updated: ${site.lastUpdated}
`;
const pages = Object.keys(languages)
  .map((lang) => `- [${languages[lang].meta.title}](${pageUrl(lang)}): ${languages[lang].meta.description}`)
  .join("\n");
write(
  "llms.txt",
  `# ${site.profile.name}\n\n> ${t.about.intro}\n\n## Pages\n\n${pages}\n- [Full details](${site.url}/llms-full.txt): Experience, projects and FAQ in plain text.\n\n${facts}`
);

const experience = t.experience.items
  .map((item) => `### ${item.role}, ${item.company} (${item.period})\n\n${item.desc}`)
  .join("\n\n");
const projects = t.projects.items
  .map((project, i) => {
    const points = project.points.map((point) => `- ${point}`).join("\n");
    const stack = site.projectMeta[i].tags.join(", ");
    return `### ${project.title}\n\n${project.context}. ${project.summary}\n${points ? `\n${points}\n` : ""}\nStack: ${stack}`;
  })
  .join("\n\n");
const faq = t.faq.items.map(({ q, a }) => `### ${q}\n\n${a}`).join("\n\n");
write(
  "llms-full.txt",
  `# ${site.profile.name}\n\n> ${t.about.intro}\n\n${facts}\n## About\n\n${t.about.p1}\n\n${t.about.p2}\n\n## Experience\n\n${experience}\n\n## Projects\n\n${projects}\n\n## ${t.exploring.heading}\n\n${t.exploring.p1}\n\n## FAQ\n\n${faq}\n`
);

fs.rmSync(path.join(root, ".ssr"), { recursive: true, force: true });
console.log(`Pre-rendered: ${Object.keys(languages).map(pagePath).join(", ")} + sitemap.xml, llms.txt, llms-full.txt`);
