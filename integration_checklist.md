### Updated Integration Plan & Checklist

**Phase 5.1: Applicant Management Integration**

*   [x] **`GET /api/applicants`:** Verify that the existing integration in `ApplicantManagementService` correctly calls the endpoint with all filtering, sorting, and pagination parameters.
*   [ ] **`POST /api/applicants/bulk-update-status`:**
    *   [ ] Implement the `updateBulkStatus` method in `ApplicantManagementService` to call the new endpoint.
    *   [ ] Ensure the `BulkActionDialogComponent` correctly passes the selected `applicationIds` and `newStatus` to the service.
    *   [ ] Add response handling to show success or failure messages based on the `BulkActionResponse`.
*   [ ] **`GET /api/applicants/export`:**
    *   [ ] Implement the `exportApplications` method in `ApplicantManagementService`.
    *   [ ] The method should construct the full URL for `/api/applicants/export` with all active filters as query parameters.
    *   [ ] Trigger the download in the browser by setting `window.location.href`.
*   [ ] **`POST /api/applicants/{applicationId}/notes`:**
    *   [ ] Implement the `addCollaborationNote` method in `ApplicantManagementService`.
    *   [ ] Ensure the `CollaborationDialogComponent` calls this service method upon saving a note.

**Phase 5.2: Organization & Members Integration**

*   [ ] **`GET /api/organization/members`:**
    *   [ ] Create a new method in `OrganizationControllerService` to call this endpoint.
    *   [ ] Replace the mock data in `OrganizationMembersComponent` with the live data from the service call.
*   [ ] **`PUT /api/organization/members/{memberId}/role`:**
    *   [ ] Implement the `updateMemberRole` method in `OrganizationMembersComponent` to call this new endpoint.
*   [ ] **`DELETE /api/organization/members/{memberId}`:**
    *   [ ] Implement the `removeMember` method in `OrganizationMembersComponent` to call this endpoint.
*   [ ] **`POST /api/invitations/resend/{invitationId}`:**
    *   [ ] Implement the `resendInvitation` method in `OrganizationMembersComponent` to call this new endpoint.
*   [ ] **Verify Existing Endpoints:**
    *   [ ] Check that `GET /api/invitations` provides all necessary data for the pending invitations table.
    *   [ ] Update `POST /api/invitations/recruiter` and `bulk-recruiter` calls to include the optional `personalMessage` from the `InviteRecruiterDialogComponent`.
*   [x] **Verify Logo Upload Functionality:**
    *   Confirm that the `CompanyProfileComponent` correctly uses the existing endpoints (`/api/organization/logo/upload-url`, `/api/organization/logo`) for logo uploads, as per the backend team's notes.

**Phase 5.3: Resume Management Integration (Future Phase)**

*   [ ] **`POST /api/profile/me/resumes/upload-url` & `POST /api/profile/me/resumes`:** Implement the two-step resume upload flow on the candidate profile page.
*   [ ] **`DELETE /api/profile/me/resumes/{resumeId}`:** Implement resume deletion.
*   [ ] **`GET /api/profile/me/resumes`:** Implement the listing of uploaded resumes.
