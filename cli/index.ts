import download from "./download";
import { fatal, log } from "./log";

import marked, { Renderer } from "marked";
import { writeHtml } from "./writer";

let header = "";
let cardIndex = -1;
const renderer = new Renderer();
renderer.codespan = (code: string) => {
    if (code.startsWith("page:")) {
        return "";
    }
    return code;
};
renderer.paragraph = (text: string): string => {
    if (text.length === 0) {
        return "";
    }
    cardIndex = cardIndex + 1;
    const rendered = ("<div class=\"card card-" + cardIndex + "\">" +
        (cardIndex > 0 ? "<h2>" + header + "</h2>" : "") +
        text +
        "</div>");
    return rendered;
};
renderer.heading = (text, level) => {
    if (level === 1) {
        return "<h1>" + text + "</h1>";
    }

    header = text;
    return "";
};
renderer.image = (href, title, text) => {
    if (cardIndex === -1) {
        return "<div class=\"stickyImage\" style=\"background: url(" + href + ")\">" +
            "<h2>" + header + "</h2>" +
            "</div>";
    }

    return "<img src=\"" + href + "\">";
};

download("/dillinger/студия \"aravaili\".md")
    .then((source) => {
        const body = marked(source.replace(/\n\n/g, "\n"), {
            breaks: true,
            renderer,
            gfm: true,
        }).replace(/<br>/g, "<br><br>");
        writeHtml("index.html", body);
    })
    .catch(fatal);
