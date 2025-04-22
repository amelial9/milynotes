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

# SQL Injection

SQL Injection  
- vulnerability that occurs when an application allows a user to insert or “inject” arbitrary SQL code into a query

<br>

app.js
```
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

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

app.use('/users', usersRouter);

export default app;
```


routes/user.js
```
import sqlite3 from 'sqlite3'
import express from 'express';
var router = express.Router();

// create/load database
let db = new sqlite3.Database(':memory:', (err) => {
  if(err){
    return console.error(err.message)
  }
  console.log("Connected to the in-memory sqlite database")
})

db.serialize(() => {
  db
    .run('CREATE TABLE people(first_name text, last_name text)')
    .run(`INSERT INTO people(first_name, last_name)
          VALUES ("Kyle", "Thayer"),
                 ("Kyle", "Chandler"),
                 ("David", "Pham")
      `)
    .run('CREATE TABLE secret_table(message text)')
    .run(`INSERT INTO secret_table(message)
        VALUES ('The password for Kyle is: pa55w0rd'),
               ('The treasure is hidden on the 5th floor')
      `)
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  let nameSearch = req.query.nameSearch
  nameSearch = nameSearch ? nameSearch : ""

  db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`,
    (err, allRows) => {
      if(err){
        console.log("db error: " + err)
        res.send("db error: " + err)
        return 
      }
      if(!allRows){
        res.send("no matches")
        return ""
      }
      const matchingPeople = allRows.map(
        row => `${row.first_name} ${row.last_name}`
      ).join("\n")
      res.send(matchingPeople)
    }
  )
});

export default router;
```