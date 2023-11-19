import base64
with open("a","r") as ff:
    for i in range(16):
        with open(f"images/nouns_{i}","wb") as g:
            g.write(base64.b64decode(ff.readline().split("data:image/svg+xml;base64,")[1]))

