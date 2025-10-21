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

# BCNF Decomposition

 
(recall BCNF: For **every functional dependency** `X → Y`, `X` must be a **superkey**)

### Step 1

Check which functional dependencies of R are not in BCNF, if they're all in BCNF we do not need to decompose R.

AB -> CD

D -> E

A -> C

B -> D

<br>

{AB}<sup>+</sup> = {A,B,C,D,E} -> CK: AB

AB -> CD

D -> E (violates BCNF)

A -> C

B -> D

<br>

### Step 2

Create two sub-relations:

1. {X}<sup>+</sup>

2. R - {X}<sup>+</sup> + X

AB -> CD

D -> E ->  {D}<sup>+</sup> = {D, E} -> R<sub>1</sub>(DE), R<sub>2</sub>(ABCD)

A -> C

B -> D

<br>

### Step 3

For each sub-relation we check if all of its functional dependencies are now in BCNF

- if they are we keep the sub-relation as it is

- if not, do Step 2 again for the sub-relation's dependency that does not satisfy BCNF

R<sub>1</sub>(DE)

CK = D

D -> E (BCNF)

<br>

R<sub>2</sub>(ABCD)

CK = AB

AB -> CD (BCNF)

A -> C (not in BCNF)

B -> D

<br>

R<sub>3</sub>(AC)

CK = A

A -> C (BCNF)

<br>

R<sub>4</sub>(ABD)

CK = AB

AB -> D (BCNF)

B -> D (not in BCNF)

<br>

R<sub>5</sub>(BD)

CK = B

B -> D (BCNF)

<br>

R<sub>6</sub>(AB)

CK = AB

AB -> AB (BCNF)

<br>

### Step 4

Final decomposition is composed of sub-relations that all their functional dependencies hold BCNF


R<sub>1</sub>(DE)

D -> E

<br>

R<sub>3</sub>(AC)

A -> C

<br>

R<sub>5</sub>(BD)

B -> D

<br>

R<sub>6</sub>(AB)

AB -> AB

<br>


**Source:** [BCNF Decomposition](https://www.youtube.com/watch?v=WKJH3V7UAgg)
