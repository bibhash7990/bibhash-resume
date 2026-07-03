'use client';

import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import Section from './Section';
import ListItem from './ListItem';
import styles from '../Styles';
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

const Header = ({ data }) => {
    const contactLinks = [];

    if (data.phone?.trim()) {
        const raw = data.phone.trim();
        const digits = raw.replace(/\D/g, '');
        const display = raw.startsWith('+') ? raw : digits.length === 10 ? `+91 ${digits}` : raw;
        const href =
            digits.length === 10 ? `tel:+91${digits}` : digits.length > 0 ? `tel:+${digits}` : `tel:${raw}`;
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
        <Section>
            <Text style={styles.header__name}>{data.name}</Text>
            {data.title ?
                <Text style={styles.sub__header__name}>({data.title})</Text>
            :   null}
            <View style={styles.header__links}>
                {contactLinks.map(({ key, label, href }) => (
                    <Link key={key} src={href} style={styles.link}>
                        {label}
                    </Link>
                ))}
            </View>
        </Section>
    );
};

const Education = ({ data }) => (
    <Section title={'Education'}>
        {data.map(({ degree, institution, start, end, location, gpa, note }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{degree}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)}- {formatDate(end) || 'Present'}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>
                        {institution}
                        {gpa && <Text> ({gpa})</Text>}
                    </Text>

                    <Text style={styles.date}>{location}</Text>
                </View>

                {note?.trim() ?
                    <Text style={styles.education_note}>{note.trim()}</Text>
                :   null}

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data }) => (
    <Section title={'Projects'}>
        {data.map((project, i) => (
            <View key={i}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{project.title}</Text>
                    <Text style={styles.date}>
                        {formatDate(project.start)} - {formatDate(project.end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#666',
                        }}
                        src={project.url}
                    >
                        {project.url}
                    </Link>
                </View>

                <View style={styles.lists}>
                    {project.description
                        ?.split('\n')
                        .filter(line => line)
                        .map((responsibility, i) => (
                            <ListItem key={i}>{responsibility}</ListItem>
                        ))}
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data }) => (
    <Section title={'Experience'}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{role}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end) || 'Present'}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{company}</Text>
                    <Text>{location}</Text>
                </View>

                <View style={styles.lists}>
                    {description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const lineText = { fontSize: 10, marginBottom: 3 };

const Skills = ({ data }) => (
    <Section title={'Skills'}>
        {data
            ?.split('\n')
            .map(l => l.trim())
            .filter(Boolean)
            .map((line, i) => (
                <Text key={i} style={lineText}>
                    {line}
                </Text>
            ))}
    </Section>
);

const Tools = ({ data }) => (
    <Section title={'Tools / Software'}>
        {data
            ?.split('\n')
            .map(l => l.trim())
            .filter(Boolean)
            .map((line, i) => (
                <Text key={i} style={lineText}>
                    {line}
                </Text>
            ))}
    </Section>
);

const Certificaes = ({ data }) => (
    <Section title={'Achievements'}>
        {data.map(({ title, issuer, date }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{formatDate(date)}</Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{issuer}</Text>
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Languages = ({ data }) => (
    <Section title={'Languages'}>
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {data.map(({ language, proficiency }, i) => (
                <View key={i}>
                    <Text style={{ fontSize: 12 }}>{language}</Text>
                    <Text style={{ fontSize: 10, color: '#777' }}>{proficiency}</Text>
                </View>
            ))}
        </View>
    </Section>
);

const Format1Resume = ({ data }) => {
    const { contact, education, experience, projects, summary, skills, certificates, languages, tools } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact} />

                {summary?.summary && (
                    <Section title={'Summary'}>
                        <Text style={{ fontSize: 10 }}>{summary?.summary}</Text>
                    </Section>
                )}

                {education.length > 0 && <Education data={education} />}
                {experience.length > 0 && <Experience data={experience} />}
                {projects.length > 0 && <Projects data={projects} />}

                {skills?.skills?.length > 0 && <Skills data={skills.skills} />}
                {tools?.tools?.length > 0 && <Tools data={tools.tools} />}
                {certificates?.length > 0 && <Certificaes data={certificates} />}
                {languages?.length > 0 && <Languages data={languages} />}
            </Page>
        </Document>
    );
};

export default Format1Resume;
