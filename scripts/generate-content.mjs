import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

const reviewed = '2026-08-25';
const root = 'src/content/docs';

const areas = {
  start: 'Start here',
  area1: 'Building and deploying AI applications',
  area2: 'Software engineering fundamentals',
  area3: 'Using coding agents',
  area4: 'Shaping the build',
  cross: 'Cross-cutting knowledge'
};

const related = {
  evals: '/building-deploying-ai-applications/evals-and-error-analysis/',
  context: '/building-deploying-ai-applications/context-engineering/',
  rag: '/building-deploying-ai-applications/grounding-and-rag/',
  architecture: '/software-engineering-fundamentals/architecture-and-interfaces/',
  testing: '/software-engineering-fundamentals/testing-and-testability/',
  agents: '/using-coding-agents/',
  agentLoop: '/using-coding-agents/the-agent-loop/',
  orchestration: '/using-coding-agents/delegation-handoffs-and-orchestration/',
  shaping: '/shaping-the-build/',
  canvas: '/shaping-the-build/shaping-canvas/'
};

const conceptPages = [
  {
    path: 'building-deploying-ai-applications/machine-learning',
    title: 'Machine Learning',
    area: areas.area1,
    order: 2,
    tags: ['foundation', 'evaluation'],
    description: 'Methods that learn patterns from data instead of expressing every rule explicitly.',
    body: `Machine learning methods learn patterns from data instead of expressing every rule explicitly. Core forms include supervised, unsupervised, self-supervised and reinforcement learning.

Engineers need a working grasp of data splits, loss functions, metrics, generalisation, bias-variance reasoning and error analysis. In this knowledge base, machine learning is treated as engineering material: useful only when its behaviour can be measured against real tasks and connected to software constraints.`,
    related: [['Evals and error analysis', related.evals], ['AI suitability', '/shaping-the-build/ai-suitability/']]
  },
  {
    path: 'building-deploying-ai-applications/deep-learning',
    title: 'Deep Learning',
    area: areas.area1,
    order: 3,
    tags: ['foundation'],
    description: 'Machine learning using multilayer neural networks, underpinning modern vision, speech, multimodal systems and LLMs.',
    body: `Deep learning uses multilayer neural networks. It underpins modern vision, speech, multimodal systems and large language models.

Important concepts include tensors, embeddings, architectures, training, inference, optimisation, transfer learning and compute requirements. For AI engineers, deep learning matters because model capabilities and constraints shape product design, evaluation cost and deployment choices.`,
    related: [['Foundation models and LLMs', '/building-deploying-ai-applications/foundation-models-and-llms/'], ['Embeddings and vector search', '/building-deploying-ai-applications/embeddings-vector-search-graphs-and-semantic-layers/']]
  },
  {
    path: 'building-deploying-ai-applications/foundation-models-and-llms',
    title: 'Foundation Models and LLMs',
    area: areas.area1,
    order: 4,
    tags: ['foundation', 'architecture'],
    description: 'Foundation models, LLMs, multimodal models and model selection as production engineering choices.',
    body: `A foundation model is trained broadly enough to be adapted to many tasks. Adaptation can occur through prompting, tool use, retrieval, fine-tuning or specialised wrappers.

A large language model processes and generates sequences of tokens. Practical understanding includes tokenisation, embeddings, attention, context windows, inference, sampling, structured output, reasoning effort, caching, tool calling and model limitations.

Multimodal models process or generate more than one modality, such as text, images, audio or video. The engineer must decide how modalities are represented, combined, validated and evaluated.

Model selection is a system decision based on capability, reliability, latency, cost, privacy, context size, modality and deployment constraints. The largest model is not automatically the best production choice.`,
    related: [['Context engineering', related.context], ['Cost and latency', '/building-deploying-ai-applications/production-operations-observability-cost-and-latency/']]
  },
  {
    path: 'building-deploying-ai-applications/prompt-engineering',
    title: 'Prompt Engineering',
    area: areas.area1,
    order: 5,
    tags: ['practice'],
    description: 'Designing instructions and examples that elicit useful model behaviour.',
    body: `Prompt engineering designs instructions and examples that elicit useful model behaviour. It includes task definition, constraints, output schemas, examples and explicit uncertainty handling.

A prompt is only one part of the context. Treat it as an interface contract for a model call, then verify the resulting behaviour with representative examples rather than relying on phrasing alone.`,
    related: [['Context engineering', related.context], ['Task briefs and examples', '/using-coding-agents/task-briefs-and-examples/']]
  },
  {
    path: 'building-deploying-ai-applications/context-engineering',
    title: 'Context Engineering',
    area: areas.area1,
    order: 6,
    tags: ['practice', 'architecture'],
    description: 'Designing the complete information environment available to a model at a particular step.',
    body: `Context engineering designs the complete information environment available to a model at a particular step: instructions, conversation, retrieved knowledge, tool definitions, state, examples and output constraints.

It also includes selecting, compressing, ordering and refreshing context. The central engineering judgement is deciding what the model needs now, what should remain outside the model, and how stale, conflicting or sensitive context should be handled.`,
    related: [['Grounding and RAG', related.rag], ['Context, instructions and planning', '/using-coding-agents/context-instructions-and-planning/']]
  },
  {
    path: 'building-deploying-ai-applications/grounding-and-rag',
    title: 'Grounding and RAG',
    area: areas.area1,
    order: 7,
    tags: ['architecture', 'evaluation'],
    description: 'Connecting model output to trusted, task-relevant sources or system state.',
    body: `Grounding connects model output to trusted, task-relevant sources or system state. It reduces unsupported generation and enables answers that reflect current or private information.

Retrieval-augmented generation is a pattern in which relevant information is retrieved and supplied to the model during inference. A RAG pipeline typically covers ingestion, parsing, chunking, metadata, indexing, retrieval, reranking, context assembly, generation and citation.`,
    related: [['Embeddings, vector search, graphs and semantic layers', '/building-deploying-ai-applications/embeddings-vector-search-graphs-and-semantic-layers/'], ['Evals and error analysis', related.evals]]
  },
  {
    path: 'building-deploying-ai-applications/embeddings-vector-search-graphs-and-semantic-layers',
    title: 'Embeddings, Vector Search, Graphs and Semantic Layers',
    area: areas.area1,
    order: 8,
    tags: ['architecture', 'data'],
    description: 'Retrieval building blocks and their trade-offs for semantic, structured and relationship-heavy information.',
    body: `Embeddings represent content as numerical vectors; vector search retrieves items with similar representations. It is useful for semantic similarity, but exact search, filters, SQL, graphs or hybrid retrieval may be better for other query types.

Knowledge graphs and semantic layers complement vector retrieval. A knowledge graph makes entities and relationships explicit. A semantic layer gives consistent business meaning to structured data and metrics.`,
    related: [['Data modelling and data engineering', '/software-engineering-fundamentals/data-modelling-and-data-engineering/'], ['Grounding and RAG', related.rag]]
  },
  {
    path: 'building-deploying-ai-applications/tool-calling-and-mcp',
    title: 'Tool Calling and MCP',
    area: areas.area1,
    order: 9,
    tags: ['architecture', 'governance'],
    description: 'Allowing models to request controlled operations through validated tools and standard interfaces.',
    body: `Tool calling allows a model to request a defined operation, such as querying a database, running code or calling an API. The application, not the model, must validate arguments, permissions, results and side effects.

Model Context Protocol is an open protocol for connecting AI applications to tools, data sources and reusable capabilities through standard interfaces. MCP improves interoperability; it does not remove the need for authentication, authorisation, validation and trust boundaries.`,
    related: [['API and contract design', '/software-engineering-fundamentals/architecture-and-interfaces/'], ['Configuration, permissions and sandboxing', '/using-coding-agents/configuration-permissions-and-sandboxing/']]
  },
  {
    path: 'building-deploying-ai-applications/agentic-workflows-and-harnesses',
    title: 'Agentic Workflows and Harnesses',
    area: areas.area1,
    order: 10,
    tags: ['architecture', 'practice'],
    description: 'Multi-step model workflows, harness responsibilities, state, memory and reusable workflow patterns.',
    body: `An agentic workflow uses one or more model calls to perform a multi-step task. Some workflows have a fixed graph; more autonomous agents repeatedly select their own next action within a harness.

The agent harness manages instructions, tools, state, memory, permissions, stopping conditions, retries, traces and human intervention. Much of an agent's practical capability comes from the harness, not only the model.

Reusable workflow patterns include prompt chaining, routing, parallelisation, orchestrator-worker, evaluator-optimizer and human approval. State records what is true during a workflow; memory makes selected information available across steps or sessions.`,
    related: [['The agent loop', related.agentLoop], ['Multi-agent patterns', '/using-coding-agents/multi-agent-patterns/']]
  },
  {
    path: 'building-deploying-ai-applications/evals-and-error-analysis',
    title: 'Evals and Error Analysis',
    area: areas.area1,
    order: 11,
    tags: ['evaluation', 'practice'],
    description: 'Structured tests and qualitative inspection for improving probabilistic AI-system behaviour.',
    body: `An eval is a structured test of AI-system behaviour using representative inputs, expected properties and scoring methods. Scores may be deterministic, model-based or human. Evals should measure the application, not just the underlying model.

Evaluation-driven development states desired behaviour as evaluable criteria, measures a baseline, analyses errors, changes one thing and checks regressions. Evals play a role analogous to tests, while accounting for probabilistic output.

Error analysis means inspecting failures, clustering them into meaningful categories and deciding which change is most likely to improve the system. Aggregate scores without qualitative error analysis rarely indicate what to build next.`,
    related: [['Evals as the spine', '/cross-cutting-knowledge/evals-as-the-spine/'], ['Testing and testability', related.testing]]
  },
  {
    path: 'building-deploying-ai-applications/production-operations-observability-cost-and-latency',
    title: 'Production Operations, Observability, Cost and Latency',
    area: areas.area1,
    order: 12,
    tags: ['operations', 'evaluation'],
    description: 'Running AI systems under real deployment, tracing, reliability, cost and performance constraints.',
    body: `Production operation means running the system under real constraints: deployment, scaling, tracing, observability, drift detection, incident response, fallback, rollback, data freshness and version management.

AI observability captures inputs, retrieved context, tool calls, outputs, latency, token use, cost, user feedback and safety signals while respecting privacy. Traces make multi-step failures diagnosable.

Cost and latency engineering controls model choice, token volume, caching, retrieval, parallelism and number of calls. Quality, speed and cost must be evaluated as a system-level trade-off.`,
    related: [['DevOps, deployment and observability', '/software-engineering-fundamentals/devops-deployment-and-observability/'], ['Quality model for AI software', '/cross-cutting-knowledge/quality-model-for-ai-software/']]
  },
  {
    path: 'building-deploying-ai-applications/human-oversight-and-guardrails',
    title: 'Human Oversight and Guardrails',
    area: areas.area1,
    order: 13,
    tags: ['governance', 'risk'],
    description: 'Controls that constrain AI inputs, outputs or actions and keep human authority meaningful.',
    body: `A guardrail constrains inputs, outputs or actions. Guardrails may be deterministic rules, classifiers, policy checks, permission gates or human review. They complement rather than replace system design and evaluation.

Human in/on the loop describes meaningful human authority. In the loop usually means approval or contribution is required; on the loop means people supervise and can intervene. The control must match consequence and reversibility.`,
    related: [['Risk and responsible AI', '/shaping-the-build/risk-and-responsible-ai/'], ['Governance and human decision boundaries', '/using-coding-agents/governance-and-human-decision-boundaries/']]
  },
  {
    path: 'software-engineering-fundamentals/requirements-and-design',
    title: 'Requirements and Design',
    area: areas.area2,
    order: 2,
    tags: ['foundation', 'architecture'],
    description: 'Requirements engineering, computational thinking and design for AI-supported systems.',
    body: `Requirements engineering elicits, analyses, specifies, validates and manages functional and quality requirements. AI features additionally require behavioural examples, uncertainty policies and escalation rules.

Software design divides responsibilities among components, defines interfaces and makes trade-offs explicit. Good design limits the scope of AI uncertainty and keeps deterministic rules deterministic.

Computational thinking and programming fundamentals give engineers the vocabulary for decomposition, abstraction, algorithms, state, complexity and failure.`,
    related: [['Specifications and acceptance criteria', '/shaping-the-build/specifications-quality-attributes-and-acceptance-criteria/'], ['Prompt engineering', '/building-deploying-ai-applications/prompt-engineering/']]
  },
  {
    path: 'software-engineering-fundamentals/architecture-and-interfaces',
    title: 'Architecture and Interfaces',
    area: areas.area2,
    order: 3,
    tags: ['architecture'],
    description: 'Boundaries, contracts, integration and structural decisions that make AI systems changeable.',
    body: `Architecture captures high-impact structural decisions: boundaries, components, integration, data flow, deployment and quality attributes. Architecture should make model replacement and workflow evolution possible.

API and contract design defines stable interfaces, schemas, validation, errors, idempotency and versioning. Tool contracts for agents are APIs and deserve the same discipline.`,
    related: [['Tool calling and MCP', '/building-deploying-ai-applications/tool-calling-and-mcp/'], ['Deterministic-probabilistic boundaries', '/shaping-the-build/deterministic-probabilistic-boundaries/']]
  },
  {
    path: 'software-engineering-fundamentals/data-modelling-and-data-engineering',
    title: 'Data Modelling and Data Engineering',
    area: areas.area2,
    order: 4,
    tags: ['data', 'architecture'],
    description: 'Representing entities, relations, events and lifecycle so AI has meaningful data to work with.',
    body: `Data modelling represents entities, relations, events, constraints, lineage and lifecycle. AI does not compensate for ambiguous semantics or poor-quality source data.

For AI applications, data engineering also includes provenance, freshness, retention and access policies for retrieved context, traces, feedback and eval datasets.`,
    related: [['Embeddings, vector search, graphs and semantic layers', '/building-deploying-ai-applications/embeddings-vector-search-graphs-and-semantic-layers/'], ['Data and context in the shaping canvas', related.canvas]]
  },
  {
    path: 'software-engineering-fundamentals/code-quality-and-version-control',
    title: 'Code Quality and Version Control',
    area: areas.area2,
    order: 5,
    tags: ['practice'],
    description: 'Maintainability, readable diffs and reversible change in human and agent-written code.',
    body: `Code quality covers readability, cohesion, low coupling, appropriate abstraction, consistency and explicit intent. Generated code must meet the same maintainability standard as human-written code.

Version control records and reviews changes using branches, commits, diffs and merge workflows. Small, coherent changes make agent output easier to inspect and reverse.`,
    related: [['Principles for effective use', '/using-coding-agents/principles-for-effective-use/'], ['Technical debt, documentation and teamwork', '/software-engineering-fundamentals/technical-debt-documentation-and-teamwork/']]
  },
  {
    path: 'software-engineering-fundamentals/testing-and-testability',
    title: 'Testing and Testability',
    area: areas.area2,
    order: 6,
    tags: ['evaluation', 'practice'],
    description: 'Traditional tests for deterministic behaviour and evals for probabilistic behaviour.',
    body: `The testing pyramid combines unit, integration, contract, system and acceptance tests. Traditional tests verify deterministic behaviour; evals verify probabilistic behaviour. Both are needed in AI applications.

Testability means designing components so dependencies, data and model calls can be controlled or substituted. It makes failures reproducible and lowers evaluation cost.`,
    related: [['Evals and error analysis', related.evals], ['Evaluating coding agents', '/using-coding-agents/evaluating-coding-agents/']]
  },
  {
    path: 'software-engineering-fundamentals/security-privacy-and-accessibility',
    title: 'Security, Privacy and Accessibility',
    area: areas.area2,
    order: 7,
    tags: ['governance', 'risk'],
    description: 'Security, privacy and inclusive design constraints for AI-supported applications.',
    body: `Security engineering includes threat modelling, least privilege, secure defaults, secrets management, dependency control, input validation and incident response. AI-specific threats include prompt injection, data exfiltration and unsafe tool use.

Privacy engineering covers data minimisation, purpose limitation, consent or lawful basis, retention, access control and privacy-preserving logs. Context and traces can contain more sensitive information than developers expect.

Accessibility and inclusive design ensure applications work for people with diverse abilities, languages, devices and contexts. AI output must not undermine otherwise accessible interaction.`,
    related: [['Configuration, permissions and sandboxing', '/using-coding-agents/configuration-permissions-and-sandboxing/'], ['Risk and responsible AI', '/shaping-the-build/risk-and-responsible-ai/']]
  },
  {
    path: 'software-engineering-fundamentals/devops-deployment-and-observability',
    title: 'DevOps, Deployment and Observability',
    area: areas.area2,
    order: 8,
    tags: ['operations', 'evaluation'],
    description: 'Build, release and operations practices for observable and recoverable AI software.',
    body: `DevOps and CI/CD automate build, test, evaluation, security checks and deployment. Model, prompt, retrieval and eval changes should pass controlled release gates.

Infrastructure and deployment cover environments, containers, compute, networking, scaling, resilience and rollback. Managed APIs, self-hosted models and hybrid setups have different operational burdens.

Observability uses logs, metrics and traces to understand system health and investigate incidents. AI traces extend observability into prompts, retrieval and tool decisions. Performance engineering measures and improves latency, throughput, resource use and cost under realistic load.`,
    related: [['Production operations', '/building-deploying-ai-applications/production-operations-observability-cost-and-latency/'], ['Outcomes and learning loops', '/shaping-the-build/outcomes-and-learning-loops/']]
  },
  {
    path: 'software-engineering-fundamentals/technical-debt-documentation-and-teamwork',
    title: 'Technical Debt, Documentation and Teamwork',
    area: areas.area2,
    order: 9,
    tags: ['practice', 'governance'],
    description: 'Managing future cost, decision records, collaboration and review in fast-moving AI projects.',
    body: `Technical debt is the future cost created by expedient decisions. Agent-generated duplication, unnecessary dependencies and undocumented abstractions can accumulate debt unusually quickly.

Documentation and decision records explain how to use the system and why consequential decisions were made. Architecture decision records preserve context that code alone cannot express.

Collaboration and review depend on shared standards, code review, issue tracking, ownership and constructive challenge. Human review should focus on risk and system intent, not only formatting.`,
    related: [['AGENTS.md and project instructions', '/using-coding-agents/context-instructions-and-planning/'], ['Decision records', '/shaping-the-build/outcomes-and-learning-loops/']]
  },
  {
    path: 'using-coding-agents/coding-assistants-versus-coding-agents',
    title: 'Coding Assistants Versus Coding Agents',
    area: areas.area3,
    order: 2,
    tags: ['foundation'],
    description: 'The difference between local code help and goal-directed multi-step agent work.',
    body: `A coding assistant is mainly used to explain, autocomplete or generate a local fragment. The user usually manages the surrounding workflow.

A coding agent is a goal-directed system that can inspect code, use tools, modify files, run verification and iterate over multiple steps with a degree of autonomy. This distinction matters because agent use shifts engineering work toward task framing, context design, verification and review.`,
    related: [['The agent loop', related.agentLoop], ['Principles for effective use', '/using-coding-agents/principles-for-effective-use/']]
  },
  {
    path: 'using-coding-agents/model-harness-tools-and-workspace',
    title: 'Model, Harness, Tools and Workspace',
    area: areas.area3,
    order: 3,
    tags: ['foundation', 'architecture'],
    description: 'The practical components that determine what a coding agent can do.',
    body: `The model supplies language understanding, code generation and reasoning. Model capability matters, but does not determine the agent's complete behaviour.

The harness provides tool execution, file access, state, context assembly, approvals, sandboxing, progress, retries and stopping conditions. Different harnesses can produce substantially different outcomes with similar models.

Tools are controlled capabilities such as repository search, file editing, shell execution, browser access, issue tracking or deployment. The workspace model is the files, repository state, environment and connected resources visible to the agent.`,
    related: [['Tool calling and MCP', '/building-deploying-ai-applications/tool-calling-and-mcp/'], ['Configuration, permissions and sandboxing', '/using-coding-agents/configuration-permissions-and-sandboxing/']]
  },
  {
    path: 'using-coding-agents/the-agent-loop',
    title: 'The Agent Loop',
    area: areas.area3,
    order: 4,
    tags: ['foundation', 'practice'],
    description: 'Observe, reason, act, inspect, update and stop or continue.',
    body: `The agent loop is the recurring cycle: observe context, reason about the next step, act through a tool, inspect the result, update the plan and stop or continue. The exact internal implementation differs by product.

Evidence-based completion means declaring success based on inspected diffs, passing checks, rendered output or other concrete evidence, not the agent's own confidence. The loop is only useful when observations are reliable and stopping conditions are clear.`,
    related: [['Evaluation-driven development', related.evals], ['The ten-step working method', '/using-coding-agents/the-ten-step-working-method/']]
  },
  {
    path: 'using-coding-agents/context-instructions-and-planning',
    title: 'Context, Instructions and Planning',
    area: areas.area3,
    order: 5,
    tags: ['practice'],
    description: 'Managing finite context, persistent project guidance, skills and adaptive plans.',
    body: `The context window is finite. Long raw logs and irrelevant files can bury decisions; concise instructions, selected files and summaries preserve signal.

Persistent project instructions, often in a file such as AGENTS.md, record build commands, conventions, constraints and the definition of done. Layered instructions combine personal, organisational, repository and directory-specific guidance.

A plan is a provisional decomposition into verifiable steps. Planning is most useful for ambiguous, risky or multi-stage work and should adapt when evidence changes. Agent skills convert repeatable prompting into managed capability.`,
    related: [['Context engineering', related.context], ['Task briefs and examples', '/using-coding-agents/task-briefs-and-examples/']]
  },
  {
    path: 'using-coding-agents/configuration-permissions-and-sandboxing',
    title: 'Configuration, Permissions and Sandboxing',
    area: areas.area3,
    order: 6,
    tags: ['governance', 'risk'],
    description: 'Model configuration, MCP integrations, execution boundaries, approvals and secrets.',
    body: `Model and reasoning configuration should match task complexity, latency and cost. Easy, bounded edits may not need the most expensive setting.

A sandbox is an execution boundary that restricts file, process or network access. It reduces blast radius but does not replace secure review. Approval policy governs which actions require human consent; high-impact, external, destructive or credential-sensitive actions deserve tighter approval.

MCP integrations expose external tools and resources. Each integration still needs scoped credentials, clear tool contracts and safe defaults. Secrets should come from managed mechanisms, not prompts or committed files.`,
    related: [['Security, privacy and accessibility', '/software-engineering-fundamentals/security-privacy-and-accessibility/'], ['Governance and human decision boundaries', '/using-coding-agents/governance-and-human-decision-boundaries/']]
  },
  {
    path: 'using-coding-agents/principles-for-effective-use',
    title: 'Principles for Effective Use',
    area: areas.area3,
    order: 7,
    tags: ['practice', 'governance'],
    description: 'Operational principles for getting useful, reviewable and reversible work from coding agents.',
    body: `Effective coding-agent use starts by bounding the task, supplying intent, defining done and making context discoverable.

Prefer small diffs, use progressive autonomy, keep humans at decision boundaries, trust verification rather than fluency, turn corrections into infrastructure and preserve reversibility. These principles make agent work reviewable and reduce the chance that speed hides weak engineering.`,
    related: [['Code quality and version control', '/software-engineering-fundamentals/code-quality-and-version-control/'], ['The ten-step working method', '/using-coding-agents/the-ten-step-working-method/']]
  },
  {
    path: 'using-coding-agents/the-ten-step-working-method',
    title: 'The Ten-Step Working Method',
    area: areas.area3,
    order: 8,
    tags: ['practice'],
    description: 'A readable process for directing coding agents from task framing through shipping and observation.',
    body: `The recommended working method turns agent use into an engineering loop:

<ol class="process-list">
  <li><strong>Frame</strong><span>Describe the outcome, user need, scope and non-goals.</span></li>
  <li><strong>Ground</strong><span>Point to relevant repository areas, standards and examples.</span></li>
  <li><strong>Specify</strong><span>Provide acceptance criteria, quality attributes and expected evidence.</span></li>
  <li><strong>Explore</strong><span>Let the agent inspect before it edits; require clarification for material ambiguity.</span></li>
  <li><strong>Plan</strong><span>For complex work, agree on decomposition and risk points.</span></li>
  <li><strong>Implement</strong><span>Work in small coherent increments.</span></li>
  <li><strong>Verify</strong><span>Run tests, linters, type checks, security checks, evals or visual inspection.</span></li>
  <li><strong>Review</strong><span>Inspect behaviour, diff, architecture and unintended changes.</span></li>
  <li><strong>Reflect</strong><span>Capture recurring mistakes in tests, instructions or reusable skills.</span></li>
  <li><strong>Ship and observe</strong><span>Release through normal controls and monitor real behaviour.</span></li>
</ol>`,
    related: [['Task briefs and examples', '/using-coding-agents/task-briefs-and-examples/'], ['Evaluating coding agents', '/using-coding-agents/evaluating-coding-agents/']]
  },
  {
    path: 'using-coding-agents/task-briefs-and-examples',
    title: 'Task Briefs and Examples',
    area: areas.area3,
    order: 9,
    tags: ['practice'],
    description: 'A reusable task brief structure for bounded, verifiable agent work.',
    body: `A useful task brief separates outcome, user need, scope, constraints, acceptance criteria and verification. It gives the agent enough context to make local choices while keeping the human in charge of intent and risk.

\`\`\`markdown
# Outcome
Add document citations to the answer view.

# User need
Users must be able to inspect the source behind an AI-generated claim.

# Scope
- API response schema and web answer component
- Existing retrieval pipeline only

# Constraints
- Preserve backward compatibility
- No new production dependency
- Do not expose internal storage identifiers

# Acceptance criteria
- Every grounded claim can show one or more source links
- Missing citations degrade gracefully
- Contract and UI tests pass
- Accessibility is verified by keyboard

# Verification
- Run: npm test
- Run: npm run lint
- Render and inspect the answer view
\`\`\``,
    related: [['The ten-step working method', '/using-coding-agents/the-ten-step-working-method/'], ['Acceptance criteria', '/shaping-the-build/specifications-quality-attributes-and-acceptance-criteria/']]
  },
  {
    path: 'using-coding-agents/multiple-agents-and-subagents',
    title: 'Multiple Agents and Subagents',
    area: areas.area3,
    order: 10,
    tags: ['practice', 'architecture'],
    description: 'When separate agents help and when a single agent is the better engineering choice.',
    body: `A subagent is a separately running agent delegated a bounded task by a primary agent. It normally returns a distilled result rather than its entire working context.

Use multiple agents when tasks are genuinely independent, large context can be partitioned, specialists require different instructions, or independent review adds valuable challenge. Prefer one agent when work is tightly coupled, small, write-heavy in the same files, or difficult to decompose without repeated coordination.`,
    related: [['Delegation, handoffs and orchestration', related.orchestration], ['Coordination risks and concurrency safety', '/using-coding-agents/coordination-risks-and-concurrency-safety/']]
  },
  {
    path: 'using-coding-agents/delegation-handoffs-and-orchestration',
    title: 'Delegation, Handoffs and Orchestration',
    area: areas.area3,
    order: 11,
    tags: ['architecture', 'governance'],
    description: 'How orchestrators assign, combine and account for work across agents.',
    body: `Parallel delegation runs independent work simultaneously, such as security review, test-gap analysis and maintainability review. It improves elapsed time when dependencies are low.

Specialised roles help when responsibilities and outputs are clear. An orchestrator decomposes work, assigns tasks, manages dependencies, resolves results and owns the final synthesis.

A handoff transfers task, context, decisions, artifacts and remaining uncertainty. Loose handoffs lose essential information. Shared artifacts are where agents coordinate, but concurrent writes to the same artifact create conflict risk.`,
    related: [['Multi-agent patterns', '/using-coding-agents/multi-agent-patterns/'], ['Trace and provenance', '/using-coding-agents/evaluating-coding-agents/']]
  },
  {
    path: 'using-coding-agents/multi-agent-patterns',
    title: 'Multi-Agent Patterns',
    area: areas.area3,
    order: 12,
    tags: ['architecture', 'practice'],
    description: 'Fan-out/fan-in, pipelines, reviewer patterns and debate patterns.',
    body: `Fan-out/fan-in distributes independent subtasks and later combines their results. It is effective for exploration, review, evaluation and option generation.

Pipelines are sequential: each agent transforms or checks the previous output. Pipelines are useful when roles have real dependencies.

The reviewer pattern has one agent create an artifact and another critique it against explicit criteria. The creator then repairs verified issues. Debate patterns use several agents to propose or challenge alternatives before an adjudicator decides; this may improve coverage but can amplify cost and correlated model bias.`,
    related: [['Delegation, handoffs and orchestration', related.orchestration], ['Evaluation-driven development', related.evals]]
  },
  {
    path: 'using-coding-agents/coordination-risks-and-concurrency-safety',
    title: 'Coordination Risks and Concurrency Safety',
    area: areas.area3,
    order: 13,
    tags: ['risk', 'governance'],
    description: 'Cost, context, communication, conflict and stopping-condition risks in multi-agent work.',
    body: `Coordination overhead includes task decomposition, duplicated context, communication, waiting, merging and conflicts. It can outweigh the benefits of multiple agents.

Context isolation gives each subagent only the context necessary for its role, protecting the primary thread from noisy logs and exploratory dead ends. Concurrency safety prevents conflicting edits or unsafe simultaneous changes. Prefer parallel read-heavy tasks; assign clear file ownership for parallel writing.

Termination and budget policies set limits on agent count, iterations, time, tokens and tool calls. Orchestrated workflows need explicit stopping conditions.`,
    related: [['Multiple agents and subagents', '/using-coding-agents/multiple-agents-and-subagents/'], ['Code quality and version control', '/software-engineering-fundamentals/code-quality-and-version-control/']]
  },
  {
    path: 'using-coding-agents/evaluating-coding-agents',
    title: 'Evaluating Coding Agents',
    area: areas.area3,
    order: 14,
    tags: ['evaluation', 'governance'],
    description: 'Evidence dimensions for judging agent output, process quality, safety and robustness.',
    body: `Evaluate more than whether a task appears completed.

| Dimension | Example evidence |
|---|---|
| Task success | Acceptance tests and user-visible behaviour |
| Engineering quality | Review of architecture, readability and maintainability |
| Process quality | Appropriate exploration, tool use and adherence to instructions |
| Safety | No unauthorised access, secret exposure or unsafe action |
| Efficiency | Time, tokens, tool calls and unnecessary churn |
| Robustness | Success across varied repositories and ambiguous cases |
| Collaboration | Clear handoffs, bounded diffs and useful progress communication |

Trace and provenance record task assignment, actions, results and artifact ownership. They support debugging, audit and workflow evaluation.`,
    related: [['Evals and error analysis', related.evals], ['Governance and human decision boundaries', '/using-coding-agents/governance-and-human-decision-boundaries/']]
  },
  {
    path: 'using-coding-agents/governance-and-human-decision-boundaries',
    title: 'Governance and Human Decision Boundaries',
    area: areas.area3,
    order: 15,
    tags: ['governance', 'risk'],
    description: 'Where humans retain authority over risk, irreversible action and release decisions.',
    body: `Humans should own problem definition, material trade-offs, risk acceptance, irreversible actions and release decisions. Autonomy should be proportional to reversibility, blast radius and quality of verification.

Official OpenAI guidance describes project instructions, skills, MCP and subagents as complementary configuration layers. It also recommends using parallel agents first for read-heavy tasks and taking more care with parallel write-heavy work because of conflicts and coordination overhead.`,
    related: [['Configuration, permissions and sandboxing', '/using-coding-agents/configuration-permissions-and-sandboxing/'], ['Human oversight design', '/shaping-the-build/risk-and-responsible-ai/']]
  },
  {
    path: 'shaping-the-build/problem-framing-and-stakeholder-analysis',
    title: 'Problem Framing and Stakeholder Analysis',
    area: areas.area4,
    order: 2,
    tags: ['foundation', 'governance'],
    description: 'Defining the situation, affected people, desired change and competing interests before selecting an AI solution.',
    body: `Problem framing defines the current situation, affected people, desired change, constraints and evidence. A solution statement disguised as a problem prevents exploration.

Stakeholder analysis identifies users, decision-makers, operators, data subjects and people who bear risks. Their interests and authority are rarely identical.`,
    related: [['Shaping canvas', related.canvas], ['Human oversight and guardrails', '/building-deploying-ai-applications/human-oversight-and-guardrails/']]
  },
  {
    path: 'shaping-the-build/user-and-workflow-research',
    title: 'User and Workflow Research',
    area: areas.area4,
    order: 3,
    tags: ['practice'],
    description: 'Understanding tasks, handoffs, exceptions and user progress before changing a workflow.',
    body: `User and workflow research studies actual tasks, handoffs, exceptions, information needs and workarounds. AI should fit or deliberately reshape a real workflow.

Jobs to be done describe the progress a user seeks rather than starting from a feature. This helps distinguish the underlying need from a preferred implementation.`,
    related: [['Problem framing and stakeholder analysis', '/shaping-the-build/problem-framing-and-stakeholder-analysis/'], ['Accessibility and inclusive design', '/software-engineering-fundamentals/security-privacy-and-accessibility/']]
  },
  {
    path: 'shaping-the-build/ai-suitability',
    title: 'AI Suitability',
    area: areas.area4,
    order: 4,
    tags: ['foundation', 'risk'],
    description: 'Assessing whether AI belongs in the task and whether errors are detectable, tolerable and recoverable.',
    body: `AI suitability asks whether the task benefits from pattern recognition, generation or flexible reasoning and whether errors are detectable, tolerable and recoverable.

The point is not whether AI can produce something plausible. The point is whether probabilistic behaviour can be responsibly embedded in the workflow with the right evidence, controls and human authority.`,
    related: [['Deterministic-probabilistic boundaries', '/shaping-the-build/deterministic-probabilistic-boundaries/'], ['Machine learning', '/building-deploying-ai-applications/machine-learning/']]
  },
  {
    path: 'shaping-the-build/deterministic-probabilistic-boundaries',
    title: 'Deterministic-Probabilistic Boundaries',
    area: areas.area4,
    order: 5,
    tags: ['architecture', 'risk'],
    description: 'Deciding what belongs in rules or conventional code and what can responsibly use a model.',
    body: `The deterministic-probabilistic boundary decides which behaviour belongs in rules or conventional code and which can responsibly use a model.

Legal constraints, calculations, permissions and irreversible side effects often need deterministic enforcement. Model behaviour is most useful where flexible interpretation, language generation or pattern recognition is valuable and mistakes can be detected or recovered.`,
    related: [['Architecture and interfaces', related.architecture], ['Guardrails', '/building-deploying-ai-applications/human-oversight-and-guardrails/']]
  },
  {
    path: 'shaping-the-build/value-feasibility-viability-and-responsibility',
    title: 'Value, Feasibility, Viability and Responsibility',
    area: areas.area4,
    order: 6,
    tags: ['governance'],
    description: 'Four tests for deciding whether a shaped AI intervention deserves further investment.',
    body: `Value, feasibility, viability and responsibility are four complementary tests: does it help users, can it be built, can it be sustained and should it be deployed under the applicable values and risks?

These tests keep teams from over-optimising model performance while ignoring adoption, operational cost, organisational constraints or harm.`,
    related: [['Risk and responsible AI', '/shaping-the-build/risk-and-responsible-ai/'], ['Quality model for AI software', '/cross-cutting-knowledge/quality-model-for-ai-software/']]
  },
  {
    path: 'shaping-the-build/product-hypotheses-and-prototypes',
    title: 'Product Hypotheses and Prototypes',
    area: areas.area4,
    order: 7,
    tags: ['practice'],
    description: 'Testing falsifiable product hypotheses with prototypes and vertical slices.',
    body: `A product hypothesis is a falsifiable statement linking an intervention to an expected user or organisational outcome. It provides a reason to build a test rather than a full product.

A prototype is a low-cost representation used to learn about desirability, usability, feasibility or AI behaviour. A vertical slice is a small end-to-end implementation that crosses interface, logic, model, data and operations. It exposes system risks earlier than isolated component demos.`,
    related: [['Build-measure-learn loop', '/shaping-the-build/outcomes-and-learning-loops/'], ['Minimum learning path', '/building-deploying-ai-applications/']]
  },
  {
    path: 'shaping-the-build/specifications-quality-attributes-and-acceptance-criteria',
    title: 'Specifications, Quality Attributes and Acceptance Criteria',
    area: areas.area4,
    order: 8,
    tags: ['evaluation', 'architecture'],
    description: 'Turning desired behaviour, constraints and quality into verifiable conditions.',
    body: `A specification is a shared description of behaviour, data, constraints, edge cases and quality expectations. For probabilistic systems it includes examples, unacceptable outputs and escalation.

An acceptance criterion is a verifiable condition for completing a feature. Some criteria become deterministic tests; others become eval cases and thresholds.

A quality attribute is a cross-cutting property such as security, privacy, accessibility, reliability, latency, cost or maintainability. Attributes shape architecture and release decisions.`,
    related: [['Testing and testability', related.testing], ['Evals and error analysis', related.evals]]
  },
  {
    path: 'shaping-the-build/risk-and-responsible-ai',
    title: 'Risk and Responsible AI',
    area: areas.area4,
    order: 9,
    tags: ['risk', 'governance'],
    description: 'Assessing hazards and designing accountable AI systems with meaningful human oversight.',
    body: `Risk assessment identifies hazards, likelihood, impact, affected groups, controls, residual risk and accountable owners. Risk should influence autonomy and human oversight.

Responsible AI designs for human agency, fairness, transparency, privacy, safety and accountability across the lifecycle rather than applying an ethics checklist at the end.

Human oversight design specifies what people can see, decide, contest, override and repair. A nominal approval button is not meaningful oversight if the person lacks time or information.`,
    related: [['Human oversight and guardrails', '/building-deploying-ai-applications/human-oversight-and-guardrails/'], ['Security, privacy and accessibility', '/software-engineering-fundamentals/security-privacy-and-accessibility/']]
  },
  {
    path: 'shaping-the-build/outcomes-and-learning-loops',
    title: 'Outcomes and Learning Loops',
    area: areas.area4,
    order: 10,
    tags: ['evaluation', 'practice'],
    description: 'Outcome metrics, guardrail metrics, build-measure-learn loops and decision records.',
    body: `An outcome metric measures beneficial change in user or organisational reality. It differs from an output metric such as number of generated answers.

A leading metric gives an early signal of progress; a guardrail metric detects unacceptable side effects such as error, exclusion, cost or workload transfer.

The build-measure-learn loop delivers the smallest useful experiment, collects evidence and uses it to adapt the problem, solution or quality bar. Decision records preserve product and technical judgement for humans and agents.`,
    related: [['Evals as the spine', '/cross-cutting-knowledge/evals-as-the-spine/'], ['Shaping canvas', related.canvas]]
  }
];

const overviewPages = [
  {
    path: 'building-deploying-ai-applications/index',
    title: areas.area1,
    area: areas.area1,
    order: 1,
    tags: ['foundation', 'architecture', 'evaluation'],
    description: 'Overview of AI application engineering from model capability to reliable production systems.',
    keyMovement: 'model capability -> relevant context -> controlled action -> measured behaviour -> reliable production system',
    story: `An AI application is not simply an ordinary application with a model attached. Part of its behaviour is probabilistic: the same type of input can produce different outputs, and plausible output can still be wrong. The AI engineer therefore creates reliability around an inherently imperfect component.

The story starts with understanding the model family. Classical machine learning learns mappings from data; deep learning learns representations with neural networks; LLMs generate language and other modalities token by token. A useful application then supplies the model with the right context, grounds it in trusted data, gives it tools where necessary and arranges model calls into a workflow. Evals guide every iteration. Production engineering adds security, observability, cost control, latency management and feedback loops.`,
    directory: 'building-deploying-ai-applications'
  },
  {
    path: 'software-engineering-fundamentals/index',
    title: areas.area2,
    area: areas.area2,
    order: 1,
    tags: ['foundation', 'architecture', 'practice'],
    description: 'Overview of the software fundamentals that make AI systems understandable, testable and operable.',
    keyMovement: 'working code -> engineered system -> verifiable quality -> sustainable operation',
    story: `AI changes how software is produced, but it does not suspend the properties good software must have. Systems still need comprehensible requirements, coherent architecture, correct data, maintainable code, secure interfaces, repeatable deployments and operational accountability. Rapid code generation increases the rate at which poor decisions can enter a codebase.

Software fundamentals provide the constraints and verification mechanisms within which models and coding agents can contribute safely. They let an engineer recognise when generated code is locally plausible but systemically wrong. The goal is not merely to make the code run; it is to create a system that can be understood, changed, tested, operated and trusted over time.`,
    directory: 'software-engineering-fundamentals'
  },
  {
    path: 'using-coding-agents/index',
    title: areas.area3,
    area: areas.area3,
    order: 1,
    tags: ['foundation', 'practice', 'governance'],
    description: 'Overview of coding agents, their working environment, multi-agent orchestration and evidence-based completion.',
    keyMovement: 'prompting an assistant -> directing an agent -> engineering its environment -> orchestrating verified work',
    story: `A coding assistant proposes code in response to a local request. A coding agent can pursue a goal through multiple steps: inspect a repository, search files, form a plan, edit code, run commands, observe test results and revise its work. Its practical competence comes from the combination of model, harness, tools, context, permissions and feedback.

The human role shifts from writing every line to shaping the agent's working environment and controlling the engineering loop. High-quality agent work begins with a bounded task, relevant context, clear constraints and verifiable completion criteria. The engineer then reviews evidence, not merely fluent explanations or a large diff.

Multiple agents add another level. Independent tasks can be delegated in parallel, or specialised roles can be coordinated in a workflow. This can reduce context pollution and elapsed time, but it adds token cost, communication loss, edit conflicts and orchestration overhead. Multi-agent design is therefore an engineering choice, not a maturity badge.`,
    directory: 'using-coding-agents'
  },
  {
    path: 'shaping-the-build/index',
    title: areas.area4,
    area: areas.area4,
    order: 1,
    tags: ['foundation', 'governance', 'evaluation'],
    description: 'Overview of shaping valuable, feasible, responsible and testable AI interventions.',
    keyMovement: 'interesting technology -> meaningful problem -> shaped intervention -> demonstrable outcome',
    story: `When implementation becomes faster, choosing and defining the right build becomes the scarce skill. Shaping the build means turning an ambiguous situation into a valuable, feasible, responsible and testable intervention. It includes deciding whether AI belongs in the solution at all, which part of a workflow it should support, what remains deterministic and where humans retain authority.

The engineer studies users, work practices, domain rules, organisational constraints and potential harms. Alternatives are expressed as small testable slices. Quality is translated into acceptance criteria and evals before large-scale implementation begins. Success is measured in outcomes, not in model impressiveness or quantity of generated code.`,
    directory: 'shaping-the-build'
  }
];

function frontmatter(page) {
  return `---\ntitle: ${JSON.stringify(page.title)}\ndescription: ${JSON.stringify(page.description)}\narea: ${JSON.stringify(page.area)}\norder: ${page.order}\ntags: ${JSON.stringify(page.tags)}\nlastReviewed: ${JSON.stringify(reviewed)}\nsidebar:\n  order: ${page.order}\n---\n\n`;
}

function writeDoc(path, content) {
  const file = join(root, `${path}.mdx`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function conceptList(directory) {
  return conceptPages.filter((page) => page.path.startsWith(`${directory}/`));
}

function gridImport() {
  return `import ConceptGrid from '@components/ConceptGrid.astro';\nimport KeyIdea from '@components/KeyIdea.astro';\nimport RelatedConcepts from '@components/RelatedConcepts.astro';\n\n`;
}

rmSync(root, { recursive: true, force: true });

writeDoc('index', `${frontmatter({
  title: 'Build AI systems that are useful, reliable and responsible',
  description: 'A modern learning and reference site for AI Engineering, organised around four mutually reinforcing skill areas.',
  area: 'Home',
  order: 0,
  tags: ['foundation', 'overview']
})}import FourAreaMap from '@components/FourAreaMap.astro';
import LearningPath from '@components/LearningPath.astro';
import SourceNote from '@components/SourceNote.astro';

<section class="kb-hero">
  <div class="kb-hero__content">
    <p class="eyebrow">AI Engineering Knowledge Base</p>
    <h1>Build AI systems that are useful, reliable and responsible</h1>
    <p class="lede">AI Engineering is the discipline of designing, building, evaluating, deploying and improving software systems in which AI models perform part of the system's work.</p>
    <div class="hero-actions">
      <a class="button-primary" href="/start-here/what-is-ai-engineering/">Start with the foundations</a>
      <a class="button-secondary" href="/using-coding-agents/">Explore coding agents</a>
    </div>
  </div>
  <div class="kb-hero__diagram" aria-hidden="true">
    <span></span><span></span><span></span><span></span>
  </div>
</section>

<FourAreaMap />

<aside class="evals-callout">
  <p class="eyebrow">Evals connect everything</p>
  <h2>Evals turn intent into evidence.</h2>
  <p>Shaping defines desirable behaviour, AI application engineering converts it into datasets and graders, software engineering automates the checks, and coding agents use the same evidence to improve work.</p>
</aside>

<div class="path-grid">
  <LearningPath title="Foundation path" prior="General programming familiarity." outcome="Understand the four-area map and the baseline concepts needed for AI Engineering study." steps={[
    { label: 'What is AI Engineering?', href: '/start-here/what-is-ai-engineering/' },
    { label: 'The four-area skills map', href: '/start-here/the-four-area-skills-map/' },
    { label: 'Machine learning', href: '/building-deploying-ai-applications/machine-learning/' },
    { label: 'Requirements and design', href: '/software-engineering-fundamentals/requirements-and-design/' },
    { label: 'AI suitability', href: '/shaping-the-build/ai-suitability/' }
  ]} />
  <LearningPath title="Builder path" prior="Software engineering experience and basic AI literacy." outcome="Design, evaluate and operate grounded AI application workflows." steps={[
    { label: 'Foundation models and LLMs', href: '/building-deploying-ai-applications/foundation-models-and-llms/' },
    { label: 'Context engineering', href: '/building-deploying-ai-applications/context-engineering/' },
    { label: 'Grounding and RAG', href: '/building-deploying-ai-applications/grounding-and-rag/' },
    { label: 'Tool calling and MCP', href: '/building-deploying-ai-applications/tool-calling-and-mcp/' },
    { label: 'Evals and error analysis', href: '/building-deploying-ai-applications/evals-and-error-analysis/' }
  ]} />
  <LearningPath title="Agentic development path" prior="Comfort with repositories, tests and code review." outcome="Use coding agents deliberately, safely and with evidence-based completion." steps={[
    { label: 'Coding assistants versus coding agents', href: '/using-coding-agents/coding-assistants-versus-coding-agents/' },
    { label: 'The agent loop', href: '/using-coding-agents/the-agent-loop/' },
    { label: 'Configuration and permissions', href: '/using-coding-agents/configuration-permissions-and-sandboxing/' },
    { label: 'The ten-step working method', href: '/using-coding-agents/the-ten-step-working-method/' },
    { label: 'Multi-agent orchestration', href: '/using-coding-agents/delegation-handoffs-and-orchestration/' }
  ]} />
</div>

<SourceNote>
The four top-level areas follow Andrew Ng's AI Engineering Skills Map. Ng has elaborated Area 1 in more detail; the detailed structures for Areas 2-4 are a reasoned extension for this knowledge base, not a claim of direct attribution or endorsement.
</SourceNote>
`);

for (const page of overviewPages) {
  const concepts = conceptList(page.directory).map((concept) => ({
    title: concept.title,
    href: `/${concept.path}/`,
    description: concept.description,
    tags: concept.tags
  }));
  writeDoc(page.path, `${frontmatter(page)}${gridImport()}<KeyIdea>
<strong>Key movement:</strong> ${page.keyMovement}
</KeyIdea>

## Conceptual Story

${page.story}

## Concepts in This Area

<ConceptGrid concepts={${JSON.stringify(concepts)}} />
`);
}

for (const page of conceptPages) {
  const links = page.related.map(([label, href]) => ({ label, href }));
  writeDoc(page.path, `${frontmatter(page)}import Definition from '@components/Definition.astro';
import EvaluationCheck from '@components/EvaluationCheck.astro';
import FailureMode from '@components/FailureMode.astro';
import RelatedConcepts from '@components/RelatedConcepts.astro';
import SourceNote from '@components/SourceNote.astro';

<Definition term={${JSON.stringify(page.title)}}>
${page.description}
</Definition>

## Why It Matters

${page.body}

<FailureMode>
The recurring risk is treating this concept as a label rather than an engineering decision with trade-offs, evidence needs and operational consequences.
</FailureMode>

<EvaluationCheck>
Ask what observable evidence would show that this concept has been applied well in a real system, repository or learning exercise.
</EvaluationCheck>

<RelatedConcepts links={${JSON.stringify(links)}} />

<SourceNote>
Imported and adapted from <code>AI-Engineering-Knowledge-Base-Foundation.md</code>. Detailed Area 2-4 structures are a reasoned extension of Andrew Ng's four top-level areas.
</SourceNote>
`);
}

const startPages = [
  ['start-here/what-is-ai-engineering', 'What is AI Engineering?', 1, 'AI Engineering is the discipline of designing, building, evaluating, deploying and improving software systems in which AI models perform part of the system work.', `AI Engineering combines AI knowledge, software engineering, effective use of coding agents and the judgement required to decide what should be built.

The field is not only model prompting. It includes shaping the user problem, building model-backed application behaviour, engineering reliable software around probabilistic components, and using coding agents without giving up human responsibility for quality and risk.`],
  ['start-here/the-four-area-skills-map', 'The Four-Area Skills Map', 2, 'The four mutually reinforcing areas that organise this knowledge base.', `The four areas are:

1. Building and deploying AI applications
2. Software engineering fundamentals
3. Using coding agents
4. Shaping the build

Ng presents these areas as mutually reinforcing. AI applications contain probabilistic components, so reliable engineering requires strong software foundations, disciplined evaluation and iterative improvement. Coding agents accelerate implementation, but make specification, architecture, verification and human judgement more important. Shaping the build connects engineering activity to genuine user and organisational value.

The detailed structures for Areas 2-4 in this site are a practical curriculum and knowledge architecture, not a claim that Ng specified each concept.`],
  ['start-here/how-to-use-this-knowledge-base', 'How to Use This Knowledge Base', 3, 'Use the site for sequential learning, quick reference and cross-area reasoning.', `Read an area overview first when learning a topic from scratch. Use concept pages for quick reference. Follow related-concept links when a decision crosses boundaries between product shaping, AI behaviour, software quality and agent-assisted implementation.

Each concept page follows a compact template: definition, why it matters, risks, evaluation check, related concepts and source note. Short concepts stay concise rather than being padded with generic prose.`],
  ['start-here/suggested-learning-paths', 'Suggested Learning Paths', 4, 'Three ordered paths for students, builders and agentic development practice.', `The three learning paths are also shown on the homepage.

## Foundation Path

Expected prior knowledge: general programming familiarity.

Outcome: understand the four-area map and the baseline concepts needed for AI Engineering study.

1. What is AI Engineering?
2. The four-area skills map
3. Machine learning
4. Requirements and design
5. AI suitability

## Builder Path

Expected prior knowledge: software engineering experience and basic AI literacy.

Outcome: design, evaluate and operate grounded AI application workflows.

1. Foundation models and LLMs
2. Context engineering
3. Grounding and RAG
4. Tool calling and MCP
5. Evals and error analysis

## Agentic Development Path

Expected prior knowledge: comfort with repositories, tests and code review.

Outcome: use coding agents deliberately, safely and with evidence-based completion.

1. Coding assistants versus coding agents
2. The agent loop
3. Configuration, permissions and sandboxing
4. The ten-step working method
5. Multi-agent orchestration`]
];

for (const [path, title, order, description, body] of startPages) {
  writeDoc(path, `${frontmatter({ title, description, area: areas.start, order, tags: ['foundation'], lastReviewed: reviewed })}import SourceNote from '@components/SourceNote.astro';
import FourAreaMap from '@components/FourAreaMap.astro';

${body}

${path.endsWith('the-four-area-skills-map') ? '<FourAreaMap />' : ''}

<SourceNote>
The four top-level areas follow Andrew Ng's AI Engineering Skills Map. Area 1 has been elaborated by Ng; detailed Areas 2-4 structures are this knowledge base's reasoned extension.
</SourceNote>
`);
}

writeDoc('shaping-the-build/shaping-canvas', `${frontmatter({
  title: 'Shaping Canvas',
  description: 'A worksheet for turning an AI idea into a valuable, feasible, responsible and testable build.',
  area: areas.area4,
  order: 11,
  tags: ['practice', 'worksheet', 'governance'],
  lastReviewed: reviewed
})}## Before Implementation

Answer these questions before committing to a full build.

<div class="canvas-grid">
${[
  ['Whose situation should improve?', 'Stakeholder and user description'],
  ['What happens today?', 'Current workflow and pain points'],
  ['What outcome matters?', 'Product hypothesis and outcome metric'],
  ['Why might AI help?', 'AI-suitability argument'],
  ['Where should AI not decide?', 'Deterministic boundaries and human authority'],
  ['What data and context are required?', 'Data, grounding and provenance design'],
  ['What can go wrong?', 'Failure modes and risk controls'],
  ['What does good look like?', 'Acceptance criteria and eval design'],
  ['What is the smallest end-to-end test?', 'Prototype or vertical slice'],
  ['What evidence permits release?', 'Quality thresholds and accountable decision owner']
].map(([q, a]) => `<section><h2>${q}</h2><p>${a}</p></section>`).join('\n')}
</div>
`);

writeDoc('cross-cutting-knowledge/evals-as-the-spine', `${frontmatter({
  title: 'Evals as the Spine',
  description: 'How evals connect shaping, AI application engineering, software engineering and coding-agent work.',
  area: areas.cross,
  order: 1,
  tags: ['evaluation', 'foundation'],
  lastReviewed: reviewed
})}Evals connect intent to evidence:

1. **Shaping** defines desirable and unacceptable behaviour.
2. **AI application engineering** converts this into datasets, graders and traces.
3. **Software engineering** automates the checks in release and monitoring workflows.
4. **Coding agents** use the same checks to implement, verify and improve work.

<aside class="evals-callout">
  <p class="eyebrow">Educational principle</p>
  <h2>Do not only teach how to generate an output.</h2>
  <p>Teach how to specify, inspect and improve its quality.</p>
</aside>
`);

writeDoc('cross-cutting-knowledge/quality-model-for-ai-software', `${frontmatter({
  title: 'Quality Model for AI Software',
  description: 'A four-layer definition of done for AI software.',
  area: areas.cross,
  order: 2,
  tags: ['evaluation', 'governance'],
  lastReviewed: reviewed
})}A useful definition of done spans four layers:

| Layer | Central question |
|---|---|
| Deterministic correctness | Do the code, data flows and interfaces behave as specified? |
| Probabilistic quality | Does the AI behave well enough across representative cases? |
| Operational quality | Is the system secure, observable, performant, affordable and recoverable? |
| Human and societal quality | Does it support users, values, rights and accountable decision-making? |
`);

writeDoc('cross-cutting-knowledge/patterns', `${frontmatter({
  title: 'Patterns',
  description: 'Reusable cross-area patterns for practical AI Engineering.',
  area: areas.cross,
  order: 3,
  tags: ['architecture', 'practice'],
  lastReviewed: reviewed
})}## Cross-Area Relationship Map

<div class="relationship-map">
${[
  ['RAG assistant', 'Retrieval and grounding', 'Data pipelines, APIs, security', 'Agent implements and tests pipeline', 'Define whose decision the answer supports'],
  ['Coding agent', 'Model, tools and harness', 'Repository quality and tests', 'Instructions, permissions, orchestration', 'Select appropriate tasks and autonomy'],
  ['Evals', 'Behavioural datasets and graders', 'CI, regression and observability', 'Verify agent outputs and process', 'Encode desired outcome and risk tolerance'],
  ['MCP tool', 'Model-accessible capability', 'Contract and security design', 'Agent configuration and permissions', 'Justify access and human authority'],
  ['Production release', 'Model monitoring and fallbacks', 'CI/CD, reliability and rollback', 'Agent-assisted delivery with review', 'Evidence, risk acceptance and outcome metrics']
].map(([topic, a1, a2, a3, a4]) => `<section><h2>${topic}</h2><dl><dt>Area 1</dt><dd>${a1}</dd><dt>Area 2</dt><dd>${a2}</dd><dt>Area 3</dt><dd>${a3}</dd><dt>Area 4</dt><dd>${a4}</dd></dl></section>`).join('\n')}
</div>
`);

writeDoc('cross-cutting-knowledge/anti-patterns', `${frontmatter({
  title: 'Anti-Patterns',
  description: 'Common failures that cut across AI application, software, agent and shaping work.',
  area: areas.cross,
  order: 4,
  tags: ['risk', 'governance'],
  lastReviewed: reviewed
})}## Common Anti-Patterns

- Treating an AI model as the whole product instead of one system component.
- Measuring aggregate model quality without qualitative error analysis.
- Letting agent-generated code bypass architecture, tests or human review.
- Adding MCP tools or write permissions without clear contracts and trust boundaries.
- Starting from an impressive AI feature rather than a shaped user problem.
- Using human approval as a symbolic control when reviewers lack time, authority or information.
`);

const glossaryTerms = [
  ...conceptPages.map((page) => [page.title, page.description]),
  ['AI Engineering', 'Designing, building, evaluating, deploying and improving software systems in which AI models perform part of the system work.'],
  ['Evidence-based completion', 'Declaring success based on concrete evidence such as passing checks, inspected diffs or rendered behaviour.']
].sort((a, b) => a[0].localeCompare(b[0]));

writeDoc('cross-cutting-knowledge/glossary', `${frontmatter({
  title: 'Glossary',
  description: 'Anchorable definitions for the knowledge base vocabulary.',
  area: areas.cross,
  order: 5,
  tags: ['reference'],
  lastReviewed: reviewed
})}${glossaryTerms.map(([term, def]) => `## ${term}\n\n${def}`).join('\n\n')}
`);

writeDoc('cross-cutting-knowledge/sources', `${frontmatter({
  title: 'Sources',
  description: 'Source links and maintenance note for the AI Engineering Knowledge Base.',
  area: areas.cross,
  order: 6,
  tags: ['reference', 'governance'],
  lastReviewed: reviewed
})}## Initial Sources

- Andrew Ng, [The AI Engineering Skills Map](https://www.deeplearning.ai/the-batch/the-ai-engineering-skills-map/) (2026).
- Andrew Ng, [Writing overview and detailed follow-up on building and deploying AI applications](https://www.andrewng.org/writing) (2026).
- Andrew Ng, [AI Engineering Skills Map: Building and Deploying AI Applications](https://www.linkedin.com/pulse/ai-engineering-skills-map-building-deploying-applications-andrew-ng-gyn5e) (2026).
- OpenAI, [Codex best practices](https://learn.chatgpt.com/guides/best-practices).
- OpenAI, [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- OpenAI, [Customization: project guidance, skills, MCP and subagents](https://learn.chatgpt.com/docs/customization/overview).
- OpenAI, [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents).
- OpenAI, [Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference).
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices).

## Source Maintenance Note

The field changes rapidly. Tool-specific configuration and product behaviour should be dated and periodically verified against primary documentation. The conceptual distinction between problem shaping, AI application behaviour, software quality and agent-assisted implementation is intended to remain more durable.
`);

