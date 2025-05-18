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

# Window Functions


Window functions create a new column based on calculations performed on a subset or "window" of the data. The window starts at the first row on a particular column and increases in size unless you constrain the size of the window.

<br>

**syntax**
```
SELECT '(Optional: The data you want to select)',
[aggregate function]'(The column to perform the aggregate function on)'
OVER(Optional: PARTITION BY and/or ORDER BY)
AS '(Descriptive name)' FROM '(corresponding table)';
```

<br>

```
SELECT 'Day', 'Mile Driving',
SUM('Miles Driving') OVER(ORDER BY 'Day') AS 'Running Total'
FROM 'Running total mileage visual';
```


Constrain the window to be 3 rows tall:
```
SELECT 'Day', 'Daily Revenue',
AVG('Daily Revenue') OVER(ORDER BY 'Day' ROWS 2 PRECEDING)
AS '3 Day Average' FROM 'Running Average Example';
```

| Day | Daily Revenue | 3 Day Average |
|-----|---------------|----------------|
| 1   | 39            | 39             |
| 2   | 528           | 283.5          |
| 3   | 39            | 202            |
| 4   | 86            | 217.66         |
| 5   | 86            | 70.33          |
| 6   | 351           | 174.33         |

<br>

Window functions also works on partitioned data. It first sorts the data then applies the aggregate function on these groups.

```
SELECT 'Day', 'Weekend', 'Daily Revenue',
SUM('Daily Revenue') OVER(PARTITION BY 'Weekend') AS 'Total'
FROM 'Partitioned Total Example';
```

<br>

### Organizing with Window Functions

#### Rows
```
SELECT '(The data you want to select)',
[aggregate function]'(The column to perform the aggregate function on)'
OVER(ROWS [# of rows you want to aggregate - 1] PRECEDING/FOLLOWING)
AS '(descriptive name)'
FROM '(appropriate table)';
```


```
SELECT *,
AVG('Daily Revenue')
OVER(ROWS 2 PRECEDING)
AS '3 Day Average'
FROM 'Running Average Example'
```

```
SELECT *,
AVG('Daily Revenue')
OVER(ROWS 2 FOLLOWING)
AS '3 Day Average'
FROM 'Running Average Example'
```

<br>

#### PARTITION BY

```
SELECT '(The data you want to select)',
[aggregate function]'(The column to perform the aggregate function on)'
OVER(PARTITION BY [category to group by]) AS '(descriptive name)'
FROM '(appropriate table)';
```

```
SELECT Track.Name, Track.Milliseconds
AVG(Track.Milliseconds) OVER(PARTITION BY Track.GenreId)
AS 'AverageSongLength'
FROM 'Track' ORDER BY Track.Name ASC LIMIT 20;
```

<br>

### Summary

- A window function does not cause rows to become grouped into a single output row, it creates a whole output column.

- A window function can be broken into groups and organized easily with keywords like: PARTITION BY and ORDER BY.

	- PARTITION BY- Divides the aggregate function results between different groupings of data.

	- ORDER BY- Organize the data being worked on by the aggregate functions and create running calculations


<br>

**Source:** <a href="https://dataschool.com/how-to-teach-people-sql/how-window-functions-work" target="_blank">How Window Functions Work</a>
