
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


| id  | name  | age | major       | gpa |
| --- | ----- | --- | ----------- | --- |
| 1   | Alice | 22  | Informatics | 3.6 |
| 2   | Bob   | 20  | CS          | 3.8 |
| 3   | Carol | 23  | Informatics | 3.5 |
| 4   | Dave  | 22  | CS          | 3.9 |
| 5   | Erin  | 20  | Design      | 3.7 |
