import { JobPostResponse } from '../../api/models/job-post-response';

export const MOCK_JOBS: JobPostResponse[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    jobType: 'Full-time',
    datePosted: '2024-07-20',
    description: 'We are seeking a highly skilled Senior Frontend Developer to join our dynamic team. The ideal candidate will be passionate about creating beautiful, functional, and user-centric web applications. You will be responsible for leading the development of our next-generation user interfaces, collaborating with designers and backend engineers to deliver a seamless user experience.',
    location: {
      address: '123 Tech Street',
      postalCode: '94107',
      city: 'San Francisco',
      countryCode: 'US',
      region: 'CA'
    },
    remote: 'Hybrid',
    salary: '$120,000 - $150,000',
    experienceLevel: 'Senior',
    responsibilities: [
      'Develop and maintain responsive web applications using Angular and TypeScript.',
      'Collaborate with UI/UX designers to translate wireframes and mockups into high-quality code.',
      'Optimize applications for maximum speed and scalability.',
      'Write clean, maintainable, and well-documented code.',
      'Mentor junior developers and participate in code reviews.'
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of professional experience in frontend development.',
      'Expertise in JavaScript, HTML5, and CSS3.',
      'Proficient with Angular and its ecosystem.',
      'Experience with TypeScript is a must.',
      'Strong understanding of RESTful APIs and modern authorization mechanisms.'
    ],
    skills: [
      { name: 'Angular', level: 'Master', keywords: [] },
      { name: 'TypeScript', level: 'Master', keywords: [] },
      { name: 'JavaScript (ES6+)', level: 'Master', keywords: [] },
      { name: 'RxJS', level: 'Advanced', keywords: [] },
      { name: 'NgRx', level: 'Advanced', keywords: [] },
      { name: 'HTML5 & CSS3', level: 'Master', keywords: [] },
      { name: 'Tailwind CSS', level: 'Advanced', keywords: [] },
      { name: 'Jest', level: 'Intermediate', keywords: [] },
      { name: 'Cypress', level: 'Intermediate', keywords: [] },
      { name: 'Webpack', level: 'Intermediate', keywords: [] },
      { name: 'RESTful APIs', level: 'Advanced', keywords: [] }
    ],
    status: 'OPEN'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Minds LLC',
    jobType: 'Full-time',
    datePosted: '2024-07-18',
    description: 'We are looking for a talented Product Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional user interfaces.',
    location: {
      address: '456 Design Avenue',
      postalCode: '10014',
      city: 'New York',
      countryCode: 'US',
      region: 'NY'
    },
    remote: 'Remote',
    salary: '$90,000 - $110,000',
    experienceLevel: 'Mid-level',
    responsibilities: [
      'Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience.',
      'Execute all visual design stages from concept to final hand-off to engineering.',
      'Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.'
    ],
    qualifications: [
      '3+ years of experience in Product Design or related field.',
      'Proven UI experience.',
      'Demonstrable UI design skills with a strong portfolio.',
      'Solid experience in creating wireframes, storyboards, user flows, process flows and site maps.'
    ],
    skills: [
      {
        name: 'UI Design',
        level: 'Master',
        keywords: ['Figma', 'Sketch', 'Adobe XD']
      },
      {
        name: 'UX Research',
        level: 'Intermediate',
        keywords: ['User Interviews', 'Surveys', 'Persona Creation']
      }
    ],
    status: 'OPEN'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Cloud Services Co.',
    jobType: 'Full-time',
    datePosted: '2024-07-15',
    description: 'We are looking for a DevOps Engineer to help us build functional systems that improve customer experience. DevOps Engineer responsibilities include deploying product updates, identifying production issues and implementing integrations that meet customer needs. If you have a solid background in software engineering and are familiar with Ruby or Python, we’d like to meet you.',
    location: {
      address: '789 Cloud Way',
      postalCode: '78701',
      city: 'Austin',
      countryCode: 'US',
      region: 'TX'
    },
    remote: 'On-site',
    salary: '$115,000 - $140,000',
    experienceLevel: 'Mid-level',
    responsibilities: [
      'Deploying updates and fixes.',
      'Providing Level 2 technical support.',
      'Building tools to reduce occurrences of errors and improve customer experience.'
    ],
    qualifications: [
      '4+ years of experience as a DevOps Engineer or similar software engineering role.',
      'Proficient with git and git workflows.',
      'Good knowledge of Ruby or Python.',
      'Experience with Docker and Kubernetes.'
    ],
    skills: [
      {
        name: 'Cloud Infrastructure',
        level: 'Master',
        keywords: ['AWS', 'Azure', 'Google Cloud']
      },
      {
        name: 'CI/CD',
        level: 'Master',
        keywords: ['Jenkins', 'GitLab CI', 'CircleCI']
      }
    ],
    status: 'OPEN'
  }
];