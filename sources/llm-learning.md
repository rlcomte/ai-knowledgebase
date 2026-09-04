## LLM learning process

An LLM learns in a fundamentally different way from a human. It does not normally learn explicit rules, facts, or concepts one by one. Instead, training adjusts **billions of numerical parameters** so that the model becomes increasingly good at predicting plausible continuations of token sequences.

A useful conceptual model is:

**data → tokens → prediction → error → backpropagation → parameter update → repetition → trained model**

The crucial idea is that most of what we call the model's "knowledge" becomes encoded implicitly in the parameter values of the neural network.

---

### 1. Start with a very large training corpus

Training begins with a collection of text and other data such as:

* books;
* websites;
* documentation;
* scientific articles;
* source code;
* conversations;
* structured text;
* and, for multimodal models, images, audio, or video.

Before training, substantial **data engineering** is normally required:

* filtering low-quality content;
* removing duplicates;
* excluding unwanted material;
* balancing different kinds of sources;
* cleaning formatting;
* identifying languages;
* constructing training examples.

The model does not simply store this corpus as a searchable database.

Instead, the corpus provides the examples from which the model learns statistical and structural regularities.

---

## 2. Text is converted into tokens

An LLM does not directly process words.

Text is first converted into **tokens**.

For example:

> Artificial intelligence is useful.

might roughly become:

```text
["Artificial", " intelligence", " is", " useful", "."]
```

Actual tokenization varies by model.

Each token receives an integer identifier:

```text
Artificial   → 18273
intelligence → 9441
is           → 318
useful       → 8021
.            → 13
```

These identifiers are then transformed into mathematical vectors called **embeddings**.

Conceptually:

```text
token
  ↓
token ID
  ↓
embedding vector
  ↓
Transformer
```

An embedding might contain thousands of numbers:

$$
x =
[0.21,-0.73,0.14,\ldots,0.36]
$$

Initially, these numbers contain little useful structure. During training, meaningful representations emerge.

---

# 3. The basic learning problem: predict the next token

For most contemporary generative LLMs, the central pretraining task is surprisingly simple:

> Given all previous tokens, predict the next token.

Suppose the training text contains:

> The capital of France is Paris.

The model may receive:

```text
The capital of France is
```

and must predict:

```text
Paris
```

But the model does not output only one answer. It produces a probability distribution over its vocabulary.

For example:

| Token  | Predicted probability |
| ------ | --------------------: |
| Paris  |                  0.52 |
| Lyon   |                  0.08 |
| France |                  0.05 |
| London |                  0.03 |
| Rome   |                  0.02 |
| ...    |                   ... |

During training, the system knows that the actual next token was `Paris`.

It therefore evaluates how well the model predicted it.

---

# 4. The loss function measures the error

The difference between the model's prediction and the correct token is represented through a **loss function**.

A typical LLM uses **cross-entropy loss**.

For the correct token \(y\):

$$
L=-\log P(y)
$$

Suppose:

$$
P(\text{Paris})=0.52
$$

Then:

$$
L=-\log(0.52)\approx0.65
$$

But if the model assigned only:

$$
P(\text{Paris})=0.01
$$

the loss would be:

$$
L=-\log(0.01)\approx4.61
$$

So:

> **good prediction → low loss**
> **bad prediction → high loss**

Training tries to minimize this loss over enormous numbers of examples.

---

# 5. Backpropagation determines what should change

The model may contain billions of parameters:

$$
\theta_1,\theta_2,\ldots,\theta_n
$$

These parameters include weights in:

* attention layers;
* feed-forward networks;
* embeddings;
* projection matrices;
* other neural-network components.

The system must determine:

> Which parameters contributed to the error, and in which direction should they change?

This is done using **backpropagation**.

Mathematically, it computes gradients such as:

$$
\frac{\partial L}{\partial \theta_i}
$$

The gradient tells us approximately:

> If parameter \(\theta_i\) changes slightly, how does the prediction error change?

Backpropagation efficiently propagates this information backward through the neural network.

---

# 6. Gradient descent changes the model

An optimization algorithm then updates the parameters.

Simplified:

$$
\theta_{\text{new}}
=
\theta_{\text{old}}
-
\eta
\nabla_\theta L
$$

where:

* \(\theta\) = parameters;
* \(L\) = loss;
* \(\nabla_\theta L\) = gradient;
* \(\eta\) = learning rate.

This is the actual **learning step**.

One prediction might alter billions of parameters by extremely tiny amounts.

Training repeats this process millions or billions of times.

```text
training tokens
     ↓
Transformer
     ↓
prediction
     ↓
compare with actual token
     ↓
loss
     ↓
backpropagation
     ↓
gradients
     ↓
optimizer
     ↓
updated weights
     ↺
```

---

# 7. Learning happens in batches

Training is not normally performed sentence by sentence.

Thousands or millions of tokens are grouped into **batches**.

For example:

```text
Batch
 ├── sequence 1
 ├── sequence 2
 ├── sequence 3
 ├── ...
 └── sequence n
```

The model makes predictions for all of them.

Their losses are combined, after which one optimization step is performed.

Training thus consists of repeated cycles:

$$
\text{forward pass}
\rightarrow
\text{loss}
\rightarrow
\text{backward pass}
\rightarrow
\text{update}
$$

---

# 8. What does the model actually learn?

This is where LLM learning becomes particularly interesting.

Because predicting language requires understanding many regularities, the model gradually develops internal representations of things such as:

### Language

For example:

* syntax;
* grammar;
* spelling;
* semantic similarity;
* discourse structures.

### Concepts

It learns relationships such as:

```text
cat → animal
Amsterdam → city
Java → programming language
gravity → physics
```

### Relations

For example:

```text
Paris — capital-of → France
```

### Patterns of reasoning

Training data contains examples of:

* comparisons;
* explanations;
* classifications;
* analogies;
* calculations;
* argumentation;
* causal reasoning.

The network can therefore learn reusable computational patterns.

### Styles and genres

It learns differences between:

* scientific papers;
* poetry;
* program code;
* news reports;
* casual conversations;
* legal language.

Importantly, nobody normally tells the model:

```text
parameter 4,712,992 represents France
```

Knowledge is **distributed across many parameters and activations**.

---

# 9. Attention is central to this learning

Within the Transformer, **self-attention** allows the model to determine which earlier tokens are relevant when processing a token.

Consider:

> The dog chased the ball because **it** was moving.

To understand `it`, the model may need to relate that token to `ball`.

Attention calculates relations between token representations.

In simplified form:

$$
Attention(Q,K,V)
=
softmax
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

where:

* \(Q\) = queries;
* \(K\) = keys;
* \(V\) = values.

Conceptually:

```text
current token
     │
     ▼
"What previous information is relevant?"
     │
     ▼
attention over previous tokens
     │
     ▼
weighted contextual representation
```

Multiple **attention heads** can learn different relationships simultaneously.

Some may become useful for:

* nearby syntax;
* long-distance references;
* semantic relationships;
* structural patterns.

---

# 10. Representation learning happens automatically

One of the most important characteristics of deep learning is **representation learning**.

Older machine-learning approaches often required humans to define features:

```text
feature 1: noun?
feature 2: verb?
feature 3: sentence length
feature 4: topic
```

Neural networks instead learn useful internal features themselves.

Across Transformer layers, representations tend to become progressively more contextual.

Very roughly:

```text
tokens
 ↓
lexical patterns
 ↓
syntactic relations
 ↓
semantic relations
 ↓
contextual concepts
 ↓
task-relevant representations
```

This should not be interpreted as a strict layer-by-layer hierarchy, but it is a useful conceptual picture.

---

# 11. Pretraining creates the foundation model

The very large learning phase described above is called **pretraining**.

Its objective is usually broad:

> Learn a general model of language, knowledge and recurring patterns in the training distribution.

After pretraining, the model may already be able to:

* complete text;
* translate;
* answer some questions;
* write code;
* summarize;
* perform limited reasoning.

Such a pretrained model is commonly called a **foundation model** or **base model**.

---

# 12. Post-training changes how the model behaves

A raw next-token predictor is not necessarily a good assistant.

A second phase therefore usually follows:

## Post-training

Post-training teaches the model how it should behave when interacting with users.

Several techniques can be combined.

### Supervised fine-tuning

The model receives examples such as:

```text
User:
Explain photosynthesis to a 10-year-old.

Ideal response:
Plants use sunlight...
```

Training then increases the likelihood of responses resembling these high-quality demonstrations.

This is commonly called **supervised fine-tuning (SFT)**.

---

# 13. Preference learning

There may be several plausible answers to the same question.

Humans or other evaluators can compare them.

For instance:

```text
Prompt
       ↓
 ┌─────┴─────┐
Answer A   Answer B
   ↓          ↓
 evaluator preference
       ↓
      A > B
```

The model can learn from these preferences.

This family of methods includes techniques such as:

* RLHF — Reinforcement Learning from Human Feedback;
* RLAIF — Reinforcement Learning from AI Feedback;
* reward modelling;
* DPO — Direct Preference Optimization;
* related preference-optimization techniques.

These methods help shape properties such as:

* helpfulness;
* instruction following;
* safety;
* relevance;
* conversational quality.

---

# 14. Pretraining and post-training are different kinds of learning

This distinction is useful:

| Pretraining                     | Post-training                      |
| ------------------------------- | ---------------------------------- |
| learns broad patterns           | shapes behaviour                   |
| enormous datasets               | smaller curated datasets           |
| mostly self-supervised          | demonstrations/preferences/rewards |
| general language/world patterns | instruction following              |
| very computationally expensive  | usually much smaller               |

A useful shorthand is:

> **Pretraining teaches the model what patterns exist.**
> **Post-training teaches the model how to use those capabilities as an assistant.**

That is somewhat simplified, because post-training can also teach new capabilities and pretraining influences behaviour.

---

# 15. An LLM usually does not learn while you talk to it

This distinction is particularly important for your **AI Engineering / agentic AI knowledge base**.

During a normal conversation, model weights are normally fixed.

Suppose you tell an LLM:

> My project is called Apollo.

The system can use this information later in the same context:

```text
context
 ├── earlier messages
 ├── "project = Apollo"
 └── current question
```

But that does **not** mean that backpropagation has modified the LLM.

There are therefore several fundamentally different forms of adaptation:

| Mechanism             | Changes model weights? | Persistence                |
| --------------------- | ---------------------: | -------------------------- |
| Prompt/context        |                     No | current context            |
| RAG                   |                     No | external knowledge store   |
| Agent memory          |                     No | external persistent memory |
| Fine-tuning           |                    Yes | persistent                 |
| Continued pretraining |                    Yes | persistent                 |
| Full retraining       |                    Yes | persistent                 |

This distinction becomes crucial when designing long-lived agents.

---

# 16. Context learning versus parameter learning

An LLM can appear to learn during a conversation through **in-context learning**.

Example:

```text
User:
In this task, ZOR means "customer has cancelled".

Example:
Customer 123 is ZOR.

Assistant:
Customer 123 has cancelled.
```

The model has adapted to the temporary definition.

However:

```text
weights before conversation
=
weights after conversation
```

No gradient update was required.

This capability emerged during training: the model learned **how to infer patterns from its context**.

This is why in-context learning is sometimes described as:

> learning without parameter updates.

---

# 17. A useful three-level model of LLM learning

For your knowledge base, I would distinguish three levels.

### Level 1 — Parametric learning

Information is encoded through changes in model weights.

```text
training data
     ↓
gradient descent
     ↓
model parameters
```

Examples:

* pretraining;
* continued pretraining;
* fine-tuning.

This is slow and expensive but persistent.

### Level 2 — Contextual adaptation

The model adapts its behaviour based on its current context.

```text
instructions
examples
conversation
documents
     ↓
context window
     ↓
LLM
```

No weights are changed.

This is fast but temporary.

### Level 3 — External learning

An AI system can store knowledge outside the model.

```text
experience
   ↓
memory system
   ↓
retrieval
   ↓
future context
   ↓
LLM
```

Examples include:

* vector databases;
* user profiles;
* episodic memory;
* knowledge graphs;
* agent state.

This is increasingly important for **long-lived AI agents**.

---

# 18. The distinction between learning and remembering

These two concepts should therefore not be conflated.

### Learning

Changes the system's ability to perform a class of tasks.

For example:

> After fine-tuning, the model has become better at medical coding.

### Remembering

Makes earlier information available again.

For example:

> The agent remembers that this user prefers concise explanations.

An agent can therefore become highly adaptive without continuously retraining its LLM.

Its architecture might instead be:

```text
              ┌───────────────┐
              │ Base LLM      │
              │ fixed weights │
              └───────┬───────┘
                      │
       ┌──────────────┼───────────────┐
       │              │               │
       ▼              ▼               ▼
   context          memory          skills
       │              │               │
       └──────────────┼───────────────┘
                      ▼
                   agent
                      │
                      ▼
                 experience
                      │
               memory update
```

This is a central principle of modern agent architecture:

> **The agent can learn operationally even when the underlying LLM does not learn parametrically.**

---

# 19. Why next-token prediction can produce sophisticated capabilities

This often seems surprising:

> How can simply predicting the next token lead to reasoning, programming and explanation?

Because good next-token prediction over extremely diverse data implicitly requires modelling many latent structures.

To predict:

> `2 + 2 = ...`

the model benefits from learning arithmetic patterns.

To predict:

> `Paris is the capital of ...`

it benefits from modelling geographical relationships.

To continue program code, it benefits from modelling:

* syntax;
* APIs;
* algorithms;
* program structure.

To complete an argument, it benefits from modelling:

* premises;
* conclusions;
* causal relationships;
* rhetorical structure.

Therefore the apparently simple objective:

$$
P(x_t \mid x_1,\ldots,x_{t-1})
$$

forces the model to develop internal representations that can support far richer behaviour.

---

# 20. The complete LLM learning pipeline

For the knowledge base, I would represent the overall process as:

```text
                    RAW DATA
                       │
                       ▼
              cleaning / filtering
                       │
                       ▼
                  tokenization
                       │
                       ▼
             ┌──────────────────┐
             │   PRETRAINING    │
             │ next-token       │
             │ prediction       │
             └────────┬─────────┘
                      │
                      ▼
                 Base model
                      │
             ┌────────┴─────────┐
             │   POST-TRAINING  │
             │                  │
             │ SFT              │
             │ preference data  │
             │ RL / DPO etc.    │
             └────────┬─────────┘
                      │
                      ▼
                Assistant model
                      │
             ┌────────┴──────────┐
             │                   │
             ▼                   ▼
         prompting              tools
         context                RAG
         examples               memory
             │                   │
             └─────────┬─────────┘
                       ▼
                    AI agent
```

The essential distinction is between **training the model** and **engineering the runtime system around the model**.

For AI Engineering, this distinction is foundational:

$$
\boxed{
\text{AI system capability}
\neq
\text{LLM capability alone}
}
$$

A modern AI application increasingly derives its capability from:

$$
\text{LLM}
+
\text{context}
+
\text{retrieval}
+
\text{memory}
+
\text{tools}
+
\text{skills}
+
\text{agent harness}
+
\text{evaluation}
$$

That is also why understanding LLM learning is a good foundation for understanding **context engineering and agent engineering**: once the LLM has been trained, most application developers do not train it again—they construct systems that make effective use of the learned model.

