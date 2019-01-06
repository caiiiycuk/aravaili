import os

def create_injection():
    scripts = ""
    styles = ""
    for root, dirs, files in os.walk("build/static"):
        for file in files:
            file = os.path.join(root, file)[len("build"):]
            if (file.endswith(".js") and not "runtime" in file):
                scripts += "<script src=\"%s\"></script>\n" % file
            if (file.endswith(".css")):
                styles += "<link href=\"%s\" rel=\"stylesheet\">\n" % file
    return (scripts, styles)

def inject(file, scripts, styles):
    with open(file, 'r') as f:
        contents = f.read()
    
    contents = contents.replace("</head>", styles + "</head>")
    contents = contents.replace("</body>", scripts + "</body>")

    with open(file, 'w') as f:
        f.write(contents)

(scripts, styles) = create_injection()
inject("build/nvkz/massage.html", scripts, styles)