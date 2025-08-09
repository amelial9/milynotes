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
arr.pop()            # Removes last element -> 4 (.pop(index))
arr.insert(1, 9)     # [1, 9, 2, 3]
arr.remove(2)        # Removes first occurrence of 2 (.remove(value))
arr.sort()           # In-place sort
sorted_arr = sorted(arr)  # Returns new sorted list
arr.reverse()        # In-place reverse
```

### Tuples (Immutable Lists)

```
t = (1, 2, 3)
x, y, z = t  # Tuple unpacking
```

### Sets (Unordered, Unique Elements)

```
s = set()
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
queue.appendleft()
queue.pop()
queue.popleft()   # FIFO
```

### Dictionaries

```
d = {}
d["key"] = "value"
print(d["key"])  # ✅ "value"
print(d["missing"])  # ❌ KeyError

d = dict(name="Amelia", major="CS")
d = dict([("a", 1), ("b", 2)])

d = defaultdict(int)  # default value is 0
d["count"] += 1       # no KeyError
print(d["count"])     # ✅ 1
print(d["missing"]) 
```

```
d = {'a': 1, 'b': 2}
d['c'] = 3           # Add key
value = d['a']       # Access value
value = d.get('x', 0)  # Safer access
del d['b']           # Remove key
for key, val in d.items():
    print(key, val)
```

### Min-heap

```
import heapq

heap = [3, 1, 4]
heapq.heapify(heap)       # turns list into min-heap in O(n)
print(heap)               # [1, 3, 4]

heapq.heappush(heap, 2)   # O(log n)
print(heap)               # [1, 2, 4, 3]

smallest = heapq.heappop(heap)  # O(log n)
print(smallest)                 # 1
print(heap)                     # [2, 3, 4]

print(heap[0])                  # 2 (O(1))
```

### Counter

`from collections import Counter`

```
nums = [1, 1, 2, 3, 2, 1]

c = Counter(nums)
print(c)

// Counter({1: 3, 2: 2, 3: 1})

word = "banana"
c = Counter(word)
print(c)

// Counter({'a': 3, 'n': 2, 'b': 1})
```

```
for key, value in Counter([1, 1, 2, 2, 2, 3]).items():
    print(f"{key} appears {value} times")
```

```
count[3]  # ➝ 3
count[99]  # ➝ 0
count.get(99, 0)  # ➝ 0
```

```
max_freq = max(count.values())  # ➝ 3
min_freq = min(count.values())  # ➝ 1

# One Most Frequent Element
most_common = count.most_common(1)[0]  # ➝ (3, 3)
elem = most_common[0]  # ➝ 3
freq = most_common[1]  # ➝ 3
```


<br>


## Complexity cheatsheet

### List `[]`

| Operation                    | Complexity     |
| ---------------------------- | -------------- |
| `append(x)`                  | **O(1)**       |
| `pop()` (end)                | **O(1)**       |
| `pop(0)` / `insert(0,x)`     | **O(n)**       |
| `insert(i,x)` / `del arr[i]` | **O(n)**       |
| `arr[i]` / `arr[i]=x`        | **O(1)**       |
| `x in arr`                   | **O(n)**       |
| `sort()` / `sorted(arr)`     | **O(n log n)** |
| `arr[::-1]` / `reverse()`    | **O(n)**       |

### Deque `collections.deque`

| Operation                           | Complexity |
| ----------------------------------- | ---------- |
| `append(x)` / `appendleft(x)`       | **O(1)**   |
| `pop()` / `popleft()`               | **O(1)**   |
| Indexing `dq[i]`                    | **O(n)**   |
| Insert/remove in middle             | **O(n)**   |

### Set `{}` and Dict `{}`

(both are hash tables)

|Operation|Avg Complexity|Worst-case*|
|---|---|---|
|Insert / Update|**O(1)**|O(n)|
|Lookup (`in`, `get`)|**O(1)**|O(n)|
|Delete|**O(1)**|O(n)|
|Iterate all items|**O(n)**|O(n)|

*Worst cases are rare (pathological hashing). In practice, treat as O(1).

### Counter `collections.Counter`

| Operation                    | Complexity              |
| ---------------------------- | ----------------------- |
| Build from `n` items         | **O(n)**                |
| `c[x]` (missing → 0)         | **O(1)** avg            |
| `most_common(k)`             | **O(n log k)**          |

### Heap (Min-Heap) `heapq`

|Operation|Complexity|Notes|
|---|---|---|
|`heappush(h, x)`|**O(log n)**||
|`heappop(h)`|**O(log n)**||
|`h[0]` (min)|**O(1)**|Peek|
|`heapify(arr)`|**O(n)**|In-place|

<br>

**Rule of thumb:**  
• Use **list** when you need fast indexing, push/pop at **end**.  
• Use **deque** when you need fast push/pop at **both ends** (queues, sliding windows) and don’t need random indexing.