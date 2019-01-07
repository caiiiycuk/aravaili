import Framework7 from "framework7";
import Actions from "framework7/components/actions/actions.js";
import PhotoBrowser from "framework7/components/photo-browser/photo-browser.js";
import Popup from "framework7/components/popup/popup.js";
import Swiper from "framework7/components/swiper/swiper.js";
import { createApp, createContactPopup } from "./common";

export function initIndexPage() {
    (Framework7 as any).use([Popup, Swiper, PhotoBrowser, Actions]);

    const app = createApp();

    app.on("init", () => {
        app.views.create(".view-main");
        createContactPopup(app);
    });

    app.init();
}
