# Form Field & Accessibility Best Practices Log

This document summarizes the solutions applied to the `profile-create` page. These fixes serve as a best practice guide for all current and future forms in the application to ensure consistency, accessibility, and a high-quality user experience.

---

### 1. Field-Level Validation Messages

*   **Problem:** Forms were only showing a single, generic error message at the top, forcing users to guess which field was incorrect.
*   **Solution:**
    1.  **Component Logic:** Added two helper methods to the component's TypeScript file:
        *   `hasError(fieldName: string): boolean`: Checks if a specific form control is invalid and has been touched by the user.
        *   `getErrorMessage(fieldName: string): string`: Returns a specific error message based on the validation error (`required`, `minLength`, `pattern`, etc.).
    2.  **Template Logic:** In the HTML, placed a `<p>` tag directly below each form input.
        *   Used `*ngIf="hasError('fieldName')"` to only show the message when there's an error.
        *   Displayed the message by calling `{{ getErrorMessage('fieldName') }}`.
        *   Applied a `border-destructive` class to the input itself using `[class.border-destructive]="hasError('fieldName')"`.
    3.  **Submission Logic:** Updated the `onSubmit` method to mark all form controls as touched (`.markAsTouched()`) if the form is invalid, which triggers the display of all error messages at once.

---

### 2. Handling Browser Autofill Styles

*   **Problem:** Browsers (especially Chrome) override the default styles of input fields when they are autofilled, resulting in a white or light-yellow background that clashes with the application's theme.
*   **Solution:** Added a global override to `styles.css` that targets the `-webkit-autofill` pseudo-selector. This is a safe, cosmetic-only fix.
    ```css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: hsl(var(--foreground)); /* Ensures text color matches the theme */
      -webkit-box-shadow: 0 0 0 30px hsl(var(--background)) inset !important; /* Creates a fake background */
      box-shadow: 0 0 0 30px hsl(var(--background)) inset !important;
    }
    ```

---

### 3. Associating Labels with Inputs for Accessibility

*   **Problem:** Browser complaints indicated that `<label>` elements were not correctly associated with their corresponding `<input>` or custom form components, harming accessibility and usability (e.g., clicking a label didn't focus the input).
*   **Solution (Best Practice):** Instead of relying on matching `for` and `id` attributes, we refactored the HTML to **wrap the form element within its label**. This creates an implicit, robust connection that is the recommended approach, especially for custom components.

    **Before:**
    ```html
    <label for="gender">Gender</label>
    <app-custom-select id="gender" ...></app-custom-select>
    ```

    **After (Correct):**
    ```html
    <label>
      Gender
      <app-custom-select id="gender" ...></app-custom-select>
    </label>
    ```

---

### 4. Preventing Double Submissions

*   **Problem:** Users could click the submit button multiple times while waiting for an API response, potentially creating duplicate data.
*   **Solution:**
    1.  **Component Logic:** Added an `isSubmitting = false;` property to the component.
    2.  **Submission Logic:**
        *   In the `onSubmit` method, the first check is `if (this.isSubmitting) { return; }`.
        *   Set `this.isSubmitting = true;` right before the API call.
        *   In the `error` and `complete` blocks of the API subscription, reset `this.isSubmitting = false;`.
    3.  **Template Logic:**
        *   Bound the `disabled` attribute of the submit button: `[disabled]="isSubmitting"`.
        *   Used `*ngIf` to show a loading spinner and "Processing..." text on the button when `isSubmitting` is true.
