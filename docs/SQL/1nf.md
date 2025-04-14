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

# First Normal Form

All relations must be flat: we say that the relation is in *first normal form*  
- Every cell holds a single value  
- Table is two-dimensional – just rows and columns  
- No nested structures (arrays, objects, sub-tables)

### ❌ Not in 1NF:

| StudentID | Name  | Courses           |
|-----------|-------|-------------------|
| 1         | Alice | Math, Physics     |
| 2         | Bob   | English, History  |

### ✅ 1NF (Flat Table):

| StudentID | Name  | Course   |
|-----------|-------|----------|
| 1         | Alice | Math     |
| 1         | Alice | Physics  |
| 2         | Bob   | English  |
| 2         | Bob   | History  |