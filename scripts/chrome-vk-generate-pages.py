import json
import shutil
import os
import re
from transliterate import translit

shutil.rmtree('public/novokuznetsk/products/')
os.mkdir('public/novokuznetsk/products/')

symbols = (u"абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
           u"abvgdeejzijklmnoprstufhzcss_y_euaABVGDEEJZIJKLMNOPRSTUFHZCSS_Y_EUA")

tr = {ord(a):ord(b) for a, b in zip(*symbols)}

def main():
    with open('scripts/pages.json', 'r') as f:
        pages = json.load(f)

    with open('scripts/pages-massage.html', 'r') as f:
        index = f.read()

    with open('scripts/pages-product.html', 'r') as f:
        product = f.read()

    with open('public/novokuznetsk/products/massage.html', 'w') as f:
        contents = ""
        for page in pages:
            productpage = product % (page['name'], page['name'], page['photo'], page['description'], page['price'])
            htmlpage = re.sub(r"[ -'.()№-]", '', translit(page['name'], 'ru', reversed=True).lower()) + ".html"
            contents += item % (page['photo'], page['name'], page['price'], htmlpage) + "\n"

            with open('public/novokuznetsk/products/' + htmlpage, 'w') as p:
                p.write(productpage)
        
        f.write(index % contents)

item = '''
<li class="item-content">
<div class="item-media"><img src="%s" width="44" /></div>
<div class="item-inner">
        <div class="item-title-row">
            <div class="item-title">%s</div>
        </div>
        <div class="item-subtitle">%s</div>
        <div><a class="button button-outline link external" href="%s">Подробнее</a></div>
</div>
</li>
'''

main()