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

# User Data Demo (MongoDB)

```
USER_DATA/
├── routes/
│   └── api.js
│   └── users.js
├── public/
│   └── index.html
│   └── index.js
│   └── stylesheets/
│       └── style.css
├── models.js
└── app.js
```


app.js
```
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import models from "./models.js"

import usersRouter from './routes/users.js';
import apiRouter from './routes/api.js'

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

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/users', usersRouter);
app.use('/api', apiRouter)


export default app;
```


model.js
```
import mongoose from 'mongoose'

const models = {}

console.log("connecting to mongodb")

await mongoose.connect("mongodb+srv://<myusername>:<mypw>@cluster0.i36zdqv.mongodb.net/<tablename>")

console.log("successfully connected to mongodb!")

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
})

models.User = mongoose.model('User', userSchema)

console.log("finished creating models")

export default models
```


api.js
```
import { promises as fs } from 'fs'
import express from 'express'
const router = express.Router();

router.get('/getUsers', async (req, res) => {
    let allUsers = await req.models.User.find()
    res.json(allUsers)
})

router.post('/users', async (req, res) => {
    console.log(req.body)

    const newUser = new req.models.User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        favorite_ice_cream: req.body.favorite_ice_cream
    })

    await newUser.save()

    res.send("success")
})

export default router;
```


users.js
```
import express from 'express';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
```


index.html
```
<html>

<head>
  <title>User Info Uploader</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
  <script src="index.js"></script>
</head>

<body>
  <h1>User Info Uploader</h1>
  First Name: <input type="text" id="first_name_input" />
  <br>
  <br>
  Last Name: <input type="text" id="last_name_input" />
  <br>
  <br>
  Favorite Ice Cream: <input type="text" id="favorite_ice_cream_input" />
  <br>
  <br>
  <button onclick="createUser()">Create User</button>
  <br>
  <br>
  <button onclick="getUsers()">Load Users</button>
  <div id="results"></div>
</body>

</html>
```


index.js
```
async function getUsers(){
    let response = await fetch("api/getUsers")
    let dataJson = await response.json()

    document.getElementById("results").innerHTML = JSON.stringify(dataJson)
}

async function createUser(){
    // data from html
    let first_name = document.getElementById("first_name_input").value
    let last_name = document.getElementById("last_name_input").value
    let favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

    let myData = {
        first_name: first_name,
        last_name: last_name,
        favorite_ice_cream: favorite_ice_cream
    }
    // send the data to server as a "POST" request
    const response = await fetch('api/users', {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}
```