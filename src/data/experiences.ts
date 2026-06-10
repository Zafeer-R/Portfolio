import { getSkillIconUrl } from './skillIcons'

export type ExperienceTechnology = {
  name: string
  logoUrl?: string
}

export type ExperienceHighlightIcon =
  | 'code'
  | 'bug'
  | 'cloud'
  | 'database'
  | 'cpu'
  | 'sparkles'
  | 'workflow'

export type ExperienceHighlight = {
  text: string
  icon?: ExperienceHighlightIcon
}

export type ExperienceItem = {
  id: string
  roleTitle: string
  companyName: string
  roleType: string
  dateRange: string
  highlights: ExperienceHighlight[]
  technologies: ExperienceTechnology[]
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'utd-tech-operations',
    roleTitle: 'Technology & Operations Worker',
    companyName: 'University of Texas at Dallas - International Center',
    roleType: 'Part-time',
    dateRange: 'May 2025 - Present',
    highlights: [
      {
        text: 'Coordinated cross-department IT onboarding and device provisioning, reducing communication friction and accelerating service delivery.',
        icon: 'workflow',
      },
      {
        text: 'Streamlined end-to-end asset lifecycle including imaging, access setup, deprovisioning, and troubleshooting to eliminate operational bottlenecks.',
        icon: 'workflow',
      },
      {
        text: 'Standardized support processes and documentation, improving operational efficiency and user experience across teams.',
        icon: 'cpu',
      },
    ],
    technologies: [
      {
        name: 'Windows Administration',
        logoUrl: getSkillIconUrl('Windows Administration'),
      },
      {
        name: 'Microsoft 365',
        logoUrl: getSkillIconUrl('Microsoft 365'),
      },
      { name: 'Networking', logoUrl: getSkillIconUrl('Networking') },
      {
        name: 'IT Operations',
      },
    ],
  },
  {
    id: 'delta-systems-data-analyst',
    roleTitle: 'Data Scientist',
    companyName: 'Delta Systems',
    roleType: 'Full-time',
    dateRange: 'Jan 2024 - Jul 2024',
    highlights: [
      {
        text: 'Architected scalable ETL pipelines using Python and SQL, reducing processing time by 30% and improving data reliability.',
        icon: 'database',
      },
      {
        text: 'Designed data transformation, validation, and feature engineering workflows to generate ML-ready datasets.',
        icon: 'workflow',
      },
      {
        text: 'Optimized complex SQL queries through indexing and execution plan tuning, enabling near real-time analytics.',
        icon: 'code',
      },
      {
        text: 'Implemented k-means clustering to segment large-scale customer datasets and improve operational decision-making.',
        icon: 'cpu',
      },
    ],
    technologies: [
      { name: 'Python', logoUrl: getSkillIconUrl('Python') },
      { name: 'SQL', logoUrl: getSkillIconUrl('SQL') },
      {
        name: 'PostgreSQL',
        logoUrl: getSkillIconUrl('PostgreSQL'),
      },
      {
        name: 'scikit-learn',
        logoUrl: getSkillIconUrl('scikit-learn'),
      },
    ],
  },
  {
    id: 'software-engineering-internship',
    roleTitle: 'Software Engineering Intern',
    companyName: 'KnockOnce',
    roleType: 'Internship',
    dateRange: 'Jan 2023 - Mar 2023',
    highlights: [
      {
        text: 'Developed the high-traffic platform sumosave.in from the ground up using provided designs, shipping responsive pages that served nearly 10,000 users.',
        icon: 'code',
      },
      {
        text: 'Built a scalable backend with MySQL, designing normalized database schemas for partnerships, careers, and admin management.',
        icon: 'database',
      },
      {
        text: 'Implemented admin-side CRUD workflows for dynamic job posting and content management, enabling non-technical teams to update site content independently.',
        icon: 'workflow',
      },
    ],
    technologies: [
      { name: 'HTML5', logoUrl: getSkillIconUrl('HTML5') },
      { name: 'CSS3', logoUrl: getSkillIconUrl('CSS3') },
      { name: 'JavaScript', logoUrl: getSkillIconUrl('JavaScript') },
      { name: 'PHP', logoUrl: getSkillIconUrl('PHP') },
      { name: 'MySQL', logoUrl: getSkillIconUrl('MySQL') },
      {
        name: 'CRUD Admin',
      },
    ],
  },
]
