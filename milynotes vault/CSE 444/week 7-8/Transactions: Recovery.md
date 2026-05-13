---
order: 10
---

## Transaction Management

Two parts:
- Concurrency control: ACID
- Recovery from crashes: ACID


| Type of Crash               | Prevention                     |
| --------------------------- | ------------------------------ |
| Wrong data entry            | Constraints and data cleaning  |
| Disk crashes                | Redundancy: e.g. RAID, archive |
| Data center failures        | Remote backups or replicas     |
| System failures: e.g. power | DATABASE RECOVERY              |


Each transaction has internal state
When system crashes, internal state is lost
- Don’t know which parts executed and which didn’t
- Need ability to undo and redo


### Primitive Operations of Transactions

$READ(X,t)$
- copy element $X$ to transaction local variable $t$
$WRITE(X,t)$
- copy transaction local variable $t$ to element $X$
$INPUT(X)$
- read element $X$ to memory buffer
$OUTPUT(X)$
- write element $X$ to disk


### Atomic Transactions

FORCE or NO-FORCE
- Should all updates of a transaction be forced to disk before the transaction commits?
- FORCE: Pages of committed transactions must be forced to disk before commit
- NO-FORCE: Pages of committed transactions need not be written to disk
STEAL or NO-STEAL
- Can an update made by an uncommitted transaction overwrite the most recent committed value of a data item on disk?
- STEAL: Pages of uncommitted transactions may be written to disk
- NO-STEAL: Pages of uncommitted transactions cannot be written to disk


Write-Ahead Log (WAL)
The Log: append-only file containing log records
- Records every single action of every TXN 
- Forces log entries to disk as needed
- After a system crash, use log to recover
Three types: UNDO, REDO, UNDO-REDO
Aries: is an UNDO-REDO log


![[policiesandlogs.png]]

#### UNDO Logging

Log records
- `<START T>`
	- transaction T has begun
- `<COMMIT T>`
	- T has committed
- `<ABORT T>`
	- T has aborted
- `<T, X, v>`
	- T has updated element X, and its old value was v
	- Idempotent, physical log records

