---
order: 7
---

Functions that run during each request (or a subset of requests)
- These functions are chained together, each one calling the next function (in the variable next)
	- At the end they finally call your api endpoint handler (e.g., app.get("/users", …))
- They generally either
	- Modify the request
	- Modify the response
	- Log something


 #### Structure of a middleware function:
```
app.use(function (req, res, next) {
	// modify req, res, or log something
	next(); // call the next function (middleware or handler)
});
```


