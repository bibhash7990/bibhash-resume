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
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Next.js, AngularJS, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nMobile: React Native, Expo, cross-platform iOS & Android delivery\nData: SQL, MySQL, PostgreSQL, MongoDB, Mongoose, schema design, indexing & query optimization\nIntegrations & services: OAuth 2.0 (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development, LLM-assisted code review with engineer sign-off, production hardening',
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
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Next.js, AngularJS, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nMobile: React Native, Expo, cross-platform iOS & Android delivery\nData: SQL, MySQL, PostgreSQL, MongoDB, Mongoose, schema design, indexing & query optimization\nIntegrations & services: OAuth 2.0 flows (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development (structured prompting and IDE workflows), collaborative and LLM-assisted code review with engineer sign-off, production hardening',
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
            'Languages & markup: JavaScript (ES6+), TypeScript, HTML5, CSS3, JSX\nFrontend & UI: React.js, Next.js, AngularJS, Vite, React Router, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Joy UI, Chakra UI, Bootstrap, Styled Components, SASS, Framer Motion, responsive & cross-browser UI\nState & data fetching: Redux Toolkit, redux-persist, Zustand, TanStack React Query\nForms & validation: React Hook Form, Formik, Zod, Yup\nBackend & APIs: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi, MVC / service-layer architecture, Swagger / hapi-swagger, Winston, node-cron\nMobile: React Native, Expo, cross-platform iOS & Android delivery\nData: SQL, MySQL, PostgreSQL, MongoDB, Mongoose, schema design, indexing & query optimization\nIntegrations & services: OAuth 2.0 flows (Google, Gmail, Clerk, Stripe webhooks), AWS S3, Google Maps API, Stripe, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, Handlebars, ExcelJS, Trigger.dev, Resend, MetaMask, NowPayments, Razorpay, Superfluid\nTesting: Vitest, Playwright\nPlatforms & delivery: Docker (basics), CI/CD via Vercel, Netlify, Railway (git-based deploys)\nPractices: Agile / Scrum, spec-driven delivery, AI-assisted development (structured prompting and IDE workflows), collaborative and LLM-assisted code review with engineer sign-off, production hardening',
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
/*  1c. Profile — Overall experience (chemical / pharma re-entry)      */
/*      Whole career in one resume: API production (2020-2022) then    */
/*      software (2023-2026). Written for API / bulk drug / specialty  */
/*      chemical roles, so pharma keywords lead and the software roles */
/*      stay short. Strict reverse-chronological order for ATS date    */
/*      parsing; every employer kept so the timeline matches PF/UAN.   */
/* ------------------------------------------------------------------ */

/* Neutral, dual-industry skill set shared by the market layouts that show
 * both careers without favouring either. Defined once so the wording cannot
 * drift apart between formats. */
const OVERALL_SKILLS_NEUTRAL =
    'Chemical and Pharmaceutical Production: API / bulk drug batch manufacturing, raw material and solvent charging, reaction monitoring, work-up and layer separation, distillation, solvent recovery, crystallisation, filtration, centrifugation, vacuum drying, shift production planning, yield and cycle-time improvement\nProcess Equipment: stainless steel and glass-lined reactors, agitated nutsche filter dryer (ANFD), stainless steel centrifuge, sparkler filter, Nutsche filter, vacuum tray dryer, Nauta dryer, wiped film evaporator, dry vacuum system\nGMP and Compliance: cGMP, BMR / BPR review, SOP preparation and revision, line and area clearance, in-process control (IPC), deviation and incident reporting, CAPA, change control, QMS documentation, data integrity (ALCOA+), 21 CFR Part 11, audit readiness (USFDA, EU-GMP, WHO-GMP)\nProcess Safety and Environment: MSDS and chemical hazard handling, PPE compliance, work permit system, lock-out tag-out, spill and emergency response, hazardous waste handling, ETP coordination\nChemical Engineering Fundamentals: heat and mass transfer, fluid mechanics, chemical reaction engineering, unit operations, process design and simulation, mass and energy balance, P&ID interpretation, plant utilities\nLanguages and Frameworks: JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3, Tailwind CSS, Radix UI, shadcn/ui, Material UI, Framer Motion\nBackend and Databases: Node.js, Express.js, Hapi.js, REST API design, JWT, Joi / Zod validation, MongoDB, Mongoose, SQL, MySQL, PostgreSQL, schema design, indexing and query optimisation\nState, Forms and Testing: Redux Toolkit, Zustand, TanStack React Query, React Hook Form, Yup, Vitest, Playwright\nIntegrations and Automation: OAuth 2.0 (Google, Gmail, Clerk), Stripe, AWS S3, Twilio, Nodemailer, Trigger.dev, node-cron, Razorpay\nDelivery and Collaboration: Git, GitHub, CI/CD (Vercel, Netlify, Railway), Agile / Scrum, Jira, ClickUp, peer code review';

const OVERALL_TOOLS_NEUTRAL =
    'Engineering and documentation: DWSIM, Microsoft Excel (advanced), Microsoft Word, Microsoft PowerPoint\nDevelopment and debugging: Visual Studio Code, Cursor, Postman, Figma, ESLint, Prettier, Chrome DevTools';

const profileOverall = {
    meta: {
        name: 'Overall Experience',
        template: 'format1',
        allowedTemplates: ['format1', 'format2', 'europass', 'gcc', 'lebenslauf', 'anz', 'japan'],
        // Each layout targets a different hiring market and they expect
        // genuinely different documents - a Gulf CV wants the personal details
        // an Australian one must not carry. Labelled by destination so the
        // right file goes to the right country.
        templateLabels: {
            format1: 'Format 1 - India / Domestic (Chemical)',
            format2: 'Format 2 - US / UK / Canada (Anglo)',
            europass: 'Format 3 - Europe (Europass EU)',
            gcc: 'Format 4 - Gulf (UAE, Saudi, Qatar)',
            lebenslauf: 'Format 5 - Germany / Austria / Swiss',
            anz: 'Format 6 - Australia / New Zealand',
            japan: 'Format 7 - Japan',
        },
        // This profile spans two industries, so Format 2 must not expand one
        // employer's projects over the others, and must not funnel skills
        // through software-only category headings.
        curatedProjects: false,
        skillsLayout: 'verbatim',
        skillsTitle: 'Core Skills',
        // Format 1 is aimed at chemical/pharma openings and states a target
        // role. Format 2 is the neutral whole-career CV: both industries given
        // equal weight, no target role stated.
        templateOverrides: {
            format2: {
                contact: {
                    title: 'Full Stack Developer | Chemical Engineer',
                },
                summary: {
                    summary:
                        'Engineer with 4.5 years of combined professional experience across pharmaceutical manufacturing and software development. Two years in API and bulk drug production at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., covering shift operations on stainless steel and glass-lined reactors, ANFD, centrifuges and vacuum dryers under cGMP, with BMR / BPR review, in-process monitoring, deviation and CAPA handling, and USFDA / EU-GMP audit participation. Two and a half years as a full stack developer at Techfidants and Sourcecube Technology, building production web applications with React, TypeScript, Node.js and MongoDB, covering REST API design, third-party integrations, background automation and audit-trailed, role-controlled systems. BE in Chemical Engineering, 9.18 CGPA, Gujarat Technological University.',
                },
                skills: { skills: OVERALL_SKILLS_NEUTRAL },
                tools: { tools: OVERALL_TOOLS_NEUTRAL },
            },
            // Europass carries personal fields the other layouts deliberately
            // omit. Work authorisation is stated up front because EU employers
            // screen on it, and finding out late wastes both sides' time.
            europass: {
                contact: {
                    title: 'Chemical Engineer | Full Stack Developer',
                },
                personal: {
                    address: 'Surat, Gujarat, India',
                    dateOfBirth: '15/06/1999',
                    nationality: 'Indian',
                    workAuthorisation:
                        'Non-EU national. Requires employer sponsorship for an EU work permit or EU Blue Card. Open to relocation across the EU.',
                },
                summary: {
                    summary:
                        'Chemical engineer (BE, EQF level 6, 9.18/10) with 4.5 years of combined professional experience across pharmaceutical manufacturing and software development. Two years in active pharmaceutical ingredient (API) and bulk drug production at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., covering shift operations on stainless steel and glass-lined reactors, agitated nutsche filter dryers, centrifuges and vacuum dryers under EU-GMP and cGMP conditions, together with batch record review, in-process monitoring, deviation and CAPA handling and regulatory audit preparation. Two and a half years as a full stack developer at Techfidants and Sourcecube Technology, building production web applications with React, TypeScript, Node.js and MongoDB, including REST API design, third-party integrations, background automation and audit-trailed, role-controlled systems aligned with electronic record principles. Comfortable working in English in international, cross-functional teams.',
                },
                skills: {
                    skills:
                        'Pharmaceutical and chemical production: API and bulk drug batch manufacturing, reaction monitoring, distillation, solvent recovery, crystallisation, filtration, centrifugation, vacuum drying, shift planning, yield and cycle-time improvement\nProcess equipment: stainless steel and glass-lined reactors, agitated nutsche filter dryer (ANFD), centrifuge, sparkler filter, Nutsche filter, vacuum tray dryer, Nauta dryer, wiped film evaporator, dry vacuum system\nQuality and regulatory: EU-GMP, cGMP, ICH Q7, batch manufacturing record review, standard operating procedures, in-process control, deviation and CAPA management, change control, data integrity (ALCOA+), 21 CFR Part 11, audit preparation (EU-GMP, US FDA, WHO-GMP)\nHealth, safety and environment: chemical hazard handling and safety data sheets, personal protective equipment, permit-to-work systems, lock-out tag-out, spill and emergency response, hazardous waste handling, effluent treatment coordination\nEngineering fundamentals: heat and mass transfer, fluid mechanics, chemical reaction engineering, unit operations, process design and simulation, mass and energy balance, piping and instrumentation diagrams, plant utilities\nSoftware engineering: JavaScript, TypeScript, React.js, Next.js, Node.js, Express.js, REST API design, MongoDB, SQL, automated testing (Vitest, Playwright), version control and continuous delivery\nTransferable and organisational: cross-functional coordination with quality, engineering and warehouse teams, technical documentation, shift handover and team supervision, structured problem solving, Agile delivery',
                },
                tools: {
                    tools:
                        'Process simulation and engineering: DWSIM\nOffice and reporting: Microsoft Excel (advanced), Microsoft Word, Microsoft PowerPoint\nEnterprise systems: SAP / ERP awareness, electronic batch record and controlled documentation systems\nSoftware development: Visual Studio Code, Git, GitHub, Postman, Figma, Node.js, MongoDB, SQL',
                },
            },

            // Gulf recruiters filter on visa status at first scan, so it is
            // stated plainly. Passport number, religion, height and weight are
            // deliberately absent - legacy Gulf CV fields with no hiring value.
            gcc: {
                contact: {
                    title: 'Chemical Engineer | Production Officer - API, Bulk Drug & Petrochemicals',
                },
                personal: {
                    nationality: 'Indian',
                    dateOfBirth: '15/06/1999',
                    maritalStatus: 'Single',
                    visaStatus: 'Requires employment visa sponsorship (currently in India, no GCC visa held)',
                    address: 'Surat, Gujarat, India',
                    noticePeriod: 'Immediately available',
                    relocation: 'Yes - open to relocation across the GCC',
                },
                summary: {
                    summary:
                        'Chemical Engineer (BE, 9.18/10) with 2 years of hands-on production experience in active pharmaceutical ingredient (API) and bulk drug manufacturing at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., plus 2.5 years in software engineering. Shop-floor experience covers shift operations on stainless steel and glass-lined reactors, agitated nutsche filter dryers, centrifuges, sparkler and Nutsche filters, vacuum tray and Nauta dryers and wiped film evaporators, together with batch record review, in-process monitoring, deviation and CAPA handling, permit-to-work systems and regulatory audit preparation under cGMP and EU-GMP. Sustained a zero reportable-accident record across shift operations. Additionally experienced in production data analysis, MIS reporting and digital documentation systems.',
                },
                skills: { skills: OVERALL_SKILLS_NEUTRAL },
                tools: { tools: OVERALL_TOOLS_NEUTRAL },
            },

            lebenslauf: {
                contact: {
                    title: 'Chemical Engineer | Full Stack Developer',
                },
                personal: {
                    address: 'Surat, Gujarat, India',
                    dateOfBirth: '15/06/1999',
                    placeOfBirth: 'India',
                    nationality: 'Indian / indisch',
                    workAuthorisation:
                        'Non-EU national - requires visa sponsorship (EU Blue Card eligible on a qualifying offer)',
                    signaturePlace: 'Surat, India',
                },
                summary: {
                    summary:
                        'Chemical engineer (BE, EQF level 6, final grade 9.18/10) with 4.5 years of combined professional experience. Two years in API and bulk drug production at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., covering shift operations on stainless steel and glass-lined reactors, agitated nutsche filter dryers, centrifuges and vacuum dryers under cGMP and EU-GMP conditions, with batch record review, in-process control, deviation and CAPA handling and audit preparation. Two and a half years as a full stack developer building production web applications with React, TypeScript, Node.js and MongoDB, including audit-trailed and role-controlled systems. Working language English; willing to begin German language training (target B1) alongside the role.',
                },
                skills: { skills: OVERALL_SKILLS_NEUTRAL },
                tools: { tools: OVERALL_TOOLS_NEUTRAL },
            },

            // Referees are left unnamed on purpose: real contacts must come
            // from him, not be invented here.
            anz: {
                contact: {
                    title: 'Chemical Engineer | Full Stack Developer',
                },
                personal: {
                    workRights:
                        'Work rights: Indian citizen, no current Australian or New Zealand work visa. Requires employer sponsorship; eligible to apply for skilled visa streams.',
                    referees: [],
                },
                summary: {
                    summary:
                        'Chemical engineer with 4.5 years of combined professional experience across pharmaceutical manufacturing and software development. Two years as a production officer in API and bulk drug manufacturing at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., running shift operations on reactors, filter dryers, centrifuges and vacuum dryers under cGMP, with batch documentation review, in-process monitoring, deviation and CAPA management, permit-to-work compliance and regulatory audit preparation. Two and a half years as a full stack developer delivering production web applications with React, TypeScript, Node.js and MongoDB, including REST API design, integrations, automation and audit-trailed systems. Strong record in safety compliance, cross-functional coordination and technical documentation.',
                },
                skills: { skills: OVERALL_SKILLS_NEUTRAL },
                tools: { tools: OVERALL_TOOLS_NEUTRAL },
            },

            japan: {
                contact: {
                    title: 'Chemical Engineer | Full Stack Developer',
                },
                personal: {
                    dateOfBirth: '15/06/1999',
                    nationality: 'Indian',
                    address: 'Surat, Gujarat, India',
                    visaStatus: 'No current Japan visa - requires employer sponsorship (Engineer / Specialist in Humanities visa category)',
                    japaneseLevel: 'No JLPT certification at present; applying for English-language roles and prepared to begin Japanese study',
                },
                summary: {
                    summary:
                        'I am a chemical engineer with 4.5 years of combined experience in pharmaceutical manufacturing and software development. In my first two years I worked as a production officer in API and bulk drug manufacturing, where I learned to operate reactors, filter dryers and centrifuges under strict cGMP conditions, to record every step accurately in batch records, and to report and investigate any deviation immediately rather than resolve it informally. That discipline of accurate documentation and continuous improvement is what I value most from that period. I then spent two and a half years as a full stack developer, building production web applications with React, TypeScript, Node.js and MongoDB, including systems with audit trails and controlled user access. I would like to bring both the manufacturing discipline and the technical skill to a role where process quality and reliable systems matter, and I am committed to learning the language and working practices of the company I join.',
                },
                skills: { skills: OVERALL_SKILLS_NEUTRAL },
                tools: { tools: OVERALL_TOOLS_NEUTRAL },
            },
        },
    },
    contact: {
        name: 'Bibhash Lenka',
        email: 'bibhash88lenka@gmail.com',
        phone: '7990721091',
        title: 'Chemical Engineer | Production Officer - API & Bulk Drug Manufacturing',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: '',
        blogs: '',
        twitter: '',
        portfolio: '',
    },
    summary: {
        summary:
            'Chemical Engineer (BE, 9.18 CGPA) with 2 years of hands-on API and bulk drug production experience at Sun Pharmaceutical Industries Ltd. and Praveen Laboratories Pvt. Ltd., covering shift operations, BMR/BPR review, in-process monitoring, deviation and CAPA handling, and USFDA / EU-GMP audit readiness. Independently operated and supervised stainless steel and glass-lined reactors, ANFD, centrifuges, sparkler and Nutsche filters, vacuum tray dryer, Nauta dryer and wiped film evaporators in a cGMP environment with a sustained zero-accident record. Subsequently spent 2.5 years in software engineering building production documentation, reporting and workflow-automation systems, and is now returning to core chemical and pharmaceutical manufacturing with added strength in process data analysis, digital documentation and system validation concepts (CSV / GAMP 5, ALCOA+, 21 CFR Part 11). Based in Surat, Gujarat, India and open to relocation across Indian pharma and chemical manufacturing clusters. Seeking Production Officer / Executive, Process Engineer or Manufacturing Engineer roles in API, bulk drug, intermediate or specialty chemical plants.',
    },
    education: [
        {
            degree: 'Bachelor of Engineering in Chemical Engineering',
            institution: 'Prime Institute of Engineering and Technology (Gujarat Technological University)',
            start: '2016-06',
            end: '2020-08',
            location: 'Navsari, Gujarat',
            gpa: '9.18/10',
            eqf: '6 (Bachelor)',
            note: 'Core discipline: chemical engineering. Worked 2 years in API / bulk drug production (2020-2022), then 2.5 years in software engineering (2023-2026); now returning to chemical and pharmaceutical manufacturing with added data, documentation and digital-systems capability.',
        },
        {
            degree: 'Higher Secondary Certificate (Science) - 78%',
            institution: 'Gyan Jyot Vidyalaya (G.S.E.B.)',
            eqf: '4 (Upper secondary)',
            start: '2014-06',
            end: '2016-08',
            location: 'Surat, Gujarat',
        },
        {
            degree: 'Secondary School Certificate - 75%',
            institution: 'Adarsh Hindi Vidyalaya (G.S.E.B.)',
            eqf: '2 (Lower secondary)',
            start: '2013-06',
            end: '2014-06',
            location: 'Surat, Gujarat',
        },
    ],
    experience: [
        {
            role: 'Software Developer (Full-Stack)',
            company: 'Techfidants',
            sector: 'Computer programming, consultancy and related activities',
            location: 'Surat, Gujarat',
            start: '2025-07',
            end: '2026-05',
            description:
                'Built and maintained web-based operations platforms covering project tracking, controlled document management, approval and e-signature flows and automated reporting - the digital equivalent of shop-floor documentation and workflow control.\nImplemented audit trails, role-based access and validation logic aligned with electronic record principles (21 CFR Part 11 / ALCOA+), plus scheduled jobs for reminders, data sync and report generation.\nDelivered every release under documented requirements, peer review, versioned change control and formal QA sign-off.',
        },
        {
            role: 'Junior Software Developer',
            company: 'Sourcecube Technology Pvt. Ltd.',
            sector: 'Computer programming, consultancy and related activities',
            location: 'Surat, Gujarat',
            start: '2023-11',
            end: '2025-06',
            description:
                'Developed data-heavy dashboards, reporting modules and invoice / billing systems across four production applications, building SQL and data-analysis capability directly applicable to production MIS, yield tracking and trend reporting.\nWorked in two-week planning cycles with written requirements, peer review and release approval - a controlled-change discipline transferable to change control and SOP revision.',
        },
        {
            role: 'Junior Software Developer Trainee',
            company: '3Elixir Software Solution',
            sector: 'Computer programming, consultancy and related activities',
            location: 'Surat, Gujarat',
            start: '2023-09',
            end: '2023-10',
            description:
                'Completed a structured two-month software development training programme following the transition out of the pharmaceutical sector.',
        },
        {
            role: 'Career Transition - Full-Time Technical Upskilling',
            company: 'Self-Directed Study',
            sector: 'Professional development and training',
            location: 'Surat, Gujarat',
            start: '2023-01',
            end: '2023-08',
            description:
                'Studied full time to build software and data skills alongside the chemical engineering base - programming fundamentals, databases and SQL, and web application development.\nBuilt practice projects end to end to consolidate the learning before entering a professional software role.',
        },
        {
            role: 'Production Officer - API / Bulk Drug Manufacturing',
            company: 'Sun Pharmaceutical Industries Ltd.',
            sector: 'Manufacture of basic pharmaceutical products and preparations - API and bulk drugs',
            location: 'Panoli, Ankleshwar, Gujarat',
            start: '2022-05',
            end: '2022-12',
            description:
                'Led shift production operations in an API / bulk drug block, planning and executing batch schedules across reaction, filtration and drying trains to consistently meet monthly production targets.\nReviewed Batch Manufacturing Records (BMR / BPR) and equipment cleaning, area cleaning and differential-pressure logbooks, ensuring every entry was complete, contemporaneous and signed as per cGMP and ALCOA+ data integrity requirements.\nCarried out online process monitoring and filling - reaction temperature, pressure, pH, vacuum, nitrogen blanketing and reflux control - and coordinated in-process sampling with QC to hold batches within defined process parameters.\nOperated and supervised stainless steel and glass-lined reactors, agitated nutsche filter dryer (ANFD), stainless steel centrifuge, sparkler filter, Nutsche filter, vacuum tray dryer, Nauta dryer, wiped film evaporator and dry vacuum systems.\nReported deviations, incidents and abnormalities to QA within the shift and supported root cause investigation, CAPA closure and the associated change control documentation.\nPerformed daily verification and calibration checks of weighing balances and process instruments in the production area, and ensured line clearance and area clearance before every batch charging.\nPrepared the block for internal, customer and regulatory audits (USFDA / EU-GMP readiness) - compiled documentation, faced audit queries and closed observations within committed timelines.\nCoordinated daily with QA, QC, Engineering, Stores and EHS to confirm utility and raw material availability before charging, keeping shop-floor execution uninterrupted.\nSupervised shift operators and contract manpower and enforced PPE compliance, work permit and lock-out systems and safe handling of hazardous solvents and chemicals - sustained a zero reportable-accident record.\nDrove 5S and housekeeping standards and coordinated preventive maintenance and breakdown response with Engineering to minimise equipment downtime.',
        },
        {
            role: 'Trainee Chemist - Production',
            company: 'Praveen Laboratories Pvt. Ltd.',
            sector: 'Manufacture of basic pharmaceutical products and preparations - API and bulk drugs',
            location: 'Jolva, Kadodara, Gujarat',
            start: '2020-11',
            end: '2022-05',
            description:
                'Executed batch manufacturing operations in the API production block - raw material and solvent charging, reaction, work-up, layer separation, filtration, centrifugation and drying - strictly as per approved BMR and SOPs.\nMonitored critical process parameters in real time, recorded in-process data in batch records and escalated any deviation from set limits to the shift in-charge immediately.\nHandled distillation and solvent recovery operations and vacuum drying cycles with continuous attention to batch yield and cycle-time improvement.\nMaintained equipment cleaning, area cleaning, environmental pressure differential and instrument logbooks to GMP documentation standards.\nApplied plant safety practices daily - MSDS and chemical hazard awareness, PPE, work permit system, spill control and safe handling of flammable and corrosive materials.\nSupported audit preparation, SOP revision and on-floor training of newly joined operators.',
        },
    ],
    projects: [
        {
            title: 'Design and Simulation of Multifluid Heat Exchanger',
            url: '',
            start: '2019-08',
            end: '2020-05',
            description:
                'Final year BE project - designed a multifluid heat exchanger and validated its thermal and hydraulic performance through process simulation in DWSIM.\nPerformed mass and energy balance, LMTD and heat duty calculations, heat transfer area sizing and pressure drop estimation across multiple fluid streams.\nAnalysed the effect of flow arrangement and operating conditions on heat recovery and overall exchanger efficiency.',
        },
        {
            title: 'Industrial Training - Production of Nitrosyl Sulfuric Acid',
            url: '',
            start: '2019-06',
            end: '2019-06',
            description:
                'Plant training at Aceto Chem Pvt. Ltd. covering the nitrosyl sulfuric acid manufacturing route - raw material handling, reaction section, absorption, process control parameters and safety interlocks.\nStudied the plant P&ID, utility network and hazardous chemical handling and storage practices.',
        },
        {
            title: 'Production Reporting and Documentation Tooling (self-built)',
            url: '',
            start: '',
            end: '',
            description:
                'Applied software experience to build data-entry, validation and reporting tools with audit trails and controlled user access - directly relevant to electronic batch records, LIMS / MES support and computer system validation (CSV) work in regulated pharmaceutical manufacturing.',
        },
    ],
    skills: {
        skills:
            'Production and Manufacturing: API / bulk drug batch manufacturing, raw material and solvent charging, reaction monitoring, work-up and layer separation, distillation, solvent recovery, crystallisation, filtration, centrifugation, vacuum and tray drying, yield improvement, cycle-time reduction, shift production planning\nEquipment Handled: stainless steel reactor, glass-lined reactor, agitated nutsche filter dryer (ANFD), stainless steel centrifuge, sparkler filter, Nutsche filter, vacuum tray dryer (VTD), Nauta dryer, wiped film evaporator (WFE), dry vacuum system, condensers, receivers and scrubbers\nQuality and Compliance: cGMP, Schedule M, BMR / BPR review and release, SOP preparation and revision, line clearance and area clearance, in-process control (IPC), deviation and incident reporting, CAPA, change control, OOS / OOT support, QMS documentation, data integrity (ALCOA+), 21 CFR Part 11 awareness, audit readiness (USFDA, EU-GMP, WHO-GMP, customer and internal audits)\nSafety and Environment: process safety, MSDS and chemical hazard handling, PPE compliance, work permit system, lock-out tag-out, spill and emergency response, hazardous waste handling, ETP coordination, zero-accident shop-floor practice\nOperations and People: shift handover, production target achievement, operator and contract manpower supervision, cross-functional coordination with QA / QC / Engineering / Stores / EHS, logbook and documentation control, 5S, housekeeping, preventive maintenance coordination, balance and instrument calibration verification\nEngineering Fundamentals: heat and mass transfer, fluid mechanics, chemical reaction engineering, unit operations, process design and simulation, mass and energy balance, P&ID interpretation, plant utilities (steam, chilled brine, nitrogen, cooling water, vacuum)\nData and Digital: advanced Microsoft Excel, production data analysis and MIS reporting, process digitisation, SAP / ERP awareness, LIMS and MES concepts, computer system validation (CSV / GAMP 5) awareness, dashboard and report building, SQL',
    },
    tools: {
        tools:
            'Process simulation: DWSIM\nDocumentation and reporting: Microsoft Excel (advanced), Microsoft Word, Microsoft PowerPoint\nPlant systems: SAP / ERP (awareness), electronic logbook and controlled documentation systems\nData and automation (from software experience): SQL, JavaScript / TypeScript, React.js, Node.js, MongoDB, Git - used to build reporting, validation and workflow-automation tools',
    },
    certificates: [
        {
            title: 'BE Chemical Engineering - 9.18 CGPA (Distinction)',
            issuer: 'Gujarat Technological University',
            date: '2020-08',
        },
        {
            title: 'Dedicated Employee Award',
            issuer: 'Praveen Laboratories Pvt. Ltd.',
            date: '2021-11',
        },
        {
            title: 'Coordinator and Sub-Coordinator, State-Level Technical Festivals',
            issuer: 'Gujarat Technological University',
            date: '',
        },
        {
            title: 'Participant, National and State-Level Technical Festivals and Workshops',
            issuer: '',
            date: '',
        },
    ],
    languages: [
        {
            language: 'English',
            proficiency: 'Professional Working Proficiency',
            listening: 'B2',
            reading: 'B2',
            spokenInteraction: 'B2',
            spokenProduction: 'B2',
            writing: 'B2',
        },
        {
            language: 'Hindi',
            proficiency: 'Full Professional Proficiency',
            listening: 'C2',
            reading: 'C1',
            spokenInteraction: 'C2',
            spokenProduction: 'C2',
            writing: 'C1',
        },
        {
            language: 'Gujarati',
            proficiency: 'Full Professional Proficiency',
            listening: 'C1',
            reading: 'B2',
            spokenInteraction: 'C1',
            spokenProduction: 'C1',
            writing: 'B2',
        },
        {
            language: 'Odia',
            proficiency: 'Native or Bilingual Proficiency',
            motherTongue: true,
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
const PROFILE_OVERALL_ID = 'profile-overall-chemical';

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
            [PROFILE_OVERALL_ID]: deepClone(profileOverall),
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
            } else if (sourceId === PROFILE_OVERALL_ID) {
                state.profiles[PROFILE_OVERALL_ID] = deepClone(profileOverall);
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
