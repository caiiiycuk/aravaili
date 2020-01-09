import download from "./download";
import { fatal, log } from "./log";

import marked, { Renderer } from "marked";
import { writeHtml, writeSitemap } from "./writer";

import * as fse from "fs-extra";
import { Page } from "./model";

const names = [
    "Мария", "Марина", "Инна", "Виктория", "Олеся", "Алла", "Юлия", "Яна", "Надежда", "Диана", "Дина", "Людмила", "Кристина", "Елизавета", "Эльвира", "Дарья", "Элина", "Эвелина", "Ангелина", "Татьяна", "Анжела", "(Анжелика)", "Алина", "Маргарита", "Динара", "Анастасия", "Наталья", "Лаура", "Валерия", "Наташа", "Изольда", "Ирина", "Альбина", "Амина", "Арина", "Оксана", "Наталия", "Вероника", "Светлана", "Римма", "Ксения", "Александра", "Аделаида", "(Аделина)", "Полина", "Лена", "Снежана", "Елена", "Валентина", "Фарида", "Карина", "Рита", "Яна", "Анна", "Евгения", "Алиса", "Екатерина", "Сабина", "Лидия", "Галина", "Рената", "Лариса",
];

let page;
let header;
let cardHeader;
let cardIndex;
let nameIndex = 0;

const renderer = new Renderer();
renderer.codespan = (code: string) => {
    if (code.startsWith("page:")) {
        page = code.substr("page:".length);
    }
    return "";
};
renderer.paragraph = (text: string): string => {
    if (text.length === 0) {
        return "";
    }
    cardIndex = cardIndex + 1;
    const review = cardHeader.toLowerCase().indexOf("отзывы") >= 0;

    if (review) {
        const parts = text.split("<br>");
        text = "";
        for (const next of parts) {
            nameIndex++;
            text += "<div class=\"review\"><div class=\"review-header\">" + names[nameIndex] + "</div>" + next + "</div>";
        }
    }

    const rendered = ("<div class=\"card card-" + cardIndex + "\">" +
        (cardIndex > 0 && header.length > 0 ? "<h2>" + header + "</h2>" : "") +
        text +
        (cardIndex === 0 ?
            `</div><div class="map">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af79851170403b31c5c96e5face527836b3d87f775dd50aa02ca4d95680a3c6c7&amp;source=constructor" width="400" height="400" frameborder="0"></iframe>
            </div></div>` :
            "") +
        (cardIndex === 0 ? "<hr><div class=\"button\" onclick=\"javascript:showContactModal()\">Записаться</div>" : "") +
        "</div>");
    header = "";
    return rendered;
};
renderer.heading = (text, level) => {
    if (level === 1) {
        return "<div class=\"header\"><h1><a href=\"/\">" + text + "</a></h1>" +
        `<button id="burger" class="hamburger hamburger--collapse" type="button">
            <span class="hamburger-box">
            <span class="hamburger-inner"></span>
            </span>
        </button></div>`;
    }

    header = text;
    cardHeader = text;
    return "";
};
renderer.image = (href, title, text) => {
    if (cardIndex === -1) {
        return "<div class=\"stickyImage\" style=\"background: url(" + href + ")\">" +
            "<h2>" + header + "</h2>" +
            "</div><div class=\"info-map\"><div class=\"info\">";
    }

    return "<img src=\"" + href + "\">";
};
renderer.link = (href, title, text) => {
    return "<a href=\"" + href + "\" target=\"_self\"><div class=\"button\">" + text + "</div></a>";
};

const files = [
    "студия \"aravaili\".md",
    "Студия “Aravaili” - Антицеллюлитный массаж.md",
    "Студия “Aravaili” - Депиляция, ваксинг, шугаринг.md",
    "Студия “Aravaili” - Лэшмейкер и бровист.md",
    "Студия “Aravaili” - парикмахерские услуги..md",
];

async function generate(file: string): Promise<Page> {
    page = "";
    header = "";
    cardIndex = -1;
    cardHeader = "";

    const source = await download("/dillinger/" + file.toLowerCase());
    const body = marked(source.replace(/(#+)/g, "\n\n$1").replace(/\n\n/g, "\n"), {
        breaks: true,
        renderer,
        gfm: true,
    }).replace(/<br>/g, "<br><br>");

    let title: string;
    if (page === "/") {
        page = "/index.html";
        title = "Студия \"Aravaili\"";
    } else {
        title = file.substr(file.indexOf("-") + 1).trim();
        title = title.replace(".md", "");
        title = title.charAt(0).toUpperCase() + title.slice(1);
    }

    return {
        file: page,
        title,
        body,
    };
}

async function generateAll() {
    const pages: Page[] = [];
    for (const file of files) {
        pages.push(await generate(file));
    }

    writeHtml(pages);
    writeSitemap(pages);
    fse.copySync("build/browser/main.js", "public/js/main.js");
}

generateAll().then(() => log("Well done...")).catch(fatal);
