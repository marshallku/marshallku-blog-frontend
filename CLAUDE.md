# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog frontend organized as a Turborepo monorepo with pnpm workspaces. The codebase uses React 19, TypeScript, and SCSS for styling.

## Key Commands

### Development

```bash
pnpm dev                    # Start dev server (blog on port 3443)
pnpm build                  # Build all packages and applications
pnpm test                   # Run unit tests (Vitest)
pnpm test:e2e              # Run E2E tests (Playwright)
pnpm test:visual-regression # Run visual regression tests (BackstopJS)
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
```

### Package-specific commands

```bash
pnpm dev --filter @marshallku/blog      # Run only blog app
pnpm dev --filter @marshallku/docs      # Run Storybook (port 6006)
pnpm test --filter @marshallku/ui       # Test specific package
pnpm analyze --filter @marshallku/blog  # Analyze bundle size
```

## Architecture

### Monorepo Structure

#### Applications

-   **apps/blog**: Main Next.js 15 blog application (PRIMARY PACKAGE)

    -   Static site generation with App Router
    -   MDX content processing with extensive plugin pipeline
    -   Category-based routing: `/[category]/[...slug]`
    -   Features: RSS feeds, comments, search via tags, PWA support
    -   Theme system: light/dark/sepia modes
    -   Google Analytics & AdSense integration
    -   Development port: 3443

-   **apps/docs**: Storybook documentation

    -   Component showcase and design system documentation
    -   Visual testing integration point
    -   Development port: 6006

-   **apps/visual-regression**: BackstopJS visual testing
    -   Automated screenshot comparison
    -   Tests Storybook components across viewports

#### Support Packages

-   **packages/ui**: Shared React component library
    -   Core components: Button, Input, Textarea, Typography, Loader, ToggleButton
    -   SCSS modules with design tokens (variables, palette, fonts, mixins)
    -   Fully tested with Vitest
-   **packages/utils**: Utility functions
    -   Array operations, CSS utilities, date formatting
    -   URL/query string manipulation
    -   Error handling utilities (`to`, `unsafe`)
-   **packages/toast**: Toast notification system
    -   Lightweight vanilla JS implementation
    -   Used for user feedback throughout the blog
-   **packages/icon**: Icon font generator
    -   200+ tech/brand icons from SVG sources
    -   Generates web fonts with Fantasticon
    -   TypeScript support with icon name completion
-   **packages/react-error-boundary**: Error boundary components
    -   Graceful error handling across the application

### Blog-Specific Features

#### Content Structure
-   **Categories**: dev, chat, gallery, notice, work (with subcategories)
-   **Content Source**: MDX files in `_posts` directory
-   **Routes**:
    -   `/` - Homepage with recent posts and gallery
    -   `/[category]` - Category archive pages
    -   `/[category]/[...slug]` - Individual post pages
    -   `/[category]/page/[index]` - Paginated category pages
    -   `/tag/[tag]` - Tag-based filtering
    -   `/tags` - All tags overview
    -   `/about` - About page
    -   `/guestbook` - Guestbook functionality

#### MDX Processing Pipeline
-   `gray-matter` for frontmatter parsing
-   `rehype-pretty-code` with Shiki for syntax highlighting
-   `rehype-autolink-headings` for heading links
-   `rehype-slug` for heading anchors
-   `remark-gfm` for GitHub Flavored Markdown
-   `remark-toc` for table of contents
-   Custom plugins for image metadata and responsive iframes

#### Performance & SEO Features
-   Static site generation for all content
-   Next.js Image component with custom wrapper
-   CDN integration via asset prefix
-   Service worker for offline functionality (PWA)
-   Comprehensive SEO with OpenGraph and Twitter Cards
-   RSS feed generation for all categories
-   Sitemap generation

### Key Patterns

-   Path alias `#*` maps to `./src/*` in the blog app
-   Shared ESLint and TypeScript configs across packages
-   Component library uses SCSS modules with design tokens
-   MDX content from separate repository (`marshallku/marshallku-blog-posts`)
-   Blue-green deployment with Docker and health checks

### Testing Strategy

-   **Unit tests**: Vitest with jsdom, coverage reporting
-   **E2E tests**: Playwright testing desktop/mobile Chrome and mobile Safari
-   **Visual regression**: BackstopJS integrated with Storybook

### CI/CD Pipeline

The GitHub Actions CI pipeline runs:

1. Spell checking (cspell)
2. Build all packages
3. Linting
4. CodeQL analysis
5. Unit tests
6. E2E tests
7. Lighthouse performance tests

Deployment uses blue-green strategy with automatic rollback on failure.

## Environment Variables

Required for development:

-   `NEXT_PUBLIC_BLOG_ORIGIN`
-   `NEXT_PUBLIC_CDN_URL`
-   `NEXT_PUBLIC_FILE_CDN_URL`
-   `NEXT_PUBLIC_API_URL`

## Important Files

-   `turbo.json`: Build pipeline configuration
-   `next.config.js`: Next.js configuration with asset prefixing
-   `playwright.config.ts`: E2E test configuration
-   `backstop.config.js`: Visual regression setup
