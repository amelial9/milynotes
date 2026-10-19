---
order: 0
---
Few takeaways on how to work with agents from lauren tan's [talk](https://x.com/poteto/status/2102050467505430555)


- throughput comes from trust, not from running more agents. if can't trust one agent's output, will be stuck babysitting 1-5
- verification skills let agents prove their own work. treat as infra you maintain, not one-off prompt
	- feature map: what feature exists and how a user reaches them (shortcuts, which element to click)
- your codebase is the agent's memory. agents will learn whatever existing patterns they see, including workarounds, which spread like virus
- an agent-friendly codebase might not be the one that's easiest for human to work with
	- agents love shortcuts, so make the shortcut the correct path. strict boundaries