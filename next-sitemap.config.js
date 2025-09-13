/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function readSlugs(subdir) {
  const dir = path.join(process.cwd(), 'content', subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      try {
        const { data } = matter(raw);
        return data.slug || f.replace(/\.mdx$/, '');
      } catch {
        return f.replace(/\.mdx$/, '');
      }
    });
}

module.exports = {
  siteUrl: 'https://radheshyamtt.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  sitemapSize: 5000,
  additionalPaths: async () => {
    const placeSlugs = readSlugs('places');
    const storySlugs = readSlugs('stories');
    return [
      { loc: '/places' },
      { loc: '/stories' },
      ...placeSlugs.map((s) => ({ loc: `/places/${s}` })),
      ...storySlugs.map((s) => ({ loc: `/stories/${s}` })),
    ];
  },
};
