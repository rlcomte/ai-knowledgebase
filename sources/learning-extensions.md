Yes. I would make the knowledge base much more than a collection of explanations plus “knowledge questions.” For AI Engineering, students need to move repeatedly between **conceptual understanding, prediction, experimentation, observation, diagnosis, design, execution and reflection**.

A useful design principle is:

$$
\text{Explain}
\rightarrow
\text{Predict}
\rightarrow
\text{Experiment}
\rightarrow
\text{Observe}
\rightarrow
\text{Explain}
\rightarrow
\text{Design}
\rightarrow
\text{Evaluate}
$$

That is particularly appropriate for AI Engineering because many important concepts—context windows, temperature, RAG, tool use, memory, agent loops, hallucination, evaluation—are difficult to understand from text alone.

## 1. I would add a set of recurring interaction types

Rather than inventing a unique interaction for every page, define perhaps **10–12 reusable learning mechanisms** throughout the KB.

| Mechanism               | Student activity                    | Primary learning purpose |
| ----------------------- | ----------------------------------- | ------------------------ |
| Knowledge check         | answer conceptual questions         | understanding            |
| Predict the output      | predict before running              | mental model formation   |
| Interactive experiment  | manipulate parameters               | causal understanding     |
| Compare & explain       | compare two implementations/results | analysis                 |
| Diagnose the failure    | investigate broken AI system        | troubleshooting          |
| Build the context       | construct model context             | context engineering      |
| Trace the agent         | follow agent steps                  | agent understanding      |
| Choose the next action  | decide what an agent should do      | procedural reasoning     |
| Design challenge        | create architecture/workflow        | synthesis                |
| Critique an AI solution | identify weaknesses                 | evaluation               |
| Engineering lab         | implement something                 | practical competence     |
| Reflection              | explain trade-offs/learning         | professional judgement   |

The important part is that these should recur consistently throughout the knowledge base.

---

# 2. “Predict before you reveal” is particularly powerful

For many concepts I would explicitly force the student to make a prediction before showing the answer.

For example, on the LLM learning page:

> The sentence is:
>
> **The capital of France is ...**
>
> What do you expect the model's probability distribution to look like?

Student might choose:

```text
Paris       75%
France       8%
London       6%
Rome         3%
other        8%
```

Then reveal something illustrative and ask:

> Why isn't Paris necessarily assigned 100% probability?

This makes students construct a mental model rather than merely read the explanation.

The same pattern works extremely well throughout AI Engineering.

### Context engineering example

Give:

```text
SYSTEM
You are a Python developer.

USER
Fix the bug.

CONTEXT
[file A]
[file B]
[file C]
...
```

Ask:

> Which three context items are likely to be most important?

Then reveal the actual failure.

### Agent example

```text
Goal: commit the completed feature
Current state: 4 files modified
```

Ask:

> What should the coding agent do next?

Options:

```text
A. git add .
B. git commit
C. git status
D. git push
```

Then explain why `git status` is normally the better next action.

This teaches **procedural judgement**.

---

# 3. Interactive concept experiments

Some concepts deserve small interactive simulators.

I would use a standard KB component:

> **Experiment**

where students manipulate one variable and observe what changes.

For example:

## Temperature playground

Provide a prompt:

> Complete: “The best thing about studying ICT is…”

Slider:

```text
Temperature
0 ─────────────── 2
        ● 0.7
```

Generate several outputs.

Students observe:

$$
temperature \uparrow
\Rightarrow
distribution\ becomes\ flatter
\Rightarrow
greater\ output\ variation
$$

The important educational question becomes:

> What changed, and what did not change?

Not:

> Which temperature is best?

---

# 4. A token/context-window simulator

This would be especially useful after the context engineering explanation.

Give the student a budget:

```text
CONTEXT BUDGET: 8,000 tokens
```

Available material:

| Context element      | Tokens |
| -------------------- | -----: |
| System instructions  |    800 |
| Conversation         |  2,300 |
| Relevant source file |  3,200 |
| Old source file      |  2,800 |
| User memory          |    400 |
| Agent skill          |    900 |
| Tool results         |  1,500 |

Ask students to build a context within the budget.

As they select items:

```text
███████████████░░░ 7,100 / 8,000
```

Then ask:

> What would you remove?

This makes concepts such as:

* relevance;
* token budget;
* noise;
* recency;
* authority;
* memory;
* compression

tangible.

This could become one of the signature interactions of the KB.

---

# 5. “Build the context”

An even richer variation is to give a task and let students **construct the actual context** given to the LLM.

For example:

> You are building an AI agent that must fix issue #217.

Available context cards:

```text
[System role]
[Issue description]
[README]
[Entire repository]
[Relevant source file]
[Previous Git history]
[Git policy]
[User preferences]
[Unit test output]
[Unrelated Slack discussion]
[API documentation]
[Memory from an earlier task]
```

Students drag items into:

```text
┌──────────────────────────────┐
│ ACTIVE CONTEXT               │
│                              │
│ 1. System instruction        │
│ 2. Issue #217                │
│ 3. Git policy                │
│ 4. Relevant source file      │
│ 5. Failing test              │
│                              │
└──────────────────────────────┘
```

Then the KB evaluates the choice.

This directly teaches the idea:

$$
AvailableInformation
\neq
UsefulContext
$$

---

# 6. “Inspect the prompt” / context debugger

You could expose what an AI application actually sends to the model.

Student sees the frontend:

> **User:** Explain why my program fails.

Then clicks:

### Inspect context

and sees:

```text
SYSTEM
You are an educational assistant...

COURSE CONTEXT
Student is working on C#...

RETRIEVED KNOWLEDGE
...

CONVERSATION
...

USER
Explain why my program fails.
```

Students can disable context elements and rerun.

For example:

```text
☑ system instruction
☑ current task
☑ retrieved documentation
☐ conversation history
☑ code
☐ user profile
```

Then compare outputs.

This would make context engineering much less abstract.

---

# 7. Agent trace explorer

Agentic AI particularly benefits from an **execution trace viewer**.

For example:

```text
Goal
│
├─ 1. inspect repository
│     Tool: git status
│     Result: ...
│
├─ 2. locate failing test
│     Tool: search
│     Result: ...
│
├─ 3. inspect implementation
│
├─ 4. modify code
│
├─ 5. run tests
│     Result: FAILED
│
├─ 6. revise solution
│
└─ 7. run tests
      Result: PASSED
```

Students could click each node to see:

* context at that moment;
* model decision;
* tool invocation;
* tool result;
* updated state.

This lets them inspect the fundamental agent loop:

$$
Observe
\rightarrow
Reason
\rightarrow
Act
\rightarrow
Observe
$$

For your KB, I would make this a central mechanism for **Using Coding Agents**.

---

# 8. “Choose the next action”

Instead of passively viewing an agent trace, occasionally stop it.

```text
Current state:

- branch: feature/auth
- auth.py modified
- README.md modified
- tests pass
- README modification is unrelated

What should the agent do?
```

Possible actions:

```text
[git add .]

[git add auth.py]

[git commit -am "fix"]

[git reset --hard]
```

The student chooses.

Then the simulation continues.

This is essentially a lightweight **agent simulator**.

It teaches procedural knowledge much better than asking:

> What does `git add` do?

---

# 9. Failure diagnosis challenges

AI Engineering education should probably contain many more **broken systems than perfect systems**.

For example:

> This RAG system produces incorrect answers. Diagnose why.

Architecture:

```text
question
   ↓
embedding
   ↓
vector search
   ↓
top-5 chunks
   ↓
LLM
```

Evidence:

```text
Retrieved chunk #1 relevance: .31
Retrieved chunk #2 relevance: .29
Retrieved chunk #3 relevance: .25

Correct document not retrieved.
```

Ask students:

> Where is the failure?

Possible diagnosis:

```text
[ ] model hallucination
[x] retrieval problem
[ ] generation temperature
[ ] output parser
```

Then:

> What would you investigate next?

This develops debugging competence.

---

# 10. AI Engineering “fault injection”

A more advanced variation is deliberately injecting failures.

For example, let the student toggle:

```text
☐ stale documents
☐ incorrect system instruction
☐ too much context
☐ conflicting memory
☐ tool unavailable
☐ weak retrieval
☐ malicious retrieved instruction
```

Then run the same AI application.

Students observe how behaviour changes.

This makes engineering principles much more concrete.

It also reinforces an essential message:

$$
AI\ failure
\neq
LLM\ failure
$$

A failure may originate in:

```text
model
context
retrieval
memory
tool
workflow
data
prompt
permissions
evaluation
```

---

# 11. Architecture construction exercises

Give students components:

```text
LLM
Vector DB
Application
Memory
Tools
Embedding model
Agent harness
External API
Evaluation service
```

and let them assemble an architecture.

For example:

> Build a RAG application.

or:

> Build a long-lived support agent.

or:

> Build a coding agent.

Students drag components and connections.

Then compare their design with a reference architecture.

For example:

```text
User
 ↓
Application
 ↓
Agent harness
 ├── LLM
 ├── Retrieval
 │    ├── Embeddings
 │    └── Vector DB
 ├── Memory
 └── Tools
```

This is especially appropriate for HBO-ICT because it connects AI directly to **software architecture**.

---

# 12. “What belongs where?”

This could be another recurring exercise.

Give students a requirement:

> The agent must remember the customer's preferred language.

Ask:

Where should this live?

```text
A. LLM weights
B. system prompt
C. short-term context
D. persistent memory
E. skill
F. RAG knowledge base
```

Another:

> Never execute `git push --force`.

Answer could be:

```text
policy / harness constraint
```

Another:

> How does `git rebase` work?

Likely:

```text
model knowledge / documentation
```

This forces students to understand architectural separation.

A table of exercises could gradually become harder:

| Requirement                | Appropriate mechanism |
| -------------------------- | --------------------- |
| General Python syntax      | model capability      |
| Current API docs           | RAG                   |
| User preference            | memory                |
| Current task               | context               |
| Safe commit workflow       | skill                 |
| Never delete production DB | policy/harness        |
| Execute tests              | tool                  |
| Determine if tests pass    | environment feedback  |

This is exactly the sort of conceptual discrimination AI engineers need.

---

# 13. Compare two AI systems

Give students two implementations.

### System A

```text
User → prompt → LLM → answer
```

### System B

```text
User
 ↓
retrieval
 ↓
context assembly
 ↓
LLM
 ↓
validation
 ↓
answer
```

Then ask:

> Which is more appropriate for answering questions from current company policy?

But importantly:

> What are the disadvantages of B?

Students should discuss:

* cost;
* latency;
* implementation complexity;
* retrieval failures;
* observability;
* security.

This prevents the KB from teaching:

> “More sophisticated architecture is always better.”

---

# 14. A “design decision” interaction

Present a realistic engineering decision.

Example:

> You have 500 internal documents that change weekly. Should you fine-tune the LLM or use RAG?

Students choose:

```text
Fine-tuning
RAG
Both
Neither
```

Then require justification.

The KB can give structured feedback:

```text
✓ You recognized that knowledge changes frequently.
✓ RAG allows source updates without retraining.

Consider:
- retrieval quality
- access control
- citations
- document freshness
```

Other choices:

* prompt vs fine-tuning;
* RAG vs long context;
* memory vs database;
* single agent vs workflow;
* deterministic software vs LLM;
* tool use vs model-generated answer.

These are authentic AI Engineering decisions.

---

# 15. Progressive engineering labs

I would also add actual mini-projects.

Not massive assignments, but **15–45 minute labs**.

For example:

### Lab 1 — LLM call

```text
input → LLM → output
```

### Lab 2 — Structured output

```text
input → LLM → JSON
```

### Lab 3 — Prompt/context separation

```text
instructions
+
user data
→ LLM
```

### Lab 4 — RAG

```text
documents
→ embeddings
→ retrieval
→ context
→ LLM
```

### Lab 5 — Tool use

```text
LLM → calculator/API → LLM
```

### Lab 6 — Memory

```text
conversation
→ extract memory
→ store
→ retrieve
```

### Lab 7 — Agent

```text
goal → plan → tool → observation → action
```

### Lab 8 — Evaluation

```text
dataset
→ system
→ predictions
→ metrics
```

Together they form an incremental engineering journey.

---

# 16. “Modify and observe” labs

Instead of telling students what happens, provide working code and ask them to change one thing.

For example:

```python
temperature = 0.2
```

Change to:

```python
temperature = 1.5
```

Observe.

Or:

```python
top_k = 3
```

versus:

```python
top_k = 20
```

Or remove the system instruction.

Or reorder context.

The pattern is:

$$
change\ one\ variable
\rightarrow
observe
\rightarrow
explain
$$

That starts to introduce students to **empirical AI engineering**.

---

# 17. Evaluation challenges

Students should also learn that:

> “It looks good” is not an evaluation method.

Give:

```text
20 test questions
```

with reference criteria.

Run two prompt/RAG/agent implementations.

For example:

| Metric       | System A | System B |
| ------------ | -------: | -------: |
| Correctness  |      .72 |      .84 |
| Groundedness |      .62 |      .91 |
| Cost/request |    €0.01 |    €0.04 |
| Latency      |    0.8 s |    2.1 s |

Ask:

> Which system is better?

There should deliberately be **no single correct answer**.

Students must reason from requirements.

This develops professional engineering judgement.

---

# 18. Prompt/context diff

Since students already understand source control, you could borrow the `diff` metaphor.

Show:

```diff
 SYSTEM
 You are a customer-support assistant.

+ Always use the supplied policy document as the authoritative source.
+ If the document does not answer the question, say so.

 USER
 Can I cancel within 30 days?
```

Then compare outputs before and after.

The KB could ask:

> Which change caused the behavioural difference?

This is a nice bridge from software engineering to context engineering.

---

# 19. Adversarial challenges

Some exercises should ask students to **break the AI application**.

For example:

> Make this chatbot violate its intended context.

Or:

> Find a query that causes irrelevant retrieval.

Or:

> Cause the agent to invoke the wrong tool.

Or:

> Create an ambiguous user instruction.

Then:

> Repair the system.

The cycle becomes:

$$
Build
\rightarrow
Attack
\rightarrow
Observe
\rightarrow
Improve
$$

This teaches robustness far better than only teaching ideal architectures.

---

# 20. Role-based reviews

AI Engineering is not purely technical.

After designing a system, let the student switch perspectives:

```text
[Developer]
[Product owner]
[Security officer]
[User]
[Data protection officer]
[AI engineer]
```

The same system can then be evaluated from different viewpoints.

For instance:

> Long-term memory stores user preferences.

Developer:

> Convenient.

User:

> Useful.

Privacy perspective:

> What exactly is stored?

Security:

> Who can retrieve it?

AI engineer:

> How does memory selection work?

This helps connect technical architecture with governance and professional responsibility.

---

# 21. Confidence before feedback

For knowledge questions, add:

```text
How confident are you?

○ Guessing
○ Somewhat confident
○ Confident
○ Very confident
```

Then reveal the answer.

That allows students to distinguish:

$$
unknown
$$

from:

$$
incorrectly\ believed\ known
$$

The latter is pedagogically much more important.

Over time the KB could show:

```text
Correct + confident       62%
Correct + uncertain       21%
Incorrect + uncertain     12%
Incorrect + confident      5%
```

That supports metacognition.

---

# 22. Explain-it-yourself

After an important concept:

> Explain context engineering in your own words in no more than 100 words.

Then an LLM can evaluate it against key concepts:

```text
✓ runtime
✓ context selection
✓ fixed model weights
✓ information sources

Missing:
- dynamic context
- context budget
- distinction from memory
```

The aim should not be grading prose quality.

It should identify **conceptual omissions and misconceptions**.

This could be very valuable in your KB because the subject contains many superficially similar concepts.

---

# 23. Concept relation exercises

Give concepts:

```text
LLM
RAG
memory
context
skills
tools
harness
agent
```

Ask students to draw relationships.

For example:

```text
memory
  ↓ retrieve
context
  ↓
LLM
  ↓ chooses
tool
```

Then compare with a reference model.

This is more demanding than definitions because students have to understand **architecture and causality**.

---

# 24. Case-based learning

I would make each major KB area contain at least one persistent case.

For example:

### Case A — Customer-support RAG

Useful for:

* LLMs;
* embeddings;
* RAG;
* evaluation;
* privacy.

### Case B — Coding agent

Useful for:

* context;
* tools;
* skills;
* agent loops;
* Git;
* evaluation.

### Case C — Social companion

Useful for:

* memory;
* long-lived agents;
* adaptation;
* safety;
* values;
* escalation.

The same system can gradually become more sophisticated as the student progresses through the KB.

That provides continuity.

---

# 25. I would organize them into four learning modes

For the KB itself, I would perhaps expose four recurring interaction labels.

### **Understand**

Short interactions that establish mental models:

* knowledge question;
* predict output;
* concept matching;
* explain in own words.

### **Explore**

Students manipulate a system:

* parameter sandbox;
* token/context simulator;
* RAG explorer;
* model comparison.

### **Engineer**

Students create or repair something:

* context builder;
* architecture builder;
* coding lab;
* agent workflow;
* debugging challenge.

### **Reflect**

Students evaluate choices:

* design decision;
* trade-off analysis;
* ethical dilemma;
* professional reflection;
* self-assessment.

This gives the KB a very clear learning grammar:

```text
             UNDERSTAND
                 │
                 ▼
              EXPLORE
                 │
                 ▼
              ENGINEER
                 │
                 ▼
              REFLECT
                 │
                 └────────↺
```

---

# 26. Map this onto your four AI Engineering areas

I would distribute the interactions something like this:

| AI Engineering area                        | Particularly useful interactions                                |
| ------------------------------------------ | --------------------------------------------------------------- |
| **1 Building & deploying AI applications** | experiments, RAG sandbox, context builder, eval labs            |
| **2 Software engineering fundamentals**    | debugging, architecture builder, Git scenarios, code review     |
| **3 Using coding agents**                  | agent trace, next-action simulation, skills, tool-use labs      |
| **4 Shaping the build**                    | design decisions, requirement critique, eval design, reflection |

There can be a clear progression from **knowledge → competence → judgement**.

---

# 27. Add “experience points”, but not primarily as gamification

I would avoid turning it into a quiz game.

Instead track **experience categories**:

```text
AI Engineering Experience

Conceptual understanding     ███████░░░
Experimentation              ██████░░░░
Context engineering          ████████░░
RAG                          █████░░░░░
Agent engineering            ███████░░░
Evaluation                   ████░░░░░░
Software engineering         ████████░░
Responsible AI               ██████░░░░
```

These should preferably represent **types of activities completed**, not arbitrary points.

For example:

> You have explained RAG, implemented RAG, debugged RAG and evaluated RAG.

That is much more meaningful than:

> You have earned 480 XP.

---

# 28. The KB could therefore have a reusable interaction vocabulary

I would implement approximately these **12 components**:

```text
<knowledge-check>

<predict>

<experiment>

<context-builder>

<agent-trace>

<next-action>

<debug-challenge>

<architecture-builder>

<design-decision>

<engineering-lab>

<evaluate>

<reflection>
```

Every conceptual chapter could then follow roughly:

```text
CONCEPT
   ↓
knowledge-check
   ↓
predict
   ↓
experiment
   ↓
engineering challenge
   ↓
evaluate
   ↓
reflection
```

This would turn your **AI Engineering Knowledge Base into an AI Engineering learning environment**, rather than a digital textbook.

The three components I would prioritize first are **Predict → Experiment → Explain**, an **Agent Trace/Next Action simulator**, and a **Context Builder**. Those directly address what is hardest to acquire from ordinary educational material: a correct *mental model* of how LLM systems behave, *procedural experience* with agentic systems, and *engineering judgement* about what information and mechanisms belong where.

