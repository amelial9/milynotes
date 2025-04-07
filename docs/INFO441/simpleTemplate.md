---
hide:
  - navigation
  - toc
---

# Template for a simple server

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
