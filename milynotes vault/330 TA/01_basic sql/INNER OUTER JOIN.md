
| id  | name |
| --- | ---- |
| 1   | Joe  |
| 2   | Jack |
| 3   | Jill |

| employeeID | productID |
| ---------- | --------- |
| 1          | 344       |
| 1          | 355       |
| 2          | 544       |

```
SELECT *
FROM Employee E, Sales S
WHERE E.id = S.employeeID
```

| id  | name | employeeID | productID |
| --- | ---- | ---------- | --------- |
| 1   | Joe  | 1          | 344       |
| 1   | Joe  | 1          | 355       |
| 2   | Jack | 2          | 544       |

alternative syntax:
```
SELECT *
FROM Employee E
	INNER JOIN
	Sales S
	ON E.id = S.employeeID
```

Retrieve employees and their sales:
```
SELECT *
FROM Employee E
	LEFT OUTER JOIN
	Sales S
	ON E.id = S.employeeID
```

| id  | name | employeeID | productID |
| --- | ---- | ---------- | --------- |
| 1   | Joe  | 1          | 344       |
| 1   | Joe  | 1          | 355       |
| 2   | Jack | 2          | 544       |
| 3   | Jill | null       | null      |
