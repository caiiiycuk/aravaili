require("isomorphic-fetch");

import Dropbox from "dropbox";
import { fatal, log } from "./log";

const dbx = new Dropbox.Dropbox({
    accessToken: "9seufdWScBAAAAAAAAAFU9T5jaEMnW9HGXuUUC-briRNxg7Z0rgdis85hQt1PZZd",
});

// dbx.filesListFolder({path: "/dillinger/"}).then(log).catch(fatal);

export default function download(path: string) {
    return new Promise<string>((resolve, reject) => {
        dbx.filesDownload({
            path,
        }).then((response) => {
            resolve((response as any).fileBinary.toString("utf8"));
        }).catch(fatal);
    });
}
