### **Consolidated Plan: Phase 1 - Core Employer Experience MVP**

**Objective:** Allow an employer to sign up, create a public job post, manage their company profile, and view the candidates who have applied.

---

#### **1. Epic: Employer Dashboard & Initial Views**
*   **User Story:** As an employer, when I log in, I want to see a dashboard with a list of my organization's job posts so I can quickly assess their status.
*   **Frontend:**
    *   Create a new `EmployerDashboardComponent` at `/employer/dashboard`.
    *   Adapt the existing `JobPostsListComponent` to display employer-specific data: Job Title, Status (Draft, Published, etc.), and a prominent badge for "New Applicants."
    *   Each job post item will have "View Applicants" and "Edit" actions.
    *   Implement an "Empty State" component with a clear "Create Your First Job Post" call-to-action.
*   **Backend:**
    *   The `/api/job-posts/my-posts` endpoint must be enhanced to include `newApplicantCount` for each job post.

#### **2. Epic: Job Post Creation & Lifecycle**
*   **User Story:** As a Hiring Manager, I want to create and edit job posts, saving them as drafts or publishing them publicly.
*   **Frontend:**
    *   Create a `JobPostFormComponent` for creating/editing jobs.
    *   The form will use Angular Reactive Forms for validation.
    *   It will include a **non-editable, default set of hiring stages** for the MVP (e.g., NEW -> ASSESSMENT -> INTERVIEW -> OFFER).
    *   The form will have "Save as Draft" and "Publish" buttons.
*   **Backend:**
    *   Ensure `createJobPost` and `updateJobPost` endpoints correctly handle the `DRAFT` and `PUBLISHED` states.
    *   No review/approval workflow is required for Phase 1.

#### **3. Epic: Company & User Management**
*   **User Story:** As a Hiring Manager, I want to set up my company's public profile so that it appears on job posts.
*   **Frontend:**
    *   Create a `CompanyProfileComponent` at `/employer/settings/company`.
    *   The form will allow uploading a company logo and editing company details (name, description, website).
    *   Include clear UI helper text: "This logo and information will appear on all your job posts."
*   **Backend:**
    *   Requires API endpoints to create, read, and update the `Organization` entity's profile details (logo, description, etc.).

#### **4. Epic: Candidate & Application Viewing**
*   **User Story:** As an employer, I want to view all candidates who have applied for a specific job.
*   **Frontend:**
    *   Create a `ViewApplicantsComponent` at `/employer/jobs/:id/applicants`.
    *   **MVP Implementation:** Display applicants in a simple list or table, showing Name, Application Date, and Current Stage.
    *   Clicking an applicant will navigate to the existing `ApplicationDetailsPageComponent`, which will be adapted for the employer's view.
*   **Backend:**
    *   Ensure the `JobApplicationControllerService` has an endpoint to efficiently fetch all applications for a given `jobId`.

#### **5. Epic: Core Notifications**
*   **User Story:** As an employer, I want to receive an email when a new candidate applies to my job post.
*   **Frontend:** No immediate UI work is required for this specific story in Phase 1, beyond what's on the dashboard.
*   **Backend:**
    *   Implement the `new-application-submitted` Novu trigger, which fires an event when a candidate applies.
    *   Configure the corresponding email template in the Novu dashboard.