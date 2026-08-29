---
order: 5
---

## Prim's

**Use when:** MST. need to connect all nodes with minimum total cost

**Core idea:** Grow the MST outward from a starting node. At each step, pick the cheapest edge from the "visited" set to any unvisited node. Add that node to visited. Repeat until all nodes are in.

**Modeling: 2D points → graph**
- Nodes = point **indices** (0 to N-1), not coordinates
- Edges = all pairs (i, j) with i < j
- Weight = distance function on points[i], points[j] (Manhattan, Euclidean, etc.)

**Template:**

```python
def minCostConnectPoints(self, points):
    N = len(points)

    # Build adjacency list: adj[i] = list of [cost, neighbor_index]
    adj = {i: [] for i in range(N)}
    for i in range(N):
        x1, y1 = points[i]
        for j in range(i + 1, N):
            x2, y2 = points[j]
            dist = abs(x1 - x2) + abs(y1 - y2)
            adj[i].append([dist, j])
            adj[j].append([dist, i]) 

    # Prim's
    res = 0
    visit = set()
    minH = [[0, 0]] 

    while len(visit) < N:
        cost, i = heapq.heappop(minH)
        if i in visit:
            continue
        res += cost
        visit.add(i)
        for neiCost, nei in adj[i]:
            if nei not in visit:
                heapq.heappush(minH, [neiCost, nei])

    return res
```

**Complexity:**
- Building adj: $O(N^2)$
- Prim's with heap: $O(E \log V) = O(N^2 \log N)$ for complete graph
