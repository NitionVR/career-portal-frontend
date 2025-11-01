# Career Portal Frontend


This repository contains the source code for the Career Portal frontend, a modern and feature-rich platform designed to connect talented professionals with employers. The application is built with Angular and provides distinct, role-based experiences for candidates and employers.

## Introduction

Career Portal is a comprehensive job portal that streamlines the hiring process. It offers a seamless interface for candidates to find jobs, build their profiles, and track applications. For employers, it provides a powerful suite of tools to manage job postings, review candidates, and collaborate with their hiring team.

## Features

### For Talent (Candidates)
- **Job Discovery**: Search and filter for job opportunities based on keywords, skills, experience level, and more.
- **Magic Link Authentication**: Secure and passwordless login and registration using email-based magic links.
- **Advanced Profile Management**: Create and manage a detailed professional profile.
- **CV Autofill**: Automatically populate profile sections by uploading a CV.
- **Document Management**: Upload and manage multiple CVs.
- **Application Tracking**: View and track the status of all job applications in one place.

### For Employers & Hiring Managers
- **Company Profile**: Manage your company's brand, logo, and description.
- **Team Management**: Invite recruiters and hiring managers to your organization and manage their roles.
- **Job Post Management**: A complete lifecycle management for job posts, including creating, editing, publishing, archiving, and closing.
- **Applicant Tracking System (ATS)**: View and manage applicants for each job post.
- **Analytics Dashboard**: Gain insights into your applicant pipeline with key metrics and visualizations.
- **Audit Log**: Track all status changes and updates to job posts for compliance and transparency.

## Tech Stack

- **Framework**: [Angular](https://angular.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom design system.
- **UI Components**: [Angular Material](https://material.angular.io/) and other custom-built components.
- **API Communication**: Auto-generated client using [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) from an OpenAPI specification.
- **Authentication**: JWT-based authentication with a magic link flow.
- **State Management**: RxJS for reactive state management.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Angular CLI](https://angular.io/cli)
- `make` command-line utility

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd career-portal-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

The project includes a `Makefile` for simplified script execution.

- **To run the development server:**
  ```bash
  make run
  ```
  The application will be available at `http://localhost:4200/`. The server will automatically reload upon file changes.

- **To build the project for production:**
  ```bash
  ng build --configuration production
  ```
  The build artifacts will be stored in the `dist/` directory.

- **To run unit tests:**
  ```bash
  ng test
  ```

## API Code Generation

The application's API client is generated from an OpenAPI specification. To update the client after changes to the API spec, run the following command:

```bash
npm run generate:api
```
This script uses `ng-openapi-gen` to regenerate the services and models in `src/app/api` and applies a necessary patch to the `base-service.ts`.

## Project Structure

The project follows a standard Angular structure with some key directories:

- **`src/app/api`**: Contains the auto-generated TypeScript client for the backend API.
- **`src/app/core`**: Holds core application logic, including authentication services, guards, interceptors, and initializers.
- **`src/app/pages`**: Contains the top-level components for each page or route in the application, organized by feature (e.g., `talent`, `employer`).
- **`src/app/shared`**: Includes reusable components, directives, and data models that are shared across different parts of the application.
- **`src/assets`**: Static assets like images, fonts, and runtime configuration files.
- **`src/environments`**: Environment-specific configuration files.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. (A formal contribution guide will be added in the future).

## License

This project is licensed under the [MIT License](LICENSE).