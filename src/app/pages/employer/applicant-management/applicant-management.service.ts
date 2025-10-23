import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ApplicantsService } from '../../../api/services/applicants.service';


import { ApplicantSummaryDto } from '../../../api/models/applicant-summary-dto';
import { Pageable } from '../../../api/models/pageable';
import { GetApplicants$Params, getApplicants } from '../../../api/fn/applicants/get-applicants';
import { PageApplicantSummaryDto } from '../../../api/models/page-applicant-summary-dto';

export interface ApplicantFilter {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  jobId?: string | null; // Allow null
  status?: string[];
  skills?: string[];
  experience?: number; // This will map to experienceMin
  education?: string[];
  location?: string;
  aiMatchScore?: number; // This will map to aiMatchScoreMin
}

export interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
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
  private applicantsService = inject(ApplicantsService);

  private _applicants = new BehaviorSubject<Applicant[]>([]);
  private _filters = new BehaviorSubject<ApplicantFilter>({});
  private _analytics = new BehaviorSubject<AnalyticsData | null>(null);

  applicants$ = this._applicants.asObservable();
  filters$ = this._filters.asObservable();
  analytics$ = this._analytics.asObservable();



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

    this._analytics.next(this.mockAnalytics);
  }

  private mapApplicantSummaryDtoToApplicants(appSummaries: ApplicantSummaryDto[]): Applicant[] {
    return appSummaries.map(app => ({
      id: app.id!,
      name: app.candidateName!,
      jobTitle: app.jobTitle!,
      applicationDate: new Date(app.applicationDate!),
      status: app.status!,
      skills: app.skills || [],
      experience: app.experienceYears || 0,
      location: app.location || 'N/A',
      aiMatchScore: app.aiMatchScore || 0 // Use 0 as mock if null
    }));
  }

  getApplicants(filters?: ApplicantFilter): Observable<Applicant[]> {
    const getApplicantsParams: GetApplicants$Params = {
      pageable: {
        page: filters?.page || 0, // Default to 0
        size: filters?.size || 10, // Default to 10
        sort: [filters?.sort || 'applicationDate,desc'] // Default sort
      },
      search: filters?.search,
      jobId: filters?.jobId ?? undefined, // Convert null to undefined
      statuses: filters?.status, // Note: backend expects 'statuses'
      skillSearch: Array.isArray(filters?.skills) ? filters?.skills.join(',') : filters?.skills, // Ensure skills is an array before joining
      experienceMin: filters?.experience,
      education: filters?.education,
      location: filters?.location,
      aiMatchScoreMin: filters?.aiMatchScore
    };

    console.log('Making API call to:', getApplicants.PATH, getApplicantsParams); // Added for debugging
    return this.applicantsService.getApplicants$Response(getApplicantsParams).pipe(
      map(response => {
        const mapped = this.mapApplicantSummaryDtoToApplicants(response.body?.content || []);
        this._applicants.next(mapped);
        // Also update total count for paginator, etc. (response.body?.totalElements, response.body?.totalPages)
        return mapped;
      }),
      tap(applicants => this._applicants.next(applicants))
    );
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
