var sm = require('sitemap');
var fs = require('fs');

var sitemap = sm.createSitemap({
    hostname: 'https://aravaili.ru',
    cacheTime: 24 * 60 * 60 * 1000,  // oneday
    urls: [
        { url: '/', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'public/index.html' },
        { url: '/nvkz/massage.html', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'public/nvkz/massage.html' },
        { url: '/nvkz/lashmaker.html', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'public/nvkz/lashmaker.html' }
    ]
});

fs.writeFileSync("public/sitemap.xml", sitemap.toString());