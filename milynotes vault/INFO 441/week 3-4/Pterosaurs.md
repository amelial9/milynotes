

```
DEMO_PTEROSAURS/
├── data/
│   └── pterosaur.json
├── public/
│   ├── stylesheets/
│   ├── index.html
│   └── index.js
├── routes/
│   ├── api.js
│   └── users.js
└── app.js
```


app.js
```
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users.js';
import apiRouter from "./routes/api.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api', apiRouter)

export default app;
```

api.js
```
import express from 'express'
import { promises as fs } from 'fs'

var router = express.Router()

router.get('/getPterosaurs', async (req, res) => {
    const data = await fs.readFile("data/pterosaur.json")
    let pterosaurInfo = JSON.parse(data)

    let filteredPterosaurInfo = 
        pterosaurInfo.filter(item => {
            if (item.img != "") {
                return true
            }
            else {
                return false
            }
        })

    res.json(filteredPterosaurInfo)
});

export default router;
```

index.html
```
<html>

  <head>
    <title>Pterosaur</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    <script src="index.js"></script>
  </head>

  <body>
    <h1>Pterosaur</h1>
    <p>See Pterosaur Deta!</p>
    <button onClick="getPterosaurs()">Load Pterosaurs</button>
    <div id="results"></div>
  </body>

</html>
```


index.js
```
async function getPterosaurs() {
    let response = await fetch("api/getPterosaurs")
    let dataJson = await response.json()

    let pterosaurHtml = dataJson.map(item => {
        return `
            <div>
                <p>${item.Genus}</p>
                <img src=${item.img} />
            </div>`
    }).join("")

    document.getElementById("results").innerHTML = pterosaurHtml
}
```