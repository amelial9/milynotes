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

# Notes on JOIN

| pname       | price  | category    | manufacturer |
| ----------- | ------ | ----------- | ------------ |
| MultiTouch  | 199.99 | gadget      | Canon        |
| SingleTouch | 49.99  | photography | Canon        |
| Gizom       | 50     | gadget      | GizmoWorks   |
| SuperGizmo  | 250.00 | gadget      | GizmoWorks   |

| cname      | country |
| ---------- | ------- |
| GizmoWorks | USA     |
| Canon      | Japan   |
| Hitachi    | Japan   |

```
drop table Product;
create table Product (
	pname nvarchar(50),
	price FLOAT(24),
	category nvarchar(50),
	manufacturer nvarchar(50)
)

INSERT INTO Product
VALUES
	('MultiTouch', 199.99, 'gadget', 'Canon'),
	('SingleTouch', 49.99, 'photography', 'Canon'),
	('Gizom', 50.00, 'gadget', 'GizmoWorks'),
	('SuperGizmo', 250.00, 'gadget', 'GizmoWorks')

drop table Company;
create table Company (
	cname nvarchar(50),
	country nvarchar(50)
)

INSERT INTO Company
VALUES
	('GizmoWorks', 'USA'),
	('Canon', 'Japan'),
	('Hitachi', 'Japan')
```


Retrieve all Japanese products that cost < $150  
```
SELECT pname, price  
FROM Product, Company  
WHERE Product.manufacturer = Company.cname  
AND Company.country = 'Japan'
AND Product.price < 150
```

Retrieve all USA companies that manufacture “gadget” products
```
SELECT DISTINCT cname  
FROM Product, Company  
WHERE country = 'USA' AND category = 'gadget'  
AND manufacturer = cname
```