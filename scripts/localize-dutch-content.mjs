import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'src/content/docs/nl';

const areas = new Map([
  ['Home', 'Home'],
  ['Start here', 'Begin hier'],
  ['Building and deploying AI applications', 'AI-applicaties bouwen en uitrollen'],
  ['Software engineering fundamentals', 'Basisprincipes van software engineering'],
  ['Using coding agents', 'Coding agents gebruiken'],
  ['Shaping the build', 'De bouwopgave vormgeven'],
  ['Cross-cutting knowledge', 'Overkoepelende kennis']
]);

const titles = new Map([
  ['Agentic Workflows and Harnesses', 'Agentic workflows en harnesses'],
  ['Context Engineering', 'Context engineering'],
  ['Deep Learning', 'Deep learning'],
  ['Embeddings, Vector Search, Graphs and Semantic Layers', 'Embeddings, vector search, graphs en semantic layers'],
  ['Evals and Error Analysis', 'Evals en foutanalyse'],
  ['Foundation Models and LLMs', 'Foundation models en LLMs'],
  ['Grounding and RAG', 'Grounding en RAG'],
  ['Human Oversight and Guardrails', 'Menselijk toezicht en guardrails'],
  ['Building and deploying AI applications', 'AI-applicaties bouwen en uitrollen'],
  ['Machine Learning', 'Machine learning'],
  ['Production Operations, Observability, Cost and Latency', 'Productie-operations, observability, kosten en latency'],
  ['Prompt Engineering', 'Prompt engineering'],
  ['Tool Calling and MCP', 'Tool calling en MCP'],
  ['Anti-Patterns', 'Anti-patterns'],
  ['Evals as the Spine', 'Evals als ruggengraat'],
  ['Glossary', 'Glossarium'],
  ['Patterns', 'Patterns'],
  ['Quality Model for AI Software', 'Kwaliteitsmodel voor AI-software'],
  ['Sources', 'Bronnen'],
  ['AI Suitability', 'AI-geschiktheid'],
  ['Deterministic-Probabilistic Boundaries', 'Deterministische-probabilistische grenzen'],
  ['Shaping the build', 'De bouwopgave vormgeven'],
  ['Outcomes and Learning Loops', 'Uitkomsten en leerlussen'],
  ['Problem Framing and Stakeholder Analysis', 'Probleemkadering en stakeholderanalyse'],
  ['Product Hypotheses and Prototypes', 'Producthypotheses en prototypes'],
  ['Risk and Responsible AI', 'Risico en verantwoorde AI'],
  ['Shaping Canvas', 'Shaping canvas'],
  ['Specifications, Quality Attributes and Acceptance Criteria', 'Specificaties, kwaliteitsattributen en acceptatiecriteria'],
  ['User and Workflow Research', 'Gebruikers- en workflowonderzoek'],
  ['Value, Feasibility, Viability and Responsibility', 'Waarde, haalbaarheid, levensvatbaarheid en verantwoordelijkheid'],
  ['Architecture and Interfaces', 'Architectuur en interfaces'],
  ['Code Quality and Version Control', 'Codekwaliteit en versiebeheer'],
  ['Data Modelling and Data Engineering', 'Datamodellering en data engineering'],
  ['DevOps, Deployment and Observability', 'DevOps, deployment en observability'],
  ['Software engineering fundamentals', 'Basisprincipes van software engineering'],
  ['Requirements and Design', 'Requirements en ontwerp'],
  ['Security, Privacy and Accessibility', 'Security, privacy en toegankelijkheid'],
  ['Technical Debt, Documentation and Teamwork', 'Technical debt, documentatie en teamwork'],
  ['Testing and Testability', 'Testen en testbaarheid'],
  ['AI Engineering: Two Directions', 'AI Engineering: twee richtingen'],
  ['How to Use This Knowledge Base', 'Deze kennisbank gebruiken'],
  ['Suggested Learning Paths', 'Aanbevolen leerpaden'],
  ['The AI Engineer', 'De AI engineer'],
  ['The Four-Area Skills Map', 'De viergebiedenkaart'],
  ['What is AI Engineering?', 'Wat is AI Engineering?'],
  ['Coding Agent Tool Profiles', 'Toolprofielen voor coding agents'],
  ['Coding Assistants Versus Coding Agents', 'Coding assistants versus coding agents'],
  ['Configuration, Permissions and Sandboxing', 'Configuratie, permissies en sandboxing'],
  ['Context, Instructions and Planning', 'Context, instructies en planning'],
  ['Coordination Risks and Concurrency Safety', 'Coordinatierisico’s en concurrency safety'],
  ['Delegation, Handoffs and Orchestration', 'Delegatie, handoffs en orchestratie'],
  ['Evaluating Coding Agents', 'Coding agents evalueren'],
  ['Governance and Human Decision Boundaries', 'Governance en menselijke beslisgrenzen'],
  ['Using coding agents', 'Coding agents gebruiken'],
  ['Model, Harness, Tools and Workspace', 'Model, harness, tools en workspace'],
  ['Multi-Agent Patterns', 'Multi-agent-patterns'],
  ['Multiple Agents and Subagents', 'Meerdere agents en subagents'],
  ['Principles for Effective Use', 'Principes voor effectief gebruik'],
  ['Task Briefs and Examples', 'Taakbriefs en voorbeelden'],
  ['The Agent Loop', 'De agent loop'],
  ['The Ten-Step Working Method', 'De tien-stappen-werkwijze']
]);

const headingReplacements = [
  [/## Why It Matters/g, '## Waarom dit ertoe doet'],
  [/## Related Concepts/g, '## Gerelateerde concepten'],
  [/## Key Ideas/g, '## Kernideeen'],
  [/## Failure Modes/g, '## Faalwijzen'],
  [/## Further Study/g, '## Verder studeren'],
  [/## Mapping to the Knowledge Base/g, '## Mapping naar de kennisbank']
];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    if (statSync(file).isDirectory()) {
      walk(file);
      continue;
    }
    if (file.endsWith('.md') || file.endsWith('.mdx')) localize(file);
  }
}

function replaceFrontmatterValue(content, key, values) {
  return content.replace(new RegExp(`^${key}: "([^"]+)"$`, 'm'), (line, value) => {
    const replacement = values.get(value);
    return replacement ? `${key}: "${replacement}"` : line;
  });
}

function localize(file) {
  let content = readFileSync(file, 'utf8');
  content = content.replace(/(?:\.\.\/)+assets\//g, '../../../../assets/');
  content = content.replace(/href="\/(?!nl\/|\/)/g, 'href="/nl/');
  content = content.replace(/\]\(\/(?!nl\/|\/)/g, '](/nl/');
  content = replaceFrontmatterValue(content, 'title', titles);
  content = replaceFrontmatterValue(content, 'area', areas);
  content = content.replace(/<Definition term=\{"([^"]+)"\}>/g, (match, term) => {
    const replacement = titles.get(term);
    return replacement ? `<Definition term={"${replacement}"}>` : match;
  });
  for (const [pattern, replacement] of headingReplacements) {
    content = content.replace(pattern, replacement);
  }
  writeFileSync(file, content);
  console.log(relative('.', file));
}

walk(root);
