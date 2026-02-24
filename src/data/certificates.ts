export type Certificate = {
  id: string
  title: string
  issuer: string
  credentialUrl: string
  badgeUrl?: string
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 'azure-ai-fundamentals',
    title: 'Microsoft Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    credentialUrl: 'https://learn.microsoft.com/en-us/credentials/',
    badgeUrl:
      'https://images.credly.com/size/340x340/images/eea11cba-2af6-4d04-b79f-0f9db29ee1af/image.png',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    credentialUrl: 'https://aws.amazon.com/certification/',
    badgeUrl:
      'https://images.credly.com/size/340x340/images/684266f2-6930-4e9a-9f11-4f9d3b4e8fca/image.png',
  },
]
