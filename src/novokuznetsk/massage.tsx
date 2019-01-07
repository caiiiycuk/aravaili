import "framework7/css/framework7.min.css";

import Framework7 from "framework7";
import Actions from "framework7/components/actions/actions.js";
import PhotoBrowser from "framework7/components/photo-browser/photo-browser.js";
import Popup from "framework7/components/popup/popup.js";
import Swiper from "framework7/components/swiper/swiper.js";
import { createApp, createContactPopup, createGallery, createReviews, createSlider } from "./common";

export function initMassagePage() {
  (Framework7 as any).use([Popup, Swiper, PhotoBrowser, Actions]);

  const app = createApp();

  app.on("init", () => {
    app.views.create(".view-main");
    createGallery(app, [
      "/img/massage/g1.jpg",
      "/img/massage/g2.jpg",
      "/img/massage/g3.jpg",
      "/img/massage/g4.jpg",
    ]);
    createContactPopup(app);
    createSlider("/img/massage/left.jpg", "/img/massage/right.jpg", 640, 853);
    createReviews();
  });

  app.init();
}
