# Backend API Requirements: Dynamic Application Forms

**Objective:** To move beyond a one-size-fits-all profile and allow employers to specify exactly which pieces of a candidate's profile they require for a specific job application. This allows candidates to apply faster by only providing the necessary information.

---

### **P1: High - Job Post Schema Definition**

*   **Concept:** When creating a job post, the employer needs a way to define the "schema" for the application. This means specifying which sections of the JSON Resume are required.
*   **Endpoint to Modify:** `POST /api/job-posts` and `PUT /api/job-posts/{id}`
*   **Required Change:** The `JobPostRequest` DTO needs a new field.
    *   **`requiredProfileSections`**: `string[]`
        *   **Description:** An array of strings where each string is a key from the main JSON Resume schema (e.g., `"basics"`, `"work"`, `"skills"`, `"education"`).
*   **Example Payload:**
    ```json
    {
      "title": "Senior Frontend Developer",
      "description": "...",
      "requiredProfileSections": [
        "basics",
        "work",
        "skills"
      ]
      // ... other job post fields
    }
    ```

### **P2: Medium - Application Submission with Partial Profile**

*   **Concept:** When a candidate applies, the backend must validate that all the sections required by the job post are present in the candidate's profile.
*   **Endpoint to Modify:** `POST /api/job-applications/apply`
*   **Required Change:** The backend logic needs to:
    1.  Fetch the `JobPost` and its `requiredProfileSections`.
    2.  Fetch the applying candidate's full profile (`GET /api/profile/me`).
    3.  Compare the two. For each section listed in `requiredProfileSections`, check if the corresponding key exists and is not empty in the candidate's profile.
    4.  If any required section is missing, the API should reject the application with a `400 Bad Request` and a clear error message.
*   **Example Error Response:**
    ```json
    {
      "error": "Incomplete Profile",
      "message": "This application requires the following sections to be completed in your profile: Work Experience, Skills."
    }
    ```

### **P3: Low - Exposing the Schema to the Frontend**

*   **Concept:** The frontend needs to know which sections are required *before* the user clicks "Apply" so it can intelligently guide them.
*   **Endpoint to Modify:** `GET /api/job-posts/{id}`
*   **Required Change:** The `JobPostResponse` DTO must be updated to include the `requiredProfileSections` array.
*   **Impact:** This will allow the frontend to display a message like, "This application requires your Work History and Skills. Your profile is ready to go!" or "You need to complete your Work History before applying."
