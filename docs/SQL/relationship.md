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

# Relationship

If A and B are sets, then a relation R is a subset of A * B

<img src="../../SQL/img/relationship.png" alt="Relationship" width="500">

<br>

- One-to-one
- One-to-many; Many-to-one
- Many-to-many

<br>

<img src="../../SQL/img/relationship1.png" alt="Relationship 1" width="500">

<br>

### Multiplicity & Cardinality

- In UML, multiplicity specifies lower and upper bound constraints on the cardinality of a relationship

| Multiplicity | Cardinality | Description                                  |
| ------------ | ----------- | -------------------------------------------- |
| 0..0         | 0           | Collection must be empty                     |
| 0..1         |             | Either zero or one instance                  |
| 1..1         | 1           | Exactly one instance                         |
| 0..*         | *           | Zero or more instances                       |
| 1..*         |             | One or more instance                         |
| 5..5         | 5           | Exactly 5 instances                          |
| m..n         |             | At least *m*, but no more than *n* instances |
