with open('scripts/pages.log', 'r') as f:
    contents = f.read()

with open('scripts/pages-massage.html', 'r') as f:
    index = f.read()

with open('public/novokuznetsk/products/massage.html', 'w') as f:
    f.write(index % contents)
