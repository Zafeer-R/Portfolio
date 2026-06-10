import { getSkillIconUrl } from './skillIcons'

export type SkillItem = {
  name: string
  iconUrl?: string
}

export type SkillGroup = {
  id: string
  title: string
  blurb: string
  accent: string
  skills: SkillItem[]
}

const skill = (name: string): SkillItem => ({
  name,
  iconUrl: getSkillIconUrl(name),
})

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages-core',
    title: 'Languages',
    blurb: 'Core implementation languages I use across full-stack, data, and systems work.',
    accent: 'aurora',
    skills: [
      skill('Python'),
      skill('Java'),
      skill('JavaScript'),
      skill('TypeScript'),
      skill('SQL'),
      skill('PHP'),
      skill('HTML5'),
      skill('CSS3'),
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend & Data',
    blurb: 'Application backends, streaming systems, and database tooling used in shipped products and pipelines.',
    accent: 'copper',
    skills: [
      skill('FastAPI'),
      skill('Flask'),
      skill('Spring Boot'),
      skill('Apache Kafka'),
      skill('MySQL'),
      skill('PostgreSQL'),
      skill('DynamoDB'),
      skill('Elasticsearch'),
    ],
  },
  {
    id: 'frontend-product',
    title: 'Frontend & Product',
    blurb: 'Interfaces and product layers built for dashboards, maps, admin workflows, and user-facing apps.',
    accent: 'glacier',
    skills: [
      skill('React'),
      skill('Vite'),
      skill('OpenStreetMap'),
      skill('AWS API Gateway'),
      skill('AWS Lambda'),
      skill('CloudWatch'),
      skill('Microsoft 365'),
      skill('Windows Administration'),
    ],
  },
  {
    id: 'cloud-ml-devops',
    title: 'Cloud, ML & DevOps',
    blurb: 'Infrastructure, ML, and deployment tools drawn from cloud-native systems and applied intelligence projects.',
    accent: 'gold',
    skills: [
      skill('AWS'),
      skill('Amazon Bedrock'),
      skill('Docker'),
      skill('Terraform'),
      skill('Kibana'),
      skill('Logstash'),
      skill('scikit-learn'),
      skill('YOLO'),
    ],
  },
]
