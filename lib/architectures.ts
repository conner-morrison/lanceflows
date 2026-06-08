// Per-case "finally implemented architecture" graphs, rendered by case-detail.html.
// Each diagram is hand-authored from the case's solution, key implementations,
// and tech stack so it reflects that specific system.
//
//   node = [id, label, icon, color, col, row]      (col/row place it on a grid; decimals allowed)
//   edge = [from, to, label?, 'dash'?]             (arrow from→to, optional mid-label, optional dashed)
const _C = {
  web:   '#2563ff', // client / presentation
  app:   '#7c3aed', // application / API
  ai:    '#0d9488', // AI / intelligence
  data:  '#1f9d57', // data / storage
  flow:  '#e8821e', // cache / stream / events
  infra: '#5b6b8c', // edge / cloud / infrastructure
  sec:   '#c0455f', // security / alerting
  ext:   '#334155'  // external / third-party system
};

const CASE_ARCH = {
  'medplum-fhir': {
    nodes: [
      ['portal', 'Patient Portal',       '📱', _C.web,   0, 1.0],
      ['dash',   'Clinician Dashboard',  '🖥️', _C.web,   0, 2.4],
      ['oauth',  'SMART OAuth2 PKCE',    '🔐', _C.sec,   1, 0.0],
      ['api',    'Medplum FHIR Server',  '🏥', _C.app,   1, 1.7],
      ['bot',    'Medplum Bot (LLM)',    '🤖', _C.ai,    2, 0.4],
      ['hl7',    'HL7v2 → FHIR Bot',     '🔁', _C.ai,    2, 3.1],
      ['db',     'RDS Aurora Postgres',  '🗄️', _C.data,  3, 1.7],
      ['ecs',    'AWS CDK / ECS Fargate','☁️', _C.infra, 3, 0.2]
    ],
    edges: [
      ['portal','api'], ['dash','api'], ['oauth','api','consent'],
      ['api','db'], ['bot','api','notes'], ['hl7','api','sync'],
      ['ecs','api','deploy','dash']
    ]
  },

  'hyperswitch-payments': {
    nodes: [
      ['web',    'Storefront Checkout',  '🖥️', _C.web,  0, 0.8],
      ['sdk',    'Hyperswitch Web SDK',  '🧩', _C.web,  0, 2.4],
      ['router', 'Rust Payments Router', '⚙️', _C.app,  1, 1.5],
      ['route',  'Success-Based Routing','🧭', _C.ai,   2, 0.4],
      ['vault',  'Hyperswitch Vault',    '🔐', _C.sec,  2, 3.0],
      ['proc',   '3 Processors',         '💳', _C.ext,  3, 0.6],
      ['db',     'PostgreSQL + Redis',   '🗄️', _C.data, 2, 1.8],
      ['cf',     'AWS CloudFormation',   '☁️', _C.infra,1, 3.1]
    ],
    edges: [
      ['web','router'], ['sdk','router'], ['vault','router','tokens'],
      ['router','route'], ['route','proc','route'], ['router','db'],
      ['cf','router','deploy','dash']
    ]
  },

  'fleetbase-logistics': {
    nodes: [
      ['ops',    'Ops Console (Ember)',  '🖥️', _C.web,  0, 0.8],
      ['driver', 'Navigator App (fork)', '📱', _C.web,  0, 2.2],
      ['iot',    'GPS / Temp Sensors',   '📡', _C.flow, 0, 3.6],
      ['ws',     'WebSocket Gateway',    '🔌', _C.app,  1, 0.0],
      ['api',    'Laravel Extension',    '⚙️', _C.app,  1, 2.2],
      ['redis',  'Redis Live State',     '⚡', _C.flow, 2, 0.9],
      ['db',     'PostgreSQL',           '🗄️', _C.data, 2, 2.4],
      ['alert',  'Cold-Chain Alerts',    '🚨', _C.sec,  3, 1.5]
    ],
    edges: [
      ['ops','api'], ['driver','api'], ['iot','api','telemetry'],
      ['api','redis'], ['api','db'], ['api','ws'],
      ['ws','ops','live'], ['redis','alert'], ['alert','ops','SMS']
    ]
  },

  'rentcast-proptech': {
    nodes: [
      ['slack',  'Slack Slash Command',  '💬', _C.web,  0, 1.0],
      ['svc',    'Node Integration Svc', '⚙️', _C.app,  1, 1.6],
      ['geo',    'Geocoder',             '📍', _C.app,  1, 3.1],
      ['rc',     'RentCast AVM API',     '🏘️', _C.ext,  2, 0.4],
      ['claude', 'Claude Deal Memo',     '🧠', _C.ai,   2, 2.0],
      ['cache',  'Postgres Quota Cache', '🗄️', _C.data, 3, 0.7],
      ['notion', 'Notion Export',        '📝', _C.ext,  3, 2.4]
    ],
    edges: [
      ['slack','svc'], ['geo','svc','address'], ['svc','rc','comps'],
      ['rc','cache'], ['svc','claude'], ['claude','notion','memo']
    ]
  },

  'duffel-travel': {
    nodes: [
      ['web',  'Booking UI',          '🖥️', _C.web,   0, 0.8],
      ['llm',  'LLM Concierge',       '🧠', _C.ai,    0, 2.4],
      ['svc',  'Node Booking Adapter','⚙️', _C.app,   1, 1.6],
      ['duffel','Duffel API',         '✈️', _C.ext,   2, 0.6],
      ['air',  '300+ Airlines / NDC', '🛫', _C.ext,   3, 0.6],
      ['redis','Redis Offer Cache',   '⚡', _C.flow,  2, 2.6],
      ['db',   'Bookings DB',         '🗄️', _C.data,  3, 2.2]
    ],
    edges: [
      ['web','svc'], ['llm','svc','intent'], ['svc','duffel','offers'],
      ['duffel','air'], ['svc','redis','cache'], ['svc','db','orders']
    ]
  },

  'covergenius-insurtech': {
    nodes: [
      ['cart',  'Checkout / Cart',      '🛒', _C.web,   0, 1.0],
      ['svc',   'Node Booking Service', '⚙️', _C.app,   1, 1.6],
      ['hmac',  'HMAC-SHA256 Signer',   '🔏', _C.sec,   1, 3.1],
      ['offers','XCover Offers API',    '🛡️', _C.ext,   2, 0.5],
      ['ai',    'BrightWrite NLP',      '🧠', _C.ai,    3, 0.5],
      ['db',    'Policies DB',          '🗄️', _C.data,  2, 2.2],
      ['claim', 'XClaim Payout API',    '💸', _C.ext,   3, 2.4]
    ],
    edges: [
      ['cart','svc'], ['hmac','svc','sign'], ['svc','offers','offer'],
      ['offers','ai','classify'], ['svc','db','policy'], ['svc','claim','claims']
    ]
  },

  'langchain-clinical': {
    nodes: [
      ['app',   'Scribe App',          '🖥️', _C.web,  0, 1.0],
      ['graph', 'LangGraph State Machine','🕸️', _C.ai, 1, 1.6],
      ['vec',   'Vector Store (Qdrant)','📐', _C.data, 2, 0.3],
      ['appr',  'Human Approval Gate',  '✋', _C.sec,  2, 1.9],
      ['ls',    'LangSmith Audit',      '🔎', _C.infra,1, 3.1],
      ['fhir',  'FHIR DocumentReference','🏥', _C.ext, 3, 1.9]
    ],
    edges: [
      ['app','graph'], ['graph','vec','retrieve'], ['graph','appr','interrupt'],
      ['appr','fhir','write'], ['graph','ls','trace']
    ]
  },

  'documenso-legal': {
    nodes: [
      ['web',   'Signing UI (Next.js)', '🖥️', _C.web,  0, 1.0],
      ['pdf',   'Uploaded Contracts',   '📄', _C.ext,  0, 3.0],
      ['trpc',  'tRPC / Documenso',     '⚙️', _C.app,  1, 1.6],
      ['ai',    'Textract + Claude',    '🧠', _C.ai,   1, 3.1],
      ['cert',  'PAdES Signing Cert',   '🔐', _C.sec,  2, 0.5],
      ['db',    'PostgreSQL (Prisma)',  '🗄️', _C.data, 2, 2.2],
      ['tms',   'Transaction System',   '🏢', _C.ext,  3, 1.4]
    ],
    edges: [
      ['web','trpc'], ['pdf','ai','detect'], ['ai','trpc','fields'],
      ['cert','trpc','sign'], ['trpc','db'], ['trpc','tms','signed']
    ]
  },

  'lago-billing': {
    nodes: [
      ['portal','Usage Dashboard',     '🖥️', _C.web,  0, 0.8],
      ['gw',    'LLM Gateway Events',   '📈', _C.flow, 0, 2.6],
      ['rails', 'Lago Billing (Rails)', '⚙️', _C.app,  1, 1.4],
      ['stream','Redpanda Stream',      '🔀', _C.flow, 2, 0.3],
      ['rate',  'Graduated Rating',     '🧮', _C.app,  2, 2.0],
      ['db',    'PostgreSQL Invoices',  '🗄️', _C.data, 3, 0.6],
      ['stripe','Stripe Collection',    '💳', _C.ext,  3, 2.2]
    ],
    edges: [
      ['portal','rails'], ['gw','stream','usage'], ['stream','rate'],
      ['rails','rate'], ['rate','db'], ['rails','stripe','collect']
    ]
  },

  'qdrant-vectordb': {
    nodes: [
      ['chat',  'Chat-with-Docs UI',    '🖥️', _C.web,  0, 1.0],
      ['ingest','LangChain Ingestion',  '📥', _C.app,  0, 3.0],
      ['svc',   'Retrieval Service',    '⚙️', _C.app,  1, 1.6],
      ['qdrant','Qdrant (HNSW)',        '📐', _C.ai,   2, 1.6],
      ['filter','tenant_id Filter',     '🔐', _C.sec,  2, 0.2],
      ['rerank','ColBERT Rerank',       '🎯', _C.ai,   3, 0.7],
      ['llm',   'Local LLM',            '🧠', _C.ai,   3, 2.5]
    ],
    edges: [
      ['chat','svc'], ['ingest','qdrant','upsert'], ['svc','qdrant','hybrid'],
      ['filter','qdrant','isolate'], ['qdrant','rerank'], ['rerank','llm','top-K']
    ]
  },

  'n8n-automation': {
    nodes: [
      ['imap',  'IMAP Email Trigger',   '📧', _C.flow, 0, 1.0],
      ['n8n',   'n8n Workflow (VPC)',   '⚙️', _C.app,  1, 1.6],
      ['ollama','Ollama Local LLM',     '🧠', _C.ai,   2, 0.4],
      ['switch','Severity Switch',      '🔀', _C.app,  2, 2.0],
      ['sf',    'Salesforce Case',      '🏢', _C.ext,  3, 0.7],
      ['slack', 'Slack Adjuster DM',    '💬', _C.ext,  3, 2.0],
      ['siem',  'SIEM Audit Log',       '🛡️', _C.sec,  1, 3.1]
    ],
    edges: [
      ['imap','n8n'], ['n8n','ollama','extract'], ['ollama','switch'],
      ['switch','sf','case'], ['switch','slack','notify'], ['n8n','siem','log']
    ]
  }
};

export type ArchNode = [string, string, string, string, number, number];
export type ArchEdge = [string, string, (string | undefined)?, ("dash" | undefined)?];
export type Arch = { nodes: ArchNode[]; edges: ArchEdge[] };
export const CASE_ARCH_MAP: Record<string, Arch> = CASE_ARCH as unknown as Record<string, Arch>;
export { CASE_ARCH };
