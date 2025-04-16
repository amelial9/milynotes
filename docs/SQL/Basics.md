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

# Basics

`INT` / `INTEGER` *-2,147,483,648 to 2,147,483,647*

`SMALLINT` *32,768 to 32,767*

`BIGINT` *-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807*  

`DECIMAL(p,s)` *exact numeric, precision p, scale s*

`FLOAT(p)` *approximate numeric, precision p (precision in binary digits)*

`DATE` *(YYYY-MM-DD)*

`TIME` *(HH:MM:SS)*

`CHAR(n)` *fixed-length string*

`NCHAR(n)` *fixed-length Unicode string*

`VARCHAR(n)` *variable-length string*

`NVARCHAR(n)` *variable-length Unicode string*

`BOOLEAN` *TRUE/FALSE/NULL*

---

```
create table class (
	name nvarchar(50),
	grade int
)
```

`insert into class values ('Bill', 3.6)`

---

`Product(pname, price, category, manufacturer)`

##### ORDER BY
(multiple attributes ✅)

```
SELECT pname, category  
FROM Product  
WHERE price > 100.0  
ORDER BY category, pname
```
sort alphabetically by category, then sort alphabetically by pname

```
SELECT pname, category  
FROM Product  
WHERE price > 100.0  
ORDER BY category DESC, pname ASC
```

Sort alphabetically by category Z -> A,
*then* sort alphabetically by pname A -> Z