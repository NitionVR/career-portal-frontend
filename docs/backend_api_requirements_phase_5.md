### Backend API Requirements for Employer Features

This document outlines the required API endpoints and data transfer objects (DTOs) to support the new employer-facing features: Applicant Management, Notifications, Audit Logs, and Organization Members.

**1. Applicant Management Module (`/api/applicants`)**

This module requires the most significant new backend work.

*   **Endpoint:** `GET /api/applicants`
    *   **Description:** Fetches a paginated and filterable list of applicants for the current employer's organization.
    *   **Query Parameters:**
        *   `page`: `number` (e.g., 0)
        *   `size`: `number` (e.g., 10)
        *   `sort`: `string` (e.g., `applicationDate,desc`)
        *   `search`: `string` (for general text search on candidate name, job title, etc.)
        *   `jobId`: `string` (to filter by a specific job post)
        *   `status`: `string[]` (e.g., `NEW,REVIEWING`)
        *   `skills`: `string[]` (e.g., `React,NodeJS`)
        *   `experienceMin`: `number`
        *   `education`: `string[]`
        *   `location`: `string`
        *   `aiMatchScoreMin`: `number` (0-100)
    *   **Response:** `Page<ApplicantSummaryDto>`
        *   **`ApplicantSummaryDto`:**
            ```typescript
            interface ApplicantSummaryDto {
              id: string;
              candidateName: string;
              jobTitle: string;
              jobId: string;
              profileImageUrl?: string;
              aiMatchScore: number;
              skills: string[];
              experienceYears: number;
              location: string;
              applicationDate: string; // ISO 8601
              status: string;
            }
            ```

*   **Endpoint:** `POST /api/applicants/bulk-action`
    *   **Description:** Performs a bulk action on a set of applications.
    *   **Request Body:**
        ```typescript
        interface BulkActionRequest {
          applicationIds: string[];
          action: 'UPDATE_STATUS' | 'ADD_TAGS' | 'EXPORT';
          payload: {
            // For UPDATE_STATUS
            newStatus?: string;
            sendNotification?: boolean;
            // For ADD_TAGS
            tags?: string[];
            // For EXPORT
            format?: 'csv' | 'pdf';
            fields?: string[]; // e.g., ['contact', 'skills']
          };
        }
        ```
    *   **Response:** `200 OK` with a confirmation message or a URL for the exported file.

*   **Endpoint:** `POST /api/applicants/{applicationId}/notes`
    *   **Description:** Adds a collaboration note to a specific application.
    *   **Request Body:**
        ```typescript
        interface CollaborationNoteRequest {
          note: string;
          mentionedUserIds?: string[]; // To notify other team members
        }
        ```
    *   **Response:** `201 Created` with the newly created `CollaborationNoteDto`.

*   **Endpoint:** `GET /api/applicants/analytics`
    *   **Description:** Retrieves aggregated analytics data for the employer's applicant pipeline.
    *   **Query Parameters:**
        *   `period`: `string` (e.g., `30d`, `90d`, `1y`)
        *   `jobId`: `string` (optional, to scope analytics to a specific job)
    *   **Response:** `AnalyticsDto`
        ```typescript
        interface AnalyticsDto {
          totalApplications: number;
          newApplications: number;
          interviewStage: number;
          averageTimeToFill: number; // in days
          statusDistribution: { status: string; count: number; }[];
          sourceDistribution: { source: string; count: number; }[];
          genderDistribution: { gender: string; count: number; }[];
          // ... any other relevant analytics
        }
        ```

**2. Organization & Members Module (`/api/organization`)**

*   **Endpoint:** `GET /api/organization/members`
    *   **Description:** Fetches a list of all members in the current user's organization.
    *   **Response:** `OrganizationMemberDto[]`
        ```typescript
        interface OrganizationMemberDto {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          role: 'HIRING_MANAGER' | 'RECRUITER';
          status: 'ACTIVE' | 'DISABLED';
          joinedDate: string; // ISO 8601
        }
        ```

*   **Endpoint:** `PUT /api/organization/members/{memberId}/role`
    *   **Description:** Updates the role of a specific member within the organization.
    *   **Request Body:**
        ```typescript
        interface UpdateMemberRoleRequest {
          newRole: 'HIRING_MANAGER' | 'RECRUITER';
        }
        ```
    *   **Response:** `200 OK` with the updated `OrganizationMemberDto`.

*   **Endpoint:** `DELETE /api/organization/members/{memberId}`
    *   **Description:** Removes a member from the organization.
    *   **Response:** `204 No Content`.

*   **Endpoint:** `POST /api/invitations/resend/{invitationId}`
    *   **Description:** Resends an expired or pending invitation.
    *   **Response:** `200 OK`.

**3. Existing Endpoints to Verify/Update**

*   `GET /api/invitations`: Should be verified to ensure it returns all necessary data for the "Pending Invitations" table (`id`, `email`, `createdAt`, `status`).
*   `POST /api/invitations/recruiter` & `POST /api/invitations/bulk-recruiter`: Should be updated to accept an optional `personalMessage` field in the request body to align with the UI.
