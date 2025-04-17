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

# INSERT, UPDATE, DELETE

```
INSERT Product(name, category)  
VALUES (‘gizmo’, ‘toy'),  
	(‘digicam’, ‘camera’)  
```

You can specify which columns you’re providing.  
You can insert multiple records with one  statement. Often much faster than a separate statement for each record.

<br>


```
UPDATE Product
SET category = ‘toy’
WHERE name = ‘digicam’
```
You can make multiple changes with one statement  
ALL records that match this condition will be updated.

<br>

```
DELETE FROM Product  
WHERE category = ‘toy’
```

ALL records that match this condition will be updated.