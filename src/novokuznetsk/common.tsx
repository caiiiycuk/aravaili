import Dom7 from "dom7";
import Framework7 from "framework7";

export function createApp() {
    return new Framework7({
        root: "#app",
        name: "Aravaili - Студия красоты, Новокузнецк",
        id: "ru.aravaili",
        // theme: "ios",
        routes: [],
        init: false,
    });
}

function isMobile() {
    let check = false;
    /* tslint:disable:all */
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(window as any).opera);
    return check;
}

export function createContactPopup(app: Framework7) {
    const contactUs = document.getElementById("contact-us") as HTMLHRElement;
    if (contactUs === null) {
        return;
    }
    
    let popup;
    if (isMobile()) {
        popup = (app.actions as any).create({
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
    } else {
        popup = (app.actions as any).create({
            buttons: [
                [
                    {
                        text: "Записаться +7 (908) 943 8167",
                        label: true,
                    },
                    {
                        text: "WhatsApp, Viber, Telegram, Direct +7 (908) 943 8167",
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
                ],
                [
                    {
                        text: "Отмена",
                        color: "red",
                    },
                ],
            ],
        });
    }

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
