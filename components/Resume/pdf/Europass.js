'use client';

import { Page, Text, View, Document, Link, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';
import { toHttpUrl, toReadableUrl, isPlaceholderSocial } from './contactLinks';

/**
 * Europass CV — the European Commission's standard CV format.
 *
 * Follows the post-2020 Europass structure: Personal information → About me →
 * Work experience → Education and training → Language skills (CEFR grid) →
 * Digital skills → Job-related skills → Additional information.
 *
 * Two deliberate departures from the other formats in this app:
 *
 * 1. Secondary schooling is NOT filtered out. The other templates drop it as
 *    noise, but Europass convention is a complete education history, and EU
 *    recruiters expect every qualification with its EQF level.
 * 2. Rendered as a single column rather than the classic left-label/right-value
 *    two-column Europass layout. Columns scramble reading order when a parser
 *    extracts the text layer; the current official Europass output is likewise
 *    single-column. The language grid stays a real table because that grid is
 *    the format's defining feature and is read row by row.
 *
 * Europass-specific data (nationality, date of birth, work authorisation,
 * driving licence) arrives as a `personal` section, and the CEFR sub-levels as
 * optional fields on each `languages` entry. Both are absent on profiles built
 * for other formats, so every block below degrades to nothing when unset.
 */

const EU_BLUE = '#12356b';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 26,
        paddingHorizontal: 30,
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        lineHeight: 1.35,
    },

    name: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        color: EU_BLUE,
        letterSpacing: 0.4,
    },
    headline: {
        fontSize: 10.5,
        color: '#000',
        marginTop: 2,
        marginBottom: 8,
    },

    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: EU_BLUE,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginTop: 10,
        marginBottom: 3,
    },
    sectionRule: {
        height: 1.2,
        backgroundColor: EU_BLUE,
        marginBottom: 5,
    },

    /* label / value rows in Personal information */
    infoRow: {
        flexDirection: 'row',
        marginBottom: 1.5,
    },
    infoLabel: {
        width: '27%',
        fontFamily: 'Helvetica-Bold',
        fontSize: 9,
    },
    infoValue: {
        width: '73%',
        fontSize: 9,
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        fontSize: 9,
    },

    entry: {
        marginBottom: 6,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    entryRole: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        flexGrow: 1,
        paddingRight: 8,
    },
    entryDate: {
        fontSize: 9,
        fontFamily: 'Helvetica-Oblique',
    },
    entryOrg: {
        fontSize: 9.2,
        marginTop: 1,
    },
    entryMeta: {
        fontSize: 8.6,
        color: '#333',
        marginTop: 1,
    },

    bulletRow: {
        flexDirection: 'row',
        marginTop: 1.5,
    },
    bulletPoint: {
        width: 10,
        fontSize: 9,
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        textAlign: 'justify',
    },

    /* CEFR self-assessment grid */
    gridHeaderRow: {
        flexDirection: 'row',
        backgroundColor: EU_BLUE,
    },
    gridRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999',
    },
    gridHeadCell: {
        fontSize: 7.4,
        fontFamily: 'Helvetica-Bold',
        color: '#ffffff',
        paddingVertical: 3,
        paddingHorizontal: 3,
    },
    gridCell: {
        fontSize: 8.4,
        paddingVertical: 2.5,
        paddingHorizontal: 3,
    },
    gridNote: {
        fontSize: 7.6,
        color: '#333',
        marginTop: 3,
        fontFamily: 'Helvetica-Oblique',
    },

    body: {
        fontSize: 9,
    },
    skillLine: {
        fontSize: 9,
        marginBottom: 1.5,
    },
});

const GRID_COLS = [
    { key: 'language', label: 'Language', width: '19%' },
    { key: 'listening', label: 'Listening', width: '15%' },
    { key: 'reading', label: 'Reading', width: '14%' },
    { key: 'spokenInteraction', label: 'Spoken interaction', width: '19%' },
    { key: 'spokenProduction', label: 'Spoken production', width: '19%' },
    { key: 'writing', label: 'Writing', width: '14%' },
];

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRule} />
        {children}
    </View>
);

const InfoRow = ({ label, children }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <View style={styles.infoValue}>{children}</View>
    </View>
);

const Bullets = ({ text }) =>
    text
        ?.split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map((line, i) => (
            <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>{'•'}</Text>
                <Text style={styles.bulletText}>{line}</Text>
            </View>
        ));

const PersonalInformation = ({ contact, personal }) => {
    const socials = ['linkedin', 'github', 'portfolio'].filter(
        k => contact?.[k]?.trim() && !isPlaceholderSocial(contact[k]),
    );

    return (
        <Section title="Personal Information">
            {personal?.address ?
                <InfoRow label="Address">
                    <Text style={styles.infoValue}>{personal.address}</Text>
                </InfoRow>
            :   null}

            {contact?.phone ?
                <InfoRow label="Telephone">
                    <Text style={styles.infoValue}>{contact.phone}</Text>
                </InfoRow>
            :   null}

            {contact?.email ?
                <InfoRow label="Email">
                    <Link src={`mailto:${contact.email}`} style={styles.link}>
                        {contact.email}
                    </Link>
                </InfoRow>
            :   null}

            {socials.map(key => (
                <InfoRow key={key} label={key === 'linkedin' ? 'LinkedIn' : key === 'github' ? 'GitHub' : 'Portfolio'}>
                    <Link src={toHttpUrl(contact[key])} style={styles.link}>
                        {toReadableUrl(contact[key])}
                    </Link>
                </InfoRow>
            ))}

            {personal?.dateOfBirth ?
                <InfoRow label="Date of birth">
                    <Text style={styles.infoValue}>{personal.dateOfBirth}</Text>
                </InfoRow>
            :   null}

            {personal?.nationality ?
                <InfoRow label="Nationality">
                    <Text style={styles.infoValue}>{personal.nationality}</Text>
                </InfoRow>
            :   null}

            {personal?.workAuthorisation ?
                <InfoRow label="Work authorisation">
                    <Text style={styles.infoValue}>{personal.workAuthorisation}</Text>
                </InfoRow>
            :   null}

            {personal?.drivingLicence ?
                <InfoRow label="Driving licence">
                    <Text style={styles.infoValue}>{personal.drivingLicence}</Text>
                </InfoRow>
            :   null}
        </Section>
    );
};

const WorkExperience = ({ data }) => {
    const sorted = [...data].sort((a, b) => {
        const ta = a.start ? new Date(a.start).getTime() : 0;
        const tb = b.start ? new Date(b.start).getTime() : 0;
        return tb - ta;
    });

    return (
        <Section title="Work Experience">
            {sorted.map(({ role, company, location, start, end, sector, description }, i) => (
                <View key={i} style={styles.entry} wrap={false}>
                    <View style={styles.entryHeader}>
                        <Text style={styles.entryRole}>{role}</Text>
                        <Text style={styles.entryDate}>
                            {formatDate(start)} – {formatDate(end) || 'Present'}
                        </Text>
                    </View>
                    <Text style={styles.entryOrg}>
                        {company}
                        {location ? `, ${location}` : ''}
                    </Text>
                    {sector ?
                        <Text style={styles.entryMeta}>Business or sector: {sector}</Text>
                    :   null}
                    <Bullets text={description} />
                </View>
            ))}
        </Section>
    );
};

const EducationAndTraining = ({ data }) => (
    <Section title="Education and Training">
        {data.map(({ degree, institution, location, start, end, gpa, eqf, note }, i) => (
            <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                    <Text style={styles.entryRole}>{degree}</Text>
                    <Text style={styles.entryDate}>
                        {formatDate(start)} – {formatDate(end) || 'Present'}
                    </Text>
                </View>
                <Text style={styles.entryOrg}>
                    {institution}
                    {location ? `, ${location}` : ''}
                </Text>
                {eqf || gpa ?
                    <Text style={styles.entryMeta}>
                        {eqf ? `EQF level: ${eqf}` : ''}
                        {eqf && gpa ? '   |   ' : ''}
                        {gpa ? `Final grade: ${gpa}` : ''}
                    </Text>
                :   null}
                {note?.trim() ?
                    <Text style={styles.entryMeta}>{note.trim()}</Text>
                :   null}
            </View>
        ))}
    </Section>
);

const LanguageSkills = ({ data }) => {
    const mother = data.filter(l => l.motherTongue);
    const others = data.filter(l => !l.motherTongue);
    const graded = others.filter(l => l.listening || l.reading || l.writing);
    const ungraded = others.filter(l => !(l.listening || l.reading || l.writing));

    return (
        <Section title="Language Skills">
            {mother.length ?
                <Text style={styles.body}>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>Mother tongue: </Text>
                    {mother.map(l => l.language).join(', ')}
                </Text>
            :   null}

            {graded.length ?
                <View style={{ marginTop: 4 }}>
                    <View style={styles.gridHeaderRow}>
                        {GRID_COLS.map(c => (
                            <Text key={c.key} style={[styles.gridHeadCell, { width: c.width }]}>
                                {c.label}
                            </Text>
                        ))}
                    </View>
                    {graded.map((l, i) => (
                        <View key={i} style={styles.gridRow}>
                            {GRID_COLS.map(c => (
                                <Text
                                    key={c.key}
                                    style={[
                                        styles.gridCell,
                                        { width: c.width },
                                        c.key === 'language' ? { fontFamily: 'Helvetica-Bold' } : null,
                                    ]}
                                >
                                    {l[c.key] || '-'}
                                </Text>
                            ))}
                        </View>
                    ))}
                    <Text style={styles.gridNote}>
                        Levels: A1/A2 Basic user - B1/B2 Independent user - C1/C2 Proficient user. Common European
                        Framework of Reference for Languages (CEFR), self-assessed.
                    </Text>
                </View>
            :   null}

            {ungraded.length ?
                <Text style={[styles.body, { marginTop: 3 }]}>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>Other languages: </Text>
                    {ungraded
                        .map(l => (l.proficiency ? `${l.language} (${l.proficiency})` : l.language))
                        .join('; ')}
                </Text>
            :   null}
        </Section>
    );
};

const LineList = ({ text }) =>
    text
        ?.split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map((line, i) => {
            const colon = line.indexOf(':');
            if (colon === -1) {
                return (
                    <Text key={i} style={styles.skillLine}>
                        {line}
                    </Text>
                );
            }
            return (
                <Text key={i} style={styles.skillLine}>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>{line.slice(0, colon).trim()}: </Text>
                    {line.slice(colon + 1).trim()}
                </Text>
            );
        });

const AdditionalInformation = ({ projects, certificates }) => (
    <Section title="Additional Information">
        {projects?.length ?
            <View style={{ marginBottom: 4 }}>
                <Text style={[styles.skillLine, { fontFamily: 'Helvetica-Bold' }]}>Projects</Text>
                {projects.map((p, i) => (
                    <View key={i} style={{ marginBottom: 3 }}>
                        <Text style={styles.body}>
                            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{p.title}</Text>
                            {p.start || p.end ?
                                <Text style={styles.entryDate}>
                                    {'  ('}
                                    {formatDate(p.start)}
                                    {p.end && p.end !== p.start ? ` – ${formatDate(p.end)}` : ''}
                                    {')'}
                                </Text>
                            :   null}
                        </Text>
                        <Bullets text={p.description} />
                    </View>
                ))}
            </View>
        :   null}

        {certificates?.length ?
            <View>
                <Text style={[styles.skillLine, { fontFamily: 'Helvetica-Bold' }]}>
                    Certificates, awards and activities
                </Text>
                {certificates.map((c, i) => (
                    <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>{'•'}</Text>
                        <Text style={styles.bulletText}>
                            {c.title}
                            {c.issuer ? ` — ${c.issuer}` : ''}
                            {c.date ? ` (${formatDate(c.date)})` : ''}
                        </Text>
                    </View>
                ))}
            </View>
        :   null}
    </Section>
);

const EuropassResume = ({ data }) => {
    const { contact, personal, summary, experience, education, languages, skills, tools, projects, certificates } =
        data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Text style={styles.name}>{contact?.name}</Text>
                {contact?.title ?
                    <Text style={styles.headline}>{contact.title}</Text>
                :   null}

                <PersonalInformation contact={contact} personal={personal} />

                {summary?.summary ?
                    <Section title="About Me">
                        <Text style={[styles.body, { textAlign: 'justify' }]}>{summary.summary}</Text>
                    </Section>
                :   null}

                {experience?.length > 0 ? <WorkExperience data={experience} /> : null}

                {education?.length > 0 ? <EducationAndTraining data={education} /> : null}

                {languages?.length > 0 ? <LanguageSkills data={languages} /> : null}

                {tools?.tools ?
                    <Section title="Digital Skills">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {skills?.skills ?
                    <Section title="Job-related Skills">
                        <LineList text={skills.skills} />
                    </Section>
                :   null}

                {projects?.length || certificates?.length ?
                    <AdditionalInformation projects={projects} certificates={certificates} />
                :   null}
            </Page>
        </Document>
    );
};

export default EuropassResume;
