'use client';

import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import Section from './Section';
import ListItem from './ListItem';
import styles from '../Styles';
import formatDate from '@/utils/formatDate';
import buildContactLinks from './contactLinks';
import filterEducation from './filterEducation';

const Header = ({ data }) => {
    const contactLinks = buildContactLinks(data);

    return (
        <Section>
            <Text style={styles.header__name}>{data.name}</Text>
            {data.title ?
                <Text style={styles.sub__header__name}>({data.title})</Text>
            :   null}
            <View style={styles.header__links}>
                {contactLinks.map(({ key, label, href }) =>
                    href ?
                        <Link key={key} src={href} style={styles.link}>
                            {label}
                        </Link>
                    :   <Text key={key} style={styles.link}>
                            {label}
                        </Text>,
                )}
            </View>
        </Section>
    );
};

const Education = ({ data: rawData }) => {
    const data = filterEducation(rawData);

    return (
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
};

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
                            color: '#000',
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

/**
 * Rendered as one flowing line rather than side-by-side columns: columns make
 * a PDF text extractor jump back up the page, which scrambles reading order
 * for ATS parsers.
 */
const Languages = ({ data }) => (
    <Section title={'Languages'}>
        <Text style={{ fontSize: 10.5, lineHeight: 1.3 }}>
            {data
                .map(({ language, proficiency }) => (proficiency ? `${language} (${proficiency})` : language))
                .join('  •  ')}
        </Text>
    </Section>
);

const Format1Resume = ({ data }) => {
    const { contact, education, experience, projects, summary, skills, certificates, languages, tools } = data;

    // Built as a list so the separator can be drawn between sections only.
    // A trailing separator after the final section overflows the page and
    // produces a blank extra page.
    const sections = [
        summary?.summary ?
            <Section title={'Summary'}>
                <Text style={{ fontSize: 10 }}>{summary.summary}</Text>
            </Section>
        :   null,
        education?.length > 0 ? <Education data={education} /> : null,
        experience?.length > 0 ? <Experience data={experience} /> : null,
        projects?.length > 0 ? <Projects data={projects} /> : null,
        skills?.skills?.length > 0 ? <Skills data={skills.skills} /> : null,
        tools?.tools?.length > 0 ? <Tools data={tools.tools} /> : null,
        certificates?.length > 0 ? <Certificaes data={certificates} /> : null,
        languages?.length > 0 ? <Languages data={languages} /> : null,
    ].filter(Boolean);

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact} />

                {sections.map((section, i) => (
                    <View key={i} style={i < sections.length - 1 ? styles.section_gap : undefined}>
                        {section}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default Format1Resume;
