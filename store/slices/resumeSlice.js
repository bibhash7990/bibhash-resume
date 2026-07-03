import { createSlice } from '@reduxjs/toolkit';

/* ------------------------------------------------------------------ */
/*  1. Profile definitions                                             */
/* ------------------------------------------------------------------ */

const profile45 = {
    meta: { name: '4.5 Years Experience' },
    contact: {
        name: 'Bibhash lenka',
        email: 'bibhash.reactjsdev@gmail.com',
        phone: '7990721091',
        title: 'MERN Stack Developer',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: 'https://github.com/bibhash7990',
        blogs: '',
        twitter: '',
        portfolio: 'https://bibhash-lenka.netlify.app/',
    },
    summary: {
        summary:
            'MERN / full-stack developer with 4.5+ years shipping production web applications (B2B SaaS, operations, fintech). Recent scope includes user-facing products at 4,000+ learner scale (Revizze) and multi-tenant B2B suites. Own architecture through release: REST API design, multi-tenant isolation, OAuth 2.0 integrations, security review, automated testing, and production support. Core stack: React.js, TypeScript, Node.js (Express.js, Hapi.js), MongoDB; cloud integrations (AWS S3, Stripe, Gmail API, Twilio, Clerk, and others). Uses AI-assisted IDEs (Cursor, Kiro, Google Antigravity) and spec-driven workflows as accelerators with full ownership of design, code review, and quality gates. Strong Agile collaboration, Redux Toolkit / TanStack Query / Zustand, CI/CD deploys, and background automation (Trigger.dev, node-cron).',
    },
    education: [
        {
            degree: 'Bachelor of Engineering in Chemical Engineering',
            institution: 'Prime institute of engineering and technology',
            start: '2016-06',
            end: '2020-08',
            location: 'Navsari, Gujarat',
            gpa: '9.1/10',
            note: 'Career pivot: transitioned from chemical production roles into software via structured self-study and professional experience; 4.5+ years building production MERN and full-stack applications for clients.',
        },
        {
            degree: 'Higher secondary certificate',
            institution: 'Gyan jyot vidyalaya',
            start: '2014-06',
            end: '2016-08',
            location: 'Surat, Gujarat',
        },
        {
            degree: 'Secondary school certificate',
            institution: 'Adarsh hindi vidyalaya',
            start: '2013-06',
            end: '2014-06',
            location: 'Surat, Gujarat',
        },
    ],
    experience: [
        {
            role: 'Freelance Full-Stack Developer',
            company: 'Self-Employed',
            location: 'Remote',
            start: '2026-05',
            end: '',
            description:
                'Available for full-stack MERN engagements — architecture through production release with end-to-end ownership of REST API design, multi-tenant isolation, OAuth 2.0 integrations, and automated testing.\nBuild production-grade React.js / TypeScript frontends and Node.js (Express.js, Hapi.js) backends with MongoDB.\nIntegrate Stripe, Clerk, AWS S3, Twilio, and Razorpay, and ship background automation with Trigger.dev and node-cron; deliver via CI/CD to Vercel, Netlify, and Railway.',
        },
        {
            role: 'Software Developer (MERN Stack)',
            company: 'Techfidants',
            location: 'Surat, Gujarat',
            start: '2025-07',
            end: '2026-05',
            description:
                'Shipped full-stack features across 3 concurrent production surfaces: Skyline (elevator lifecycle), 2 white-label client portals (Wyton Developers, LIFTREX), and TalleFlow (multi-tenant B2B) — React.js, TypeScript, Node.js, Hapi.js/Express.js, MongoDB.\nOwned modular REST APIs (service-layer, Joi/Zod validation, JWT, Swagger/OpenAPI docs) consumed by multiple SPA clients; integrated 7+ external services (AWS S3, Gmail OAuth2, Stripe, Clerk, Twilio, Adobe PDF, Nodemailer) — estimated 30%+ fewer integration defects vs ad-hoc handoffs.\nBuilt asynchronous automation with Trigger.dev and node-cron covering 6+ job types (workflows, reminders, sync, idempotent dispatch) safe for horizontally scaled deployments.\nDelivered 12+ major UI areas (project hubs, e-signatures, invoicing, calendar sync, admin tooling) with TanStack React Query, Zustand, Radix / shadcn-style components, and Framer Motion.',
        },
        {
            role: 'Jr. Software Developer',
            company: 'Sourcecube Technology Pvt. Ltd.',
            location: 'Surat, Gujarat',
            start: '2023-11',
            end: '2025-06',
            description:
                'Owned 4 production React SPA products end-to-end over ~18 months (invoice / bilingual UI, Web3 RPC dashboard, cloud deploy console, AI-assisted DB analyzer), each with Redux Toolkit and RESTful backends — all merges via mandatory peer-reviewed PRs.\nImproved load and runtime behavior using route-level code splitting, lazy loading, and re-render tuning; ~25–35% lower initial JS on lazy-split routes vs monolithic entry bundles.\nBuilt 20+ reusable UI primitives and layouts reused across 3+ client codebases; standardized ESLint/Prettier.\nRan 2-week Agile cycles in ClickUp (~40 sprints); weekly code reviews across active products.',
        },
        {
            role: 'Software Developer (React.js)',
            company: '3Elixir software solution',
            location: 'Surat, Gujarat',
            start: '2021-11',
            end: '2023-10',
            description:
                'Grew from React.js onboarding into building and shipping production UI features over ~2 years using React.js, HTML, CSS, JavaScript, and ES6+.\nDelivered responsive, reusable interfaces and integrated RESTful APIs across multiple client projects.\nEstablished Git workflows, folder structure, and component-reuse patterns applied across later production work.',
        },
        {
            role: 'Production Officer/Executive',
            company: 'Sun Pharma, Lupin Industries Ltd.',
            location: 'Ankleswar, Gujarat',
            start: '2020-11',
            end: '2021-11',
            description:
                'Prior manufacturing operations role before career transition to software development (see education note).',
        },
    ],
    projects: [
        {
            title: 'TalleFlow — Multi-Tenant B2B Operations Platform',
            url: 'https://app.talleflow.com/',
            description:
                'Full-stack ownership of a multi-tenant B2B suite spanning 10+ product domains (projects, tasks, contacts, documents, e-signatures, billing, automation, background workers).\nStack: React, TypeScript, Vite, Tailwind, shadcn/ui, TanStack React Query, Zustand; Node.js, Express, MongoDB/Mongoose, Clerk (auth + webhooks), Stripe (billing), Trigger.dev.\nIntegrated 8+ external systems (Gmail/Calendar, Outlook, Zoom, Shopify, Resend) with Vitest unit/integration and Playwright E2E tests.',
        },
        {
            title: 'Skyline — Elevator Lifecycle Management',
            url: 'https://dev-qa-skyline.onrender.com/',
            description:
                'Core operations platform covering 10+ workflow areas (proposals, contracts, inspection & permit stages, Gmail-linked inbox, documents, payments), extended into 2 branded client portals (Wyton Developers, LIFTREX).\nFrontend: React 18, TypeScript, Vite, Redux Toolkit, TanStack React Query, Tailwind, Radix UI.\nBackend: Hapi.js, Joi, Mongoose/MongoDB, JWT, node-cron with 10+ integrations (AWS S3, Gmail OAuth2, Twilio, Dropbox, Adobe PDF, ExcelJS).',
        },
        {
            title: 'Revizze — IB Exam Prep Platform',
            url: 'https://www.revizze.io/',
            description:
                'Public IB exam-prep platform serving 4,000+ students.\nBuilt the admin-side full-stack: React admin UI and REST APIs for internal operations, content workflows, study plans, exam-style practice, quizzes, Extended Essay builder, and grade/progress insights.',
        },
        {
            title: 'SANAD-HUB — Invoice Management Platform',
            url: 'https://sanadhub-frontend.netlify.app/login',
            description:
                'Built a bilingual (Arabic / English) invoice management platform with RTL layout support using React.js, Joy UI, and Tailwind CSS.\nEnabled admins to create and customize invoice templates, manage client financial records, and export structured billing data; integrated REST APIs for dynamic data rendering.',
        },
        {
            title: 'Additional products & demos',
            url: 'https://bibhash-lenka.netlify.app/',
            description:
                'Unode — Web3 RPC platform: MetaMask, NowPayments, Superfluid (unode.unification.io).\nXplorx — deploy Docker / GitHub / PostgreSQL, logs & custom domains (cloud.xplorx.app).\nDBLYSER — PostgreSQL performance & AI insights (dba-fe-xxxvii-ptbu.onxplorx.app).\nBook-My-Band — bands/fans platform with Razorpay payments (bookmyband.live).',
        },
    ],
    skills: {
        skills:
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nData: MongoDB, Mongoose, PostgreSQL (managed instances, analytics, performance tooling)\nIntegrations & services: OAuth 2.0 (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development, LLM-assisted code review with engineer sign-off, production hardening',
    },
    tools: {
        tools:
            'Design & UX: Figma\nEditors & AI IDEs: Visual Studio Code, Cursor, Claude, Kiro, Google Antigravity\nWorkflow: spec-driven development; AI-accelerated implementation with engineer-owned architecture, review, and release\nCollaboration & PM: ClickUp, Jira\nAPI debugging: Postman\nVersion control: Git, GitHub, GitHub Desktop\nQuality & debugging: ESLint, Prettier, Chrome DevTools, React Developer Tools, Redux DevTools\nPackage managers: npm, Yarn',
    },
    certificates: [
        {
            title: 'Dedicated Employee',
            date: '2020-11',
        },
        {
            title: 'Rising Start of the Month',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-01',
        },
        {
            title: 'Quarter of the year',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-06',
        },
    ],
    languages: [
        {
            language: 'English',
            proficiency: 'Professional Working Proficiency',
        },
        {
            language: 'Hindi',
            proficiency: 'Full Professional Proficiency',
        },
        {
            language: 'Oriya',
            proficiency: 'Native or Bilingual Proficiency',
        },
        {
            language: 'Gujarati',
            proficiency: 'Full Professional Proficiency',
        },
    ],
    saved: true,
};

const profile25 = {
    meta: { name: '2.5 Years Experience' },
    contact: {
        name: 'Bibhash lenka',
        email: 'bibhash.reactjsdev@gmail.com',
        phone: '7990721091',
        title: 'MERN Stack Developer',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: 'https://github.com/bibhash7990',
        blogs: '',
        twitter: '',
        portfolio: 'https://bibhash-lenka.netlify.app/',
    },
    summary: {
        summary:
            'MERN / full-stack developer with 2.5+ years shipping production web applications (B2B SaaS, operations, fintech). Recent scope includes user-facing products at 4,000+ learner scale (Revizze, per public product stats) and multi-tenant B2B suites. Own architecture through release: REST API design, multi-tenant isolation, OAuth 2.0 integrations, security review, automated testing, and production support. Core stack: React.js, TypeScript, Node.js (Express.js, Hapi.js), MongoDB where applicable; cloud integrations (AWS S3, Stripe, Gmail API, Twilio, Clerk, and others). Uses AI-assisted IDEs (Cursor, Kiro, Google Antigravity) and spec-driven workflows as accelerators with full ownership of design, code review, and quality gates. Strong Agile collaboration, Redux Toolkit / TanStack Query / Zustand, CI/CD deploys, and background automation (Trigger.dev, node-cron).',
    },
    education: [
        {
            degree: 'Bachelor of Engineering in Chemical Engineering',
            institution: 'Prime institute of engineering and technology',
            start: '2016-06',
            end: '2020-08',
            location: 'Navsari, Gujarat',
            gpa: '9.1/10',
            note: 'Career pivot: transitioned from chemical production roles into software via structured self-study and professional experience; 2.5+ years building production MERN and full-stack applications for clients.',
        },
        {
            degree: 'Higher secondary certificate',
            institution: 'Gyan jyot vidyalaya',
            start: '2014-06',
            end: '2016-08',
            location: 'Surat, Gujarat',
        },
        {
            degree: 'Secondary school certificate',
            institution: 'Adarsh hindi vidyalaya',
            start: '2013-06',
            end: '2014-06',
            location: 'Surat, Gujarat',
        },
    ],
    experience: [
        {
            role: 'Software Developer (MERN Stack)',
            company: 'Techfidants',
            location: 'Surat, Gujarat',
            start: '2025-07',
            end: '2026-05',
            description:
                'Shipped full-stack features across 3 concurrent production surfaces: Skyline (elevator lifecycle), 2 white-label client portals (Wyton Developers, LIFTREX), and TalleFlow (multi-tenant B2B) — React.js, TypeScript, Node.js, Hapi.js/Express.js, MongoDB.\nOwned modular REST APIs (service-layer, Joi/Zod validation, JWT, Swagger/OpenAPI docs) consumed by multiple SPA clients; integrated 7+ external services (AWS S3, Gmail OAuth2, Stripe, Clerk, Twilio, Adobe PDF, Nodemailer, etc.) with clear contracts — estimated 30%+ fewer integration defects vs ad-hoc handoffs (tracked via QA cycles).\nBuilt asynchronous automation with Trigger.dev and node-cron covering 6+ job types (workflows, reminders, sync, idempotent dispatch) safe for horizontally scaled deployments.\nDelivered 12+ major UI areas (project hubs, e-signatures, invoicing, calendar sync, admin tooling) with TanStack React Query, Zustand, Radix / shadcn-style components, and Framer Motion; used AI-assisted IDEs as accelerators under engineer-led architecture, review, security checks, and QA.',
        },
        {
            role: 'Jr. Software Developer',
            company: 'Sourcecube Technology Pvt. Ltd.',
            location: 'Surat, Gujarat',
            start: '2023-11',
            end: '2025-06',
            description:
                'Owned 4 production React SPA products end-to-end over ~18 months (invoice / bilingual UI, Web3 RPC dashboard, cloud deploy console, AI-assisted DB analyzer), each with Redux Toolkit and RESTful backends — all merges via mandatory peer-reviewed PRs.\nImproved load and runtime behavior using route-level code splitting, lazy loading, and re-render tuning; ~25–35% lower initial JS on lazy-split routes vs monolithic entry bundles (staging Lighthouse).\nBuilt 20+ reusable UI primitives and layouts reused across 3+ client codebases; standardized ESLint/Prettier.\nRan 2-week Agile cycles in ClickUp (~40 sprints); weekly code reviews across active products.',
        },
        {
            role: 'Jr Software developer Trainee',
            company: '3Elixir Software Solution',
            location: 'Surat, Gujarat',
            start: '2023-09',
            end: '2023-10',
            description:
                'Completed an intensive 2-month React.js onboarding; shipped 8+ small interactive UI features (forms, lists, responsive layouts) using React.js, HTML5, CSS3, and ES6+ under senior-developer mentorship.\nEstablished Git branching, folder structure, and component reuse patterns applied in later production roles.',
        },
        {
            role: 'Production Officer/Executive',
            company: 'Sun Pharma, Lupin Industries Ltd.',
            location: 'Ankleswar, Gujarat',
            start: '2020-11',
            end: '2023-05',
            description:
                'Prior manufacturing operations role before career transition to software development (see education note).',
        },
    ],
    projects: [
        {
            title: 'TalleFlow — Multi-Tenant B2B Operations Platform',
            url: 'https://app.talleflow.com/',
            description:
                'Full-stack ownership of a multi-tenant B2B suite spanning 10+ product domains (projects, tasks, contacts, documents, forms, e-signatures, billing, community/marketplace, user-defined automation, background workers).\nStack: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack React Query, Zustand, React Hook Form + Zod; Node.js, Express, MongoDB / Mongoose, Clerk (auth + webhooks), Stripe (billing + webhooks), Trigger.dev.\nIntegrated 8+ external systems (Google Gmail/Calendar, Microsoft Outlook, Zoom, Unlayer, Canva, Shopify, Resend, and related OAuth flows). Quality: Vitest (unit/integration) and Playwright E2E (authentication, tenant isolation, critical user journeys).\nDelivery combined AI-assisted coding tools with hands-on architecture, API design, security review, and production rollout.',
        },
        {
            title: 'Skyline — Elevator Project Lifecycle Management',
            url: 'https://dev-qa-skyline.onrender.com/',
            description:
                'Core operations platform covering 10+ workflow areas (proposals MRL/hydraulic/traction, contracts, inspection and permit stages, client directory, Gmail-linked inbox, documents, payments, notifications). Extended one codebase to 2 branded client portals: Wyton Developers (https://portal.wytondevelopers.com/) and LIFTREX (https://portal.liftrex.com/).\nFrontend: React 18, TypeScript, Vite, React Router 7, Tailwind CSS, Radix UI, Redux Toolkit + redux-persist, TanStack React Query, Axios, React Hook Form + Yup, Framer Motion, Google Maps, Google OAuth.\nBackend: Hapi.js 21, Joi, Mongoose 8 / MongoDB, JWT, hapi-swagger, Winston, node-cron; 10+ integration touchpoints (AWS S3, Gmail API OAuth2, Twilio, Nodemailer, Dropbox, Adobe PDF, wkhtmltopdf, Handlebars, ExcelJS, etc.).',
        },
        {
            title: 'Revizze — IB Exam Prep Platform',
            url: 'https://www.revizze.io/',
            description:
                'Public IB exam-prep platform serving 4,000+ students.\nAdmin-side full-stack: React admin UI and REST APIs for internal operations, content workflows, and tooling behind study plans, exam-style practice, summaries, quizzes, Extended Essay builder, and grade/progress insights.',
        },
        {
            title: 'SANAD-HUB — Invoice Management Platform',
            url: 'https://sanadhub-frontend.netlify.app/login',
            description:
                'Built a bilingual (Arabic / English) invoice management platform with RTL layout support using React.js, Joy UI, and Tailwind CSS for layout, spacing, and responsive styling.\nEnabled admins to create and customize invoice templates, manage client financial records, and export structured billing data; integrated REST APIs for dynamic data rendering.',
        },
        {
            title: 'Additional products & demos (portfolio)',
            url: 'https://bibhash-lenka.netlify.app/',
            description:
                'Unode — Web3 RPC platform: MetaMask, NowPayments, Superfluid (https://unode.unification.io/). Xplorx — deploy Docker/GitHub/PostgreSQL, logs & custom domains (https://cloud.xplorx.app/). DBLYSER — PostgreSQL performance & AI insights (https://dba-fe-xxxvii-ptbu.onxplorx.app/). Book-My-Band — bands/fans, Razorpay (https://bookmyband.live). More links and context on portfolio.',
        },
    ],
    skills: {
        skills:
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nData: MongoDB, Mongoose, PostgreSQL (managed instances, analytics, performance tooling)\nIntegrations & services: OAuth 2.0 flows (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development (structured prompting and IDE workflows), collaborative and LLM-assisted code review with engineer sign-off, production hardening',
    },
    tools: {
        tools:
            'Design & UX: Figma\nEditors & AI IDEs: Visual Studio Code, Cursor, Claude, Kiro, Google Antigravity\nWorkflow: spec-driven development; AI-accelerated implementation with engineer-owned architecture, review, and release\nCollaboration & PM: ClickUp, Jira\nAPI debugging: Postman\nVersion control: Git, GitHub, GitHub Desktop\nQuality & debugging: ESLint, Prettier, Chrome DevTools, React Developer Tools, Redux DevTools\nPackage managers: npm, Yarn',
    },
    certificates: [
        {
            title: 'Dedicated Employee',
            date: '2020-11',
        },
        {
            title: 'Rising Start of the Month',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-01',
        },
        {
            title: 'Quarter of the year',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-06',
        },
    ],
    languages: [
        {
            language: 'English',
            proficiency: 'Professional Working Proficiency',
        },
        {
            language: 'Hindi',
            proficiency: 'Full Professional Proficiency',
        },
        {
            language: 'Oriya',
            proficiency: 'Native or Bilingual Proficiency',
        },
        {
            language: 'Gujarati',
            proficiency: 'Full Professional Proficiency',
        },
    ],
    saved: true,
};

/* ------------------------------------------------------------------ */
/*  1b. Profile — TalleFlow-focused (based on 2.5yr)                  */
/* ------------------------------------------------------------------ */

const profile25Talleflow = {
    meta: { name: 'TalleFlow Focus (2.5yr)' },
    contact: {
        name: 'Bibhash lenka',
        email: 'bibhash.reactjsdev@gmail.com',
        phone: '7990721091',
        title: 'MERN Stack Developer',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: 'https://github.com/bibhash7990',
        blogs: '',
        twitter: '',
        portfolio: 'https://bibhash-lenka.netlify.app/',
    },
    summary: {
        summary:
            'MERN / full-stack developer with 2.5+ years shipping production web applications (B2B SaaS, operations, fintech). Recent scope includes user-facing products at 4,000+ learner scale (Revizze, per public product stats) and multi-tenant B2B suites. Own architecture through release: REST API design, multi-tenant isolation, OAuth 2.0 integrations, security review, automated testing, and production support. Core stack: React.js, TypeScript, Node.js (Express.js, Hapi.js), MongoDB where applicable; cloud integrations (AWS S3, Stripe, Gmail API, Twilio, Clerk, and others). Uses AI-assisted IDEs (Cursor, Kiro, Google Antigravity) and spec-driven workflows as accelerators with full ownership of design, code review, and quality gates. Strong Agile collaboration, Redux Toolkit / TanStack Query / Zustand, CI/CD deploys, and background automation (Trigger.dev, node-cron).',
    },
    education: [
        {
            degree: 'Bachelor of Engineering in Chemical Engineering',
            institution: 'Prime institute of engineering and technology',
            start: '2016-06',
            end: '2020-08',
            location: 'Navsari, Gujarat',
            gpa: '9.1/10',
            note: 'Career pivot: transitioned from chemical production roles into software via structured self-study and professional experience; 2.5+ years building production MERN and full-stack applications for clients.',
        },
        {
            degree: 'Higher secondary certificate',
            institution: 'Gyan jyot vidyalaya',
            start: '2014-06',
            end: '2016-08',
            location: 'Surat, Gujarat',
        },
        {
            degree: 'Secondary school certificate',
            institution: 'Adarsh hindi vidyalaya',
            start: '2013-06',
            end: '2014-06',
            location: 'Surat, Gujarat',
        },
    ],
    experience: [
        // 1 — Talleflow Corporation (new, for TalleFlow work)
        {
            role: 'Full-Stack Developer (TalleFlow Platform)',
            company: 'Talleflow Corporation',
            location: 'California, US (Remote)',
            start: '2025-12',
            end: '2026-05',
            description:
                'Full-stack ownership of a multi-tenant B2B suite spanning 10+ product domains (projects, tasks, contacts, documents, forms, e-signatures, billing, community/marketplace, user-defined automation, background workers).\nStack: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack React Query, Zustand, React Hook Form + Zod; Node.js, Express, MongoDB / Mongoose, Clerk (auth + webhooks), Stripe (billing + webhooks), Trigger.dev.\nIntegrated 8+ external systems (Google Gmail/Calendar, Microsoft Outlook, Zoom, Unlayer, Canva, Shopify, Resend, and related OAuth flows) with Vitest unit/integration and Playwright E2E tests.\nDelivery combined AI-assisted coding tools with hands-on architecture, API design, security review, and production rollout.',
        },
        // 2 — Techfidants (TalleFlow removed, kept Skyline/Wyton/LIFTREX/Revizze)
        {
            role: 'Software Developer (MERN Stack)',
            company: 'Techfidants',
            location: 'Surat, Gujarat',
            start: '2025-07',
            end: '2026-05',
            description:
                'Shipped full-stack features across 3 concurrent production surfaces: Skyline (elevator lifecycle), 2 white-label client portals (Wyton Developers, LIFTREX), and Revizze (IB exam prep) — React.js, TypeScript, Node.js, Hapi.js/Express.js, MongoDB.\nOwned modular REST APIs (service-layer, Joi/Zod validation, JWT, Swagger/OpenAPI docs) consumed by multiple SPA clients; integrated 7+ external services (AWS S3, Gmail OAuth2, Stripe, Clerk, Twilio, Adobe PDF, Nodemailer, etc.) with clear contracts — estimated 30%+ fewer integration defects vs ad-hoc handoffs (tracked via QA cycles).\nBuilt asynchronous automation with Trigger.dev and node-cron covering 6+ job types (workflows, reminders, sync, idempotent dispatch) safe for horizontally scaled deployments.\nDelivered 12+ major UI areas (project hubs, e-signatures, invoicing, calendar sync, admin tooling) with TanStack React Query, Zustand, Radix / shadcn-style components, and Framer Motion; used AI-assisted IDEs as accelerators under engineer-led architecture, review, security checks, and QA.',
        },
        {
            role: 'Jr. Software Developer',
            company: 'Sourcecube Technology Pvt. Ltd.',
            location: 'Surat, Gujarat',
            start: '2023-11',
            end: '2025-06',
            description:
                'Owned 4 production React SPA products end-to-end over ~18 months (invoice / bilingual UI, Web3 RPC dashboard, cloud deploy console, AI-assisted DB analyzer), each with Redux Toolkit and RESTful backends — all merges via mandatory peer-reviewed PRs.\nImproved load and runtime behavior using route-level code splitting, lazy loading, and re-render tuning; ~25–35% lower initial JS on lazy-split routes vs monolithic entry bundles (staging Lighthouse).\nBuilt 20+ reusable UI primitives and layouts reused across 3+ client codebases; standardized ESLint/Prettier.\nRan 2-week Agile cycles in ClickUp (~40 sprints); weekly code reviews across active products.',
        },
        {
            role: 'Jr Software developer Trainee',
            company: '3Elixir Software Solution',
            location: 'Surat, Gujarat',
            start: '2023-09',
            end: '2023-10',
            description:
                'Completed an intensive 2-month React.js onboarding; shipped 8+ small interactive UI features (forms, lists, responsive layouts) using React.js, HTML5, CSS3, and ES6+ under senior-developer mentorship.\nEstablished Git branching, folder structure, and component reuse patterns applied in later production roles.',
        },
        {
            role: 'Production Officer/Executive',
            company: 'Sun Pharma, Lupin Industries Ltd.',
            location: 'Ankleswar, Gujarat',
            start: '2020-11',
            end: '2023-05',
            description:
                'Prior manufacturing operations role before career transition to software development (see education note).',
        },
    ],
    projects: [
        {
            title: 'TalleFlow — Multi-Tenant B2B Operations Platform',
            url: 'https://app.talleflow.com/',
            description:
                'Full-stack ownership of a multi-tenant B2B suite spanning 10+ product domains (projects, tasks, contacts, documents, forms, e-signatures, billing, community/marketplace, user-defined automation, background workers).\nStack: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack React Query, Zustand, React Hook Form + Zod; Node.js, Express, MongoDB / Mongoose, Clerk (auth + webhooks), Stripe (billing + webhooks), Trigger.dev.\nIntegrated 8+ external systems (Google Gmail/Calendar, Microsoft Outlook, Zoom, Unlayer, Canva, Shopify, Resend, and related OAuth flows). Quality: Vitest (unit/integration) and Playwright E2E (authentication, tenant isolation, critical user journeys).\nDelivery combined AI-assisted coding tools with hands-on architecture, API design, security review, and production rollout.',
        },
        {
            title: 'Skyline — Elevator Project Lifecycle Management',
            url: 'https://dev-qa-skyline.onrender.com/',
            description:
                'Core operations platform covering 10+ workflow areas (proposals MRL/hydraulic/traction, contracts, inspection and permit stages, client directory, Gmail-linked inbox, documents, payments, notifications). Extended one codebase to 2 branded client portals: Wyton Developers (https://portal.wytondevelopers.com/) and LIFTREX (https://portal.liftrex.com/).\nFrontend: React 18, TypeScript, Vite, React Router 7, Tailwind CSS, Radix UI, Redux Toolkit + redux-persist, TanStack React Query, Axios, React Hook Form + Yup, Framer Motion, Google Maps, Google OAuth.\nBackend: Hapi.js 21, Joi, Mongoose 8 / MongoDB, JWT, hapi-swagger, Winston, node-cron; 10+ integration touchpoints (AWS S3, Gmail API OAuth2, Twilio, Nodemailer, Dropbox, Adobe PDF, wkhtmltopdf, Handlebars, ExcelJS, etc.).',
        },
        {
            title: 'Revizze — IB Exam Prep Platform',
            url: 'https://www.revizze.io/',
            description:
                'Public IB exam-prep platform serving 4,000+ students.\nAdmin-side full-stack: React admin UI and REST APIs for internal operations, content workflows, and tooling behind study plans, exam-style practice, summaries, quizzes, Extended Essay builder, and grade/progress insights.',
        },
        {
            title: 'SANAD-HUB — Invoice Management Platform',
            url: 'https://sanadhub-frontend.netlify.app/login',
            description:
                'Built a bilingual (Arabic / English) invoice management platform with RTL layout support using React.js, Joy UI, and Tailwind CSS for layout, spacing, and responsive styling.\nEnabled admins to create and customize invoice templates, manage client financial records, and export structured billing data; integrated REST APIs for dynamic data rendering.',
        },
        {
            title: 'Additional products & demos (portfolio)',
            url: 'https://bibhash-lenka.netlify.app/',
            description:
                'Unode — Web3 RPC platform: MetaMask, NowPayments, Superfluid (https://unode.unification.io/). Xplorx — deploy Docker/GitHub/PostgreSQL, logs & custom domains (https://cloud.xplorx.app/). DBLYSER — PostgreSQL performance & AI insights (https://dba-fe-xxxvii-ptbu.onxplorx.app/). Book-My-Band — bands/fans, Razorpay (https://bookmyband.live). More links and context on portfolio.',
        },
    ],
    skills: {
        skills:
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nData: MongoDB, Mongoose, PostgreSQL (managed instances, analytics, performance tooling)\nIntegrations & services: OAuth 2.0 flows (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development (structured prompting and IDE workflows), collaborative and LLM-assisted code review with engineer sign-off, production hardening',
    },
    tools: {
        tools:
            'Design & UX: Figma\nEditors & AI IDEs: Visual Studio Code, Cursor, Claude, Kiro, Google Antigravity\nWorkflow: spec-driven development; AI-accelerated implementation with engineer-owned architecture, review, and release\nCollaboration & PM: ClickUp, Jira\nAPI debugging: Postman\nVersion control: Git, GitHub, GitHub Desktop\nQuality & debugging: ESLint, Prettier, Chrome DevTools, React Developer Tools, Redux DevTools\nPackage managers: npm, Yarn',
    },
    certificates: [
        {
            title: 'Dedicated Employee',
            date: '2020-11',
        },
        {
            title: 'Rising Start of the Month',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-01',
        },
        {
            title: 'Quarter of the year',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-06',
        },
    ],
    languages: [
        {
            language: 'English',
            proficiency: 'Professional Working Proficiency',
        },
        {
            language: 'Hindi',
            proficiency: 'Full Professional Proficiency',
        },
        {
            language: 'Oriya',
            proficiency: 'Native or Bilingual Proficiency',
        },
        {
            language: 'Gujarati',
            proficiency: 'Full Professional Proficiency',
        },
    ],
    saved: true,
};

/* ------------------------------------------------------------------ */
/*  2. Helpers                                                         */
/* ------------------------------------------------------------------ */

const PROFILE_45_ID = 'profile-4-5-years';
const PROFILE_25_ID = 'profile-2-5-years';
const PROFILE_TALLEFLOW_ID = 'profile-talleflow-25yr';

const deepClone = obj => JSON.parse(JSON.stringify(obj));

/** Build an empty resume shell (all fields empty) */
const createEmptyProfile = (name = 'Untitled Resume') => ({
    meta: { name },
    contact: {
        name: '',
        email: '',
        phone: '',
        title: '',
        linkedin: '',
        github: '',
        blogs: '',
        twitter: '',
        portfolio: '',
    },
    summary: { summary: '' },
    education: [],
    experience: [],
    projects: [],
    skills: { skills: '' },
    tools: { tools: '' },
    certificates: [],
    languages: [],
    saved: false,
});

/* ------------------------------------------------------------------ */
/*  3. Slice                                                           */
/* ------------------------------------------------------------------ */

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        profiles: {
            [PROFILE_45_ID]: deepClone(profile45),
            [PROFILE_25_ID]: deepClone(profile25),
            [PROFILE_TALLEFLOW_ID]: deepClone(profile25Talleflow),
        },
        activeProfileId: PROFILE_45_ID,
    },
    reducers: {
        /* ---------- profile management ---------- */

        switchProfile: (state, action) => {
            state.activeProfileId = action.payload;
        },

        createProfile: (state, action) => {
            const name = action.payload || 'Untitled Resume';
            const id = `profile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            state.profiles[id] = createEmptyProfile(name);
            state.activeProfileId = id;
        },

        duplicateProfile: (state, action) => {
            const sourceId = action.payload || state.activeProfileId;
            const source = state.profiles[sourceId];
            if (!source) return;
            const id = `profile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            state.profiles[id] = deepClone(source);
            state.profiles[id].meta = { name: `${source.meta.name} (Copy)` };
            state.profiles[id].saved = false;
            state.activeProfileId = id;
        },

        renameProfile: (state, action) => {
            const { id, name } = action.payload;
            const profile = state.profiles[id];
            if (profile) profile.meta.name = name;
        },

        deleteProfile: (state, action) => {
            const id = action.payload || state.activeProfileId;
            // Don't delete the last profile
            const keys = Object.keys(state.profiles);
            if (keys.length <= 1) return;

            delete state.profiles[id];

            if (state.activeProfileId === id) {
                const remaining = Object.keys(state.profiles);
                state.activeProfileId = remaining[0];
            }
        },

        /* ---------- field editing ---------- */

        updateResumeValue: (state, action) => {
            const profile = state.profiles[state.activeProfileId];
            if (!profile) return;

            const { tab, name, value, index } = action.payload;
            if (index != null) {
                profile[tab][index][name] = value;
            } else {
                profile[tab][name] = value;
            }
            profile.saved = false;
        },

        addNewIndex: (state, action) => {
            const profile = state.profiles[state.activeProfileId];
            if (!profile) return;

            const { tab } = action.payload;
            profile[tab].push({});
            profile.saved = false;
        },

        deleteIndex: (state, action) => {
            const profile = state.profiles[state.activeProfileId];
            if (!profile) return;

            const { index, tab } = action.payload;
            profile[tab].splice(index, 1);
            profile.saved = false;
        },

        moveIndex: (state, action) => {
            const profile = state.profiles[state.activeProfileId];
            if (!profile) return;

            const { index, tab, dir } = action.payload;
            const newIndex = dir === 'up' ? index - 1 : index + 1;
            const temp = profile[tab][index];
            profile[tab][index] = profile[tab][newIndex];
            profile[tab][newIndex] = temp;
            profile.saved = false;
        },

        saveResume: state => {
            const profile = state.profiles[state.activeProfileId];
            if (profile) profile.saved = true;
        },

        resetProfileToDefaults: (state, action) => {
            const sourceId = action.payload;
            if (sourceId === PROFILE_45_ID) {
                state.profiles[PROFILE_45_ID] = deepClone(profile45);
            } else if (sourceId === PROFILE_25_ID) {
                state.profiles[PROFILE_25_ID] = deepClone(profile25);
            } else if (sourceId === PROFILE_TALLEFLOW_ID) {
                state.profiles[PROFILE_TALLEFLOW_ID] = deepClone(profile25Talleflow);
            } else if (sourceId && state.profiles[sourceId]) {
                // Clear all sections but keep the meta name
                const name = state.profiles[sourceId].meta.name;
                state.profiles[sourceId] = { ...createEmptyProfile(name), meta: { name } };
            }
        },

        clearProfile: (state, action) => {
            const sourceId = action.payload || state.activeProfileId;
            const profile = state.profiles[sourceId];
            if (!profile) return;
            const name = profile.meta.name;
            state.profiles[sourceId] = { ...createEmptyProfile(name), meta: { name } };
        },

        importProfile: (state, action) => {
            const { name, data } = action.payload;
            const id = `profile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            state.profiles[id] = {
                ...deepClone(data),
                meta: { name: name || data?.meta?.name || 'Imported Resume' },
                saved: false,
            };
            state.activeProfileId = id;
        },
    },
});

export const {
    switchProfile,
    createProfile,
    duplicateProfile,
    renameProfile,
    deleteProfile,
    updateResumeValue,
    addNewIndex,
    deleteIndex,
    moveIndex,
    saveResume,
    resetProfileToDefaults,
    clearProfile,
    importProfile,
} = resumeSlice.actions;

/** Select the active (currently viewed/edited) resume data object */
export const selectActiveResume = state => state.resume.profiles[state.resume.activeProfileId];

/** Select the active resume's section data by tab name */
export const selectActiveTab = tab => state => {
    const profile = state.resume.profiles[state.resume.activeProfileId];
    return profile ? profile[tab] : undefined;
};

export default resumeSlice.reducer;
