import { JobPostResponse } from '../../api/models/job-post-response';

export const MOCK_JOBS: JobPostResponse[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: { city: 'San Francisco', countryCode: 'US' },
    experienceLevel: '5+ Years Experience',
    salary: '$120,000 - $150,000',
    datePosted: new Date().toISOString(),
    status: 'OPEN',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Minds LLC',
    location: { city: 'New York', countryCode: 'US' },
    experienceLevel: '3-5 Years Experience',
    salary: '$90,000 - $110,000',
    datePosted: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: 'OPEN',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Cloud Services Co.',
    location: { city: 'Austin', countryCode: 'US' },
    experienceLevel: '4+ Years Experience',
    salary: '$115,000 - $140,000',
    datePosted: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: 'OPEN',
  },
];
