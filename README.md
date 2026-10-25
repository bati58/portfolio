# Bati Jano Portfolio

A migrated, production-ready Next.js portfolio for Bati Jano, preserving the original content, screenshots, résumé, social links, and project case studies from the static HTML site while upgrading the stack to Next.js, TypeScript, Tailwind-ready architecture, Prisma, PostgreSQL, and a server-side contact system.

## Overview

This project preserves the original portfolio identity and content:

- Name: **Bati Jano**
- Role direction: **Computer Science student, aspiring full-stack developer, and UI/UX designer**
- Social links: GitHub, LinkedIn, Telegram
- Local résumé download: `public/resume.pdf`
- Original software project case studies
- Original UI/UX design case studies

It replaces the exposed Web3Forms form with a secure server-side contact flow powered by a Next.js route handler, Zod validation, Prisma, PostgreSQL, and a transactional email provider.

## Features

- Next.js App Router with server components by default
- Responsive premium dark theme with optional light theme
- Animated, polished homepage and project cards
- Dynamic project detail routes: `/projects/[slug]`
- Preserved software project and UI/UX design case studies
- Accessible contact form with client-side and server-side validation
- Server-side contact persistence in PostgreSQL
- Email notification delivery through a provider API
- Protected admin recovery API for message inspection and retry
- Sitemap and robots configuration
- SEO metadata and Open Graph metadata
- Local résumé download and preserved outbound links

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, CSS
- **UI:** Lucide React icons, Motion-ready setup, responsive custom styling
- **Backend:** Next.js Route Handlers, Zod
- **Database:** PostgreSQL, Prisma ORM
- **Email:** Transactional email provider API (configured through environment variables)
- **Testing:** Vitest
- **Linting / Type checking:** ESLint, TypeScript

## Architecture

### Public site

- `/` — homepage with hero, about, skills, projects, designs, services, and contact
- `/projects/[slug]` — dynamic project and case-study detail pages

### Backend

- `POST /api/contact` — validates, stores, and sends contact submissions
- `GET /api/admin/contact` — protected message listing endpoint
- `POST /api/admin/contact/[id]/retry` — protected retry endpoint for failed notifications

### Data flow

1. Visitor submits the contact form.
2. The server validates the payload with Zod.
3. The message is saved to PostgreSQL first.
4. The email provider is called.
5. Delivery status is updated in the database.
6. Failed deliveries remain persisted for retry/recovery.

## Directory Structure

```text
src/
  app/
    api/
      admin/contact/
      contact/
    projects/[slug]/
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    ContactForm.tsx
    Navbar.tsx
    ProjectCard.tsx
    ThemeToggle.tsx
  lib/
    admin.ts
    contact.ts
    contact.test.ts
    prisma.ts
    projects.ts
prisma/
  schema.prisma
public/
  images, screenshots, resume, logo, favicon
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL` — PostgreSQL connection string
- `EMAIL_API_KEY` — API key for your transactional email provider
- `CONTACT_FROM_EMAIL` — sender identity used by the email provider
- `CONTACT_TO_EMAIL` — destination mailbox for portfolio contact notifications
- `NEXT_PUBLIC_SITE_URL` — public canonical URL for metadata, sitemap, and robots
- `CONTACT_RATE_LIMIT` — optional hourly submission limit per IP
- `ADMIN_API_TOKEN` — secret token for protected admin recovery endpoints

### Notes

- Do **not** expose server-only secrets through `NEXT_PUBLIC_` variables.
- The old Web3Forms key from the legacy site was intentionally not migrated.
- For Resend, create a fresh API key after revoking any exposed or rejected key.
- Set `CONTACT_FROM_EMAIL` to a real verified Resend sender, not the `.env.example` placeholder.
- Use the Resend account email as `CONTACT_TO_EMAIL` for initial testing when using `onboarding@resend.dev`.
- Restart the development server after changing `.env.local`.

## PostgreSQL Setup

This project is linked to the Neon project `broad-moon-86740927` on the `production` branch. Neon writes the local connection variables to `.env.local`, which is gitignored.

To reconnect the repository:

```bash
npm i -g neon@latest
neon login
neon link --project-id broad-moon-86740927 --branch production -y
neon deploy
```

Use any compatible PostgreSQL provider locally or in production if you are deploying outside Neon.

Example local setup:

```bash
createdb bati_jano_portfolio
```

Then set `DATABASE_URL` accordingly in `.env`.

## Prisma Commands

Generate the client:

```bash
npx prisma generate
```

Create and apply a migration:

```bash
npx prisma migrate dev --name init
```

The initial `ContactMessage` migration is already present at `prisma/migrations/20261011060912_init`.

Deploy migrations in production:

```bash
npx prisma migrate deploy
```

Optional database inspection:

```bash
npx prisma studio
```

## Local Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing

Run the available checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Production Build

```bash
npm run build
npm run start
```

## Email Provider Configuration

This implementation uses a transactional email API pattern and is currently wired to a provider-compatible REST endpoint.

To enable delivery:

1. Create an account with your provider.
2. Generate an API key.
3. Verify the `CONTACT_FROM_EMAIL` sender if required.
4. Set `EMAIL_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
5. Restart the app.

If the provider is unavailable, the message is still stored in PostgreSQL and marked as needing retry.

## Deployment

Recommended deployment targets:

- **Frontend / API:** Vercel
- **Database:** managed PostgreSQL provider
- **Email:** provider with a transactional API

Deployment checklist:

1. Set all environment variables in the hosting platform.
2. Run Prisma migrations against the production database.
3. Generate the Prisma client during build.
4. Verify sender identity with your email provider.
5. Confirm the site URL in `NEXT_PUBLIC_SITE_URL`.

## Troubleshooting

### Contact form returns `503`

Check:

- `DATABASE_URL`
- `EMAIL_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

### Prisma client error

Run:

```bash
npx prisma generate
```

### Email delivery does not work

Confirm that:

- The sender identity is verified
- The API key is valid
- The destination address is correct
- The same values are configured in Vercel under **Project Settings → Environment Variables** for the
  environments where the deployment runs (`Production`, and `Preview` if needed)
- A new deployment was created after changing the Vercel variables

The local `.env` file is not deployed to Vercel. A local submission can therefore work while the
public deployment has missing or different email settings. Resend's `onboarding@resend.dev` sender
is intended for testing and has recipient restrictions; use a domain you verified in Resend for
production. Keep `EMAIL_API_KEY` server-only and rotate it immediately if it has been exposed.

### Admin recovery endpoints return `503`

Set `ADMIN_API_TOKEN` in your environment and send requests with:

```text
Authorization: Bearer <ADMIN_API_TOKEN>
```

## Preserved Content

The following assets and references from the original site were preserved:

- `public/profile.jpg`
- `public/logo.png`
- `public/favicon.ico`
- `public/resume.pdf`
- All project screenshots in `public/`
- All original project and design outbound links
- Existing social profile links

## Legacy Backup

A backup of the original static site was created locally at:

- `.legacy-backup`

This keeps the original source available for comparison and recovery during migration.
