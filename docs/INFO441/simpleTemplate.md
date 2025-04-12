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

# Template for a simple web server

```
import { promises as fs} from 'fs'
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

app.listen(3000, () => {
	console.log("Example app listening at http://localhost:3000")
})

```
