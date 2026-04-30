import kibanaSS from '../assets/KibanaSS.png'
import potionWatch from '../assets/potionWatch.png'
import serverless from '../assets/serverless.jpg'
import tidalSS from '../assets/tidalSS.png'

export type ProjectTechnology = {
  name: string
  logoUrl?: string
}

export type ProjectItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  codeUrl: string
  demoUrl?: string
  technologies: ProjectTechnology[]
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'real-time-entity-intelligence-pipeline',
    title: 'Real-Time Entity Intelligence Pipeline',
    description:
      'Built an end-to-end streaming data pipeline that ingests live financial and news articles, publishes raw events to Kafka, processes them with PySpark Structured Streaming, extracts named entities using spaCy, computes rolling mention counts, indexes the results in Elasticsearch via Logstash, and visualizes top entities in a live Kibana dashboard.',
    imageUrl: kibanaSS,
    codeUrl: 'https://github.com/Zafeer-R/SignalTrace',
    technologies: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Kafka', logoUrl: 'https://cdn.simpleicons.org/apachekafka/231F20' },
      { name: 'PySpark', logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C' },
      { name: 'spaCy', logoUrl: 'https://cdn.simpleicons.org/spacy/09A3D5' },
      { name: 'Logstash', logoUrl: 'https://cdn.simpleicons.org/logstash/005571' },
      {
        name: 'Elasticsearch',
        logoUrl: 'https://cdn.simpleicons.org/elasticsearch/005571',
      },
      { name: 'Kibana', logoUrl: 'https://cdn.simpleicons.org/kibana/005571' },
      {
        name: 'Docker Compose',
        logoUrl: 'https://cdn.simpleicons.org/docker/2496ED',
      },
      { name: 'WSL2' },
    ],
  },
  {
    id: 'traceline-pipeline-anomaly',
    title: 'Traceline - Pipeline Anomaly Detection',
    description:
      'An ML-powered system to align multi-year pipeline inspection data, track corrosion growth, and identify high-risk segments through feature matching and predictive analytics. Winner of TidalHack 2026.',
    imageUrl: tidalSS,
    codeUrl: 'https://github.com/Zafeer-R/Traceline-Anomaly-Detection',
    demoUrl: 'http://tidalfrontend.s3-website-us-east-1.amazonaws.com/',
    technologies: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'AWS', logoUrl: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
      { name: 'React', logoUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      {
        name: 'scikit-learn',
        logoUrl: 'https://cdn.simpleicons.org/scikitlearn/F7931E',
      },
    ],
  },
  {
    id: 'potionwatch-fraud-detection',
    title: 'PotionWatch - Fraud Detection System',
    description:
      'A real-time fraud detection platform that identifies suspicious transport transactions and missing records using statistical anomaly detection and time-series analysis across multiple collection sites.',
    imageUrl: potionWatch,
    codeUrl: 'https://github.com/Kartik11082/EOG-HackUTD25',
    demoUrl: 'http://18.220.118.210/',
    technologies: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Flask', logoUrl: 'https://cdn.simpleicons.org/flask/000000' },
      { name: 'Pandas', logoUrl: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'NumPy', logoUrl: 'https://cdn.simpleicons.org/numpy/013243' },
    ],
  },
  {
    id: 'aws-serverless-terraform',
    title: 'AWS Serverless Application with Terraform',
    description:
      'A fully reproducible cloud-native application built using Infrastructure as Code, featuring Lambda-based APIs, DynamoDB storage, and static hosting on S3.',
    imageUrl: serverless,
    codeUrl: 'https://github.com/Zafeer-R/terraform-todo-app',
    technologies: [
      { name: 'AWS', logoUrl: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
      { name: 'Terraform', logoUrl: 'https://cdn.simpleicons.org/terraform/7B42BC' },
      { name: 'JavaScript', logoUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      {
        name: 'DynamoDB',
        logoUrl: 'https://cdn.simpleicons.org/amazondynamodb/4053D6',
      },
    ],
  },
]
