Yes. This exposes an important limitation of saying that an LLM merely "learns to predict the next token." **Procedures and behaviours can emerge from next-token training because the training data contains sequences in which actions, conditions, commands, explanations, outcomes, and corrections occur together.** But different kinds of procedural competence arise at different stages.

Git is an excellent example.

## 1. Git is not normally installed in the model as a predefined "skill"

There is generally no internal object such as:

```text
SKILL: Git version management
  step 1: git status
  step 2: git add
  step 3: git commit
  ...
```

Instead, during pretraining the model encounters many textual patterns related to Git, for example:

```bash
git status
git add src/app.py
git commit -m "Fix authentication bug"
git push origin feature/auth-fix
```

but also explanations:

> Create a feature branch before making the change.

documentation:

```text
git checkout -b <new-branch>
```

questions and answers:

> How do I undo my last commit?

repository instructions:

```text
1. Fork the repository
2. Create a branch
3. Make your changes
4. Commit the changes
5. Open a pull request
```

and perhaps code, configuration, build scripts, contribution guides, issue discussions and similar material, depending on the training corpus.

Code-specialized models explicitly use large quantities of code-related material during training, while instruction-tuned variants receive additional instruction-oriented training. ([arXiv][1])

The important point is that the model sees **relationships between situations and actions**.

---

# 2. Pretraining can therefore teach several different things simultaneously

Consider repeated examples such as:

```text
There are modified files
        ↓
git status
        ↓
inspect changes
        ↓
git diff
        ↓
select changes
        ↓
git add
        ↓
git commit
```

The learning objective is still only:

$$
P(token_t \mid token_1,\ldots,token_{t-1})
$$

But predicting the continuation correctly requires the model to discover patterns such as:

$$
\text{modified working tree}
\rightarrow
\texttt{git status}
$$

and:

$$
\text{review changes}
\rightarrow
\texttt{git diff}
$$

and:

$$
\text{record staged changes}
\rightarrow
\texttt{git commit}
$$

Eventually these relationships become encoded in the model's parameters.

So the model learns something resembling:

```text
situation → likely action
action → likely consequence
goal → plausible action sequence
error → likely recovery action
```

It is not explicitly represented this way, but this is a useful conceptual abstraction.

---

# 3. Three kinds of Git knowledge emerge

This distinction is particularly useful.

### A. Declarative knowledge

Knowing **what something is**.

For example:

> A commit represents a recorded snapshot/change in repository history.

or:

> `git status` reports the state of the working tree and staging area.

This resembles factual knowledge.

---

### B. Command knowledge

Knowing which textual command corresponds to an operation.

For example:

```text
stage a file
→ git add file.txt
```

or:

```text
create a branch
→ git switch -c feature-x
```

This resembles a mapping:

$$
intent \rightarrow command
$$

---

### C. Procedural knowledge

More interestingly:

> Knowing which actions to perform, in which order, under which circumstances.

For example:

```text
Goal:
Implement issue #127

        ↓

inspect repository
        ↓
git status
        ↓
create branch
        ↓
edit code
        ↓
run tests
        ↓
inspect diff
        ↓
stage appropriate files
        ↓
commit
        ↓
push
        ↓
create PR
```

This is closer to:

$$
(state, goal)
\rightarrow
action
\rightarrow
new\ state
\rightarrow
action
\rightarrow \ldots
$$

That starts to look much more like **agent behaviour**.

---

# 4. How can next-token prediction learn a procedure?

Imagine the training corpus contains thousands of examples analogous to:

```text
Developer: I need to implement a feature without affecting main.

Answer:
First create a feature branch:

git switch -c feature/customer-export

Make your changes and run the tests.

Then review them:

git diff

Stage the relevant files:

git add ...

Commit:

git commit -m "Add customer export"

Push the branch:

git push -u origin feature/customer-export
```

The model repeatedly learns conditional distributions such as:

$$
P(\texttt{git switch} \mid \text{"create a feature branch"})
$$

and:

$$
P(\texttt{git diff} \mid \text{"review my changes"})
$$

But it can also learn longer dependencies:

$$
P(\text{commit} \mid
\text{branch created, code modified, tests passed})
$$

Transformers can represent dependencies over long token sequences, so the learned pattern doesn't have to be just:

```text
word → next word
```

It can effectively represent something closer to:

```text
context + goal + previous actions
               ↓
         probable next action
```

That is one reason language models can exhibit procedural competence despite having a token-prediction objective.

---

# 5. But pretraining alone does not mean "follow this procedure"

There is an important difference between:

> knowing Git

and

> reliably using Git when requested.

A pretrained base model may know the commands perfectly but simply continue text rather than behave as an assistant.

That is where **instruction tuning / supervised fine-tuning** becomes important.

Suppose training contains demonstrations such as:

```text
USER
I accidentally committed my changes to main.
I haven't pushed them yet. Put the changes on a feature branch.

ASSISTANT
Create a branch at the current commit:

git switch -c feature/my-change

Then reset main to its previous commit...
```

Many such prompt-response demonstrations train the model toward the general behaviour:

$$
instruction
\rightarrow
appropriate procedure
$$

Supervised demonstrations were a key component of instruction-following training in systems such as InstructGPT, followed by preference-based optimization. ([arXiv][2])

This is a second layer of learning.

---

# 6. Behaviour can also be trained through preferences

Suppose two answers are generated.

### Answer A

```bash
git add .
git commit -m "stuff"
git push --force
```

### Answer B

```bash
git status
git diff

# stage only the intended files
git add src/auth.py tests/test_auth.py

git diff --staged
git commit -m "Fix authentication validation"
```

A software engineer may rate **B** as preferable.

If thousands of such comparisons are used during post-training, the model can learn preferences such as:

* inspect before modifying;
* minimize unintended changes;
* use meaningful commits;
* avoid destructive Git operations;
* verify changes;
* explain risky commands.

Thus:

$$
\text{Git knowledge}
+
\text{behavioural preference}
\rightarrow
\text{better Git practice}
$$

Preference training does not necessarily teach each Git command from scratch. Much of that capability may already exist from pretraining. It **shapes how the existing capability is deployed**.

---

# 7. Procedures can be trained as trajectories

For agents, we can go one step further.

Instead of training on:

```text
question → answer
```

we can train on entire action trajectories.

For example:

```text
GOAL
Fix failing login test

OBSERVATION
Repository contains modified files.

ACTION
git status

OBSERVATION
src/auth.py modified
README.md modified

ACTION
git diff src/auth.py

OBSERVATION
...

ACTION
pytest tests/test_auth.py

OBSERVATION
1 failed

ACTION
edit src/auth.py

OBSERVATION
...

ACTION
pytest tests/test_auth.py

OBSERVATION
8 passed

ACTION
git diff

ACTION
git add src/auth.py

ACTION
git commit -m "Fix login validation"

RESULT
Task completed
```

Now the training example has the form:

$$
(s_0,a_0,s_1,a_1,\ldots,s_n)
$$

where:

* \(s\) = state/observation;
* \(a\) = action.

This teaches much more than command syntax.

It teaches a **policy**:

$$
\pi(a\mid s,g)
$$

meaning:

> Given the current state \(s\) and goal \(g\), which action \(a\) should I take?

This is the conceptual bridge from **LLM to agent**.

Research such as ReAct demonstrated the importance of interleaving reasoning/decision-making with actions and observations rather than producing only a single final response. ([arXiv][3])

---

# 8. Execution feedback makes this substantially stronger

We can also place the model in an actual software environment.

Suppose it produces:

```bash
git checkout feature-x
```

The environment returns:

```text
error: pathspec 'feature-x' did not match any file(s) known to git
```

The model now has to respond.

Perhaps:

```bash
git branch --all
```

Then:

```text
* main
  remotes/origin/feature-x
```

Then:

```bash
git switch --track origin/feature-x
```

Now the loop becomes:

```text
                ┌───────────────┐
                │     Goal      │
                └───────┬───────┘
                        ↓
                 current state
                        ↓
                      LLM
                        ↓
                     action
                        ↓
                 environment
                        ↓
                    result
                        ↓
                new observation
                        │
                        └──────↺
```

This is qualitatively different from knowing the textual description of Git.

The model is interacting with the **real semantics of the tool**.

Systems such as SWE-agent explicitly provide language-model agents with interfaces for navigating repositories, editing files and executing tests/programs; performance depends significantly on the design of that agent-computer interface. ([arXiv][4]) SWE-bench similarly evaluates models on real repository-level issues where solving a task requires codebase changes and execution rather than merely generating a code snippet. ([arXiv][5])

---

# 9. Reinforcement learning can train from successful outcomes

Suppose the training system gives a reward.

For example:

```text
+1    tests pass
+1    requested feature works
+0.5  only relevant files changed
+0.2  meaningful commit created

-1    tests fail
-1    unrelated files modified
-2    repository corrupted
-3    destructive Git operation
```

An agent performs many trajectories.

```text
trajectory A → reward 0.3
trajectory B → reward 2.7
trajectory C → reward -2.0
```

Reinforcement learning can increase the probability of action patterns associated with successful outcomes.

Conceptually:

$$
\pi_\theta(a\mid s)
\xrightarrow{\text{RL}}
\pi_{\theta'}(a\mid s)
$$

Now the model is not merely being told:

> Here is how Git should work.

It can learn:

> This sequence of actions tends to solve software-engineering tasks successfully.

Contemporary software-agent research increasingly uses reproducible repositories, executable tasks and test suites precisely because they provide objective feedback suitable for evaluation and RL training. ([arXiv][6])

---

# 10. But there is another crucial layer: the agent harness

For the AI Engineering knowledge base, this is perhaps the most important distinction.

Suppose we want a coding agent always to follow this Git policy:

```text
1. Never work directly on main.
2. Check git status before editing.
3. Never discard user changes.
4. Inspect git diff before committing.
5. Run tests before committing.
6. Do not push unless explicitly requested.
7. Never force-push without confirmation.
```

There is no compelling reason to bake all of this into the LLM weights.

It might instead be encoded in an **agent skill or harness instruction**:

```yaml
skill: git-version-management

rules:
  - inspect repository state first
  - preserve uncommitted user changes
  - work on feature branches
  - review diffs before commits
  - run relevant tests
  - require authorization before push
  - prohibit force-push by default
```

At runtime:

```text
             pretrained LLM
                    +
           post-trained behaviour
                    +
          ┌───────────────────┐
          │ Git skill         │
          │ project policy    │
          │ safety rules      │
          └─────────┬─────────┘
                    +
               repository
                    +
               Git tools
                    ↓
               CODING AGENT
```

So an advanced coding agent's Git behaviour is likely to be the product of **several layers**, not one.

---

## 11. I would distinguish five layers of procedural competence

This gives you a useful conceptual model for the knowledge base:

| Layer                                | What is learned/provided?         | Git example                                   |
| ------------------------------------ | --------------------------------- | --------------------------------------------- |
| **1. Pretraining**                   | concepts and statistical patterns | knows commits, branches, merges and commands  |
| **2. Instruction tuning**            | responding appropriately to goals | can answer "create a feature branch"          |
| **3. Behaviour/preference training** | desirable ways of acting          | checks changes rather than blindly committing |
| **4. Agent/trajectory training**     | multi-step action policies        | inspect → edit → test → commit                |
| **5. Harness / skills / policy**     | explicit runtime procedure        | project-specific Git workflow                 |

And we should add a sixth element:

| **6. Environment feedback** | actual consequences | Git tells the agent whether a command succeeds |

The total behaviour becomes approximately:

$$
\boxed{
Behaviour =
Model\ knowledge
+ posttraining
+ context
+ skills
+ harness
+ environment\ feedback
}
$$

---

# 12. The distinction between "knowledge" and "skill" is especially important

We can now make this sharper.

### Knowledge

The LLM can tell you:

> `git rebase` reapplies commits on another base.

### Procedural competence

The LLM can infer:

> This branch is three commits behind main, so rebasing may be appropriate.

### Skill

The agent follows a repeatable procedure:

```text
inspect status
→ fetch
→ inspect divergence
→ choose rebase strategy
→ execute
→ resolve conflicts
→ test
→ verify history
```

### Policy

The organization says:

> Never rebase a shared protected branch.

### Tool capability

The agent can actually execute:

```bash
git fetch
git rebase origin/main
```

These should **not be conflated**.

---

# 13. Git also demonstrates why training does not necessarily produce "best practice"

There is an additional subtlety.

Suppose the training corpus contains:

```bash
git add .
git commit -m update
git push --force
```

many times.

The model learns that these are plausible Git sequences.

But frequency does not make them **good engineering practice**.

Pretraining learns approximately:

$$
P(\text{behaviour}\mid\text{training distribution})
$$

not:

$$
P(\text{best behaviour}\mid\text{engineering principles})
$$

That is why post-training, explicit policies, skills, evaluation and environment constraints matter so much.

For example:

```text
Internet corpus
     │
     │ contains
     ├── good Git practices
     ├── bad Git practices
     ├── outdated practices
     ├── tutorials
     ├── hacks
     └── conflicting opinions
             ↓
         PRETRAINING
             ↓
     broad Git competence
             │
             ▼
       POST-TRAINING
             ↓
     preferred behaviour
             │
             ▼
       AGENT SKILL
             ↓
     prescribed workflow
```

This is one reason I would avoid describing pretraining as **teaching the model Git best practices**. More precisely:

> **Pretraining causes the model to acquire a distributed representation of Git concepts, commands, relationships and procedural patterns from examples. Post-training and agent engineering then turn that latent capability into more reliable task-oriented behaviour.**

---

# 14. A concrete example: "Fix the bug and commit it"

Consider a coding agent receiving:

> Fix issue #253 and commit the solution.

Its behaviour could draw on all these layers simultaneously.

### Model weights

From pretraining:

```text
bug fixing
Git concepts
Python syntax
pytest
repository structures
```

### Post-training

From instruction/agent training:

```text
understand request
inspect before changing
avoid destructive commands
validate result
```

### Agent skill

Injected at runtime:

```text
When changing a repository:
1. inspect status
2. understand issue
3. locate relevant code
4. make minimal change
5. run relevant tests
6. inspect diff
7. commit only intended changes
```

### Tools

Provided by the harness:

```text
shell()
read_file()
edit_file()
search_code()
```

### Environment

Provides:

```text
Git repository
compiler
tests
filesystem
```

The resulting trajectory might be:

```text
User goal
   ↓
inspect git status
   ↓
read issue/context
   ↓
search code
   ↓
form hypothesis
   ↓
edit
   ↓
run test
   ↓
failure ────────────┐
   ↑                │
   └── revise ←─────┘
   ↓
tests pass
   ↓
git diff
   ↓
check unintended changes
   ↓
git add selected files
   ↓
git commit
   ↓
report result
```

Only part of that capability resides in the LLM weights.

---

# 15. This suggests a better definition of an LLM "skill"

For your work on agents, I would define it quite specifically:

> **A latent LLM capability is a pattern of behaviour that the model can produce because of its parameterized training. An agent skill is an operationalized capability: a reusable procedure, supplied with instructions, tools, context, constraints and often evaluation criteria, that allows an agent to apply latent model capabilities reliably toward a goal.**

Thus:

$$
\boxed{
latent\ capability
\xrightarrow{\text{harness + procedure + tools}}
operational\ skill
}
$$

For Git:

```text
LLM knows Git
       ≠
agent has a reliable Git skill
```

That distinction becomes central to understanding **skills, harnesses, coding agents and long-lived social agents**. In fact, I think it gives us a useful extension to the conceptual agent model we developed earlier: **training produces latent capabilities; the harness turns capabilities into situated competencies; skills turn competencies into reusable procedures.**

[1]: https://arxiv.org/abs/2308.12950?utm_source=chatgpt.com "Code Llama: Open Foundation Models for Code"
[2]: https://arxiv.org/abs/2203.02155?utm_source=chatgpt.com "Training language models to follow instructions with human feedback"
[3]: https://arxiv.org/abs/2210.03629?utm_source=chatgpt.com "ReAct: Synergizing Reasoning and Acting in Language Models"
[4]: https://arxiv.org/abs/2405.15793?utm_source=chatgpt.com "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
[5]: https://arxiv.org/abs/2310.06770?utm_source=chatgpt.com "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
[6]: https://arxiv.org/abs/2602.23866?utm_source=chatgpt.com "SWE-rebench V2: Language-Agnostic SWE Task Collection at Scale"
ZZ
