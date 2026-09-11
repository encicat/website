# EnciCat Website

Website for EnciCat, a small animal-protection association based in Villa del
Prado (Madrid, Spain). The site presents the cats available for adoption, the
ones that have already found a home, and the different ways to help, and it
ships with an embedded CMS so the association can manage all the content
without touching code.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) and React 19
- TypeScript in strict mode
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Keystatic](https://keystatic.com/) as the content management system, with
  GitHub storage
- [pnpm](https://pnpm.io/) as the package manager
- [oxlint](https://oxc.rs/) and [oxfmt](https://oxc.rs/) for linting and
  formatting

## Requirements

- Node.js 20.9 or newer
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

## Environment variables

Create a `.env` file at the project root. These values are needed to run the
Keystatic admin and are not committed to the repository.

| Variable                                | Purpose                                                                          |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| `KEYSTATIC_GITHUB_CLIENT_ID`            | GitHub OAuth app client ID for Keystatic                                         |
| `KEYSTATIC_GITHUB_CLIENT_SECRET`        | GitHub OAuth app client secret                                                   |
| `KEYSTATIC_SECRET`                      | Secret used to sign Keystatic sessions                                           |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Slug of the GitHub app used by Keystatic                                         |
| `NEXT_PUBLIC_SITE_URL`                  | Public site URL, used for metadata (optional, defaults to `https://encicat.org`) |

## Content management

Content is managed through Keystatic. With the dev server running, open
http://localhost:3000/keystatic and sign in with the configured GitHub app.

Everything editable lives under `content/`:

- **Collections**
  - `adoptions` — the cats, both available and adopted, with their photos and
    story.
  - `help` — the ways to help shown under "Cómo ayudarles", each one with its
    own page at `/ayudales/<slug>`.
- **Singletons**
  - `settings`, `social`, `donation_methods`
  - `home_page`, `help_page`, `about_page`, `terms_page`, `privacy_page`

## Project structure

```
src/
  app/
    (website)/     public site, one folder per route
    (admin)/       Keystatic admin and its API route
  components/      UI components, one folder each
  customFields/    Keystatic custom field for cropped images
  helpers/         content readers and small utilities
content/           Keystatic content (Markdoc, YAML and images)
public/            static assets
```

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start the development server     |
| `pnpm build`        | Build for production             |
| `pnpm start`        | Serve the production build       |
| `pnpm lint`         | Run oxlint                       |
| `pnpm lint:fix`     | Run oxlint and apply fixes       |
| `pnpm format`       | Format the code with oxfmt       |
| `pnpm format:check` | Check formatting without writing |

## Deployment

The site is deployed on Vercel, which is required for the Keystatic GitHub
integration. The repository is also mirrored to Codeberg by a GitHub Actions
workflow, so the source code stays available there.
