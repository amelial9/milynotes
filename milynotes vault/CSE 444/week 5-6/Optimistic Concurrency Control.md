---
order: 9
---
Isolation Level Design Spectrum

![[IsolationLevelDesignSpectrum .png|595]]


## Isolation Levels

### Dirty Read

"Long duration" write locks
- Strict 2PL

No READ Locks
- Read-only transactions are never delayed

Possible problems: dirty and inconsistent read

### Read Committed

"Long duration" write locks
- Strict 2PL

"Short Duration" READ Locks
- Only acquire lock while reading (not 2PL)

Unrepeatable reads: When reading same element twice, may get two different values

### Repeatable Read

"Long duration" write locks
- Strict 2PL

"Long Duration" READ Locks
- Strict 2PL

not serializable yet

### Serializable

"Long duration" write locks
- Strict 2PL

"Long Duration" READ Locks
- Strict 2PL

Predicate locking
 - To deal with phantoms



## Pessimistic vs. Optimistic

Pessimistic CC (locking)
- Prevents unserializable schedules
- Never abort for serializability (but may abort for deadlocks) 
- Best for workloads with high levels of contention

Optimistic CC (timestamp, multi-version, validation)
- Assume schedule will be serializable
- Abort when conflicts detected
- Best for workloads with low levels of contention


## Timestamp Ordering

Each transaction receives unique timestamp $TS(T)$
could be:
- the system's clock
- a unique counter, incremented by the scheduler

Timestamp order defines the serialization order of the transaction

Will generate a schedule that is view-equivalent to a serial schedule, and recoverable