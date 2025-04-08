---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# Audit Image Tags from URL

app.js
```
import { promises as fs} from 'fs'
import express from 'express'
const app = express()

import fetch from 'node-fetch'
import parser from 'node-html-parser'

app.get("/", async (req, res) => {
    console.log("got a request for /")
    res.type('html')
    let fileContents = await fs.readFile("index.html")
    res.send(fileContents)
})

app.get("/style.css", async (req, res) => {
    console.log("got a request for style.css")
    res.type("css")
    let fileContent = await fs.readFile("style.css")
    res.send(fileContent)
})

app.get("/index.js", async (req, res) => {
    console.log("got a request for index.js")
    res.type("js")
    let fileContents = await fs.readFile("index.js")
    res.send(fileContents)
})

app.get("/favicon.ico", async (req, res) => {
    res.type("png")
    let fileContents = await fs.readFile("favicon.ico")
    res.send(fileContents)
})

app.get("/api/auditurl", async (req, res) => {
    const inputUrl = req.query.url
    
    const response = await fetch(inputUrl)
    const pageText = await response.text()

    console.log(pageText)

    const htmlPage = parser.parse(pageText)
    const imgTags = htmlPage.querySelectorAll("img")

    var htmlReturn = ""
    
    for (let i = 0; i < imgTags.length; i++)
    {
        const imgTag = imgTags[i]

        htmlReturn += "<h3>Image " + i + " info: </h3>" 
        htmlReturn += "alt text: " + imgTag.attributes.alt + "<br>"
        htmlReturn += "img src: " + imgTag.attributes.src + "<br>"
        htmlReturn += "<img src='" + inputUrl + imgTag.attributes.src + "' />"
    }

    res.type("html")
    res.send(htmlReturn)

})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})
```

index.js
```
async function auditUrl() {
    let inputUrl = document.getElementById("urlInput").value
    let response = await fetch("api/auditurl?url=" + inputUrl)
    let resultText = await response.text()

    document.getElementById("results").innerHTML = resultText;
}
```

index.html
```
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <script src="index.js"></script>
    </head>
    <body>
        <h1>Audit Image Tags</h1>
        <input type="text" id="urlInput" />
        <button onclick="auditUrl()">Audit Img Tags for URL</button>
        <br>
        <br>
        <div id="results"></div>
    </body>
</html>
```

style.css
```
h1 {
    color: pink
}

body {
    background-color: lightyellow
}

button {
    background-color: lightcoral;
    color: white;
    border-color: skyblue;
}

img {
    max-height: 300px;
    max-width: auto;
}
```