### **P1: High - "Smart" CV/Resume Parsing**

**Objective:** To provide an AI-powered feature that automatically extracts data from an uploaded resume document and populates the user's profile.

**Required Endpoint:**

*   **Endpoint:** `POST /api/profile/parse-resume`
*   **Description:** Accepts the URL of a securely uploaded resume file, sends it to an AI service for parsing, and returns the extracted data.
*   **Request Body:**
    ```json
    {
      "fileUrl": "https://cdn.etalente.app/resumes/user-id/resume.pdf"
    }
    ```
*   **Success Response (200 OK):**
  *   A single JSON object with the **exact same structure as the `GET /api/profile/me` response**.
*   **Crucial Requirement:** The structure of this response *must* match the main profile object structure. This allows the frontend to take the response from this endpoint and directly use it to populate the user's form, and then save it using the `PUT /api/profile/me` endpoint.
