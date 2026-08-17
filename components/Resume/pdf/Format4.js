'use client';

import { Page, Text, View, Document, Link, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';
import buildContactLinks, { toHttpUrl } from './contactLinks';
import filterEducation from './filterEducation';

/**
 * Format 4 is the full-stack presentation of the resume: it never says "MERN".
 * Every piece of text that reaches the page goes through this so the job title,
 * summary, role names and bullets all read as full-stack, no matter what the
 * underlying profile data says. Formats 1-3 are untouched.
 */
export const toFullStack = text => {
    if (typeof text !== 'string' || !text) return text;
    return (
        text
            // Where MERN sits next to "full-stack", just drop it — don't say it twice.
            // "full-stack MERN engagements" -> "full-stack engagements"
            .replace(/\bfull([-\s])stack\s+(?:and\s+)?MERN\b/gi, 'full$1stack')
            // "MERN and full-stack applications" -> "full-stack applications"
            .replace(/\bMERN\s+and\s+full([-\s])stack\b/gi, 'full$1stack')
            // "MERN / full-stack developer" -> "Full-stack developer"
            .replace(/\bMERN\s*\/\s*full([-\s])stack\b/gi, 'Full$1stack')
            // Job titles keep title case: "MERN Stack Developer" -> "Full Stack Developer"
            .replace(/\bMERN(?:\s+Stack)?\s+Developer\b/gi, 'Full Stack Developer')
            .replace(/\bMERN\s+Stack\b/gi, 'Full Stack')
            // Anything left is mid-sentence prose: "building MERN apps" -> "building full-stack apps"
            .replace(/\bMERN\b/gi, 'full-stack')
    );
};

/* ------------------------------------------------------------------ */
/*  Full-stack skill matrix                                            */
/*  These are always rendered by Format 4, regardless of which resume  */
/*  profile is active. Anything the profile itself lists is merged in  */
/*  on top of these (deduped). Edit this block to change the baseline. */
/* ------------------------------------------------------------------ */

const FULL_STACK_SKILLS = [
    {
        category: 'Languages',
        base: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
        match: ['languages', 'markup'],
    },
    {
        category: 'Frontend',
        base: [
            'React.js',
            'Next.js (App Router, SSR/SSG/ISR)',
            'AngularJS',
            'Redux Toolkit',
            'TanStack React Query',
            'Zustand',
            'Tailwind CSS',
            'Material UI',
            'SASS',
        ],
        match: ['frontend', 'front-end', 'ui', 'state', 'data fetching', 'forms', 'validation'],
    },
    {
        category: 'Mobile',
        base: ['React Native', 'Expo', 'cross-platform iOS & Android delivery'],
        match: ['mobile', 'native'],
    },
    {
        category: 'Backend & APIs',
        base: [
            'Node.js',
            'Express.js',
            'Hapi.js',
            'REST API design',
            'GraphQL',
            'JWT',
            'OAuth 2.0',
            'Socket.io',
            'node-cron',
        ],
        match: ['backend', 'back-end', 'api', 'server'],
    },
    {
        category: 'Databases',
        base: [
            'SQL',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Mongoose',
            'Prisma',
            'Sequelize',
            'schema design',
            'indexing & query optimization',
        ],
        match: ['data', 'database', 'db'],
    },
    {
        category: 'Cloud & DevOps',
        base: ['AWS S3', 'Docker', 'CI/CD (Vercel, Netlify, Railway)', 'GitHub Actions'],
        match: ['cloud', 'platform', 'delivery', 'devops', 'integration', 'services'],
    },
    {
        category: 'Testing & QA',
        base: ['Vitest', 'Jest', 'Playwright', 'Postman'],
        match: ['testing', 'quality', 'qa', 'debugging'],
    },
    {
        category: 'Tools & Practices',
        base: [
            'Git',
            'GitHub',
            'VS Code',
            'Cursor',
            'Figma',
            'Jira',
            'ClickUp',
            'Agile / Scrum',
            'code review',
        ],
        match: [
            'tools',
            'editors',
            'design',
            'workflow',
            'collaboration',
            'version control',
            'package',
            'practices',
        ],
    },
];

/** Cap per line so the skills block stays readable on the page. */
const MAX_PER_CATEGORY = 16;

/** Different spellings of the same thing, so the merge below doesn't list it twice. */
const SKILL_ALIASES = {
    visualstudiocode: 'vscode',
    postgres: 'postgresql',
    reactjs: 'react',
    nodejs: 'node',
    tanstackreactquery: 'reactquery',
    reduxtoolkit: 'redux',
};

/** Dedupe key: ignore punctuation, casing and any trailing "(...)" qualifier. */
const skillKey = item => {
    const key = item
        .replace(/\(.*?\)/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9+#]/g, '');
    return SKILL_ALIASES[key] || key;
};

/**
 * Split "a, b (x, y), c" on top-level commas only, so a parenthesised
 * qualifier stays attached to the skill it belongs to.
 */
const splitSkillList = str => {
    const out = [];
    let depth = 0;
    let current = '';

    for (const ch of str) {
        if (ch === '(') depth += 1;
        else if (ch === ')') depth = Math.max(0, depth - 1);

        if (ch === ',' && depth === 0) {
            out.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    out.push(current);

    return out.map(s => s.trim()).filter(Boolean);
};

/**
 * Parse the free-text "Category: a, b, c" lines from the skills + tools tabs
 * and fold them into the full-stack buckets above.
 */
const buildSkillMatrix = (skillsText, toolsText) => {
    const lines = [...(skillsText?.split('\n') || []), ...(toolsText?.split('\n') || [])]
        .map(l => l.trim())
        .filter(Boolean);

    const buckets = FULL_STACK_SKILLS.map(g => ({
        category: g.category,
        base: g.base,
        match: g.match,
        extra: [],
    }));

    lines.forEach(line => {
        const colon = line.indexOf(':');
        if (colon === -1) return;

        const rawCategory = line.substring(0, colon).trim().toLowerCase();
        const bucket = buckets.find(b => b.match.some(kw => rawCategory.includes(kw)));
        if (!bucket) return;

        bucket.extra.push(...splitSkillList(line.substring(colon + 1)));
    });

    // Every key the baseline already claims, anywhere in the matrix. A skill the
    // user typed is only added if it isn't baseline material somewhere else —
    // that stops e.g. "OAuth 2.0" or "Postman" showing up under two categories.
    const baselineKeys = new Set(buckets.flatMap(b => b.base.map(skillKey)));

    return buckets
        .map(({ category, base, extra }) => {
            const seen = new Set();
            const items = [];

            base.forEach(item => {
                const key = skillKey(item);
                if (!key || seen.has(key)) return;
                seen.add(key);
                items.push(item);
            });

            extra.forEach(item => {
                const key = skillKey(item);
                if (!key || seen.has(key) || baselineKeys.has(key)) return;
                seen.add(key);
                items.push(item);
            });

            return { category, value: items.slice(0, MAX_PER_CATEGORY).join(', ') };
        })
        .filter(g => g.value);
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#2b2b2b',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 22,
        paddingRight: 22,
        fontFamily: 'Helvetica',
    },
    header: {
        borderBottomWidth: 1.2,
        borderBottomColor: '#1a3d5c',
        paddingBottom: 3,
        marginBottom: 3,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        color: '#1a3d5c',
        letterSpacing: 0.6,
    },
    title: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: '#444444',
        marginTop: 1,
        letterSpacing: 0.3,
    },
    contactBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 2.5,
    },
    contactLink: {
        fontSize: 7.4,
        color: '#2b2b2b',
        textDecoration: 'none',
    },
    contactSeparator: {
        fontSize: 7.4,
        color: '#999999',
    },
    section: {
        marginTop: 5,
    },
    sectionTitleContainer: {
        backgroundColor: '#eef2f6',
        borderLeftWidth: 2,
        borderLeftColor: '#1a3d5c',
        paddingVertical: 1.4,
        paddingHorizontal: 3.5,
        marginBottom: 2.5,
    },
    sectionTitle: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: '#1a3d5c',
        textTransform: 'uppercase',
        letterSpacing: 0.7,
    },
    summaryText: {
        fontSize: 7.4,
        lineHeight: 1.2,
        color: '#2b2b2b',
        textAlign: 'justify',
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 1,
    },
    skillLabel: {
        width: 78,
        fontSize: 7.2,
        fontFamily: 'Helvetica-Bold',
        color: '#1a3d5c',
    },
    skillValue: {
        flex: 1,
        fontSize: 7.2,
        lineHeight: 1.15,
        color: '#2b2b2b',
    },
    itemContainer: {
        marginBottom: 2.5,
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
        maxWidth: '74%',
    },
    itemDate: {
        fontSize: 7.2,
        color: '#333333',
    },
    itemSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 0.3,
    },
    itemSubtitle: {
        fontSize: 7.4,
        fontFamily: 'Helvetica-Oblique',
        color: '#1a3d5c',
        maxWidth: '74%',
    },
    itemLocation: {
        fontSize: 7.2,
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
        marginBottom: 0.6,
    },
    bulletPoint: {
        width: 5,
        fontSize: 7.2,
        color: '#1a3d5c',
    },
    bulletText: {
        flex: 1,
        fontSize: 7.2,
        lineHeight: 1.18,
        color: '#2b2b2b',
    },
    projectLink: {
        fontSize: 6.9,
        color: '#1a3d5c',
        textDecoration: 'none',
    },
    inlineRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
    },
    inlineItem: {
        fontSize: 7.2,
        color: '#2b2b2b',
    },
});

const Header = ({ data }) => {
    const contactLinks = buildContactLinks(data);

    return (
        <View style={styles.header}>
            <Text style={styles.name}>{data.name}</Text>
            {data.title ? <Text style={styles.title}>{toFullStack(data.title)}</Text> : null}
            <View style={styles.contactBar}>
                {contactLinks.map(({ key, label, href }, idx) => (
                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {href ? (
                            <Link src={href} style={styles.contactLink}>
                                {label}
                            </Link>
                        ) : (
                            <Text style={styles.contactLink}>{label}</Text>
                        )}
                        {idx < contactLinks.length - 1 && <Text style={styles.contactSeparator}>  |  </Text>}
                    </View>
                ))}
            </View>
        </View>
    );
};

const SectionBlock = ({ title, children }) => (
    <View style={styles.section} wrap={true}>
        <View style={styles.sectionTitleContainer} wrap={false}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
    </View>
);

const TechnicalSkills = ({ skillsData, toolsData }) => {
    const matrix = buildSkillMatrix(skillsData, toolsData);

    return (
        <SectionBlock title="Technical Skills — Full Stack">
            {matrix.map((g, i) => (
                <View key={i} style={styles.skillRow}>
                    <Text style={styles.skillLabel}>{g.category}</Text>
                    <Text style={styles.skillValue}>{g.value}</Text>
                </View>
            ))}
        </SectionBlock>
    );
};

const Experience = ({ data }) => {
    const sorted = [...data].sort((a, b) => {
        const timeA = a.start ? new Date(a.start).getTime() : 0;
        const timeB = b.start ? new Date(b.start).getTime() : 0;
        return timeB - timeA;
    });

    return (
        <SectionBlock title="Professional Experience">
            {sorted.map(({ role, start, end, company, location, description }, i) => (
                <View key={i} style={styles.itemContainer} wrap={true}>
                    <View style={styles.itemHeader} wrap={false}>
                        <Text style={styles.itemTitle}>{toFullStack(role)}</Text>
                        <Text style={styles.itemDate}>
                            {formatDate(start)} - {formatDate(end) || 'Present'}
                        </Text>
                    </View>
                    <View style={styles.itemSubheader} wrap={false}>
                        <Text style={styles.itemSubtitle}>{company}</Text>
                        <Text style={styles.itemLocation}>{location}</Text>
                    </View>
                    <View style={styles.bulletList}>
                        {description
                            ?.split('\n')
                            .map(l => l.trim())
                            .filter(Boolean)
                            .map((bullet, j) => (
                                <View key={j} style={styles.bulletRow} wrap={true}>
                                    <Text style={styles.bulletPoint}>{'•'}</Text>
                                    <Text style={styles.bulletText}>{toFullStack(bullet)}</Text>
                                </View>
                            ))}
                    </View>
                </View>
            ))}
        </SectionBlock>
    );
};

const Projects = ({ data }) => (
    <SectionBlock title="Key Projects">
        {data.map(({ title, url, start, end, description }, i) => (
            <View key={i} style={styles.itemContainer} wrap={true}>
                <View style={styles.itemHeader} wrap={false}>
                    <Text style={styles.itemTitle}>{toFullStack(title)}</Text>
                    {(start || end) && (
                        <Text style={styles.itemDate}>
                            {formatDate(start)} - {formatDate(end) || 'Present'}
                        </Text>
                    )}
                </View>
                {url?.trim() ? (
                    <Link src={toHttpUrl(url)} style={styles.projectLink}>
                        {url.trim()}
                    </Link>
                ) : null}
                <View style={styles.bulletList}>
                    {description
                        ?.split('\n')
                        .map(l => l.trim())
                        .filter(Boolean)
                        .map((bullet, j) => (
                            <View key={j} style={styles.bulletRow} wrap={true}>
                                <Text style={styles.bulletPoint}>{'•'}</Text>
                                <Text style={styles.bulletText}>{toFullStack(bullet)}</Text>
                            </View>
                        ))}
                </View>
            </View>
        ))}
    </SectionBlock>
);

const Education = ({ data }) => {
    const filtered = filterEducation(data);

    if (!filtered.length) return null;

    return (
        <SectionBlock title="Education">
            {filtered.map(({ degree, institution, start, end, location, gpa, note }, i) => (
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
                    {note?.trim() ? (
                        <Text style={[styles.summaryText, { marginTop: 1, color: '#555555' }]}>
                            {toFullStack(note.trim())}
                        </Text>
                    ) : null}
                </View>
            ))}
        </SectionBlock>
    );
};

const Certificates = ({ data }) => (
    <SectionBlock title="Certifications & Achievements">
        <View style={styles.bulletList}>
            {data.map(({ title, issuer, date }, i) => (
                <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>{'•'}</Text>
                    <Text style={styles.bulletText}>
                        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{title}</Text>
                        {issuer ? ` — ${issuer}` : ''}
                        {date ? ` (${formatDate(date)})` : ''}
                    </Text>
                </View>
            ))}
        </View>
    </SectionBlock>
);

const Languages = ({ data }) => (
    <SectionBlock title="Languages">
        <View style={styles.inlineRow}>
            {data.map(({ language, proficiency }, i) => (
                <Text key={i} style={styles.inlineItem}>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>{language}</Text>
                    {proficiency ? ` (${proficiency})` : ''}
                    {i < data.length - 1 ? '   |  ' : ''}
                </Text>
            ))}
        </View>
    </SectionBlock>
);

const Format4Resume = ({ data }) => {
    const { contact, education, experience, projects, summary, skills, tools, certificates, languages } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact || {}} />

                {summary?.summary ? (
                    <SectionBlock title="Professional Summary">
                        <Text style={styles.summaryText}>{toFullStack(summary.summary)}</Text>
                    </SectionBlock>
                ) : null}

                <TechnicalSkills skillsData={skills?.skills} toolsData={tools?.tools} />

                {experience?.length > 0 && <Experience data={experience} />}
                {projects?.length > 0 && <Projects data={projects} />}
                {education?.length > 0 && <Education data={education} />}
                {certificates?.length > 0 && <Certificates data={certificates} />}
                {languages?.length > 0 && <Languages data={languages} />}
            </Page>
        </Document>
    );
};

export default Format4Resume;
