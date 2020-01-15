import * as fs from "fs-extra";
import { Renderer } from "marked";
import * as path from "path";
import { Page } from "./model";

export function writeHtml(pages: Page[]) {
  let burgerLinks = "<div id=\"burger-modal\" class=\"burger-links\">";
  for (const page of pages) {
    burgerLinks += "<a href=\"" + page.file + "\">" + page.title + "</a>";
  }
  burgerLinks += "<div class=\"red button\" onclick=\"javascript:showContactModal()\">Записаться</div>";
  burgerLinks += "</div>";

  for (const page of pages) {
    generateHtml(page.file, page.body + burgerLinks, page.title);
  }
}

function generateHtml(file: string, body: string, title: string) {
  const head = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="yandex-verification" content="0b02c38a22e2beb7" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="/css/hamburgers.min.css">
        <meta name="keywords" content="Массаж,Антицеллюлитный Массаж,Лешмейкер,Бровист,наращивание ресниц,депиляция,полировка,парикхмахер,Новокузнецк">
        <meta name="description" content="Студия Aravaili - массаж, наращивание ресниц, депиляция, полировка волос - Новокузнецк">
        <title>%title%</title>
        <!-- Yandex.Metrika counter --> <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(51786371, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true }); </script> <noscript><div><img src="https://mc.yandex.ru/watch/51786371" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
      </head>
      <body>
        <div class="root">
    `.replace("%title%", title);

  const footer = `
          <div class="card card-last">
            <h2>Наши группы</h2>
            <div class="contacts">
              <a target="_blank" href="https://vk.com/aravailiru"><div class="button">Вконтакте</div></a>
              <a target="_blank" href="https://www.instagram.com/aravaili"><div class="button">Instagram</div></a>
              <div class="space"></div>
            </div>
          </div>
          <div class="fab" onclick="javascript:showContactModal()"></div>
        </div>
        <script src="/js/main.js"></script>
      </body>
    </html>
    `;

  const target = "docs" + file;
  fs.ensureDirSync(path.dirname(target));
  fs.writeFileSync(target, head + body + footer, "utf-8");
}

export function writeSitemap(pages: Page[]) {
  let sitemapBody = `<?xml version="1.0" encoding="UTF-8"?>
\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  const now = new Date().toISOString();

  for (const next of pages) {
    sitemapBody += "\t<url>\n" +
      "\t\t<loc>" + next.file + "</loc>\n" +
      "\t\t<lastmod>" + now + "</lastmod>\n" +
      "\t</url>\n";
  }

  sitemapBody += "\t</urlset>";

  fs.writeFileSync("docs/sitemap.xml", sitemapBody, "utf-8");
}
