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

# User Actions

```
demo/
├── routes/
│   └── api/
│       └── v1/
│           └── apiv1.js
│           └── controllers/
│               └─ users.js
├── public/
│   └── index.html
│   └── stylesheets/
│       └── style.css
│   └── javascripts/
│       └── index.js
│   models.js
└── app.js
```

<br>

app.js
```
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiv1Router from './routes/api/v1/apiv1.js'

import models from './models.js'

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

app.use('/api/v1', apiv1Router)

export default app;
```

models.js
```
import mongoose from "mongoose"

const models = {}

console.log("Tryin to connect to mongodb")
await mongoose.connect("mongodb+srv://<username>:<pw>@cluster0.i36zdqv.mongodb.net/playlists")

console.log("successfully connected to mondogb")

const userSchema = new mongoose.Schema({
    username: String,
    favorite_bands: [String]
})

models.User = mongoose.model("User", userSchema)

console.log("successfully created db")

export default models
```

apiv1.js
```
import express from 'express'
const router = express.Router()

import usersRouter from './controllers/users.js'

router.use('/users', usersRouter)

export default router
```

users.js
```
import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let allUsers = await req.models.User.find()
        res.json(allUsers)
    } catch(error) {
        console.log("error", err)
        res.status(500).json({status: "server error"})
    }
})

router.post('/', async (req, res) => {
    try {
        const username = req.body.username

        let newUser = new req.models.User({
            username: username
        })
    
        await newUser.save()

        res.json({status: 'success'})
    } catch(error) {
        console.log("error", err)
        res.status(500).json({status: "server error"})
    }
})

router.post('/bands', async (req, res) => {
    let userId = req.body.userId
    let band = req.body.band

    // find the right user
    let user = await req.models.User.findById(userId)

    // update with the new band
    if(!user.favorite_bands.includes(band)){
        user.favorite_bands.push(band)
    }

    // save
    await user.save()
    res.json({status: 'success'})
})

export default router
```

index.html
```
<html>

<head>
  <title>Info upload</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
  <script src="javascripts/index.js" ></script>
</head>

<body>
  <h1>Playlist</h1>
  <h2>Add User</h2>
  Name: <input id="name_input" type=text />
  <br>
  <button onclick = "addUser()">Add User</button>
  <div id="results"></div>

  <hr>
  <h2>All users</h2>
  <button onclick="loadUsers()">Load Users</button>
  <div id="allusersdiv">
    click "Load Users" to see users
  </div>

</body>

</html>
```

index.js
```

async function addUser(){
    let name = document.getElementById("name_input").value

    await fetch("/api/v1/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: name})
    })
}

async function loadUsers(){
    document.getElementById("allusersdiv").innerText = "loading..."

    let response = await fetch("/api/v1/users")
    let usersJson = await response.json()

    let usersHTML = usersJson.map(userInfo => {
        return `
        <hr>
        <div>
            <h3>
                Username: ${userInfo.username}
                <button onclick="deleteUser('${userInfo._id}')">Delete</button>
            </h3>
            <strong>Favorite Bands:</strong> ${userInfo.favorite_bands ? userInfo.favorite_bands.join(", ") : "" } <br>
            <strong>Add Band:</strong> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>

            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}">Loading playlists...</div>

            <h3>Add Playlist</h3>
            <strong>Title:</strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /> <br>
            <strong>Songs:</strong> <input type="text" id="add_playlist_song_text_${userInfo._id}" /> <br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
    }).join("<hr>")

    document.getElementById("allusersdiv").innerHTML = usersHTML 

    usersJson.forEach(userInfo => {
        loadPlaylistsForUser(userInfo._id)
    })
}

async function loadPlaylistsForUser(userId){
    // get playlists for that user
    let response = await fetch("/api/v1/playlists?userId=" + userId)
    let playlistJSON = await response.json()

    // add html to the right div for that user
    let playlistHTML = playlistJSON.map(playalistInfo => {
        return `
        <div>
            <h4>Playlist: ${playalistInfo.title}</h4>
            <strong>Songs:</strong> ${playalistInfo.songs}
        </div>
        `
    }).join("")

    document.getElementById("playlist_div_" + userId).innerHTML = playlistHTML

}

async function addPlaylist(id){
    let title = document.getElementById("add_playlist_title_text_" + id).value
    let songs = document.getElementById("add_playlist_song_text_" + id).value

    await fetch("/api/v1/playlists", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            songs: songs,
            userId: id
        })
    })

}

async function addBand(id){
    let bandToAdd = document.getElementById("add_band_text_" + id).value

    await fetch("/api/v1/users/bands", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: id,
            band: bandToAdd
        })
    })
}

async function deleteUser(id){
    await fetch("/api/v1/users", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: id
        })
    })
}
```