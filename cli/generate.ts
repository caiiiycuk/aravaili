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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2358.3248117329445!2d87.13793991596218!3d53.76590475090238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42d0c1b844c70217%3A0xbe6c6123aaaa1dfa!2z0KHRgtGD0LTQuNGPICJBcmF2YWlsaSI!5e0!3m2!1sru!2sru!4v1578486074090!5m2!1sru!2sru" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
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
    if (cardIndex === -1 && header.length > 0) {
        const content = "<div class=\"stickyImage\" style=\"background: url(" + href + ")\">" +
            "<h2>" + header + "</h2>" +
            "</div><div class=\"info-map\"><div class=\"info\">";
        header = "";
        return content;
    }

    return "<img src=\"" + href + "\">";
};
renderer.link = (href, title, text) => {
    return "<a href=\"" + href + "\" target=\"_self\"><div class=\"button\">" + text + "</div></a>";
};
renderer.strong = (text) => {
    if (text.startsWith("красный:")) {
        text = text.substr("красный:".length);
        return `<span style="color:red;font-size:2em;">` + text + "</span>";
    }
    return text;
};

const files = [
    "студия \"aravaili\".md",
    "Студия “Aravaili” - Антицеллюлитный массаж.md",
    "Студия “Aravaili” - Депиляция, ваксинг, шугаринг.md",
    "Студия “Aravaili” - Лэшмейкер и бровист.md",
    "Студия “Aravaili” - парикмахерские услуги..md",
    "Студия Aravaili - Акции.md",
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

    if (page === "") {
        page = "/" + transliterate(title) + ".html";
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

const a = { Ё: "YO", Й: "I", Ц: "TS", У: "U", К: "K", Е: "E", Н: "N", Г: "G", Ш: "SH", Щ: "SCH", З: "Z", Х: "H", Ъ: "'", ё: "yo", й: "i", ц: "ts", у: "u", к: "k", е: "e", н: "n", г: "g", ш: "sh", щ: "sch", з: "z", х: "h", ъ: "'", Ф: "F", Ы: "I", В: "V", А: "a", П: "P", Р: "R", О: "O", Л: "L", Д: "D", Ж: "ZH", Э: "E", ф: "f", ы: "i", в: "v", а: "a", п: "p", р: "r", о: "o", л: "l", д: "d", ж: "zh", э: "e", Я: "Ya", Ч: "CH", С: "S", М: "M", И: "I", Т: "T", Ь: "'", Б: "B", Ю: "YU", я: "ya", ч: "ch", с: "s", м: "m", и: "i", т: "t", ь: "'", б: "b", ю: "yu" };

function transliterate(word) {
    return word.split("").map((char) => {
        return a[char] || char;
    }).join("");
}
