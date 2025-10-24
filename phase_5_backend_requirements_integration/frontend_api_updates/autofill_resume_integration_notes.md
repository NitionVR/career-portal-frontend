# Autofill Resume Integration Notes (Frontend)

This commit integrates the resume autofill flow into the Talent Profile page and adds the missing API client for `POST /api/profile/me/autofill-resume`.

What’s implemented:
- API client: `autofillResume` in `ProfileControllerService` via new function module `fn/profile-controller/autofill-resume.ts`.
- Profile page CV upload:
  1) `getResumeUploadUrl` to obtain `uploadUrl` and `fileUrl`.
  2) `PUT` file to `uploadUrl`.
  3) `addResumeToProfile` with `{ url, filename }`.
  4) `autofillResume` with `{ url }`.
  5) Reload profile via `getCurrentUserProfile` and `patchValue` to reflect merged data.

UI entry point:
- Button: `Upload CV to Autofill` on `src/app/pages/talent/profile-page/profile-page.html`.
- Logic: `handleCVUpload` in `profile-page.ts`.

Developer notes:
- Accepted file types: `.pdf,.doc,.docx` (MIME checked).
- Autofill intentionally does not set `firstName`/`lastName` (per backend spec).
- Error handling: snackbars surface failures for upload URL, PUT upload, resume save, and autofill.
- No custom headers are sent during the `PUT` to presigned URL; browser handles content headers.

Testing:
- Start dev server: `npm start` (or `ng serve --host 0.0.0.0 --port 4300`).
- Navigate to `/talent/profile` (ensure user is authenticated as Candidate).
- Use the upload button to trigger flow and verify profile fields update.