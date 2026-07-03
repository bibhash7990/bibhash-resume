# TalleFlow - Multi-Tenant B2B Operations Platform

## Overview
TalleFlow is a comprehensive multi-tenant B2B operations and workflow management SaaS platform designed to streamline core business processes for organizations. It consolidates multiple operations domains into a unified workspace.

## Main Features & Functionality
- **Multi-Tenant Isolation**: Robust security protocols ensuring complete data separation between different organizations.
- **10+ Operations Domains**: Integrates projects, tasks, contacts, document storage, client portals, billing, and background automation.
- **Client & Vendor Collaboration**: Interactive portals for client review, e-signatures, and contract approvals.
- **Background Jobs & Automation**: Multi-tenant task scheduler for reminders, workflow sync, and automated billing triggers.

## Tech Stack & Integrated Tools
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Radix UI (shadcn/ui), Zustand, TanStack React Query, React Hook Form + Zod.
- **Backend & Database**: Node.js, Express, MongoDB (Mongoose).
- **Authentication**: Clerk (Auth + Webhook sync).
- **Payments & Billing**: Stripe (Subscription payments & webhooks).
- **Background Workers**: Trigger.dev, node-cron.
- **Testing**: Vitest (Unit/Integration), Playwright (E2E testing).
- **Workspace Tooling**: Turborepo, pnpm workspaces.
