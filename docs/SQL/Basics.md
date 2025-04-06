---
hide:
  - navigation
  - toc
---

`INT` / `INTEGER`

`SMALLINT`

`BIGINT`

`DECIMAL(p,s)` *exact numeric, precision p, scale s*

`FLOAT(p)` *approximate numeric, precision p (precision in binary digits)*

`DATE` *(YYYY-MM-DD)*

`TIME` *(HH:MM:SS)*

`CHAR(n)` / `CHARACTER(n)` *fixed-length string*

`VARCHAR(n)` *variable-length string*

`NVARCHAR(n)` *national variable character*

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