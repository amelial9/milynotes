

#### Product(pname, price, category, manufacturer)  

```
CREATE TABLE Product (
    pname VARCHAR(50) PRIMARY KEY,
    price DECIMAL(10,2),
    category VARCHAR(50),
    manufacturer VARCHAR(50)
);

INSERT INTO Product (pname, price, category, manufacturer) VALUES
('MultiTouch', 199.99, 'gadget', 'Canon'),
('SingleTouch', 49.99, 'photography', 'Canon'),
('Gizom', 50.00, 'gadget', 'GizmoWorks'),
('SuperGizmo', 250.00, 'gadget', 'GizmoWorks');
```

| pname       | price  | category    | manufacturer |
| ----------- | ------ | ----------- | ------------ |
| MultiTouch  | 199.99 | gadget      | Canon        |
| SingleTouch | 49.99  | photography | Canon        |
| Gizom       | 50.00  | gadget      | GizmoWorks   |
| SuperGizmo  | 250.00 | gadget      | GizmoWorks   |

#### Company(cname, country)

```
CREATE TABLE Company (
    cname VARCHAR(50) PRIMARY KEY,
    country VARCHAR(50)
);

INSERT INTO Company (cname, country) VALUES
('GizmoWorks', 'USA'),
('Canon', 'Japan'),
('Hitachi', 'Japan');
```

| cname      | country |
| ---------- | ------- |
| GizmoWorks | USA     |
| Canon      | Japan   |
| Hitachi    | Japan   |


#### Car

```
CREATE TABLE Car (
    Make VARCHAR(50),
    Model VARCHAR(50),
    Year INT
);

INSERT INTO Car (Make, Model, Year) VALUES
('Honda', 'Pilot', 2014),
('Honda', 'CRV', 2014),
('Toyota', 'Camry', 2012),
('Honda', 'Pilot', 2017);
```

| Make   | Model | Year |
| ------ | ----- | ---- |
| Honda  | Pilot | 2014 |
| Honda  | CRV   | 2014 |
| Toyota | Camry | 2012 |
| Honda  | Pilot | 2017 |


#### Students

```
CREATE TABLE Student (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    major VARCHAR(50),
    gpa DECIMAL(3,1)
);

INSERT INTO Student (id, name, age, major, gpa) VALUES
(1, 'Alice', 22, 'Informatics', 3.6),
(2, 'Bob', 20, 'CS', 3.8),
(3, 'Carol', 23, 'Informatics', 3.5),
(4, 'Dave', 22, 'CS', 3.9),
(5, 'Erin', 20, 'Design', 3.7);
```

| id  | name  | age | major       | gpa |
| --- | ----- | --- | ----------- | --- |
| 1   | Alice | 22  | Informatics | 3.6 |
| 2   | Bob   | 20  | CS          | 3.8 |
| 3   | Carol | 23  | Informatics | 3.5 |
| 4   | Dave  | 22  | CS          | 3.9 |
| 5   | Erin  | 20  | Design      | 3.7 |