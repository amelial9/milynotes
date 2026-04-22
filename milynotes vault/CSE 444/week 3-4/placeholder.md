---
order: 6
---

## Query Optimizer

- cost estimation
	- cardinality estimation $T(R)$




for each operator, cost is function of CPU, IO, network bw
	$total\_cost = CPUCost +$


estimate size (= cardinality) is a bottom-up fashion
- 
estimate cost


- number of tuples (cardinality) $T(R)$
- indexes, number of keys in the index $V(R, a)$
- number of physical pages $B(R)$
- statistical information on attributes
	- min value, max value, $V(R, a)$
- histograms






each condition reduces the size of $T(Q)$ by some factor, called **selectivity factor**
assuming independence, multiply the selectivity factors


