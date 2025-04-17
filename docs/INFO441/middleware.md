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

# Middleware

Functions that run during each request (or a subset of requests)
- These functions are chained together, each one calling the next function (in the variable next)
	- At the end they finally call your api endpoint handler (e.g., app.get("/users", …))
- They generally either
	- Modify the request
	- Modify the response
	- Log something

<br>

#### Structure of a middleware function:

```
app.use(function (req, res, next) {
	// modify req, res, or log something
	next(); // call the next function (middleware or handler)
});
```