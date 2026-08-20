'use client';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';
import buildContactLinks from './contactLinks';

/**
 * Australia / New Zealand resume.
 *
 * Anglo conventions - no photo, no date of birth, no marital status or
 * nationality, single column for ATS - but with two local differences:
 *
 *  1. Length. Two to four pages is normal and expected here; the one-page
 *     discipline of a US resume reads as thin rather than concise, so entries
 *     keep their full detail.
 *  2. Referees. Australian and NZ employers genuinely call referees, usually at
 *     the final stage, and expect to see them named. A "Referees" section is
 *     always rendered; when no contacts are supplied it states availability
 *     rather than silently dropping the section.
 *
 * Work rights are stated explicitly - the local equivalent of the visa-status
 * field, and the first thing an ANZ recruiter checks for an overseas applicant.
 */

const ACCENT = '#123f5c';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 28,
        paddingHorizontal: 32,
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        lineHeight: 1.38,
    },

    name: { fontSize: 19, fontFamily: 'Helvetica-Bold', color: ACCENT, letterSpacing: 0.3 },
    headline: { fontSize: 10.5, marginTop: 2 },
    contactLine: { fontSize: 8.8, marginTop: 4 },
    workRights: { fontSize: 9, fontFamily: 'Helvetica-Bold', marginTop: 4 },

    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: ACCENT,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginTop: 10,
        marginBottom: 2,
    },
    sectionRule: { height: 1, backgroundColor: ACCENT, marginBottom: 5 },

    entry: { marginBottom: 7 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    entryRole: { fontFamily: 'Helvetica-Bold', fontSize: 10, flexGrow: 1, paddingRight: 8 },
    entryDate: { fontSize: 9, fontFamily: 'Helvetica-Oblique' },
    entryOrg: { fontSize: 9.2, marginTop: 1 },
    entryMeta: { fontSize: 8.5, color: '#333', marginTop: 0.5 },

    bulletRow: { flexDirection: 'row', marginTop: 1.5 },
    bulletPoint: { width: 10, fontSize: 9 },
    bulletText: { flex: 1, fontSize: 9, textAlign: 'justify' },

    body: { fontSize: 9, textAlign: 'justify' },
    line: { fontSize: 9, marginBottom: 1.5 },

    refereeNote: { fontSize: 8.6, color: '#333', fontFamily: 'Helvetica-Oblique', marginTop: 2 },
});

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRule} />
        {children}
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

const LineList = ({ text }) =>
    text
        ?.split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map((line, i) => {
            const colon = line.indexOf(':');
            if (colon === -1) return <Text key={i} style={styles.line}>{line}</Text>;
            return (
                <Text key={i} style={styles.line}>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>{line.slice(0, colon).trim()}: </Text>
                    {line.slice(colon + 1).trim()}
                </Text>
            );
        });

const AnzResume = ({ data }) => {
    const { contact, personal, summary, experience, education, skills, tools, certificates, languages, projects } =
        data;

    const contactLinks = buildContactLinks(contact || {});
    const sortedExperience = [...(experience || [])].sort(
        (a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime(),
    );
    const referees = personal?.referees || [];

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Text style={styles.name}>{contact?.name}</Text>
                {contact?.title ? <Text style={styles.headline}>{contact.title}</Text> : null}
                <Text style={styles.contactLine}>{contactLinks.map(l => l.label).join('  |  ')}</Text>
                {personal?.workRights ? <Text style={styles.workRights}>{personal.workRights}</Text> : null}

                {summary?.summary ?
                    <Section title="Professional Summary">
                        <Text style={styles.body}>{summary.summary}</Text>
                    </Section>
                :   null}

                {skills?.skills ?
                    <Section title="Key Skills">
                        <LineList text={skills.skills} />
                    </Section>
                :   null}

                {sortedExperience.length ?
                    <Section title="Employment History">
                        {sortedExperience.map(({ role, company, location, start, end, sector, description }, i) => (
                            <View key={i} style={styles.entry} wrap={false}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryRole}>{role}</Text>
                                    <Text style={styles.entryDate}>
                                        {formatDate(start)} - {formatDate(end) || 'Present'}
                                    </Text>
                                </View>
                                <Text style={styles.entryOrg}>
                                    {company}
                                    {location ? `, ${location}` : ''}
                                </Text>
                                {sector ? <Text style={styles.entryMeta}>Industry: {sector}</Text> : null}
                                <Bullets text={description} />
                            </View>
                        ))}
                    </Section>
                :   null}

                {education?.length ?
                    <Section title="Education">
                        {education.map(({ degree, institution, location, start, end, gpa }, i) => (
                            <View key={i} style={styles.entry} wrap={false}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryRole}>{degree}</Text>
                                    <Text style={styles.entryDate}>
                                        {formatDate(start)} - {formatDate(end)}
                                    </Text>
                                </View>
                                <Text style={styles.entryOrg}>
                                    {institution}
                                    {location ? `, ${location}` : ''}
                                    {gpa ? `  |  Grade: ${gpa}` : ''}
                                </Text>
                            </View>
                        ))}
                    </Section>
                :   null}

                {tools?.tools ?
                    <Section title="Technical Proficiency">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {projects?.length ?
                    <Section title="Projects">
                        {projects.map((p, i) => (
                            <View key={i} style={styles.entry} wrap={false}>
                                <Text style={styles.entryRole}>{p.title}</Text>
                                <Bullets text={p.description} />
                            </View>
                        ))}
                    </Section>
                :   null}

                {certificates?.length ?
                    <Section title="Certifications & Awards">
                        {certificates.map((c, i) => (
                            <View key={i} style={styles.bulletRow}>
                                <Text style={styles.bulletPoint}>{'•'}</Text>
                                <Text style={styles.bulletText}>
                                    {c.title}
                                    {c.issuer ? ` - ${c.issuer}` : ''}
                                    {c.date ? ` (${formatDate(c.date)})` : ''}
                                </Text>
                            </View>
                        ))}
                    </Section>
                :   null}

                {languages?.length ?
                    <Section title="Languages">
                        <Text style={styles.line}>
                            {languages
                                .map(l => (l.proficiency ? `${l.language} (${l.proficiency})` : l.language))
                                .join('  |  ')}
                        </Text>
                    </Section>
                :   null}

                <Section title="Referees">
                    {referees.length ?
                        referees.map((r, i) => (
                            <View key={i} style={{ marginBottom: 3 }}>
                                <Text style={styles.line}>
                                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>{r.name}</Text>
                                    {r.role ? ` - ${r.role}` : ''}
                                    {r.company ? `, ${r.company}` : ''}
                                </Text>
                                {r.contact ? <Text style={styles.line}>{r.contact}</Text> : null}
                            </View>
                        ))
                    :   <>
                            <Text style={styles.line}>Available on request.</Text>
                            <Text style={styles.refereeNote}>
                                Referee details from previous employers can be provided at interview stage.
                            </Text>
                        </>
                    }
                </Section>
            </Page>
        </Document>
    );
};

export default AnzResume;
