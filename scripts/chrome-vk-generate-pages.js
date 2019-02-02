function extract(pages) {
    const more = document.querySelector('a.wall_post_more');
    
    if (more != null) {
        more.click();
    }

    const read = () => {
        const data = {
            'name': document.querySelector('div.market_item_title').innerHTML,
            'price': document.querySelector('div.market_item_price').innerHTML,
            'description': document.querySelector('div.market_item_description').innerHTML,
            'photo': document.getElementById('market_item_photo').src
        }

        pages.push(data);

        const next = document.getElementById('wk_right_arrow');

        if (next.style["display"] === "none") {
            console.log(JSON.stringify(pages));
            return;
        } else {
            next.click();
            const fn = () => {
                extract(pages);
            };

            setTimeout(fn, 1000);
        }
    };

    setTimeout(read, 1000);
};

