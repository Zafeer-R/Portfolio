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
        logoUrl: 'https://cdn.simpleicons.org/windows/0078D6',
      },
      {
        name: 'Microsoft 365',
        logoUrl: 'https://cdn.simpleicons.org/microsoftoffice/D83B01',
      },
      { name: 'Networking', logoUrl: 'https://cdn.simpleicons.org/cisco/1BA0D7' },
      {
        name: 'IT Operations',
        logoUrl: 'https://cdn.simpleicons.org/opsgenie/172B4D',
      },
    ],
  },
  {
    id: 'delta-systems-data-analyst',
    roleTitle: 'Data Analyst',
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
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      {
        name: 'PostgreSQL',
        logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1',
      },
      {
        name: 'scikit-learn',
        logoUrl: 'https://cdn.simpleicons.org/scikitlearn/F7931E',
      },
    ],
  },
]
