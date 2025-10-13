import { JobPostResponse } from "../../api/models/job-post-response";

export type ApplicationStatus = 'Under Review' | 'Interview Scheduled' | 'Submitted' | 'Rejected';

export interface MockApplication {
  id: string;
  applicationDate: string;
  status: ApplicationStatus;
  job: JobPostResponse; // Embed the full job post
  communicationHistory: {
    status: string;
    date: string;
    message?: string;
  }[];
}

export const MOCK_APPLICATIONS: MockApplication[] = [
  {
    id: '1',
    applicationDate: '2023-10-26',
    status: 'Under Review',
    job: {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Stripe',
      jobType: 'Full-time',
      remote: 'Remote',
      location: { city: 'San Francisco', countryCode: 'US' },
      description: 'As a Senior Frontend Developer at Stripe, you will be at the forefront of creating beautiful, performant, and intuitive user interfaces for our core products. You\'ll work with a talented team of engineers and designers to build features that millions of users interact with every day. We are looking for someone who is passionate about creating exceptional user experiences and has a deep understanding of modern web technologies.',
      responsibilities: [
        'Develop and maintain user-facing features using React, TypeScript, and modern JavaScript frameworks.',
        'Collaborate with product managers, designers, and backend engineers to create seamless and integrated user experiences.',
        'Write clean, efficient, and maintainable code, and contribute to our growing component library.',
        'Optimize applications for maximum speed and scalability.',
        'Mentor junior engineers and contribute to a culture of technical excellence.'
      ],
      qualifications: [
        '5+ years of professional experience in frontend development.',
        'Expertise in HTML, CSS, and JavaScript (ES6+).',
        'Strong experience with React and its ecosystem (Redux, Next.js, etc.).',
        'Proficiency with TypeScript.',
        'A keen eye for design and user experience.'
      ],
      skills: [
        { name: 'Angular', level: 'Master' },
        { name: 'TypeScript', level: 'Master' },
        { name: 'JavaScript (ES6+)', level: 'Master' },
        { name: 'RxJS', level: 'Advanced' },
        { name: 'NgRx', level: 'Advanced' },
        { name: 'HTML5 & CSS3', level: 'Master' },
        { name: 'Tailwind CSS', level: 'Advanced' },
      ],
    },
    communicationHistory: [
      {
        status: 'Application Submitted',
        date: '2023-10-26T10:30:00Z',
        message: 'You successfully submitted your application.'
      },
      {
        status: 'Message from Stripe',
        date: '2023-10-27T14:15:00Z',
        message: 'Hi Jane, thank you for your application. We\'ve received it and our team will review it shortly. We appreciate your interest in Stripe!'
      }
    ]
  },
  // Add more mock applications as needed...
];
