---
order: 11
---

OLAP: Query response time
	Online Analytical Processing


## Architecture

### Shared-Memory Architecture


![[shared memory architecture.png|357]]


- Shared main memory and disks
- Expensive to scale
- Easiest to implement on

### Shared-Disk Architecture

![[shared disk architecture.png|366]]


- Only shared disks
- No contention for memory and high availability
- Typically 1-10 machines

### Shared-Nothing Architecture

![[shared nothing architecture.png|368]]


- Uses cheap, commodity hardware
- No contention for memory and high availability
- Theoretically can scale infinitely
- Hardest to implement on



## Shared-Nothing 


Multiple DBMS instances (= processes) also called “nodes” execute on machines in a cluster
- One node plays role of the coordinator
- Other nodes play role of workers 

Workers execute queries
- Typically all workers execute the same plan
- Workers can execute multiple queries at the same time


### Option 1: Unpartitioned Table

- Entire table on just one node in the system
- Will bottleneck any query we need to run in parallel
- We choose partitioning scheme to divide rows among machines


### Option 2: Block Partitioning

![[block partitioning.png|490]]


Tuples are horizontally (row) partitioned by raw size with no ordering considered