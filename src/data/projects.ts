import kibanaSS from '../assets/KibanaSS.png'
import potionWatch from '../assets/potionWatch.png'
import serverless from '../assets/serverless.jpg'
import tidalSS from '../assets/tidalSS.png'
import vehicleListing from '../assets/vehicleListing.png'
import geoSearch from '../assets/geoSearch.png'
import terrasight from '../assets/terrasight.png'
import utdCampusAssistant from '../assets/utd-campus-assistant.png'
import realPageAI from '../assets/realPageAI.png'
import { getSkillIconUrl } from './skillIcons'

export type ProjectTech = { name: string; logoUrl?: string }

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  imageUrl: string
  imageAlt: string
  codeUrl: string
  featured?: boolean
  badge?: string
  tech: ProjectTech[]
}

const t = (name: string): ProjectTech => ({ name, logoUrl: getSkillIconUrl(name) })

export const PROJECTS: Project[] = [
  {
    id: 'traceline',
    title: 'Traceline',
    tagline: 'Pipeline anomaly detection',
    description:
      'An ML system that aligns multi year pipeline inspection data, tracks corrosion growth and flags high risk segments through feature matching and predictive analytics.',
    imageUrl: tidalSS,
    imageAlt: 'Traceline dashboard showing pipeline inspection anomalies',
    codeUrl: 'https://github.com/Zafeer-R/Traceline-Anomaly-Detection',
    featured: true,
    badge: 'TidalHack 2026 winner',
    tech: [t('Python'), t('AWS'), t('React'), t('scikit-learn')],
  },
  {
    id: 'realpage-ai',
    title: 'RealPage AI',
    tagline: 'Agentic RAG property intelligence',
    description:
      'An LLM planner routes each question across PostgreSQL, Neo4j and Qdrant. Answers stream back through constraint based prompting with persistent conversation memory.',
    imageUrl: realPageAI,
    imageAlt: 'RealPage AI chat interface answering a property question',
    codeUrl: 'https://github.com/Zafeer-R/AgenticRAG',
    featured: true,
    tech: [t('Python'), t('FastAPI'), t('LangGraph'), t('Groq'), t('Neo4j'), t('Qdrant')],
  },
  {
    id: 'signaltrace',
    title: 'SignalTrace',
    tagline: 'Real time financial news pipeline',
    description:
      'Kafka and PySpark Structured Streaming extract entities with spaCy, compute rolling mention counts and feed a live Kibana dashboard through Elasticsearch.',
    imageUrl: kibanaSS,
    imageAlt: 'Kibana dashboard of top entities in financial news',
    codeUrl: 'https://github.com/Zafeer-R/SignalTrace',
    tech: [t('Kafka'), t('PySpark'), t('spaCy'), t('Elasticsearch'), t('Kibana')],
  },
  {
    id: 'autotracker',
    title: 'AutoTracker',
    tagline: 'Vehicle listing event pipeline',
    description:
      'An event driven listing platform on Kafka and Spring Boot with dead letter queue error handling, REST APIs and real time listing history.',
    imageUrl: vehicleListing,
    imageAlt: 'AutoTracker vehicle listing history view',
    codeUrl: 'https://github.com/Zafeer-R/Auto-Tracker/tree/main',
    tech: [t('Java'), t('Spring Boot'), t('Apache Kafka'), t('MySQL'), t('Docker')],
  },
  {
    id: 'geosearch',
    title: 'GeoSearch',
    tagline: 'Search engine for geology',
    description:
      'Focused crawling, inverted indexing, BM25 and TF-IDF ranking, query expansion and clustering behind a React and FastAPI interface for comparing results.',
    imageUrl: geoSearch,
    imageAlt: 'GeoSearch results comparing ranking models',
    codeUrl: 'https://github.com/Zafeer-R/GeoSearch',
    tech: [t('Python'), t('FastAPI'), t('React'), t('scikit-learn')],
  },
  {
    id: 'terrasight',
    title: 'TerraSight',
    tagline: 'Rainwater harvesting prospecting',
    description:
      'A map based tool that uses computer vision and geospatial analysis to find commercial buildings across the US that suit rainwater harvesting installations.',
    imageUrl: terrasight,
    imageAlt: 'TerraSight map highlighting candidate commercial rooftops',
    codeUrl: 'https://github.com/Zafeer-R/TerraSight',
    tech: [t('React'), t('TypeScript'), t('FastAPI'), t('YOLO'), t('OpenStreetMap')],
  },
  {
    id: 'utd-campus-assistant',
    title: 'UTD Campus Assistant',
    tagline: 'AWS Bedrock retrieval assistant',
    description:
      'A serverless assistant on Bedrock Knowledge Bases that answers dining, events and parking questions with retrieval augmented generation.',
    imageUrl: utdCampusAssistant,
    imageAlt: 'UTD Campus Assistant chat answering a parking question',
    codeUrl: 'https://github.com/Zafeer-R/UTD-AI-Campus-Assistant',
    tech: [t('Python'), t('AWS Lambda'), t('Amazon Bedrock'), t('DynamoDB'), t('Claude')],
  },
  {
    id: 'potionwatch',
    title: 'PotionWatch',
    tagline: 'Fraud detection system',
    description:
      'A real time platform that finds suspicious transport transactions and missing records using statistical anomaly detection and time series analysis across collection sites.',
    imageUrl: potionWatch,
    imageAlt: 'PotionWatch fraud detection dashboard',
    codeUrl: 'https://github.com/Kartik11082/EOG-HackUTD25',
    tech: [t('Python'), t('Flask'), t('NumPy')],
  },
  {
    id: 'terraform-serverless',
    title: 'Serverless on Terraform',
    tagline: 'Infrastructure as code on AWS',
    description:
      'A fully reproducible cloud native application with Lambda APIs, DynamoDB storage and static hosting on S3, all defined as code.',
    imageUrl: serverless,
    imageAlt: 'Architecture of a serverless application built with Terraform',
    codeUrl: 'https://github.com/Zafeer-R/terraform-todo-app',
    tech: [t('AWS'), t('Terraform'), t('JavaScript'), t('DynamoDB')],
  },
]
