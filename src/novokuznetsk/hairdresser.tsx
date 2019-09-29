import "framework7/css/framework7.min.css";

import Framework7 from "framework7";
import Actions from "framework7/components/actions/actions.js";
import PhotoBrowser from "framework7/components/photo-browser/photo-browser.js";
import Popup from "framework7/components/popup/popup.js";
import Swiper from "framework7/components/swiper/swiper.js";
import { createApp, createContactPopup, createGallery, createReviews } from "./common";

export function initHairdresser() {
  (Framework7 as any).use([Popup, Swiper, PhotoBrowser, Actions]);

  const app = createApp();

  app.on("init", () => {
    app.views.create(".view-main");
    const photos: string[] = [];
    for (let i = 0; i < 3; ++i) {
      photos.push("/img/hairdresser/" + i + ".jpg");
    }
    createGallery(app, photos);
    createContactPopup(app);
    createReviews();
  });

  app.init();
}
