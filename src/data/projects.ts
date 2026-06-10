import kibanaSS from '../assets/KibanaSS.png'
import potionWatch from '../assets/potionWatch.png'
import serverless from '../assets/serverless.jpg'
import tidalSS from '../assets/tidalSS.png'
import vehicleListing from '../assets/vehicleListing.png'
import geoSearch from '../assets/geoSearch.png'
import terrasight from '../assets/terrasight.png'
import utdCampusAssistant from '../assets/utd-campus-assistant.png'
import { getSkillIconUrl } from './skillIcons'

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
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'Kafka', logoUrl: getSkillIconUrl('Kafka') },
      { name: 'PySpark', logoUrl: getSkillIconUrl('PySpark') },
      { name: 'spaCy' },
      { name: 'Logstash', logoUrl: getSkillIconUrl('Logstash') },
      {
        name: 'Elasticsearch',
        logoUrl: getSkillIconUrl('Elasticsearch'),
      },
      { name: 'Kibana', logoUrl: getSkillIconUrl('Kibana') },
      {
        name: 'Docker Compose',
        logoUrl: getSkillIconUrl('Docker Compose'),
      },
      { name: 'WSL2' },
    ],
  },
  {
    id: 'autotracker',
    title: 'AutoTracker | Scalable Vehicle Listing Event Pipeline',
    description:
      'Built an event-driven vehicle listing platform with asynchronous event streaming, DLQ-based error handling, REST APIs, and real-time listing history visualization using Kafka and Spring Boot.',
    imageUrl: vehicleListing,
    codeUrl: 'https://github.com/Zafeer-R/Auto-Tracker/tree/main',
    technologies: [
      { name: 'Java', logoUrl: getSkillIconUrl('Java') },
      { name: 'Spring Boot', logoUrl: getSkillIconUrl('Spring Boot') },
      { name: 'Spring Kafka' },
      { name: 'Spring Data JPA' },
      { name: 'Hibernate', logoUrl: getSkillIconUrl('Hibernate') },
      { name: 'MySQL', logoUrl: getSkillIconUrl('MySQL') },
      { name: 'Apache Kafka', logoUrl: getSkillIconUrl('Apache Kafka') },
      { name: 'Docker', logoUrl: getSkillIconUrl('Docker') },
      { name: 'Maven', logoUrl: getSkillIconUrl('Maven') },
      { name: 'JUnit' },
      { name: 'Mockito' },
      { name: 'React', logoUrl: getSkillIconUrl('React') },
      { name: 'TypeScript', logoUrl: getSkillIconUrl('TypeScript') },
      { name: 'Vite', logoUrl: getSkillIconUrl('Vite') },
    ],
  },
  {
    id: 'geosearch',
    title: 'GeoSearch | Search Engine for Geology',
    description:
      'Built a geology-focused search engine with focused web crawling, inverted indexing, multiple relevance models, query expansion, clustering, cluster-aware reranking, and a React/FastAPI interface for comparing search results.',
    imageUrl: geoSearch,
    codeUrl: 'https://github.com/Zafeer-R/GeoSearch',
    technologies: [
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'FastAPI', logoUrl: getSkillIconUrl('FastAPI') },
      { name: 'React', logoUrl: getSkillIconUrl('React') },
      { name: 'JavaScript', logoUrl: getSkillIconUrl('JavaScript') },
      { name: 'Vite', logoUrl: getSkillIconUrl('Vite') },
      {
        name: 'scikit-learn',
        logoUrl: getSkillIconUrl('scikit-learn'),
      },
      { name: 'NumPy' },
      { name: 'SciPy' },
      { name: 'NLTK' },
      { name: 'PyStemmer' },
      { name: 'Uvicorn' },
      { name: 'Pydantic' },
      { name: 'Requests' },
      { name: 'SerpAPI' },
      { name: 'TF-IDF' },
      { name: 'BM25' },
      { name: 'PageRank' },
      { name: 'HITS' },
      { name: 'MiniBatchKMeans' },
      { name: 'Agglomerative Clustering' },
    ],
  },
  {
    id: 'terrasight',
    title: 'TerraSight | Rain Water Harvesting Prospecting Tool',
    description:
      'Developed a map-based prospecting platform that uses computer vision and geospatial analysis to identify commercial buildings across the US suitable for rainwater harvesting installations.',
    imageUrl: terrasight,
    codeUrl: 'https://github.com/Zafeer-R/TerraSight',
    demoUrl: 'https://terrasight-demo.vercel.app',
    technologies: [
      { name: 'React', logoUrl: getSkillIconUrl('React') },
      { name: 'TypeScript', logoUrl: getSkillIconUrl('TypeScript') },
      { name: 'MapLibre GL JS' },
      { name: 'Zustand' },
      { name: 'TanStack Query' },
      { name: 'FastAPI', logoUrl: getSkillIconUrl('FastAPI') },
      { name: 'PostGIS' },
      { name: 'YOLO', logoUrl: getSkillIconUrl('YOLO') },
      { name: 'OpenStreetMap', logoUrl: getSkillIconUrl('OpenStreetMap') },
      { name: 'Open-Meteo' },
      { name: 'EPA Benchmarks' },
    ],
  },
  {
    id: 'utd-campus-assistant',
    title: 'UTD Campus Assistant | AWS Bedrock Campus Assistant',
    description:
      'Built an AWS-powered campus assistant using Bedrock Knowledge Bases and serverless architecture to deliver retrieval-augmented answers for dining, events, and parking queries.',
    imageUrl: utdCampusAssistant,
    codeUrl: 'https://github.com/Zafeer-R/UTD-AI-Campus-Assistant',
    demoUrl: 'https://utd-campus-assistant-demo.vercel.app',
    technologies: [
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'AWS API Gateway', logoUrl: getSkillIconUrl('AWS API Gateway') },
      { name: 'AWS Lambda', logoUrl: getSkillIconUrl('AWS Lambda') },
      { name: 'Amazon Bedrock', logoUrl: getSkillIconUrl('Amazon Bedrock') },
      { name: 'AWS S3', logoUrl: getSkillIconUrl('AWS S3') },
      { name: 'DynamoDB', logoUrl: getSkillIconUrl('DynamoDB') },
      { name: 'CloudWatch', logoUrl: getSkillIconUrl('CloudWatch') },
      { name: 'Claude', logoUrl: getSkillIconUrl('Claude') },
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
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'AWS', logoUrl: getSkillIconUrl('AWS') },
      { name: 'React', logoUrl: getSkillIconUrl('React') },
      {
        name: 'scikit-learn',
        logoUrl: getSkillIconUrl('scikit-learn'),
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
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'Flask', logoUrl: getSkillIconUrl('Flask') },
      { name: 'Pandas' },
      { name: 'NumPy' },
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
      { name: 'AWS', logoUrl: getSkillIconUrl('AWS') },
      { name: 'Terraform', logoUrl: getSkillIconUrl('Terraform') },
      { name: 'JavaScript', logoUrl: getSkillIconUrl('JavaScript') },
      {
        name: 'DynamoDB',
        logoUrl: getSkillIconUrl('DynamoDB'),
      },
    ],
  },
]
