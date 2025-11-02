### Detailed Implementation Plan: Employer Dashboard Enhancements

**Goal:** Integrate the new Employer Applicant Management, Notifications, Audit Log, and Organization Members features into the eTalente frontend, maintaining UI consistency and preparing for backend API integration.

**Phase 0: Preparation & Setup**

1.  **Install Angular Material (if not already installed):**
    *   `ng add @angular/material` (Follow prompts for theme, typography, and animations).
    *   *Rationale:* The new components heavily rely on Angular Material, so ensuring it's properly set up is crucial.

2.  **Review Existing API Services:**
    *   Familiarize myself with `src/app/api/services/` and `src/app/api/models/` to understand existing backend interactions.
    *   *Rationale:* This helps identify which new features might already have partial API support or require new API definitions.

**Phase 1: Implement Employer Applicant Management Module**

This is the largest module and will be implemented iteratively.

1.  **Create `ApplicantManagementComponent` (Main View):**
    *   **Action:** Create files: `src/app/pages/employer/applicant-management/applicant-management.component.ts`, `.html`, `.css`.
    *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/applicant-management/applicant-management.component.html` and `new_features/src/app/pages/employer/applicant-management/applicant-management.component.ts`.
    *   **Action:** Copy the provided CSS content from `new_features/src/app/pages/employer/applicant-management/applicant-management.component.css`.
    *   **Action:** Update `src/app/app.routes.ts` to add the new route:
        ```typescript
        { path: 'applicants', component: ApplicantManagementComponent },
        ```
    *   **Action:** Update `src/app/shared/components/navigation/employer-sidebar/employer-sidebar.component.html` to add a navigation link:
        ```html
        <a routerLink="/employer/applicants" routerLinkActive="active" (click)="onNavLinkClick()"
           class="flex items-center px-4 py-3 rounded-lg transition-colors"
           [ngClass]={
             'bg-primary/10 text-primary font-semibold': rlaApplicants.isActive,
             'text-muted-foreground hover:bg-muted hover:text-foreground': !rlaApplicants.isActive
           }
           #rlaApplicants="routerLinkActive"
           matTooltip="Applicant Management" [matTooltipDisabled]="!isMinimized">
          <span class="material-symbols-outlined mr-3">people</span>
          <span class="flex-grow min-w-0" *ngIf="!isMinimized">Applicants</span>
        </a>
        ```
    *   **Verification:** Navigate to `/employer/applicants` and ensure the basic layout renders without errors. The new sidebar link should also be visible.

2.  **Implement `ApplicantManagementService`:**
    *   **Action:** Create file: `src/app/pages/employer/applicant-management/applicant-management.service.ts`.
    *   **Action:** Copy the provided TS content from `new_features/src/app/pages/employer/applicant-management/applicant-management.service.ts`.
    *   **Action:** Refactor mock data in the service to align with existing `ApplicationDetailsDto` and `CandidateProfileDto` models from `src/app/api/models` where appropriate, ensuring data consistency.
    *   *Rationale:* This service will encapsulate the logic for fetching, filtering, and managing applicant data, initially using mock data, then transitioning to real API calls.
    *   **Verification:** Ensure `ApplicantManagementComponent` can consume data from this service.

3.  **Implement `AnalyticsDashboardComponent`:**
    *   **Action:** Create files: `src/app/pages/employer/applicant-management/analytics-dashboard/analytics-dashboard.component.ts`, `.html`.
    *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/applicant-management/analytics-dashboard/analytics-dashboard.component.html` and `new_features/src/app/pages/employer/applicant-management/analytics-dashboard/analytics-dashboard.component.ts`.
    *   **Action:** Ensure `AnalyticsDashboardComponent` is imported and declared in `ApplicantManagementComponent`.
    *   **Verification:** Ensure the analytics dashboard renders correctly within `ApplicantManagementComponent` when `showAnalytics` is true.

4.  **Implement Dialogs for Applicant Management:**
    *   **`FilterDialogComponent`:**
        *   **Action:** Create files: `src/app/pages/employer/applicant-management/dialogs/filter-dialog.component.ts`, `.html`.
        *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/applicant-management/dialogs/filter-dialog.component.html` and `new_features/src/app/pages/employer/applicant-management/dialogs/filter-dialog.component.ts`.
        *   **Action:** Ensure `FilterDialogComponent` is imported and used in `ApplicantManagementComponent`.
        *   **Verification:** Open the filter dialog from `ApplicantManagementComponent` and ensure it functions.
    *   **`BulkActionDialogComponent`:**
        *   **Action:** Create files: `src/app/pages/employer/applicant-management/dialogs/bulk-action-dialog.component.ts`, `.html`.
        *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/applicant-management/dialogs/bulk-action-dialog.component.html` and `new_features/src/app/pages/employer/applicant-management/dialogs/bulk-action-dialog.component.ts`.
        *   **Action:** Ensure `BulkActionDialogComponent` is imported and used in `ApplicantManagementComponent`.
        *   **Verification:** Open the bulk action dialog from `ApplicantManagementComponent` and ensure it functions.
    *   **`CollaborationDialogComponent`:**
        *   **Action:** Create files: `src/app/pages/employer/applicant-management/dialogs/collaboration-dialog.component.ts`, `.html`.
        *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/applicant-management/dialogs/collaboration-dialog.component.html` and `new_features/src/app/pages/employer/applicant-management/dialogs/collaboration-dialog.component.ts`.
        *   **Action:** Ensure `CollaborationDialogComponent` is imported and used in `ApplicantManagementComponent`.
        *   **Verification:** Open the collaboration dialog from `ApplicantManagementComponent` and ensure it functions.

5.  **Refine `ApplicantManagementComponent` Logic:**
    *   **Action:** Implement `onSearch`, `onSort`, `onPageChange` methods to interact with `ApplicantManagementService`.
    *   **Action:** Implement `toggleSelectAll`, `toggleSelect`, `isSelected` for checkbox functionality.
    *   **Action:** Implement `openFilterDialog`, `openBulkActionDialog`, `openCollaborationDialog` to open the respective dialogs.
    *   **Action:** Implement `performBulkAction`, `updateBulkStatus`, `addBulkTags`, `exportApplications` (initially using mock service methods).
    *   **Action:** Ensure UI elements (buttons, table rows) correctly reflect selected states and data.
    *   **Verification:** All interactive elements in the `ApplicantManagementComponent` should respond as expected, even if using mock data.

**Phase 2: Implement Employer Notifications Module**

1.  **Create `EmployerNotificationsPageComponent`:**
    *   **Action:** Create files: `src/app/pages/employer/notifications/employer-notifications-page.component.ts`, `.html`.
    *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/notifications/employer-notifications-page.component.html` and `new_features/src/app/pages/employer/notifications/employer-notifications-page.component.ts`.
    *   **Action:** Update `src/app/app.routes.ts` to add the new route:
        ```typescript
        { path: 'notifications', component: EmployerNotificationsPageComponent },
        ```
    *   **Verification:** Navigate to `/employer/notifications` and ensure the basic layout renders.

2.  **Integrate Notifications with `EmployerSidebarComponent`:**
    *   **Action:** Update `src/app/shared/components/navigation/employer-sidebar/employer-sidebar.component.ts` and `.html`.
    *   **Action:** Add a new navigation link for `/employer/notifications` in `employer-sidebar.component.html`.
    *   **Action:** Implement `refreshUnreadCount` method in `EmployerSidebarComponent` (from `new_features/src/app/shared/components/navigation/employer-sidebar/employer-sidebar.component.ts`) to fetch and display the `unreadCount`.
    *   **Action:** Set up a refresh interval for `unreadCount` in `EmployerSidebarComponent`.
    *   **Verification:** The sidebar should display the notifications link with a badge showing the unread count.

3.  **Refine `EmployerNotificationsPageComponent` Logic:**
    *   **Action:** Implement `loadNotifications`, `refreshUnreadCount`, `markAllAsRead`, `markAsRead`, `nextPage`, `prevPage` methods to interact with `NotificationControllerService`.
    *   **Verification:** Notifications should load, pagination should work, and marking as read should update the UI and unread count.

**Phase 3: Implement Employer Audit Log Module**

1.  **Create `EmployerAuditLogPageComponent`:**
    *   **Action:** Create files: `src/app/pages/employer/audit-log/employer-audit-log-page.component.ts`, `.html`.
    *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/audit-log/employer-audit-log-page.component.html` and `new_features/src/app/pages/employer/audit-log/employer-audit-log-page.component.ts`.
    *   **Action:** Update `src/app/app.routes.ts` to add the new route:
        ```typescript
        { path: 'audit-log', component: EmployerAuditLogPageComponent },
        ```
    *   **Action:** Add a link to `/employer/audit-log` in `EmployerSidebarComponent`.
    *   **Verification:** Navigate to `/employer/audit-log` and ensure the basic layout renders.

2.  **Refine `EmployerAuditLogPageComponent` Logic:**
    *   **Action:** Implement `loadJobPosts`, `selectPost`, `loadAudit`, `nextPostsPage`, `prevPostsPage` methods to interact with `JobPostControllerService`.
    *   **Verification:** Job posts should load, selecting a post should display its audit history, and pagination should work.

**Phase 4: Implement Organization Members Management Module**

1.  **Create `OrganizationMembersComponent`:**
    *   **Action:** Create files: `src/app/pages/employer/company-profile/organization-members/organization-members.component.ts`, `.html`, `.scss`, `.css`.
    *   **Action:** Copy the provided HTML, TS, SCSS, and CSS content from `new_features/src/app/pages/employer/company-profile/organization-members/organization-members.component.html`, `new_features/src/app/pages/employer/company-profile/organization-members/organization-members.component.ts`, `new_features/src/app/pages/employer/company-profile/organization-members/organization-members.component.scss`, and `new_features/src/app/pages/employer/company-profile/organization-members/organization-members.component.css`.
    *   **Action:** Ensure `OrganizationMembersComponent` is imported and declared in `CompanyProfileComponent`.
    *   **Verification:** Ensure the component renders correctly.

2.  **Implement `InviteRecruiterDialogComponent`:**
    *   **Action:** Create files: `src/app/pages/employer/company-profile/organization-members/invite-recruiter-dialog/invite-recruiter-dialog.component.ts`, `.html`.
    *   **Action:** Copy the provided HTML and TS content from `new_features/src/app/pages/employer/company-profile/organization-members/invite-recruiter-dialog/invite-recruiter-dialog.component.html` and `new_features/src/app/pages/employer/company-profile/organization-members/invite-recruiter-dialog/invite-recruiter-dialog.component.ts`.
    *   **Action:** Ensure `InviteRecruiterDialogComponent` is imported and used in `OrganizationMembersComponent`.
    *   **Verification:** Open the invite dialog from `OrganizationMembersComponent` and ensure it functions.

3.  **Integrate `OrganizationMembersComponent` into `CompanyProfileComponent`:**
    *   **Action:** Update `src/app/pages/employer/company-profile/company-profile.component.ts` and `.html`.
    *   **Action:** Add `MatTabsModule` to imports in `company-profile.component.ts`.
    *   **Action:** Modify `company-profile.component.html` to include `mat-tab-group` and `mat-tab` for "Company Profile" and "Organization Members" (as seen in `new_features/src/app/pages/employer/company-profile/company-profile.component.html`).
    *   **Verification:** The company profile page should now have two tabs, with the "Organization Members" tab displaying the new component.

4.  **Refine `OrganizationMembersComponent` Logic:**
    *   **Action:** Implement `loadOrganizationMembers`, `loadPendingInvitations` (initially using mock data, then integrating with `OrganizationControllerService` and `InvitationControllerService`).
    *   **Action:** Implement `openInviteDialog`, `inviteRecruiters`, `revokeInvitation`, `resendInvitation`, `updateMemberRole`, `removeMember`.
    *   **Action:** Implement filtering and searching logic for members.
    *   **Action:** Implement `getInitials`, `getRoleChipClass`, `getStatusChipClass` for UI presentation.
    *   **Verification:** All interactive elements should respond as expected, and data should display correctly.

**Phase 5: Backend API Integration (Post-Frontend Implementation)**

1.  **Identify Missing API Endpoints:**
    *   **Action:** Review `ApplicantManagementService`, `EmployerNotificationsPageComponent`, `EmployerAuditLogPageComponent`, `OrganizationMembersComponent` for mock API calls.
    *   **Action:** List all required API endpoints for:
        *   Fetching applicants with filters, search, sort, pagination.
        *   Fetching applicant analytics data.
        *   Performing bulk actions (status update, tag addition, export).
        *   Adding collaboration notes.
        *   Fetching organization members.
        *   Inviting recruiters (bulk and single).
        *   Revoking/resending invitations.
        *   Updating member roles.
        *   Removing members.
        *   Fetching job post audit logs.
        *   Fetching notifications and unread counts.
        *   Marking notifications as read (single and all).

2.  **Update API Services:**
    *   **Action:** Modify `src/app/api/services/` (e.g., `JobApplicationControllerService`, `NotificationControllerService`, `OrganizationControllerService`, `InvitationControllerService`) to include new methods corresponding to the identified API endpoints.
    *   **Action:** Update `src/app/api/models/` with any new DTOs or request/response structures required by the new APIs.
    *   *Rationale:* This step will replace the mock service implementations with actual backend calls.

**Phase 6: UI/UX Refinement & Consistency**

1.  **Global Style Application:**
    *   **Action:** Ensure all new components consistently use the defined Tailwind CSS classes and the `glassmorphism` style.
    *   **Action:** Verify that Angular Material components are themed correctly and match the application's overall design.
    *   **Action:** Address any visual discrepancies or misalignments.
    *   *Rationale:* Maintain the "beautiful UI design" as per the user's preference.

**Phase 7: Testing**

1.  **Unit Tests:**
    *   **Action:** Write unit tests for all new components, services, and dialogs.
    *   **Action:** Focus on testing component logic, service data handling, and dialog interactions.
    *   *Rationale:* Ensure individual parts of the application work correctly in isolation.

2.  **Integration Tests:**
    *   **Action:** Test the interaction between components and services within each module.
    *   **Action:** Verify data flow and state changes across integrated parts.
    *   *Rationale:* Ensure modules work correctly when combined.

3.  **End-to-End (E2E) Tests:**
    *   **Action:** Develop E2E tests for critical user flows (e.g., employer logs in, navigates to applicant management, filters applicants, performs a bulk action).
    *   *Rationale:* Validate the entire application from a user's perspective.

**Phase 8: Code Review & Cleanup**

1.  **Code Quality:**
    *   **Action:** Conduct a thorough code review to ensure adherence to Angular best practices, coding standards, and maintainability.
    *   **Action:** Remove all mock data and temporary console logs once real API integration is complete and verified.
    *   *Rationale:* Ensure the codebase remains clean, efficient, and easy to maintain.

2.  **Documentation:**
    *   **Action:** Update any relevant `README.md` files or internal documentation with details about the new features and their usage.
    *   *Rationale:* Keep the project documentation current.
