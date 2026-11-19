export const LINKEDIN_URL = 'https://www.linkedin.com/in/zafeerr/'
export const GITHUB_URL = 'https://github.com/Zafeer-R'
export const RESUME_URL = '/Zafeer_Resume.pdf'

export const NAV_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'faq', label: 'FAQ' },
]

export const STATS = [
  { value: '1M+', label: 'daily production and equipment records cleaned and monitored with Python and SQL pipelines' },
  { value: '70%', label: 'less troubleshooting time after deploying ML anomaly detection' },
  { value: '23%', label: 'better prediction accuracy from Random Forest, XGBoost and time series models' },
  { value: '10,000', label: 'users served by a platform built from scratch at KnockOnce' },
]

export const TAGLINE =
  'I build the systems behind the answer. Pipelines that move the data, models that make sense of it, and interfaces people trust.'

export const STEPS = [
  {
    n: '01',
    title: 'Scope the data problem',
    body: 'Start from the questions the system must answer, the volume it must handle and where the data really comes from.',
  },
  {
    n: '02',
    title: 'Build the pipeline end to end',
    body: 'Ingestion, validation, processing and serving built as one system, with tests and error handling from day one.',
  },
  {
    n: '03',
    title: 'Measure and ship',
    body: 'Track accuracy, latency and failure modes against the starting numbers, then iterate in short cycles.',
  },
]

export const JOBS = [
  {
    org: 'The University of Texas at Dallas',
    role: 'Technology and Operations Worker',
    when: 'May 2025 to May 2026',
    points: [
      'Sole IT support for 40+ member international centers, covering hardware, access and device provisioning.',
      'Owned the full asset lifecycle: imaging, onboarding, deprovisioning and issue resolution.',
    ],
  },
  {
    org: 'Delta Systems, Ahmedabad',
    role: 'Data Scientist',
    when: 'Jan 2024 to Jul 2024',
    points: [
      'Built ML workflows with Random Forest, XGBoost and time series forecasting, improving prediction accuracy by 23%.',
      'Automated Python and SQL pipelines that validate 1M+ daily production and equipment records.',
      'Deployed anomaly detection that cut troubleshooting time by 70% and deployment cycles from 4 to 2 weeks.',
      'Segmented customers with k means clustering in scikit-learn, supporting targeted marketing and 10% better throughput.',
    ],
  },
  {
    org: 'KnockOnce, Remote',
    role: 'Software Engineer Intern',
    when: 'Jan 2023 to Mar 2023',
    points: [
      'Built sumosave.in from the ground up from provided designs, serving nearly 10,000 users.',
      'Designed normalized MySQL schemas and admin CRUD for job postings and content.',
    ],
  },
]

export const EDUCATION = [
  { school: 'The University of Texas at Dallas', degree: "Master's, Computer Science", detail: 'Aug 2024 to May 2026, CGPA 3.5 of 4.0' },
  { school: 'Indus University, India', degree: "Bachelor's, Computer Science", detail: 'Oct 2020 to May 2024, CGPA 3.59 of 4.0' },
]

export const SKILL_GROUPS = [
  { title: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'C/C++', 'PySpark'] },
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot', 'REST APIs', 'GraphQL', 'WebSockets'] },
  { title: 'Databases', items: ['PostgreSQL', 'Supabase', 'Firebase', 'MongoDB', 'MySQL'] },
  { title: 'AI and GenAI', items: ['LLMs', 'OpenAI GPT', 'Claude', 'Gemini', 'Groq', 'LangChain', 'RAG', 'MCP', 'Prompt engineering', 'n8n'] },
  { title: 'Cloud and DevOps', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions'] },
  { title: 'Tools', items: ['Git', 'Databricks', 'Tableau', 'Power BI', 'Apache Kafka', 'Kibana', 'Postman'] },
]

export const CERTIFICATIONS = 'Anthropic Academy: Claude 101, Building with Claude API, MCP, Claude Code, Agent Skills'

export type Faq = { q: string; a?: string; placeholder?: string }

export const FAQS: Faq[] = [
  { q: 'Are you authorized to work in the US?', a: 'Yes. I am on F-1 STEM OPT and need no sponsorship for 3 years.' },
  { q: 'Where are you based?', a: 'Dallas, Texas.' },
  { q: 'What roles are you looking for?', a: 'Software engineer and data or AI engineer roles building real time pipelines, RAG applications and cloud analytics systems.' },
  { q: 'What is your strongest stack?', a: 'Python, SQL, PySpark and Kafka for data, FastAPI and Node.js for services, React and TypeScript for interfaces.' },
  { q: 'When can you start?', placeholder: 'Add your earliest start date here, for example "Available from June 2026".' },
  { q: 'Do you hold AI certifications?', a: 'Anthropic Academy: Claude 101, Building with Claude API, MCP, Claude Code and Agent Skills.' },
  { q: 'Where can I read your code?', a: 'Every project above links to its repository on GitHub at github.com/Zafeer-R.' },
  { q: 'What is the best way to reach you?', a: 'Send a message on LinkedIn at linkedin.com/in/zafeerr.' },
]

export const EGG_TOTAL = 3

export const STAT_FILL = [1, 0.7, 0.23, 1]
