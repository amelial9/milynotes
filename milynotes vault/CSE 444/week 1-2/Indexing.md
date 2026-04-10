---
order: 4
---

## Index structures

- index: separate file with mast access by "search key" value
- contains pairs of the form (key, RID)

- indexes are access methods

![[index.png]]


search key = an attribute or set of attributes
 - not a key

index = collection of data entries

data entry for key k can be:
- (k, RID)
- (k, list-of-RIDs)
- record with key k; "clustered" or "primary" index


#### Primary/Clustered Index
the data itself is stored in the same order as the index

#### Dense Index
there is an index entry for every record

#### Sparse Index
only some records have index entires


## Hash-based indexes

key → hash function → bucket → (key, RID) → actual data

Good for point queries but not range queries


 Query:
```
WHERE age = 21
```

Step 1: hash
```
h(21) → Bucket 1
```

 Step 2: look inside bucket
```
Bucket 1 → [(21, RID7), (21, RID12)]`
```

Step 3: follow RID
```
RID7 → Page 42 → actual row  
RID12 → Page 99 → actual row
```