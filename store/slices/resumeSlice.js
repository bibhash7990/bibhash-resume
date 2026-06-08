import { createSlice } from '@reduxjs/toolkit';

const defaultResume = {
    contact: {
        name: 'Bibhash lenka',
        email: 'bibhash.reactjsdev@gmail.com',
        phone: '7990721091',
        // address: '68 a shiv vatika near nansad gav kamrej surat',
        title: 'MERN Stack Developer',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: 'https://github.com/bibhash7990',
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
            'Design & UX: Figma\nEditors & AI IDEs: Visual Studio Code, Cursor, Kiro, Google Antigravity\nWorkflow: spec-driven development; AI-accelerated implementation with engineer-owned architecture, review, and release\nCollaboration & PM: ClickUp\nAPI debugging: Postman\nVersion control: Git, GitHub, GitHub Desktop\nQuality & debugging: ESLint, Prettier, Chrome DevTools, React Developer Tools, Redux DevTools\nPackage managers: npm, Yarn',
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

const cloneDefaultResume = (saved = false) => JSON.parse(JSON.stringify({ ...defaultResume, saved }));

const resumeSlice = createSlice({
    name: 'resume',
    initialState: defaultResume,
    reducers: {
        updateResumeValue: (state, action) => {
            const { tab, name, value, index } = action.payload;
            if (index != null) {
                state[tab][index][name] = value;
            } else {
                state[tab][name] = value;
            }

            state.saved = false;
        },

        addNewIndex: (state, action) => {
            const { tab, name, value } = action.payload;
            state[tab].push({});
            // state[tab].push({ [name]: [value] });
            state.saved = false;
        },

        deleteIndex: (state, action) => {
            const { index, tab } = action.payload;
            console.log('deleting', index, 'from', tab);
            state[tab].splice(index, 1);
            state.saved = false;
        },

        // for move index
        moveIndex: (state, action) => {
            const { index, tab, dir } = action.payload;

            const newIndex = dir === 'up' ? index - 1 : index + 1;

            const temp = state[tab][index];
            state[tab][index] = state[tab][newIndex];
            state[tab][newIndex] = temp;
            state.saved = false;
        },

        saveResume: state => {
            state.saved = true;
        },

        resetResumeToDefaults: () => cloneDefaultResume(false),
    },
});

export const { updateResumeValue, addNewIndex, deleteIndex, saveResume, moveIndex, resetResumeToDefaults } =
    resumeSlice.actions;
export default resumeSlice.reducer;
