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

# CHECK Constraint

```
CREATE TABLE User (  
	uid int primary key,  
	firstName text,  
	lastName text NOT NULL,  
	age int CHECK (age > 12 and age < 120),  
	email text,  
	phone text,  
	CHECK (email is not NULL or phone is not NULL)  
)
```

<br>

Similar to FK, but not supported
```
CREATE TABLE Purchase (
    prodName CHAR(30)
        CHECK (prodName IN (
            SELECT Product.name
            FROM Product
        )),
    date DATETIME NOT NULL
);
```