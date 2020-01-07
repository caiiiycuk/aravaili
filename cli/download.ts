require("isomorphic-fetch");

import Dropbox from "dropbox";
import { fatal } from "./log";

const dbx = new Dropbox.Dropbox({
    accessToken: "9seufdWScBAAAAAAAAAFTtK6e3PpFPgAXfrKHvVc53iTHAugPn-R1xZkrP6CE-OY",
});

export default function download(path: string) {
    return new Promise<string>((resolve, reject) => {
        dbx.filesDownload({
            path,
        }).then((response) => {
            resolve((response as any).fileBinary.toString("utf8"));
        }).catch(fatal);
    });
}
