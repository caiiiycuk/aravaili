var sm = require('sitemap');
var fs = require('fs');
var dir = require('node-dir');

dir.files("public/novokuznetsk/", function(err, files) {
    if (err) throw err;

    const urls = [
        { url: '/', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'public/index.html' },
    ];

    for (const file of files) {
        const path = file.substr("public/".length);
        urls.push({ url: '/' + path, changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'public/' + path });
    }

    var sitemap = sm.createSitemap({
        hostname: 'https://aravaili.ru',
        cacheTime: 24 * 60 * 60 * 1000,  // oneday
        urls: urls
    });
    
    fs.writeFileSync("public/sitemap.xml", sitemap.toString());
});

