'use client';

import { Page, Text, View, Document, Link, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';

const isPlaceholderSocial = v =>
    !v?.trim() ||
    /johndoe|example\.com|placeholder/i.test(v);

const toHttpUrl = raw => {
    const t = raw.trim();
    if (!t) return '';
    if (/^https?:\/\//i.test(t)) return t;
    return `https://${t.replace(/^\/+/, '')}`;
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#333333',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Helvetica',
    },
    header: {
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: '#444444',
        marginTop: 1,
    },
    contactBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 2,
    },
    contactLink: {
        fontSize: 7.5,
        color: '#333333',
        textDecoration: 'none',
    },
    contactSeparator: {
        fontSize: 7.5,
        color: '#888888',
    },
    section: {
        marginTop: 5,
        marginBottom: 1,
    },
    sectionTitleContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#333333',
        paddingBottom: 1,
        marginBottom: 3,
    },
    sectionTitle: {
        fontSize: 8.5,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    summaryText: {
        fontSize: 7.5,
        lineHeight: 1.25,
        color: '#333333',
        textAlign: 'justify',
    },
    itemContainer: {
        marginBottom: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemTitle: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        maxWidth: '75%',
    },
    itemDate: {
        fontSize: 7.5,
        fontFamily: 'Helvetica',
        color: '#222222',
    },
    itemSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 0.5,
    },
    itemSubtitle: {
        fontSize: 7.5,
        fontFamily: 'Helvetica-Bold',
        color: '#444444',
        maxWidth: '75%',
    },
    itemLocation: {
        fontSize: 7.5,
        fontFamily: 'Helvetica-Oblique',
        color: '#555555',
    },
    bulletList: {
        marginTop: 1,
        paddingLeft: 4,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 1,
    },
    bulletPoint: {
        width: 6,
        fontSize: 7.5,
        color: '#333333',
    },
    bulletText: {
        flex: 1,
        fontSize: 7.5,
        lineHeight: 1.15,
        color: '#333333',
    },
});

const Header = ({ data }) => {
    const contactLinks = [];

    if (data.phone?.trim()) {
        const raw = data.phone.trim();
        const digits = raw.replace(/\D/g, '');
        const display = raw.startsWith('+') ? raw : digits.length === 10 ? `+91 ${digits}` : raw;
        const href = digits.length === 10 ? `tel:+91${digits}` : digits.length > 0 ? `tel:+${digits}` : `tel:${raw}`;
        contactLinks.push({ key: 'phone', label: display, href });
    }

    if (data.email?.trim()) {
        const e = data.email.trim();
        contactLinks.push({ key: 'email', label: e, href: `mailto:${e}` });
    }

    if (data.linkedin?.trim() && !isPlaceholderSocial(data.linkedin)) {
        contactLinks.push({
            key: 'linkedin',
            label: 'LinkedIn',
            href: toHttpUrl(data.linkedin),
        });
    }

    if (data.github?.trim() && !isPlaceholderSocial(data.github)) {
        contactLinks.push({
            key: 'github',
            label: 'GitHub',
            href: toHttpUrl(data.github),
        });
    }

    if (data.blogs?.trim() && !isPlaceholderSocial(data.blogs)) {
        contactLinks.push({
            key: 'blogs',
            label: 'Blogs',
            href: toHttpUrl(data.blogs),
        });
    }

    if (data.twitter?.trim() && !isPlaceholderSocial(data.twitter)) {
        contactLinks.push({
            key: 'twitter',
            label: 'Twitter',
            href: toHttpUrl(data.twitter),
        });
    }

    if (data.portfolio?.trim() && !isPlaceholderSocial(data.portfolio)) {
        contactLinks.push({
            key: 'portfolio',
            label: 'Portfolio',
            href: toHttpUrl(data.portfolio),
        });
    }

    return (
        <View style={styles.header}>
            <Text style={styles.name}>{data.name}</Text>
            {data.title ? <Text style={styles.title}>{data.title}</Text> : null}
            <View style={styles.contactBar}>
                {contactLinks.map(({ key, label, href }, idx) => (
                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Link src={href} style={styles.contactLink}>
                            {label}
                        </Link>
                        {idx < contactLinks.length - 1 && (
                            <Text style={styles.contactSeparator}>  |  </Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const TechnicalSkills = ({ skillsData, toolsData }) => {
    const skillLines = skillsData
        ?.split('\n')
        .map(l => l.trim())
        .filter(Boolean) || [];

    const toolLines = toolsData
        ?.split('\n')
        .map(l => l.trim())
        .filter(Boolean) || [];

    const allLines = [...skillLines, ...toolLines];

    const parsedSkills = {};
    allLines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const category = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            parsedSkills[category.toLowerCase()] = { originalCategory: category, value };
        }
    });

    const findValue = (keywords) => {
        const matchingKeys = Object.keys(parsedSkills).filter(k => 
            keywords.some(kw => k.includes(kw.toLowerCase()))
        );
        return matchingKeys.map(k => parsedSkills[k].value).join(', ');
    };

    let languagesAndFrameworks = findValue(['languages', 'frontend', 'state', 'forms']);
    let backendAndDatabases = findValue(['backend', 'data']);
    let cloudAndPlatforms = findValue(['platform', 'cloud', 'integration', 'services']);
    let testingAndQa = findValue(['testing', 'quality', 'debugging', 'postman']);
    let toolsAndPractices = findValue(['editors', 'design', 'workflow', 'practices', 'version control', 'collaboration', 'tools']);

    if (toolsAndPractices) {
        if (!toolsAndPractices.toLowerCase().includes('claude')) {
            toolsAndPractices += ', Claude';
        }
        if (!toolsAndPractices.toLowerCase().includes('jira')) {
            toolsAndPractices += ', Jira';
        }
        if (!toolsAndPractices.toLowerCase().includes('clickup')) {
            toolsAndPractices += ', ClickUp';
        }
    } else {
        toolsAndPractices = 'Figma, VS Code, Cursor, Claude, Jira, ClickUp, Git, GitHub';
    }

    const cleanList = (str) => {
        if (!str) return '';
        return Array.from(new Set(
            str.split(',')
               .map(s => s.trim())
               .filter(Boolean)
        )).join(', ');
    };

    const groupedSkills = [
        { category: 'Languages & Frameworks', value: cleanList(languagesAndFrameworks) },
        { category: 'Backend & Databases', value: cleanList(backendAndDatabases) },
        { category: 'Cloud, Integrations & Services', value: cleanList(cloudAndPlatforms) },
        { category: 'Testing & Quality Assurance', value: cleanList(testingAndQa) },
        { category: 'Tools, Practices & Workflows', value: cleanList(toolsAndPractices) }
    ].filter(g => g.value);

    return (
        <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
            </View>
            <View style={styles.bulletList}>
                {groupedSkills.map((g, i) => (
                    <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{g.category}: </Text>
                            <Text>{g.value}</Text>
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const Experience = ({ experienceData }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
            </View>
            {experienceData.map(({ role, start, end, company, location, description }, i) => {
                const companyLower = company?.toLowerCase() || '';
                
                let customContent = null;
                
                if (companyLower.includes('techfidants')) {
                    customContent = (
                        <View style={{ marginTop: 2 }}>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: TalleFlow (B2B Multi-Tenant Operations SaaS)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    TalleFlow is a comprehensive multi-tenant B2B operations and workflow management SaaS platform designed to streamline core business processes for organizations. It consolidates multiple operations domains — projects, tasks, contacts, document storage, client portals, billing, and background automation — into a unified workspace with robust multi-tenant data isolation ensuring complete data separation between organizations.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built interactive client & vendor collaboration portals enabling real-time document review, digital e-signatures, and contract approval workflows across tenant boundaries.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Engineered multi-tenant background job scheduler using Trigger.dev and node-cron for automated reminders, workflow sync, billing triggers, and subscription management via Stripe webhooks.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Implemented Clerk-based authentication with webhook sync, role-based access control, and Turborepo monorepo architecture with pnpm workspaces for scalable development.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React 18, Vite, TypeScript, Tailwind CSS, Radix UI (shadcn/ui), Zustand, TanStack React Query, React Hook Form + Zod, Express, Node.js, MongoDB, Clerk, Stripe, Trigger.dev, node-cron, Vitest, Playwright, Turborepo, pnpm workspaces.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: Skyline & LIFTREX (Elevator Operations & Client Portal)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    Skyline is a specialized operations platform managing the entire lifecycle of elevator installation, maintenance, proposals, and inspections for elevator service companies and building inspectors. LIFTREX is its white-label client-facing portal allowing property owners and building managers to view project status, proposals, schedules, and payment ledgers in real-time.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed dynamic proposal dashboards for creating and tracking hydraulic, traction, and MRL elevator installation proposals with automated inspection scheduling and regulatory compliance documentation.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Integrated Gmail API for in-platform email sync, procurement tracker for elevator parts logistics, real-time Gantt project tracking across engineering/manufacturing/installation stages, and contractor punch-list collaboration.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built integrated billing ledger mapping contracts, payment schedules, and invoices with wkhtmltopdf/ExcelJS export, AWS S3 document uploads, Google OAuth 2.0, and Twilio notifications.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React 18, Vite, TypeScript, Redux Toolkit (redux-persist), TanStack React Query, Radix UI, Tailwind CSS, Axios, Hapi.js 21, Express, Node.js, MongoDB, AWS S3, Google OAuth 2.0, Gmail API, Twilio, Nodemailer, Dropbox, Adobe PDF Services, wkhtmltopdf, ExcelJS, node-cron.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: Wyton Developers (Vendor Bidding & Contract Management)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    Wyton Developers is a white-label vendor onboarding and construction bidding portal that helps real estate developers manage contract bids, payment terms, and vendor registrations for construction projects.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built bid leveling dashboards enabling side-by-side comparison of contractor bid costs, trade details, and timelines, with contract commitment creation and PDF-based e-signature workflows.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed vendor onboarding workflows with trade qualification verification, license/insurance checks, project action plans with milestone payouts, and payment term scheduling.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, TypeScript, Radix UI, Tailwind CSS, Axios, PDF-lib, Express, Node.js, MongoDB.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                } else if (companyLower.includes('sourcecube')) {
                    customContent = (
                        <View style={{ marginTop: 2 }}>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: Unode (Web3 RPC Node Console)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    Unode is a developer platform and node service console providing Web3 RPC endpoints, wallet integrations, and decentralized protocol utilities for the Unification network. Developers register and manage custom API keys and RPC endpoints for Ethereum/EVM and Unification protocols with integrated real-time money streaming for subscriptions via Superfluid.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built node endpoint management console with custom API key generation, RPC endpoint configuration for EVM/Unification protocols, and Chart.js-powered visual analytics for node latency, request counts, and billing metrics.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed Oracle Services dashboards for configuring Verifiable Oracle Randomness (VOR) and Oracle of Oracles (OoO) contract feeds, testnet faucet UI, and Superfluid payment stream integration for per-request billing.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, React Router, Redux, Chart.js, SCSS, Bootstrap, Web3.js, Viem, MetaMask wallet integration, Apollo GraphQL client (subgraph indexing), Superfluid Finance SDK (Streaming Widgets & Core).
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: IFERP (Academic Research & Conference Platform)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    IFERP is a massive scientific research community and academic conference management portal connecting students, professionals, institutions, and corporate entities. It features global research profiles, conference event booking, multi-gateway international payments, and an interactive certificate canvas editor.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built academic research dashboard where members display profiles, track publications, journals, and citations, with advanced conference registration for scientific summits and symposiums and React Joyride onboarding walkthroughs.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed custom interactive certificate canvas rendering engine using Fabric.js enabling custom layouts, text fields, and print-ready PDF researcher awards with html2canvas, html2pdf.js, jspdf, and pdf-lib.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Integrated multi-gateway payment system supporting CCAvenue, PayPal, and Razorpay for international registrations, AWS S3 file storage, Firebase, Socket.io real-time sync, and PostHog analytics.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, Redux Toolkit, SCSS, Bootstrap, Fabric.js, html2canvas, html2pdf.js, jspdf, pdf-lib, AWS SDK (S3), Firebase, Socket.io-client, PostHog-js, PayPal, Razorpay, CCAvenue, React Big Calendar.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: SANAD-HUB (Bilingual Invoice & Billing Platform)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    SANAD-HUB is a bilingual (Arabic/English) invoice, quotation, and financial management SaaS platform featuring complete RTL layout capabilities. It enables users to create invoices, track quotes, log payments, manage expenses, and handle multicurrency and tax configurations.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built full-featured billing modules for invoicing, quotations, payment tracking, and expense management with fully localizable RTL layout natively adapting to Arabic language flows and multicurrency/tax system configurations.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed customizable invoice template designer using DnD Kit, react-beautiful-dnd, and react-draggable for drag-and-drop brand customization, with QR code encoding on invoice previews for quick scanning and authentication.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, React Router, Redux Toolkit, Styled Components, Joy UI, Material UI, DnD Kit, react-beautiful-dnd, react-draggable, xlsx, file-saver, qrcode, crypto-js.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 3 }}>
                                <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-BoldOblique', color: '#222222', marginTop: 1 }}>
                                    Project: RealBrave (EdTech e-Learning Platform)
                                </Text>
                                <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                    RealBrave is an interactive EdTech e-learning platform connecting students, parents, and teachers with real-time class sessions, scheduling, and analytics. It features Zoom-integrated virtual classrooms, skill assessments, role-specific dashboards, and WebSockets-driven real-time messaging.
                                </Text>
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built Zoom-integrated virtual classrooms using Zoom Video SDK UI Toolkit with webcam capture via react-webcam and media recording, plus dynamic skill assessments, quizzes, and grading dashboards for evaluating student performance.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed role-specific teacher & parent portals with grading capabilities, student progress metrics, WebSockets-driven real-time chat via Socket.io, interactive ApexCharts dashboards mapping grade trends and attendance, and React Big Calendar scheduling.</Text>
                                    </View>
                                    <View style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, Vite, Redux Toolkit, React Router, Bootstrap, Sass, Zoom Video SDK UI Toolkit, react-media-recorder, react-webcam, Socket.io-client, Firebase, ApexCharts, React Big Calendar.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                } else if (companyLower.includes('3elixir')) {
                    customContent = (
                        <View>
                            <Text style={{ fontSize: 7, lineHeight: 1.2, color: '#333333', marginTop: 1, textAlign: 'justify' }}>
                                A 2-month intensive software developer trainee internship focused on React.js web development fundamentals, responsive user interfaces, and collaborative Git practices.
                            </Text>
                            <View style={styles.bulletList}>
                                <View style={styles.bulletRow}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.bulletText}>Built 8+ responsive user interface modules including multi-field forms, data grids, and layouts using React.js, HTML5, CSS3, and ES6+. Integrated RESTful API endpoints for dynamic table filtering, sorting, and user-profile management.</Text>
                                </View>
                                <View style={styles.bulletRow}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.bulletText}>Established structured Git branching strategies, pull request reviews, and code quality standards (ESLint/Prettier) in a team setting.</Text>
                                </View>
                                <View style={styles.bulletRow}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.bulletText}>
                                        <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                        React.js, JavaScript (ES6+), JSX, HTML5, CSS3, CSS Modules, Git, GitHub, VS Code, ESLint, Prettier.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } else {
                    // Default fallback rendering
                    customContent = (
                        <View style={styles.bulletList}>
                            {description
                                ?.split('\n')
                                .map(l => l.trim())
                                .filter(Boolean)
                                .map((bullet, j) => (
                                    <View key={j} style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>{bullet}</Text>
                                    </View>
                                ))}
                        </View>
                    );
                }

                return (
                    <View key={i} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{company?.toUpperCase()}</Text>
                            <Text style={styles.itemDate}>
                                {formatDate(start)} - {formatDate(end) || 'Present'}
                            </Text>
                        </View>
                        <View style={styles.itemSubheader}>
                            <Text style={styles.itemSubtitle}>{role}</Text>
                            <Text style={styles.itemLocation}>{location}</Text>
                        </View>
                        {customContent}
                    </View>
                );
            })}
        </View>
    );
};

const Education = ({ data }) => {
    const filteredEducation = data.filter(edu => {
        const degreeLower = edu.degree?.toLowerCase() || '';
        return !degreeLower.includes('secondary') && 
               !degreeLower.includes('school') && 
               !degreeLower.includes('hsc') && 
               !degreeLower.includes('ssc');
    });

    return (
        <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {filteredEducation.map(({ degree, institution, start, end, location, gpa, note }, i) => (
                <View key={i} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>{institution}</Text>
                        <Text style={styles.itemDate}>
                            {formatDate(start)} - {formatDate(end) || 'Present'}
                        </Text>
                    </View>
                    <View style={styles.itemSubheader}>
                        <Text style={styles.itemSubtitle}>
                            {degree}
                            {gpa ? ` • GPA: ${gpa}` : ''}
                        </Text>
                        <Text style={styles.itemLocation}>{location}</Text>
                    </View>
                    {note?.trim() && (
                        <Text style={[styles.summaryText, { fontFamily: 'Helvetica-Oblique', marginTop: 1, color: '#555555' }]}>
                            {note.trim()}
                        </Text>
                    )}
                </View>
            ))}
        </View>
    );
};

const Format2Resume = ({ data }) => {
    const { contact, education, experience, summary, skills, tools } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact} />

                {summary?.summary && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Professional Summary</Text>
                        </View>
                        <Text style={styles.summaryText}>{summary.summary}</Text>
                    </View>
                )}

                {(skills?.skills || tools?.tools) && (
                    <TechnicalSkills skillsData={skills?.skills} toolsData={tools?.tools} />
                )}

                {experience?.length > 0 && (
                    <Experience experienceData={experience} />
                )}

                {education?.length > 0 && <Education data={education} />}
            </Page>
        </Document>
    );
};

export default Format2Resume;
