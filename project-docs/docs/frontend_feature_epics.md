# Frontend Feature Development Epics

This document outlines the epics and user stories for the development of new features on the Etalente frontend. It is based on the analysis of the existing application and the available backend API endpoints.

---

## Epic 1: Complete File Upload Functionality

**Goal:** Allow users to upload and manage their profile pictures and company logos.

**User Stories:**

*   **Story 1.1: Candidate Profile Picture Upload**
    *   **As a:** Candidate
    *   **I want to:** Upload, change, or remove my profile picture on my profile page.
    *   **Acceptance Criteria:**
        *   The profile page has a UI for selecting an image file.
        *   The frontend calls the `getAvatarUploadUrl` endpoint to get a pre-signed S3 URL.
        *   The frontend uploads the selected image file directly to the returned S3 URL using a `PUT` request.
        *   Upon successful upload, the frontend calls the `updateAvatar` endpoint to finalize the process.
        *   The user's profile picture updates in the UI without requiring a page refresh.
    *   **Backend API:** `ProfileControllerService`

*   **Story 1.2: Employer Company Logo Upload**
    *   **As a:** Hiring Manager
    *   **I want to:** Upload, change, or remove our company logo on the company profile page.
    *   **Acceptance Criteria:**
        *   The company profile page has a UI for selecting an image file.
        *   The frontend calls the `getLogoUploadUrl` endpoint.
        *   The frontend uploads the image to the pre-signed S3 URL.
        *   The frontend calls the `updateLogo` endpoint to finalize.
        *   The company logo updates in the UI.
    *   **Backend API:** `OrganizationControllerService`

---

## Epic 2: Implement Application Lifecycle Management

**Goal:** Empower employers to manage the hiring workflow by changing the status of candidate applications.

**User Stories:**

*   **Story 2.1: Advance/Reject Candidate**
    *   **As a:** Hiring Manager or Recruiter
    *   **I want to:** Be able to change the status of a candidate's application (e.g., "Advance to Interview", "Reject") from the application details page.
    *   **Acceptance Criteria:**
        *   The `EmployerApplicationDetailsComponent` has functional "Advance" and "Reject" buttons.
        *   Clicking "Advance" presents a dropdown or modal with the next possible stages (e.g., 'Interview', 'Offer').
        *   Selecting a new stage calls the backend endpoint to update the application status.
        *   The UI updates to reflect the new application status.
    *   **Backend API:** `WorkflowControllerService` (Endpoint `transitionState` seems to exist based on `StateTransitionRequest` model, but needs verification).

---

## Epic 3: Build Employer User Management

**Goal:** Provide Hiring Managers with the tools to manage their team by inviting and viewing organization members.

**User Stories:**

*   **Story 3.1: View Organization Members**
    *   **As a:** Hiring Manager
    *   **I want to:** See a list of all users (Hiring Managers and Recruiters) who belong to my organization.
    *   **Acceptance Criteria:**
        *   A new "Team" or "User Management" page is created in the `/employer` section.
        *   This page displays a table with the name, email, and role of each user in the organization.
    *   **Backend API:** **NEEDS DRAFTING.** A new endpoint like `GET /api/organization/users` is required.

*   **Story 3.2: Invite Recruiters**
    *   **As a:** Hiring Manager
    *   **I want to:** Invite a new recruiter to join my organization by sending an email invitation.
    *   **Acceptance Criteria:**
        *   The new "User Management" page has an "Invite Recruiter" button.
        *   This opens a modal with a form to enter the recruiter's email address.
        *   Submitting the form calls the `inviteRecruiter` endpoint.
        *   A success message is shown.
    *   **Backend API:** `InvitationControllerService.inviteRecruiter`

*   **Story 3.3: View and Manage Invitations**
    *   **As a:** Hiring Manager
    *   **I want to:** See a list of all pending invitations and be able to revoke them.
    *   **Acceptance Criteria:**
        *   The "User Management" page has a section showing pending invitations.
        *   Each invitation shows the recipient's email and the date it was sent.
        *   Each invitation has a "Revoke" button that calls the `revokeInvitation` endpoint.
    *   **Backend API:** `InvitationControllerService.listOrganizationInvitations`, `InvitationControllerService.revokeInvitation`

---

## Epic 4: Implement Recruiter Role & Views

**Goal:** Create a dedicated experience for the Recruiter user role.

**User Stories:**

*   **Story 4.1: Recruiter Dashboard**
    *   **As a:** Recruiter
    *   **I want to:** See a dashboard summarizing the job posts I am assigned to and the status of my candidates.
    *   **Acceptance Criteria:**
        *   A new route and component for `/recruiter/dashboard` is created.
        *   The dashboard displays key metrics and lists of assigned jobs.
    *   **Backend API:** Requires investigation. Endpoints to get jobs/applications assigned to a specific recruiter will be needed.

*   **Story 4.2: Recruiter Application Management**
    *   **As a:** Recruiter
    *   **I want to:** View and manage the applications for the job posts I am assigned to.
    *   **Acceptance Criteria:**
        *   Recruiters can navigate from their dashboard to a view similar to the employer's "View Applicants" page, but filtered to their assigned jobs.
        *   Recruiters can use the same application lifecycle controls (from Epic 2) as a Hiring Manager.
    *   **Backend API:** `JobApplicationControllerService`, `WorkflowControllerService` (with authorization checks for recruiter assignment).
