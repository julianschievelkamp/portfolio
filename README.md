# Portfolio

A portfolio website showcasing artistic images and videos. Live at [www.julianschievelkamp.com](https://www.julianschievelkamp.com).

The site is a pure frontend project: HTML is pre-rendered at build time, and there is no backend, database or user input.

## Tech Stack

- [React](https://react.dev/) 19 with TypeScript
- [Vike](https://vike.dev/) for SSR and static pre-rendering
- [Styled Components](https://styled-components.com/) for styling
- [Zustand](https://zustand.docs.pmnd.rs/) for state management
- [Vite](https://vite.dev/) as build tool
- [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for unit tests
- ESLint for linting and code style

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- [Yarn](https://yarnpkg.com/)

### Installation

```bash
yarn install
```

### Development

```bash
yarn start
```

Starts the Vike dev server with hot module replacement.

## Scripts

| Command              | Description                                     |
| -------------------- | ----------------------------------------------- |
| `yarn start`         | Start the development server                    |
| `yarn build`         | Type-check and build the pre-rendered site      |
| `yarn preview`       | Preview the production build locally            |
| `yarn deploy`        | Build and publish `dist/client` to GitHub Pages |
| `yarn lint`          | Run ESLint                                      |
| `yarn test`          | Run all unit tests once                         |
| `yarn test:watch`    | Run tests in watch mode                         |
| `yarn test:coverage` | Run tests with a coverage report                |

## Project Structure

```
public/        Deployment config (e.g. CNAME) and global resources (e.g. favicon)
src/
├── assets/    Media, icons and fonts
├── data/      Static content, texts and data objects (e.g. image metadata)
├── elements/  Reusable components and layout building blocks (tests are co-located)
├── hooks/     Custom React hooks
├── pages/     Vike routing entry points
└── styles/    Global styles and variables
```

## Quality Guidelines

- **Accessibility:** WCAG 2.1 AA – descriptive `alt` texts, semantic HTML, keyboard-accessible interactive elements and sufficient contrast.
- **SEO:** Pre-rendered HTML, per-page titles and descriptions, a logical heading hierarchy with a single `<h1>` per page, lazy-loaded below-the-fold images, and artworks embedded with `<figure>` / `<figcaption>`.
- **Code:** Strict TypeScript (no `any`), English identifiers and UI texts, small single-purpose components.
- **Tests:** Core components have a unit test located in the same folder as the component.

Run `yarn lint` and `yarn test` before committing.

## Deployment

The site is deployed to GitHub Pages with `yarn deploy`. The custom domain is configured through `public/CNAME`.

## License

All images, videos and other artworks are © Julian Schievelkamp. All rights reserved.
