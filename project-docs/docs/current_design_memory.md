# Current eTalente Frontend Design Memory

This document captures the current color palette and typography definitions as of October 10, 2025, to serve as a reference point for future design iterations.

---

## 1. Color Palette (HSL Values)

The application uses a dark-first theme, with a light theme defined in the `:root` block and overridden in the `.dark` class.

### 1.1. Light Theme (Default - `:root` block in `src/styles.css`)

| Variable Name        | HSL Value           | Description                               |
| :------------------- | :------------------ | :---------------------------------------- |
| `--background`       | `0 0% 100%`         | Base background color                     |
| `--foreground`       | `222.2 84% 4.9%`    | Base text color                           |
| `--card`             | `0 0% 100%`         | Card background color                     |
| `--card-foreground`  | `222.2 84% 4.9%`    | Card text color                           |
| `--popover`          | `0 0% 100%`         | Popover background color                  |
| `--popover-foreground` | `222.2 84% 4.9%`    | Popover text color                        |
| `--primary`          | `48 96% 53%`        | Primary accent color (Yellow)             |
| `--primary-foreground` | `222 41% 11%`       | Text color on primary background          |
| `--primary-hover`    | `45 96% 56%`        | Primary color on hover                    |
| `--secondary`        | `217 91% 60%`       | Secondary accent color (Blue)             |
| `--secondary-foreground` | `210 20% 98%`       | Text color on secondary background        |
| `--muted`            | `210 40% 96.1%`     | Muted background color                    |
| `--muted-foreground` | `215.4 16.3% 46.9%` | Muted text color                          |
| `--accent`           | `217 91% 60%`       | Accent color (Blue)                       |
| `--accent-foreground` | `210 20% 98%`       | Text color on accent background           |
| `--success`          | `142 76% 36%`       | Success message color                     |
| `--success-foreground` | `0 0% 100%`         | Text color on success background          |
| `--destructive`      | `0 84.2% 60.2%`     | Destructive action/error color            |
| `--destructive-foreground` | `210 40% 98%`       | Text color on destructive background      |
| `--border`           | `214.3 31.8% 91.4%` | Border color                              |
| `--input`            | `214.3 31.8% 91.4%` | Input field border/background color       |
| `--ring`             | `45 96% 53%`        | Focus ring color                          |
| `--radius`           | `0.5rem`            | Border radius                             |

### 1.2. Dark Theme (`.dark` class in `src/styles.css`)

| Variable Name        | HSL Value           | Description                               |
| :------------------- | :------------------ | :---------------------------------------- |
| `--background`       | `215 41% 11%`       | Base background color                     |
| `--foreground`       | `210 20% 98%`       | Base text color                           |
| `--card`             | `215 41% 11%`       | Card background color (same as background) |
| `--card-foreground`  | `210 20% 98%`       | Card text color                           |
| `--popover`          | `215 41% 11%`       | Popover background color                  |
| `--popover-foreground` | `210 20% 98%`       | Popover text color                        |
| `--primary`          | `45 96% 53%`        | Primary accent color (Yellow)             |
| `--primary-foreground` | `215 41% 11%`       | Text color on primary background          |
| `--primary-hover`    | `45 95% 54%`        | Primary color on hover                    |
| `--secondary`        | `217 91% 60%`       | Secondary accent color (Blue)             |
| `--secondary-foreground` | `210 20% 98%`       | Text color on secondary background        |
| `--muted`            | `215 25% 27%`       | Muted background color                    |
| `--muted-foreground` | `215 19% 65%`       | Muted text color                          |
| `--accent`           | `217 91% 60%`       | Accent color (Blue)                       |
| `--accent-foreground` | `210 20% 98%`       | Text color on accent background           |
| `--destructive`      | `0 84% 60%`         | Destructive action/error color            |
| `--destructive-foreground` | `210 40% 98%`       | Text color on destructive background      |
| `--border`           | `215 25% 27%`       | Border color                              |
| `--input`            | `215 25% 27%`       | Input field border/background color       |
| `--ring`             | `45 96% 53%`        | Focus ring color                          |

---

## 2. Typography

*   **Primary Font Family:** `Inter`
    *   Imported via Google Fonts in `src/index.html`:
        ```html
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
        ```
    *   Configured in `tailwind.config.js`:
        ```javascript
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        ```
    *   Applied to `body` in `src/index.html` and `src/styles.css` via `@apply font-sans`.

*   **Icon Font:** `Material Symbols Outlined`
    *   Imported via Google Fonts in `src/index.html`:
        ```html
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
        ```
    *   Custom `font-variation-settings` applied in `src/index.html` for specific weight/fill.

---

## 3. Global Styles & Utilities

*   **Tailwind CSS:** Used for utility-first styling.
*   **Glassmorphism Effect:** Applied via `.glassmorphism` class (defined in `src/styles.css`), using `hsl(var(--card) / 0.6)` for background and `backdrop-filter: blur(16px)`.
*   **Modal Styles:** `.modal` and `.modal-content` classes (defined in `src/styles.css`) for overlay modals.
*   **Shadows:** Custom shadows (`smooth-sm`, `smooth`, `group-hover-effect`) defined in `tailwind.config.js` with `!important` to ensure application.

---

This document should provide a solid reference for the current visual design of the eTalente frontend.
