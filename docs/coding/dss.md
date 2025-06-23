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

# Data Structures Cheat Sheet

### lists

```
arr = [1, 2, 3]
arr.append(4)        # [1, 2, 3, 4]
arr.pop()            # Removes last element -> 4
arr.insert(1, 9)     # [1, 9, 2, 3]
arr.remove(2)        # Removes first occurrence of 2
arr.sort()           # In-place sort
sorted_arr = sorted(arr)  # Returns new sorted list
arr.reverse()        # In-place reverse
```

<br>

### Tuples (Immutable Lists)

```
t = (1, 2, 3)
x, y, z = t  # Tuple unpacking
```

<br>

### Sets (Unordered, Unique Elements)

```
s = {1, 2, 3}
s.add(4)
s.remove(2)
s.discard(5)  # Safer than remove – no error
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s1 & s2  # Intersection: {2, 3}
s1 | s2  # Union: {1, 2, 3, 4}
s1 - s2  # Difference: {1}
```

<br>

### Dictionaries

```
d = {'a': 1, 'b': 2}
d['c'] = 3           # Add key
value = d['a']       # Access value
value = d.get('x', 0)  # Safer access
del d['b']           # Remove key
for key, val in d.items():
    print(key, val)
```

<br>

### Stack & Queues

```
stack = []
stack.append(1)
stack.append(2)
stack.pop()       # LIFO
```

```
from collections import deque
queue = deque()
queue.append(1)
queue.popleft()   # FIFO
```

| Variable | Created As | Used For        | Typical Methods                            |
| -------- | ---------- | --------------- | ------------------------------------------ |
| `list`   | `[]`       | general storage | `append()`, `insert()`, `pop(i)`, `sort()` |
| `stack`  | `[]`       | LIFO            | `append()`, `pop()`                        |
| `queue`  | `deque()`  | FIFO            | `append()`, `popleft()`                    |


```
// join items in stack into one string
stack = []
joined = ''.join(stack)
```

<br>

### Counter

`from collections import Counter`

```
nums = [1, 1, 2, 3, 2, 1]

c = Counter(nums)
print(c)

// Counter({1: 3, 2: 2, 3: 1})
```

```
word = "banana"
c = Counter(word)
print(c)

// Counter({'a': 3, 'n': 2, 'b': 1})
```

```
for key, value in Counter([1, 1, 2, 2, 2, 3]).items():
    print(f"{key} appears {value} times")
```