import * as fs from "fs";
import { Renderer } from "marked";


export function writeHtml(file: string, body: string) {
    const head = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <title>React App</title>
      </head>
      <body>
    `;

    const footer = `
      </body>
    </html>
    `;

    fs.writeFileSync("public/" + file, head + body + footer, "utf-8");
}