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

# Session (Authentication)


```
demo1/
├── routes/
│   └── users.js
├── public/
│   └── index.html
│   └── stylesheets/
│       └── style.css
│   └── javascripts/
│       └── index.js
└── app.js
```

<br>

app.js
```
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'

import usersRouter from './routes/users.js';

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

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up as9eu034htov9ny9yn3n",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

app.use('/users', usersRouter);

export default app;
```


users.js
```
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.userid){
    res.send(`Here is the information for you (${req.session.userid})`)
  } else{
    res.status(401).send("Error: you must be logged in")
  }
});


router.post('/login', (req, res) => {

  if(req.body.username == "kylethayer" && req.body.password == "asdasd"){
    req.session.userid = "kylethayer"
    res.send("you logged in")
  } else if(req.body.username == "anotheruser" && req.body.password == "pwd"){
    req.session.userid = "anotheruser"
    res.send("you logged in")
  } else {
    res.send("wrong login info")
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.send("you are logged out")
})

export default router;
```


index.html
```
<html>

<head>
  <title>Express</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
  <script src="javascripts/index.js"></script>
</head>

<body>
  <h1>Express</h1>
  <p>Welcome to Express</p>
  <a href="/users/">Get your user info</a>
  <h3>login</h3>
  Username: <input type=text id="username_input"></input><br>
  Password: <input type=text id="password_input"></input>
  <button onclick="login()">Log in</button> 
  <button onclick="logout()">Log out</button>
  <div id="results"></div>
</body>

</html>
```


index.js
```
async function login(){
    let username = document.getElementById("username_input").value
    let password = document.getElementById("password_input").value
    let loginData = {
        username: username,
        password: password
    } 
    let response = await fetch(
        "/users/login",
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
              }
        }
    );
    let responesText = await response.text();
    document.getElementById("results").innerText = responesText;
}

async function logout(){
    let response = await fetch(
        '/users/logout',
        {
            method: "POST"
        }
    )
    let responesText = await response.text();
    document.getElementById("results").innerText = responesText;
}
```