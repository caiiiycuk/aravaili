import "framework7/css/framework7.min.css";

import Framework7 from "framework7";
import PhotoBrowser from "framework7/components/photo-browser/photo-browser.js";
import Popup from "framework7/components/popup/popup.js";
import Swiper from "framework7/components/swiper/swiper.js";
import Actions from "framework7/components/actions/actions.js";


(Framework7 as any).use([Popup, Swiper, PhotoBrowser, Actions]);

const app = new Framework7({
  root: "#app",
  name: "Aravaili - Красивая каждый день",
  id: "ru.aravaili",
  theme: "md",
  routes: [],
  init: false,
});

const createSlider = () => {
  const container = document.getElementById("my-slider") as HTMLDivElement;
  const leftImage = document.getElementById("left-image") as HTMLImageElement;
  const rightImage = document.getElementById("right-image") as HTMLImageElement;

  if (container === null || leftImage === null || rightImage === null) {
    return;
  }

  leftImage.onload = () => {
    rightImage.onload = () => {
      leftImage.style.display = "block";
      rightImage.style.display = "block";

      const realWidth = Math.min(container.offsetWidth, 640);
      const options = {
        direction: "horizontal", // string horizontal & vertical
        initial: 50, // integer default = 30px (initial position for slider in px)
        width: realWidth,
        height: realWidth / 640 * 853,
        filter: {
          active: true, // boolean
        },
      };
      const mySlider = new (window as any).Cato(options, container);
      mySlider.createSlider();
    };
    rightImage.src = "img/right.jpg";
  };
  leftImage.src = "img/left.jpg";
};

let browser: any = null;
const createGallery = () => {
  const gallery = document.getElementById("gallery") as HTMLHRElement;
  if (gallery === null) {
    return;
  }

  gallery.onclick = () => {
    if (browser === null) {
      browser = app.photoBrowser.create({
        routableModals: false,
        photos: [
          "img/g1.jpg",
          "img/g2.jpg",
          "img/g3.jpg",
          "img/g4.jpg",
        ],
      });
    }
    browser.open();
  };
};

const createContactPopup = () => {
  const contactUs = document.getElementById("contact-us") as HTMLHRElement;
  if (contactUs === null) {
    return;
  }

  const popup = (app.actions as any).create({
    buttons: [
      [
        {
          text: "Записаться",
          label: true,
        },
        {
          text: "Почта",
          onClick: () => {
            window.open("mailto:aravaili@mail.ru");
          },
        },
        {
          text: "Вконтакте",
          onClick: () => {
            window.open("https://vk.com/aravaili");
          },
        },
        {
          text: "Instagram",
          onClick: () => {
            window.open("https://www.instagram.com/aravaili");
          },
        },
        {
          text: "WhatsApp",
          onClick: () => {
            window.open("whatsapp://send/?phone=79089438167");
          },
        },
        {
          text: "Viber",
          onClick: () => {
            window.open("viber://add?number=79089438167");
          },
        },
      ],
      [
        {
          text: "Отмена",
          color: "red",
        },
      ],
    ],
  });

  contactUs.onclick = () => {
    popup.open();
  };
};

app.on("init", () => {
  app.views.create(".view-main");
  createGallery();
  createContactPopup();
  createSlider();
});

app.init();
