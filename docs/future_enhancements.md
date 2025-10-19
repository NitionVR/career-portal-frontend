# Future Enhancements & Technical Debt Log

This document tracks planned features and required fixes that are dependent on other epics being completed.

---

### 1. Stateful "New Applicant" Badge

*   **Epic:** #1 (Employer Dashboard)
*   **Current State:** The dashboard correctly displays a pulsing badge if `newApplicantsCount` is greater than zero. However, this state is persistent and does not reset when the employer views the applicants.
*   **Blocking Dependency:** This feature is blocked by the completion of **Epic #4 (Candidate & Application Viewing)**, specifically the creation of the `ViewApplicantsComponent` at `/employer/jobs/:id/applicants`.
*   **Required Backend Change:**
    *   **Endpoint:** `POST /api/job-posts/{jobId}/applicants/mark-as-viewed`
    *   **Description:** An authenticated endpoint that resets the `newApplicantsCount` for a given job post for the current user.
*   **Required Frontend Change (To be done *after* Epic #4 is complete):
    *   In the `EmployerJobPostsListComponent`, the `(click)` event on the "View Applicants" button will call a new method, `onViewApplicants(jobId)`.
    *   This method will first call the new `mark-as-viewed` backend endpoint.
    *   On success, it will then navigate the user to the applicants page.
    *   It will also optimistically set the `newApplicantsCount` to 0 in the local component state to provide immediate visual feedback.
