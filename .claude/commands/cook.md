---
description: Implement all plans in /plans folder using agents in /agents folder
allowed-tools: Bash, Edit
argument-hint: []
---

# Command: /cook

Please execute all the plans located in the `/plans` folder.

For each plan:
1. Identify the corresponding agent from the `/agents` folder required to execute the plan.
2. Assign the task to the correct agent.
3. Execute each plan step-by-step using the agent's specified expertise and tools.
4. Collect and summarize the execution results.

Ensure proper delegation to agents optimized for the specific task stated in each plan.

Upon completion, output a summary report of all plans executed including any issues or next steps required.
