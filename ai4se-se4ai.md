Prompt:
explore and summarize the two lines of 'AI for software engineering' and 'software engineering for AI'. Link them to the AI Engineering Knowledge Base.

ChatGPT answer:
There are two complementary movements reshaping software engineering:

* **AI for Software Engineering (AI4SE)** — applying AI to improve the *software engineering process*.
* **Software Engineering for AI (SE4AI)** — applying software-engineering principles to make *AI-based systems* reliable, maintainable, secure, testable, and deployable.

They meet in what we increasingly call **AI Engineering**. That makes the distinction very useful as an organizing principle for your AI Engineering Knowledge Base.

Andrew Ng's newly published AI Engineering Skills Map fits remarkably well with this interpretation. His four top-level areas are **Building and deploying AI applications, Software engineering fundamentals, Using coding agents, and Shaping the build**. ([Andrew Ng][1])

## 1. The two directions

A useful way to visualize them is:

|                                         | Core question                                              | Direction                 |
| --------------------------------------- | ---------------------------------------------------------- | ------------------------- |
| **AI for Software Engineering — AI4SE** | How can AI help us engineer software better?               | AI → Software Engineering |
| **Software Engineering for AI — SE4AI** | How do we engineer AI systems properly?                    | Software Engineering → AI |
| **AI Engineering**                      | How do we combine both into a modern engineering practice? | AI ↔ Software Engineering |

### AI for Software Engineering

Here, **software development is the object being improved**.

AI is used as an engineering instrument throughout the SDLC:

**Understand → Design → Implement → Test → Deploy → Operate**

Examples include:

* requirements analysis with LLMs;
* generating user stories and acceptance criteria;
* architecture exploration;
* UI prototyping;
* code generation;
* refactoring;
* code review;
* test generation;
* debugging;
* vulnerability detection;
* documentation;
* CI/CD assistance;
* issue triage;
* observability analysis.

The major recent development is the transition from **AI assistant to coding agent**.

An assistant:

> Developer → prompt → generated code → developer

An agent works more like:

> Goal → inspect repository → plan → modify files → run tests → observe results → debug → repeat → propose solution

Recent research therefore characterizes LLM coding agents by **autonomy, broader SDLC task scope, and greater emphasis on practical engineering concerns such as reliability, workflow management and tool integration**. ([arXiv][2])

This is much broader than "AI generates code."

I would describe AI4SE in your knowledge base as:

> **Using AI as an engineering collaborator to augment, automate and increasingly orchestrate software-development activities.**

---

# 2. Software Engineering for AI

The direction is reversed.

Now the thing we are building **contains AI**.

Examples:

* an LLM-based knowledge assistant;
* recommendation engine;
* computer-vision system;
* RAG application;
* autonomous agent;
* AI-enabled decision-support system.

The problem is that AI components behave differently from traditional deterministic software.

Traditional software is roughly:

```text
requirements
    ↓
logic written by developer
    ↓
input → deterministic program → output
```

AI systems introduce another path:

```text
data
 ↓
model
 ↓
probabilistic behaviour
```

For modern LLM systems it becomes even more complicated:

```text
              ┌── prompts
              ├── context
user ─────────┼── LLM
              ├── retrieved knowledge
              ├── tools
              ├── memory
              └── agents
                    ↓
                 output
```

System behaviour is therefore distributed across **code, models, prompts, context, data, tools and orchestration**.

That requires adapting software engineering.

The established SE4AI literature already identifies issues around requirements, architecture, quality, testing, maintenance and operations. A major systematic survey mapped these explicitly onto SWEBOK areas and found particularly strong attention to testing, quality, dependability and safety; data-related challenges were especially prevalent. ([DOI][3])

So SE4AI is not simply:

> "put an LLM behind an API."

It asks:

> **How can we engineer systems containing nondeterministic AI components so that the overall system remains trustworthy and manageable?**

---

# 3. The fundamental difference

There is an elegant symmetry.

| AI4SE                                  | SE4AI                                 |
| -------------------------------------- | ------------------------------------- |
| **AI changes the engineering process** | **AI changes the engineered product** |
| AI assists the developer               | AI is part of the application         |
| Coding agent                           | Application agent                     |
| Prompt used to build software          | Prompt becomes software               |
| AI evaluates code                      | Software evaluates AI                 |
| Agent modifies repository              | Agent operates inside production      |
| Developer controls AI                  | Architecture controls AI              |
| Focus: productivity                    | Focus: system quality                 |

That distinction is worth making explicit in the Knowledge Base because people frequently mix these two conversations.

---

# 4. But the two lines are now converging

This is where **AI Engineering** becomes particularly interesting.

Imagine developing an agentic customer-support system.

You might use:

```text
AI4SE
──────────────────────────────

Coding Agent
   ↓
generate architecture
   ↓
implement RAG
   ↓
generate tests
   ↓
configure CI/CD
```

But the resulting application itself contains:

```text
SE4AI
──────────────────────────────

LLM
 ↓
context engineering
 ↓
RAG
 ↓
tools
 ↓
agent workflow
 ↓
evaluations
 ↓
observability
```

The developer is therefore doing both simultaneously:

```text
        AI FOR SOFTWARE ENGINEERING
                   ↓
        ┌────────────────────┐
        │                    │
        │   AI ENGINEERING   │
        │                    │
        └────────────────────┘
                   ↑
        SOFTWARE ENGINEERING FOR AI
```

This is increasingly the normal situation rather than an exception.

---

# 5. Connection to your four Knowledge Base areas

I would **not add AI4SE and SE4AI as areas 5 and 6**.

They work better as **two cross-cutting perspectives through the existing four areas**.

Your structure becomes:

| AI Engineering Knowledge Base               | Primary perspective          |
| ------------------------------------------- | ---------------------------- |
| **1. Building & deploying AI applications** | SE4AI                        |
| **2. Software engineering fundamentals**    | Foundation for both          |
| **3. Using coding agents**                  | AI4SE                        |
| **4. Shaping the build**                    | Integration of AI4SE + SE4AI |

That actually gives the four areas a much stronger conceptual relationship.

---

# 6. Area 1 — Building & Deploying AI Applications

### Dominant line: **Software Engineering for AI**

This area answers:

> **How do we build software systems whose behaviour partially depends on AI?**

Andrew Ng's elaboration of this area currently identifies six major categories: **LLM foundations, grounding models with data, building agentic systems, evaluation-driven development, operating in production, and machine-learning foundations**. ([トマトのお餅小屋][4])

This maps almost directly onto the topics you already identified.

I would structure Area 1 approximately as:

```text
1. BUILDING & DEPLOYING AI APPLICATIONS
│
├── AI foundations
│   ├── Machine Learning
│   ├── Deep Learning
│   ├── Transformers
│   └── Large Language Models
│
├── Working with models
│   ├── Model selection
│   ├── APIs
│   ├── Open vs closed models
│   ├── Structured output
│   └── Embeddings
│
├── Context engineering
│   ├── Prompt engineering
│   ├── Context windows
│   ├── System instructions
│   ├── Memory
│   └── Context management
│
├── Grounding
│   ├── Embeddings
│   ├── Vector search
│   ├── RAG
│   ├── Hybrid retrieval
│   └── Knowledge bases
│
├── Agentic systems
│   ├── Tool use
│   ├── Function calling
│   ├── MCP
│   ├── Agent loops
│   ├── Workflows
│   └── Multi-agent systems
│
├── Evaluation-driven development
│   ├── Evals
│   ├── Test datasets
│   ├── LLM-as-judge
│   ├── Human evaluation
│   └── Regression evaluation
│
└── Production
    ├── LLMOps
    ├── Observability
    ├── Guardrails
    ├── Security
    ├── Cost
    └── Reliability
```

The conceptual label underneath all of this is:

### **SE4AI — Engineering systems with AI**

---

# 7. Area 2 — Software Engineering Fundamentals

This area sits underneath **both lines**.

The interesting message for your Knowledge Base should be:

> AI does not make software engineering obsolete. It increases the leverage of good software engineering—and the cost of poor software engineering.

For example, coding agents perform much better when repositories have:

* clear architecture;
* modular code;
* automated tests;
* deterministic build processes;
* explicit coding conventions;
* good naming;
* documented interfaces.

Likewise, AI applications require:

* requirements engineering;
* architecture;
* APIs;
* databases;
* version control;
* security;
* testing;
* deployment;
* observability.

So Area 2 could become:

```text
SOFTWARE ENGINEERING FUNDAMENTALS

Requirements
     ↓
Architecture
     ↓
Design
     ↓
Implementation
     ↓
Testing
     ↓
Deployment
     ↓
Operations
```

with transversal subjects such as:

```text
quality
security
privacy
accessibility
maintainability
reliability
sustainability
```

SE4AI literature reinforces precisely this point: AI-based systems still require established engineering disciplines, but several practices need adaptation because behaviour depends on models and data rather than code alone. ([DOI][3])

---

# 8. Area 3 — Using Coding Agents

### Dominant line: **AI for Software Engineering**

This becomes the mirror image of Area 1.

The central question is:

> **How do we use agentic AI to perform software engineering?**

I would make the distinction between four generations very explicit.

### Generation 1 — Code completion

```text
Developer writes code
        ↓
AI completes code
```

Copilot-style interaction.

### Generation 2 — Chat-based coding assistant

```text
Developer asks
       ↓
LLM explains / generates
       ↓
Developer integrates
```

### Generation 3 — Coding agent

```text
Task
 ↓
inspect repository
 ↓
plan
 ↓
modify
 ↓
run
 ↓
test
 ↓
debug
 ↓
iterate
```

### Generation 4 — Agentic software engineering

```text
             Human
               │
          shapes intent
               ↓
        ┌─────────────┐
        │ Orchestrator│
        └──────┬──────┘
               │
     ┌─────────┼─────────┐
     ↓         ↓         ↓
 architecture coding   testing
   agent       agent     agent
     │         │         │
     └─────────┼─────────┘
               ↓
             repo
               ↓
             CI/CD
```

This fourth level is important for the Knowledge Base because it moves beyond describing individual products such as Codex, Claude Code or Copilot.

The underlying concepts are more durable:

* agent loop;
* planning;
* tool use;
* repository exploration;
* shell execution;
* context management;
* persistent instructions;
* checkpoints;
* subagents;
* delegation;
* verification;
* human oversight;
* multi-agent orchestration.

---

# 9. Area 4 — Shaping the Build

I think this is where the two lines **come together most strongly**.

A superficial interpretation of AI-assisted development is:

> "Tell AI what to code."

A stronger interpretation is:

> **Humans increasingly define what should be built, why, under which constraints, and how success will be determined; agents increasingly execute portions of the implementation loop.**

That moves human expertise upward.

```text
                         HUMAN
                           │
                    problem framing
                           │
                     requirements
                           │
                     architecture
                           │
                      constraints
                           │
                     evaluation
                           │
                    orchestration
                           ▼
                       AI AGENTS
                           │
                     implementation
                           │
                       testing
                           │
                       tooling
                           │
                     documentation
```

So **Shaping the Build** should contain topics such as:

* problem framing;
* stakeholder discovery;
* requirements;
* decomposition;
* specifications;
* architecture;
* trade-off analysis;
* task design;
* acceptance criteria;
* constraints;
* definition of done;
* agent instructions;
* context design;
* evaluation criteria;
* reviewing AI work;
* engineering judgement.

I would explicitly introduce the concept:

### **Intent → specification → execution → evaluation**

instead of reducing agentic development to prompting.

---

# 10. A stronger conceptual architecture for the Knowledge Base

Putting everything together gives you a coherent model:

```text
                     AI ENGINEERING
                           │
        ┌──────────────────┼──────────────────┐
        │                                     │
        │                                     │
 SOFTWARE ENGINEERING                    AI
       FOR AI                      FOR SOFTWARE ENGINEERING
      SE4AI                              AI4SE
        │                                     │
        ▼                                     ▼

┌──────────────────────┐             ┌──────────────────────┐
│ 1. BUILDING &        │             │ 3. USING CODING      │
│    DEPLOYING AI      │             │    AGENTS            │
│    APPLICATIONS      │             │                      │
│                      │             │ AI assists the       │
│ Engineer AI systems  │             │ engineering process  │
└──────────┬───────────┘             └──────────┬───────────┘
           │                                    │
           └──────────────┬─────────────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │ 2. SOFTWARE         │
                │    ENGINEERING      │
                │    FUNDAMENTALS     │
                │                     │
                │ Engineering         │
                │ discipline          │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 4. SHAPING          │
                │    THE BUILD        │
                │                     │
                │ Human judgement,    │
                │ intent & direction  │
                └──────────────────────┘
```

There is one adjustment I would make conceptually: **Area 2 is really the foundation, not merely the second sequential step**.

The knowledge model might therefore be presented as four interlocking competencies rather than four phases.

---

# 11. Two loops are emerging

There is another useful conceptual model for the Knowledge Base.

### Software Engineering for AI

Because AI outputs are probabilistic, development becomes an **evaluation loop**:

```text
BUILD
  ↓
EVALUATE
  ↓
ANALYZE FAILURE
  ↓
IMPROVE
  ↓
BUILD
```

Andrew Ng explicitly emphasizes this iterative, evaluation-driven character of building AI applications. ([leslieli.dev][5])

### AI for Software Engineering

Coding agents operate through an **agent loop**:

```text
UNDERSTAND
   ↓
PLAN
   ↓
ACT
   ↓
OBSERVE
   ↓
VERIFY
   ↓
ITERATE
```

These loops are structurally similar.

That gives us a deeper connection:

```text
        SE4AI                         AI4SE

Evaluation loop                    Agent loop

Build                              Plan
 ↓                                  ↓
Evaluate                           Act
 ↓                                  ↓
Observe                            Observe
 ↓                                  ↓
Improve                            Verify
 ↓                                  ↓
Build                              Iterate
```

Both shift software development away from:

> **write everything correctly once**

toward:

> **create fast feedback loops that progressively improve the system.**

That is probably one of the most important conceptual principles to teach in an **AI Engineering** knowledge base.

---

# 12. I would add an explicit "Two Directions" page

Near the start of your Knowledge Base, before the four areas, I recommend a conceptual page:

## **AI Engineering: Two Directions**

with:

```text
                  AI ENGINEERING
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
 Software Engineering          AI for
       for AI              Software Engineering
       SE4AI                       AI4SE
          │                         │
          ▼                         ▼
 Engineer AI systems        Engineer with AI
          │                         │
          └────────────┬────────────┘
                       ▼
                Modern Software
                  Engineering
```

And then connect it to Ng's map:

| Knowledge Base area                         | Perspective                | Core question                                           |
| ------------------------------------------- | -------------------------- | ------------------------------------------------------- |
| **1. Building & Deploying AI Applications** | **SE4AI**                  | How do I engineer AI-based systems?                     |
| **2. Software Engineering Fundamentals**    | **SE foundation**          | What engineering principles make both reliable?         |
| **3. Using Coding Agents**                  | **AI4SE**                  | How do I engineer software with AI?                     |
| **4. Shaping the Build**                    | **Human/AI orchestration** | How do I decide what gets built and direct the process? |

This gives your Knowledge Base a stronger conceptual story than simply treating the four skills as independent buckets. **Area 1 and Area 3 become mirror images; Area 2 provides the engineering discipline; Area 4 provides human intent, judgement and orchestration.**

That, in my view, is a very strong backbone for the AI Engineering Knowledge Base.

[1]: https://www.andrewng.org/writing?utm_source=chatgpt.com "Writing | Andrew Ng"
[2]: https://arxiv.org/abs/2508.00083?utm_source=chatgpt.com "A Survey on Code Generation with LLM-based Agents"
[3]: https://doi.org/10.1145/3487043?utm_source=chatgpt.com "Software Engineering for AI-Based Systems: A Survey | ACM Transactions on Software Engineering and Methodology"
[4]: https://www.mohuaye.cn/posts/ai-engineering-skills-map-building-and-deploying-ai-applic/?utm_source=chatgpt.com "AI Engineering Skills Map: Building and Deploying AI Applications - トマトのお餅小屋"
[5]: https://leslieli.dev/notes/andrew-ng-ai-engineering-skills-map/?utm_source=chatgpt.com "Andrew Ng's AI Engineering Skills Map: Deconstructing the 6 Pillars of Building & Deploying AI Applications — Leslie Li"

