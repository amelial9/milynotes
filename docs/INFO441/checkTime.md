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

# Check Time

app.js 
```
import { promises as fs } from 'fs'
import express from 'express'
const app = express()

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

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})
```

index.html
```
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <script src="index.js"></script>
    </head>
    <body>
        <h1>Current Time Demo</h1>
        <button onclick="checkTime()">Check Time</button>
        <br>
        <br>
        <div id="results"></div>
    </body>
</html>
```

index.js
```
async function checkTime() {
    let response = await fetch("api/getTime")
    let resultText = await response.text()

    document.getElementById("results").innerHTML = resultText
}
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
```