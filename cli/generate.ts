import download from "./download";
import { fatal, log } from "./log";

import marked, { Renderer } from "marked";
import { writeHtml } from "./writer";

import * as fse from "fs-extra";
import { Page } from "./model";

let page;
let header;
let cardIndex;

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
    const rendered = ("<div class=\"card card-" + cardIndex + "\">" +
        (cardIndex > 0 ? "<h2>" + header + "</h2>" : "") +
        text +
        (cardIndex === 0 ?
            '</div><div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2358.3248117329445!2d87.13793991596218!3d53.76590475090238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42d0c1b844c70217%3A0xbe6c6123aaaa1dfa!2z0KHRgtGD0LTQuNGPICJBcmF2YWlsaSI!5e0!3m2!1sru!2sru!4v1578486074090!5m2!1sru!2sru" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen=""></iframe></div></div>' :
            "") +
        (cardIndex === 0 ? "<hr><div class=\"button\" onclick=\"javascript:showContactModal()\">Записаться</div>" : "") +
        "</div>");
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
    fse.copySync("build/browser/main.js", "public/js/main.js");
}

generateAll().then(() => log("Well done...")).catch(fatal);
