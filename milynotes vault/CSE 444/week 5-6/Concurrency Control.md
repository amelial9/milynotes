---
order: 8
---

## Transaction

Definition: a transaction is a sequence of updates to the database with the property that either all complete, or none completes (all-or-nothing).


### ROLLBACK

- If the app gets to a place where it can’t complete the transaction successfully, it can execute ROLLBACK
- This causes the system to “abort” the transaction
	- Database returns to a state without any of the changes made by the transaction


### ACID Properties

Atomicity: Either all changes performed by transaction occur or none occurs

Consistency: A transaction as a whole does not violate integrity constraints

Isolation: Transactions appear to execute one after the other in sequence

Durability: If a transaction commits, its changes will survive failures


### Concurrent Execution Problems

- Write-read conflict: dirty read, inconsistent read
	- A transaction reads a value written by another transaction that has not yet committed
- Read-write conflict: unrepeatable read
	- A transaction reads the value of the same object twice
	- Another transaction modifies that value in between the two reads
- Write-write conflict: lost update
	- Two transactions update the value of the same object. The second one to write the value overwrites the first change


### Schedule

Serial schedule:
- run T1 fully, then T2

Non-serial:
- interleaved operations

we want: non-serial(fast) but still correct



## Serializability

A schedule is serializable if it is equivalent to a serial schedule

The role of the scheduler is to ensure that the schedule is serializable


### Conflict Serializability

Conflicts: 
Two actions by same transaction $R_i(X); w_i(Y)$
Two writes by $T_i, T_j$ to same element $w_i(X); w_j(X)$
read/write by $T_i, T_j$ to same element $w_i(X); r_j(X)$   $r_i(X); w_j(X)$


A schedule is conflict serializable if it can be transformed into a serial schedule by a series of swappings of adjacent non-conflicting actions
- Every conflict-serializable schedule is serializable
- The converse is not true in general


#### Testing for Conflict-Serializability

Precedence graph:
- A node for each transaction $T_i$
- An edge from $T_i$ to $T_j$ whenever an action in $T_i$ conflicts with, and comes before an action in $T_j$
- No edge for actions in the same transaction
The schedule is serializable iff the precedence graph is acyclic


### View-Serializability

A schedule is view serializable if it is view equivalent to a serial schedule
- If a schedule is conflict serializable, then it is also view serializable


### Schedules with Aborted Transactions

When a transaction aborts, the recovery manager undoes its updates, but some of its updates may have affected other transactions

A schedule is recoverable if:
- It is conflict-serializable, and
- Whenever a transaction T commits, all transactions that have written elements read by T have already committed

![[recoverableschedule.png|549]]



If a transaction T aborts, then we need to abort any other transaction T’ that has read an element written by T

A schedule avoids cascading aborts if whenever a transaction reads an element, the transaction that has last written it has already committed.