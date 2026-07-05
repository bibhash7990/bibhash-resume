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
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 18,
        paddingRight: 18,
        fontFamily: 'Helvetica',
    },
    header: {
        alignItems: 'center',
        marginBottom: 2,
    },
    name: {
        fontSize: 15,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 8.8,
        fontFamily: 'Helvetica-Bold',
        color: '#444444',
        marginTop: 0.5,
    },
    contactBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 1.5,
    },
    contactLink: {
        fontSize: 7.2,
        color: '#333333',
        textDecoration: 'none',
    },
    contactSeparator: {
        fontSize: 7.2,
        color: '#888888',
    },
    section: {
        marginTop: 3.5,
        marginBottom: 0.3,
    },
    sectionTitleContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#333333',
        paddingBottom: 0.3,
        marginBottom: 2,
    },
    sectionTitle: {
        fontSize: 7.8,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    summaryText: {
        fontSize: 7.2,
        lineHeight: 1.15,
        color: '#333333',
        textAlign: 'justify',
    },
    itemContainer: {
        marginBottom: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemTitle: {
        fontSize: 7.8,
        fontFamily: 'Helvetica-Bold',
        color: '#111111',
        maxWidth: '75%',
    },
    itemDate: {
        fontSize: 7.2,
        fontFamily: 'Helvetica',
        color: '#222222',
    },
    itemSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 0.2,
    },
    itemSubtitle: {
        fontSize: 7.2,
        fontFamily: 'Helvetica-Bold',
        color: '#444444',
        maxWidth: '75%',
    },
    itemLocation: {
        fontSize: 7.2,
        fontFamily: 'Helvetica-Oblique',
        color: '#555555',
    },
    bulletList: {
        marginTop: 0.5,
        paddingLeft: 4,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 0.5,
    },
    bulletPoint: {
        width: 5,
        fontSize: 7,
        color: '#333333',
    },
    bulletText: {
        flex: 1,
        fontSize: 7,
        lineHeight: 1.1,
        color: '#333333',
    },
    projectTitle: {
        fontSize: 7.4,
        fontFamily: 'Helvetica-BoldOblique',
        color: '#222222',
        marginTop: 0.5,
    },
    projectDesc: {
        fontSize: 6.8,
        lineHeight: 1.12,
        color: '#333333',
        marginTop: 0.5,
        textAlign: 'justify',
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
    const is45Years = experienceData.some(exp => 
        exp.company?.toLowerCase().includes('3elixir') && 
        exp.start === '2021-11'
    );

    const sortedExperience = [...experienceData].sort((a, b) => {
        const timeA = a.start ? new Date(a.start).getTime() : 0;
        const timeB = b.start ? new Date(b.start).getTime() : 0;
        return timeB - timeA;
    });

    return (
        <View style={styles.section} wrap={true}>
            <View style={styles.sectionTitleContainer} wrap={false}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
            </View>
            {sortedExperience.map(({ role, start, end, company, location, description }, i) => {
                const companyLower = company?.toLowerCase() || '';
                
                let customContent = null;
                
                if (companyLower.includes('techfidants')) {
                    customContent = (
                        <View style={{ marginTop: 1.5 }} wrap={true}>
                            {/* Project 1: TalleFlow - Standalone */}
                            <View style={{ marginBottom: 2 }} wrap={true}>
                                <Text style={styles.projectTitle}>
                                    Project: TalleFlow (B2B Multi-Tenant Operations SaaS)
                                </Text>
                                <Text style={styles.projectDesc}>
                                    TalleFlow is an enterprise-grade multi-tenant B2B operations and workflow SaaS platform designed to centralize core business activities into a single secure interface. It manages operations across 10+ distinct domains, including projects, client task workflows, shared contacts, document repositories with digital contract signatures, billing plans, and robust background automation workers, all backed by strict multi-tenant schema isolation ensuring complete data separation between different organizations.
                                </Text>
                                <View style={styles.bulletList} wrap={true}>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built interactive client & vendor collaboration portals enabling real-time document review, digital e-signatures, and contract approval workflows across tenant boundaries.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Engineered multi-tenant background job scheduler using Trigger.dev and node-cron for automated reminders, workflow sync, billing triggers, and subscription management via Stripe webhooks.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Implemented Clerk-based authentication with webhook sync, role-based access control, and Turborepo monorepo architecture with pnpm workspaces for scalable development.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React 18, Vite, TypeScript, Tailwind CSS, Radix UI (shadcn/ui), Zustand, TanStack React Query, React Hook Form + Zod, Express, Node.js, MongoDB, Clerk, Stripe, Trigger.dev, node-cron, Vitest, Playwright, Turborepo, pnpm workspaces.
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Project 2: Skyline + LIFTREX + Wyton - Merged */}
                            <View style={{ marginBottom: 1 }} wrap={true}>
                                <Text style={styles.projectTitle}>
                                    Projects: Skyline, LIFTREX & Wyton (Elevator Lifecycle & Bidding Portals)
                                </Text>
                                <Text style={styles.projectDesc}>
                                    Skyline is an elevator installation operations lifecycle platform managing traction/hydraulic elevator proposals, building compliance safety inspections, and parts procurement logistics. LIFTREX is a white-label developer client portal for real-time tracking of Gantt stages, invoices, and contractor punch lists. Wyton Developers is a white-label real estate vendor onboarding portal that handles competitive bidding management, bid leveling tables, trade verification compliance, and e-signatures.
                                </Text>
                                <View style={styles.bulletList} wrap={true}>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed proposal dashboards for elevator installations with automated inspection scheduling, regulatory compliance, and real-time Gantt tracking stages.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Integrated Gmail API for inbox sync, billing ledger mapping contracts with wkhtmltopdf export, S3 storage, Google OAuth 2.0, and Twilio alerts.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built contractor bid leveling charts, vendor onboarding directories checking licensing/insurance trade qualifications, and PDF-lib contract e-signatures.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React 18, Vite, TypeScript, Redux Toolkit, TanStack React Query, Radix UI, Tailwind CSS, Axios, PDF-lib, Hapi.js 21, Express, Node.js, MongoDB, AWS S3, Google OAuth 2.0, Gmail API, Twilio, Nodemailer, wkhtmltopdf, ExcelJS, node-cron.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                } else if (companyLower.includes('sourcecube')) {
                    customContent = (
                        <View style={{ marginTop: 1.5 }} wrap={true}>
                            {/* Project 1: IFERP - Standalone (first) */}
                            {!is45Years && (
                                <View style={{ marginBottom: 2 }} wrap={true}>
                                    <Text style={styles.projectTitle}>
                                        Project: IFERP (Academic Research & Conference Platform)
                                    </Text>
                                    <Text style={styles.projectDesc}>
                                        IFERP is a global scientific research community and academic conference management portal connecting students, institutions, and corporate entities. The platform integrates academic research dashboards with citation metrics, publication trackers, and conference registration bookings, featuring interactive user onboarding guides and a custom-built HTML5 canvas certificate rendering engine (Fabric.js) for generating printable participant awards.
                                    </Text>
                                    <View style={styles.bulletList} wrap={true}>
                                        <View style={styles.bulletRow} wrap={true}>
                                            <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                            <Text style={styles.bulletText}>Built academic research dashboard where members display profiles, track publications, journals, and citations, with advanced conference registration for scientific summits and symposiums and React Joyride onboarding walkthroughs.</Text>
                                        </View>
                                        <View style={styles.bulletRow} wrap={true}>
                                            <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                            <Text style={styles.bulletText}>Developed custom interactive certificate canvas rendering engine using Fabric.js enabling custom layouts, text fields, and print-ready PDF researcher awards with html2canvas, html2pdf.js, jspdf, and pdf-lib.</Text>
                                        </View>
                                        <View style={styles.bulletRow} wrap={true}>
                                            <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                            <Text style={styles.bulletText}>Integrated multi-gateway payment system supporting CCAvenue, PayPal, and Razorpay for international registrations, AWS S3 file storage, Firebase, Socket.io real-time sync, and PostHog analytics.</Text>
                                        </View>
                                        <View style={styles.bulletRow} wrap={true}>
                                            <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                            <Text style={styles.bulletText}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                                React, Redux Toolkit, SCSS, Bootstrap, Fabric.js, html2canvas, html2pdf.js, jspdf, pdf-lib, AWS SDK (S3), Firebase, Socket.io-client, PostHog-js, PayPal, Razorpay, CCAvenue, React Big Calendar.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {/* Project 2: Unode + RealBrave + SANAD - Merged */}
                            <View style={{ marginBottom: 1 }} wrap={true}>
                                <Text style={styles.projectTitle}>
                                    Projects: Unode, RealBrave & SANAD-HUB (Web3, EdTech & Financial Platforms)
                                </Text>
                                <Text style={styles.projectDesc}>
                                    Unode is a Web3 developer RPC endpoint console for Ethereum/Unification networks featuring Superfluid money streaming subscription widgets, Oracle contract feeds, and latency analytics. RealBrave is an interactive EdTech e-learning platform integrating Zoom Video SDK classrooms, role-based dashboards, and Socket.io messaging. SANAD-HUB is a bilingual Arabic/English billing and quotation management SaaS with complete RTL layout flows, drag-and-drop template editors, and quick QR-code authentication.
                                </Text>
                                <View style={styles.bulletList} wrap={true}>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built Web3 node endpoint management console with custom API key generation, RPC endpoint configuration for EVM/Unification protocols, Chart.js analytics, Oracle Services dashboards (VOR/OoO feeds), and Superfluid payment stream integration.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed Zoom-integrated virtual classrooms using Zoom Video SDK with webcam capture, skill assessments, role-specific teacher & parent portals with grading, WebSockets real-time chat via Socket.io, and ApexCharts dashboards.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built bilingual invoicing modules with RTL Arabic layout, drag-and-drop invoice template designer (DnD Kit), multicurrency/tax configurations, QR code authentication, and xlsx/file-saver data export capabilities.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, Vite, Redux Toolkit, Chart.js, SCSS, Bootstrap, Sass, Web3.js, Viem, MetaMask, Apollo GraphQL, Superfluid SDK, Zoom Video SDK, Socket.io-client, Firebase, ApexCharts, Joy UI, Material UI, DnD Kit, react-draggable, qrcode, xlsx.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                } else if (companyLower.includes('3elixir')) {
                    customContent = is45Years ? (
                        <View style={{ marginTop: 1.5 }} wrap={true}>
                            {/* Project: IFERP - Rendered under 3Elixir for 4.5 Years experience */}
                            <View style={{ marginBottom: 1 }} wrap={true}>
                                <Text style={styles.projectTitle}>
                                    Project: IFERP (Academic Research & Conference Platform)
                                </Text>
                                <Text style={styles.projectDesc}>
                                    IFERP is a global scientific research community and academic conference management portal connecting students, institutions, and corporate entities. The platform integrates academic research dashboards with citation metrics, publication trackers, and conference registration bookings, featuring interactive user onboarding guides and a custom-built HTML5 canvas certificate rendering engine (Fabric.js) for generating printable participant awards.
                                </Text>
                                <View style={styles.bulletList} wrap={true}>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Built academic research dashboard where members display profiles, track publications, journals, and citations, with advanced conference registration for scientific summits and symposiums and React Joyride onboarding walkthroughs.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Developed custom interactive certificate canvas rendering engine using Fabric.js enabling custom layouts, text fields, and print-ready PDF researcher awards with html2canvas, html2pdf.js, jspdf, and pdf-lib.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>Integrated multi-gateway payment system supporting CCAvenue, PayPal, and Razorpay for international registrations, AWS S3 file storage, Firebase, Socket.io real-time sync, and PostHog analytics.</Text>
                                    </View>
                                    <View style={styles.bulletRow} wrap={true}>
                                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                        <Text style={styles.bulletText}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Tech Stack: </Text>
                                            React, Redux Toolkit, SCSS, Bootstrap, Fabric.js, html2canvas, html2pdf.js, jspdf, pdf-lib, AWS SDK (S3), Firebase, Socket.io-client, PostHog-js, PayPal, Razorpay, CCAvenue, React Big Calendar.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.projectDesc}>
                                An intensive frontend developer trainee program centered on React.js web development fundamentals, component styling patterns, responsive user interface grids, state management, rest API consumption, and team-based Git collaboration workflows.
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
                    <View key={i} style={styles.itemContainer} wrap={true}>
                        <View style={styles.itemHeader} wrap={false}>
                            <Text style={styles.itemTitle}>{company?.toUpperCase()}</Text>
                            <Text style={styles.itemDate}>
                                {formatDate(start)} - {formatDate(end) || 'Present'}
                            </Text>
                        </View>
                        <View style={styles.itemSubheader} wrap={false}>
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
                            {note.trim().includes('Chemical Engineering') 
                                ? 'Career pivot: transitioned into software development via self-study; 2.5+ years building MERN apps.' 
                                : note.trim()}
                        </Text>
                    )}
                </View>
            ))}
        </View>
    );
};

const Format3Resume = ({ data }) => {
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

export default Format3Resume;
