
```
// node.js framework for web server
import express from 'express';
const router = express.Router();

// utilities to work with file paths and directory paths
import path from 'path';
path.join(__dirname, 'public')

// Middleware that parses cookies from the HTTP request headers and makes them available in `req.cookies`
import cookieParser from 'cookie-parser';
app.use(cookieParser());
```

