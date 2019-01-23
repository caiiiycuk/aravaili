import Dom7 from "dom7";
import Framework7 from "framework7";

export function createApp() {
    return new Framework7({
        root: "#app",
        name: "Aravaili - Студия красоты, Новокузнецк",
        id: "ru.aravaili",
        theme: "md",
        routes: [],
        init: false,
    });
}

export function createContactPopup(app: Framework7) {
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
                    text: "Позвонить +7 (908) 943 8167",
                    onClick: () => {
                        window.open("tel:+79089438167");
                    },
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
                    text: "Telegram",
                    onClick: () => {
                        window.open("tg://resolve?domain=79089438167");
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
}

export function createSlider(leftImageSrc: string, rightImageSrc: string,
    width: number, height: number, initialPos: number = 50) {
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

            const realWidth = Math.min(container.offsetWidth, width);
            const options = {
                direction: "horizontal", // string horizontal & vertical
                initial: initialPos, // integer default = 30px (initial position for slider in px)
                width: realWidth,
                height: realWidth / width * height,
                filter: {
                    active: true, // boolean
                },
            };
            const mySlider = new (window as any).Cato(options, container);
            mySlider.createSlider();
        };
        rightImage.src = rightImageSrc;
    };
    leftImage.src = leftImageSrc;
}

let photoBrowserInstance: any = null;
export function createGallery(app: Framework7, photos: string[]) {
    const gallery = document.getElementById("gallery") as HTMLHRElement;
    if (gallery === null) {
        return;
    }

    gallery.onclick = () => {
        if (photoBrowserInstance === null) {
            photoBrowserInstance = app.photoBrowser.create({
                routableModals: false,
                photos,
            });
        }
        photoBrowserInstance.open();
    };
}

export function createReviews() {
    let next = -1;

    const showRandom = () => {
        const all = Dom7(".message");

        if (next === -1) {
            next = Math.round(Math.random() * (all.length - 1));
        }
        next = (next + 1) % all.length;
        
        all.hide();
        all.eq(next).show();
    };

    Dom7("#reloadReview").on("click", () => {
        showRandom();
    });

    showRandom();
}
