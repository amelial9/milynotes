
same thing, different syntax
```
SELECT DISTINCT cname  
FROM Product, Company  
WHERE manufacturer = cname
```
```
SELECT DISTINCT cname  
FROM Product
JOIN Company
ON manufacturer = cname
```

`From Product, Company`
*From all possible combinations of product and company*
`WHERE Cond`
*... choose only those results where ...*
`SELECT DISTINCT cname`
*... then display only the unique company names*

