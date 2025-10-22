import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JobApplicationControllerService } from '../../../api/services';

export interface ApplicantFilter {
  status?: string[];
  skills?: string[];
  experience?: number;
  education?: string[];
  location?: string;
  aiMatchScore?: number;
}

export interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  applicationDate: Date;
  status: string;
  skills: string[];
  experience: number;
  location: string;
  aiMatchScore: number;
}

export interface AnalyticsData {
  totalApplications: number;
  newApplications: number;
  interviewStage: number;
  averageTimeToFill: number;
  statusDistribution: {
    status: string;
    count: number;
  }[];
  sourceDistribution: {
    source: string;
    count: number;
  }[];
  genderDistribution: {
    gender: string;
    count: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ApplicantManagementService {
  private http = inject(HttpClient);
  private applicationService = inject(JobApplicationControllerService);
  
  private _applicants = new BehaviorSubject<Applicant[]>([]);
  private _filters = new BehaviorSubject<ApplicantFilter>({});
  private _analytics = new BehaviorSubject<AnalyticsData | null>(null);
  
  applicants$ = this._applicants.asObservable();
  filters$ = this._filters.asObservable();
  analytics$ = this._analytics.asObservable();
  
  // Mock data for development
  private mockApplicants: Applicant[] = [
    {
      id: '1',
      name: 'John Doe',
      jobTitle: 'Frontend Developer',
      company: 'Tech Co',
      applicationDate: new Date('2023-05-15'),
      status: 'NEW',
      skills: ['JavaScript', 'React', 'TypeScript'],
      experience: 3,
      location: 'New York, NY',
      aiMatchScore: 85
    },
    {
      id: '2',
      name: 'Jane Smith',
      jobTitle: 'UX Designer',
      company: 'Design Studio',
      applicationDate: new Date('2023-05-10'),
      status: 'INTERVIEW',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      experience: 5,
      location: 'San Francisco, CA',
      aiMatchScore: 92
    },
    {
      id: '3',
      name: 'Mike Johnson',
      jobTitle: 'Backend Developer',
      company: 'Software Inc',
      applicationDate: new Date('2023-05-05'),
      status: 'OFFER',
      skills: ['Java', 'Spring', 'Microservices'],
      experience: 7,
      location: 'Austin, TX',
      aiMatchScore: 78
    }
  ];
  
  private mockAnalytics: AnalyticsData = {
    totalApplications: 156,
    newApplications: 42,
    interviewStage: 28,
    averageTimeToFill: 18,
    statusDistribution: [
      { status: 'New', count: 42 },
      { status: 'Screening', count: 35 },
      { status: 'Interview', count: 28 },
      { status: 'Offer', count: 15 },
      { status: 'Hired', count: 12 },
      { status: 'Rejected', count: 24 }
    ],
    sourceDistribution: [
      { source: 'LinkedIn', count: 65 },
      { source: 'Indeed', count: 45 },
      { source: 'Referral', count: 25 },
      { source: 'Company Website', count: 21 }
    ],
    genderDistribution: [
      { gender: 'Male', count: 82 },
      { gender: 'Female', count: 68 },
      { gender: 'Non-binary', count: 6 }
    ]
  };
  
  constructor() {
    // Initialize with mock data for development
    this._applicants.next(this.mockApplicants);
    this._analytics.next(this.mockAnalytics);
  }
  
  getApplicants(filters?: ApplicantFilter): Observable<Applicant[]> {
    // In a real implementation, this would call the API with filters
    // return this.applicationService.getAllApplications$Response(filters)
    //   .pipe(
    //     map(response => response.body as Applicant[]),
    //     tap(applicants => this._applicants.next(applicants))
    //   );
    
    // For now, use mock data with filtering
    let filtered = this.mockApplicants;
    
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(a => filters.status?.includes(a.status));
      }
      
      if (filters.skills && filters.skills.length > 0) {
        filtered = filtered.filter(a => 
          a.skills.some(skill => filters.skills?.includes(skill))
        );
      }
      
      if (filters.experience) {
        filtered = filtered.filter(a => a.experience >= (filters.experience || 0));
      }
      
      if (filters.location) {
        filtered = filtered.filter(a => 
          a.location.toLowerCase().includes(filters.location?.toLowerCase() || '')
        );
      }
      
      if (filters.aiMatchScore) {
        filtered = filtered.filter(a => a.aiMatchScore >= (filters.aiMatchScore || 0));
      }
    }
    
    this._applicants.next(filtered);
    return of(filtered);
  }
  
  updateFilters(filters: ApplicantFilter): void {
    this._filters.next(filters);
    this.getApplicants(filters);
  }
  
  getAnalytics(): Observable<AnalyticsData> {
    // In a real implementation, this would call the API
    // return this.http.get<AnalyticsData>('/api/applicants/analytics');
    
    // For now, use mock data
    return of(this.mockAnalytics);
  }
  
  updateApplicantStatus(applicantIds: string[], newStatus: string): Observable<boolean> {
    // In a real implementation, this would call the API
    // return this.http.post<boolean>('/api/applicants/status', { applicantIds, newStatus });
    
    // For now, simulate success
    this.mockApplicants = this.mockApplicants.map(a => {
      if (applicantIds.includes(a.id)) {
        return { ...a, status: newStatus };
      }
      return a;
    });
    
    this._applicants.next(this.mockApplicants);
    return of(true);
  }
  
  addTagsToApplicants(applicantIds: string[], tags: string[]): Observable<boolean> {
    // In a real implementation, this would call the API
    // return this.http.post<boolean>('/api/applicants/tags', { applicantIds, tags });
    
    // For now, simulate success
    return of(true);
  }
  
  exportApplicants(applicantIds: string[], format: string): Observable<string> {
    // In a real implementation, this would call the API and return a download URL
    // return this.http.post<string>('/api/applicants/export', { applicantIds, format });
    
    // For now, simulate success with a mock URL
    return of('https://example.com/export/applicants.csv');
  }
  
  addCollaborationNote(applicantId: string, note: string, teamMembers: string[]): Observable<boolean> {
    // In a real implementation, this would call the API
    // return this.http.post<boolean>(`/api/applicants/${applicantId}/notes`, { note, teamMembers });
    
    // For now, simulate success
    return of(true);
  }
}