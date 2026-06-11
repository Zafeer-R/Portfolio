const SKILL_ICON_BASE_URL = 'https://skillicons.dev/icons'
const AWS_ICON_BASE_URL = 'https://icon.icepanel.io/AWS/svg'

const AWS_SERVICE_ICON_PATHS: Record<string, string> = {
  'AWS API Gateway': 'App-Integration/API-Gateway.svg',
  'AWS Lambda': 'Compute/Lambda.svg',
  'AWS S3': 'Storage/Simple-Storage-Service.svg',
  CloudWatch: 'Management-Governance/CloudWatch.svg',
  DynamoDB: 'Database/DynamoDB.svg',
}

const SKILL_ICON_IDS: Record<string, string> = {
  'Amazon Bedrock': 'aws',
  'Apache Kafka': 'kafka',
  AWS: 'aws',
  Claude: 'ai',
  CSS3: 'css',
  Docker: 'docker',
  'Docker Compose': 'docker',
  Elasticsearch: 'elasticsearch',
  FastAPI: 'fastapi',
  Flask: 'flask',
  Groq: 'groq',
  Hibernate: 'hibernate',
  HTML5: 'html',
  httpx: 'python',
  Java: 'java',
  JavaScript: 'js',
  Kafka: 'kafka',
  Kibana: 'elasticsearch',
  Logstash: 'elasticsearch',
  LangChain: 'python',
  LangGraph: 'python',
  LangSmith: 'python',
  Maven: 'maven',
  'Microsoft 365': 'azure',
  MySQL: 'mysql',
  Networking: 'linux',
  'Neo4j': 'neo4j',
  NumPy: 'numpy',
  NLTK: 'python',
  PHP: 'php',
  PostgreSQL: 'postgres',
  Pydantic: 'pydantic',
  Python: 'python',
  Pytest: 'pytest',
  PySpark: 'sklearn',
  'Qdrant': 'qdrant',
  React: 'react',
  Requests: 'python',
  'scikit-learn': 'sklearn',
  SciPy: 'scipy',
  spaCy: 'spacy',
  SQL: 'postgres',
  'Spring Boot': 'spring',
  Terraform: 'terraform',
  TypeScript: 'ts',
  Vite: 'vite',
  Zustand: 'javascript',
  'Windows Administration': 'windows',
  YOLO: 'opencv',
}

export function getSkillIconUrl(name: string): string | undefined {
  const awsIconPath = AWS_SERVICE_ICON_PATHS[name]

  if (awsIconPath) {
    return `${AWS_ICON_BASE_URL}/${awsIconPath}`
  }

  const iconId = SKILL_ICON_IDS[name]

  if (!iconId) {
    return undefined
  }

  return `${SKILL_ICON_BASE_URL}?i=${iconId}&theme=dark`
}
