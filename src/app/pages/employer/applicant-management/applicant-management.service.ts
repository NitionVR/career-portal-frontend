import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JobApplicationControllerService } from '../../../api/services';
import { ApplicationDetailsDto } from '../../../api/models/application-details-dto';

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
  private mockApplicationDetails: ApplicationDetailsDto[] = [
    {
      id: '1',
      applicationDate: '2023-05-15T10:00:00Z',
      status: 'NEW',
      candidateProfile: {
        id: 'candidate1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        profileImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        profile: {
          work: [{name: 'Tech Co', position: 'Frontend Developer', startDate: '2020-01-01'}],
          skills: [{name: 'JavaScript'}, {name: 'React'}, {name: 'TypeScript'}],
          basics: {location: {city: 'New York'}}
        }
      },
      job: {
        id: 'job1',
        title: 'Frontend Developer',
        company: 'Tech Co'
      }
    },
    {
      id: '2',
      applicationDate: '2023-05-10T11:30:00Z',
      status: 'INTERVIEW',
      candidateProfile: {
        id: 'candidate2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        profileImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        profile: {
          work: [{name: 'Design Studio', position: 'UX Designer', startDate: '2018-03-01'}],
          skills: [{name: 'Figma'}, {name: 'UI/UX'}, {name: 'Prototyping'}],
          basics: {location: {city: 'San Francisco'}}
        }
      },
      job: {
        id: 'job2',
        title: 'UX Designer',
        company: 'Design Studio'
      }
    },
    {
      id: '3',
      applicationDate: '2023-05-05T14:00:00Z',
      status: 'OFFER',
      candidateProfile: {
        id: 'candidate3',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        profileImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        profile: {
          work: [{name: 'Software Inc', position: 'Backend Developer', startDate: '2016-06-01'}],
          skills: [{name: 'Java'}, {name: 'Spring'}, {name: 'Microservices'}],
          basics: {location: {city: 'Austin'}}
        }
      },
      job: {
        id: 'job3',
        title: 'Backend Developer',
        company: 'Software Inc'
      }
    }
  ];

  private mockAnalytics: AnalyticsData = {
    totalApplications: 156,
    newApplications: 42,
    interviewStage: 28,
    averageTimeToFill: 18,
    statusDistribution: [
      {status: 'New', count: 42},
      {status: 'Screening', count: 35},
      {status: 'Interview', count: 28},
      {status: 'Offer', count: 15},
      {status: 'Hired', count: 12},
      {status: 'Rejected', count: 24}
    ],
    sourceDistribution: [
      {source: 'LinkedIn', count: 65},
      {source: 'Indeed', count: 45},
      {source: 'Referral', count: 25},
      {source: 'Company Website', count: 21}
    ],
    genderDistribution: [
      {gender: 'Male', count: 82},
      {gender: 'Female', count: 68},
      {gender: 'Non-binary', count: 6}
    ]
  };

  constructor() {
    // Initialize with mock data for development
    this._applicants.next(this.mapApplicationDetailsToApplicants(this.mockApplicationDetails));
    this._analytics.next(this.mockAnalytics);
  }

  private mapApplicationDetailsToApplicants(appDetails: ApplicationDetailsDto[]): Applicant[] {
    return appDetails.map(app => ({
      id: app.id!,
      name: `${app.candidateProfile?.firstName} ${app.candidateProfile?.lastName}`,
      jobTitle: app.job?.title!,
      company: app.job?.company!,
      applicationDate: new Date(app.applicationDate!),
      status: app.status!,
      skills: app.candidateProfile?.profile?.skills?.map((s: any) => s.name) || [],
      experience: app.candidateProfile?.profile?.work?.length || 0, // Simplified experience
      location: app.candidateProfile?.profile?.basics?.location?.city || 'N/A',
      aiMatchScore: Math.floor(Math.random() * 41) + 60 // Random score for now
    }));
  }

  getApplicants(filters?: ApplicantFilter): Observable<Applicant[]> {
    // In a real implementation, this would call the API with filters
    // return this.applicationService.getAllApplications$Response(filters)
    //   .pipe(
    //     map(response => response.body as Applicant[]),
    //     tap(applicants => this._applicants.next(applicants))
    //   );

    // For now, use mock data with filtering
    let filtered = this.mockApplicationDetails;

    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(a => filters.status?.includes(a.status!));
      }

      if (filters.skills && filters.skills.length > 0) {
        filtered = filtered.filter(a =>
          a.candidateProfile?.profile?.skills?.some((skill: any) => filters.skills?.includes(skill.name))
        );
      }

      if (filters.experience) {
        filtered = filtered.filter(a => (a.candidateProfile?.profile?.work?.length || 0) >= (filters.experience || 0));
      }

      if (filters.location) {
        filtered = filtered.filter(a =>
          a.candidateProfile?.profile?.basics?.location?.city?.toLowerCase().includes(filters.location?.toLowerCase() || '')
        );
      }

      if (filters.aiMatchScore) {
        // This filter would need to be applied after mapping to Applicant
        // For now, we'll skip filtering by aiMatchScore on the raw ApplicationDetailsDto
      }
    }

    const mappedApplicants = this.mapApplicationDetailsToApplicants(filtered);
    this._applicants.next(mappedApplicants);
    return of(mappedApplicants);
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
    this.mockApplicationDetails = this.mockApplicationDetails.map(app => {
      if (applicantIds.includes(app.id!)) {
        return {...app, status: newStatus};
      }
      return app;
    });

    this._applicants.next(this.mapApplicationDetailsToApplicants(this.mockApplicationDetails));
    return of(true);
  }

  addTagsToApplicants(applicantIds: string[], tags: string[]): Observable<boolean> {
    // In a real implementation, this would call the API
    // return this.http.post<boolean>('/api/applicants/tags', { applicantIds, tags });

    // For now, simulate success
    return of(true);
  }

  exportApplicants(applicantIds: string[], format: string): Observable<string> {
    // In a real implementation, this would call the API
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
