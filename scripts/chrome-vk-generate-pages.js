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

        const content = `
<li class="item-content">
<div class="item-media"><img src="${data.photo}" width="44" /></div>
<div class="item-inner">
    <div class="item-title-row">
        <div class="item-title">${data.name}</div>
    </div>
    <div class="item-subtitle">${data.price}</div>
</div>
</li>
        `;

        pages.push(content);

        const next = document.getElementById('wk_right_arrow');

        if (next.style["display"] === "none") {
            console.log(pages.join("\n"));
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

