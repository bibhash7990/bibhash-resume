'use client';

import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';

/**
 * Lebenslauf - German / Austrian / Swiss CV.
 *
 * The defining convention is the *tabellarischer Lebenslauf*: a narrow left
 * column of date ranges against a right column of content. German recruiters
 * read for that shape, so it is kept even though a single column would extract
 * more cleanly - the date column is narrow and each row is one horizontal band,
 * which parsers handle far better than true side-by-side sections.
 *
 * Other German-specific conventions implemented here:
 *  - Complete education history including school, each with its qualification.
 *  - Personal data block (date and place of birth, nationality).
 *  - Place + date + signature line at the foot, which signals the document is
 *    current and verified. Optional in law, still expected by many employers.
 *  - Photo top right (4.5 x 6 cm proportions) when `personal.photo` is set.
 *    Optional since the AGG anti-discrimination act; large international firms
 *    increasingly prefer applications without one.
 *
 * Section headings are bilingual so the same PDF works whether it is read by a
 * German-speaking or an international recruiter.
 */

const ACCENT = '#1a1a1a';
const RULE = '#8c8c8c';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 30,
        paddingHorizontal: 34,
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        lineHeight: 1.35,
    },

    topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    topLeft: { flexGrow: 1, paddingRight: 14 },
    docTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', letterSpacing: 2, textTransform: 'uppercase' },
    name: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: ACCENT, marginTop: 5 },
    headline: { fontSize: 10.5, marginTop: 2 },
    /* 4.5 x 6 cm proportions */
    photo: { width: 72, height: 96, objectFit: 'cover', borderWidth: 0.8, borderColor: '#666' },

    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 11,
        marginBottom: 2,
    },
    sectionRule: { height: 0.9, backgroundColor: RULE, marginBottom: 5 },

    /* the tabular row: dates left, content right */
    row: { flexDirection: 'row', marginBottom: 5 },
    rowDate: { width: '25%', fontSize: 8.8, fontFamily: 'Helvetica-Bold', paddingRight: 8 },
    rowBody: { width: '75%' },

    rowTitle: { fontSize: 9.8, fontFamily: 'Helvetica-Bold' },
    rowOrg: { fontSize: 9, marginTop: 0.5 },
    rowMeta: { fontSize: 8.4, color: '#333', marginTop: 0.5 },

    bulletRow: { flexDirection: 'row', marginTop: 1.5 },
    bulletPoint: { width: 9, fontSize: 8.8 },
    bulletText: { flex: 1, fontSize: 8.8, textAlign: 'justify' },

    body: { fontSize: 9, textAlign: 'justify' },
    line: { fontSize: 9, marginBottom: 1.5 },

    signatureBlock: { marginTop: 22 },
    signatureLine: { width: 150, height: 0.9, backgroundColor: '#000', marginTop: 26, marginBottom: 3 },
    signatureName: { fontSize: 8.8 },
    signaturePlace: { fontSize: 9 },
});

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRule} />
        {children}
    </View>
);

const Row = ({ date, children }) => (
    <View style={styles.row} wrap={false}>
        <Text style={styles.rowDate}>{date}</Text>
        <View style={styles.rowBody}>{children}</View>
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

const range = (start, end) => `${formatDate(start)} -\n${formatDate(end) || 'heute / present'}`;

const LebenslaufResume = ({ data }) => {
    const { contact, personal, summary, experience, education, skills, tools, certificates, languages } = data;

    const sortedExperience = [...(experience || [])].sort(
        (a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime(),
    );
    const sortedEducation = [...(education || [])].sort(
        (a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime(),
    );

    return (
        <Document language="de">
            <Page size="A4" style={styles.page}>
                <View style={styles.topRow}>
                    <View style={styles.topLeft}>
                        <Text style={styles.docTitle}>Lebenslauf</Text>
                        <Text style={styles.name}>{contact?.name}</Text>
                        {contact?.title ? <Text style={styles.headline}>{contact.title}</Text> : null}
                    </View>
                    {personal?.photo ? <Image style={styles.photo} src={personal.photo} /> : null}
                </View>

                <Section title="Persönliche Daten / Personal Details">
                    {personal?.address ? <Text style={styles.line}>{personal.address}</Text> : null}
                    {contact?.phone ? <Text style={styles.line}>Telefon / Phone: {contact.phone}</Text> : null}
                    {contact?.email ? <Text style={styles.line}>E-Mail: {contact.email}</Text> : null}
                    {contact?.linkedin ? <Text style={styles.line}>LinkedIn: {contact.linkedin}</Text> : null}
                    {personal?.dateOfBirth ?
                        <Text style={styles.line}>
                            Geburtsdatum / Date of birth: {personal.dateOfBirth}
                            {personal.placeOfBirth ? ` (${personal.placeOfBirth})` : ''}
                        </Text>
                    :   null}
                    {personal?.nationality ?
                        <Text style={styles.line}>Staatsangehörigkeit / Nationality: {personal.nationality}</Text>
                    :   null}
                    {personal?.workAuthorisation ?
                        <Text style={styles.line}>
                            Arbeitserlaubnis / Work authorisation: {personal.workAuthorisation}
                        </Text>
                    :   null}
                </Section>

                {summary?.summary ?
                    <Section title="Kurzprofil / Profile">
                        <Text style={styles.body}>{summary.summary}</Text>
                    </Section>
                :   null}

                {sortedExperience.length ?
                    <Section title="Berufserfahrung / Professional Experience">
                        {sortedExperience.map(({ role, company, location, start, end, sector, description }, i) => (
                            <Row key={i} date={range(start, end)}>
                                <Text style={styles.rowTitle}>{role}</Text>
                                <Text style={styles.rowOrg}>
                                    {company}
                                    {location ? `, ${location}` : ''}
                                </Text>
                                {sector ? <Text style={styles.rowMeta}>Branche / Sector: {sector}</Text> : null}
                                <Bullets text={description} />
                            </Row>
                        ))}
                    </Section>
                :   null}

                {sortedEducation.length ?
                    <Section title="Ausbildung / Education">
                        {sortedEducation.map(({ degree, institution, location, start, end, gpa, eqf }, i) => (
                            <Row key={i} date={range(start, end)}>
                                <Text style={styles.rowTitle}>{degree}</Text>
                                <Text style={styles.rowOrg}>
                                    {institution}
                                    {location ? `, ${location}` : ''}
                                </Text>
                                {gpa || eqf ?
                                    <Text style={styles.rowMeta}>
                                        {gpa ? `Abschlussnote / Grade: ${gpa}` : ''}
                                        {gpa && eqf ? '   |   ' : ''}
                                        {eqf ? `EQR / EQF: ${eqf}` : ''}
                                    </Text>
                                :   null}
                            </Row>
                        ))}
                    </Section>
                :   null}

                {skills?.skills ?
                    <Section title="Fachkenntnisse / Professional Skills">
                        <LineList text={skills.skills} />
                    </Section>
                :   null}

                {tools?.tools ?
                    <Section title="IT-Kenntnisse / IT Skills">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {languages?.length ?
                    <Section title="Sprachen / Languages">
                        <Text style={styles.line}>
                            {languages
                                .map(l => {
                                    const level = l.listening || l.proficiency;
                                    if (l.motherTongue) return `${l.language} (Muttersprache / mother tongue)`;
                                    return level ? `${l.language} (${level})` : l.language;
                                })
                                .join('  |  ')}
                        </Text>
                    </Section>
                :   null}

                {certificates?.length ?
                    <Section title="Zertifikate & Auszeichnungen / Certificates & Awards">
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

                {personal?.signaturePlace ?
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signaturePlace}>{personal.signaturePlace}</Text>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureName}>{contact?.name}</Text>
                    </View>
                :   null}
            </Page>
        </Document>
    );
};

export default LebenslaufResume;
