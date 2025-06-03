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

# Views & Temp Tables

### Views

```
CREATE VIEW oldCats as 
    SELECT *
    FROM Cats
    WHERE age > 4
```

- Views are virtual tables based on SELECT queries.

- Do not store data themselves — just a saved query.

- Auto-update if base table data changes.

- Can be queried like regular tables.

<br>

### Temp tables

```
CREATE TABLE #temp_customers (
    id INT,
    age INT
)

SELECT * FROM #temp_customers

DROP TABLE IF EXISTS #temp_customers
```


- lives only during current session.

- Good for storing intermediate results in scripts
