# Etalente-clone Frontend

This repository will house the frontend application for the Etalente-clone talent acquisition platform. It will provide the user interface for candidates and recruiters to interact with the system.

## Purpose
This project is dedicated to building a modern, responsive, and intuitive user experience for the Etalente-clone application. It will consume APIs provided by the `etalente-clone-backend` service.

## Planned Technologies
*   **Framework:** Angular 20+
*   **Language:** TypeScript
*   **Styling:** Angular Material
*   **Package Manager:** npm

## Getting Started (Initial Setup)
1.  **Clone the repository:**
    ```bash
    git clone <frontend_repo_url>
    cd etalente-clone-frontend
    ```
2.  **Initial Dependencies (Placeholder):**
    *   Node.js (LTS version recommended)
    *   npm
    *   Angular CLI (will be installed later)

    _Note: Full application setup and run instructions will be added once the project structure and initial code are in place._

## Commit Strategy (Conventional Commits)

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages. This helps in creating an explicit development history, enabling automated changelog generation, and simplifying semantic versioning.

**Format:** `<type>[optional scope]: <description>`

**Example:**
```
feat(auth): implement magic link authentication
fix(deps): update vulnerable dependency lodash
docs(readme): add initial setup instructions
```

**Common Types:**
*   `feat`: A new feature
*   `fix`: A bug fix
*   `docs`: Documentation only changes
*   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
*   `refactor`: A code change that neither fixes a bug nor adds a feature
*   `perf`: A code change that improves performance
*   `test`: Adding missing tests or correcting existing tests
*   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
*   `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
*   `chore`: Other changes that don't modify src or test files
*   `revert`: Reverts a previous commit

## License
MIT License
