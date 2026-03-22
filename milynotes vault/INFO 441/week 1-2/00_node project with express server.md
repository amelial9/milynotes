
create npm project with `npm init`

then `enter` / `return` through all stuff

`npm install express`

in app.js:
```
const express = require('express')  
const app = express()  
  
app.get('/', (req, res) => {  
  res.send('Hello World!')  
})  
  
app.listen(3000, () => {  
  console.log('Example app listening at http://localhost:3000')  
})
```



--- 

for random errors
```
npm uninstall express
npm install express@4.20.0
```