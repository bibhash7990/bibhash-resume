'use client';

import { Page, Text, View, Document, Link, Image, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';
import buildContactLinks from './contactLinks';

/**
 * Gulf / GCC CV — UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain.
 *
 * The inverse of the Anglo resume: a personal-details block is expected rather
 * than avoided. Visa status is the field that matters most - Gulf recruiters
 * filter on it at first scan, so it sits near the top and is never omitted.
 *
 * Deliberately NOT included, per current GCC private-sector practice: passport
 * number, religion, height and weight. Those appear in older Gulf templates and
 * handing a full passport number to every job board is a real identity-theft
 * exposure with no hiring benefit.
 *
 * Photo is expected in this market but only renders when `personal.photo`
 * holds a data URI - a placeholder box would look worse than no photo at all.
 */

const ACCENT = '#0b3d2e';

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

    topRow: { flexDirection: 'row', justifyContent: 'space-between' },
    topLeft: { flexGrow: 1, paddingRight: 12 },
    photo: { width: 68, height: 85, objectFit: 'cover', borderWidth: 0.8, borderColor: '#666' },

    name: { fontSize: 19, fontFamily: 'Helvetica-Bold', color: ACCENT, letterSpacing: 0.3 },
    headline: { fontSize: 10.5, marginTop: 2 },
    contactLine: { fontSize: 8.8, marginTop: 4, color: '#000' },

    sectionTitle: {
        fontSize: 9.8,
        fontFamily: 'Helvetica-Bold',
        color: '#ffffff',
        backgroundColor: ACCENT,
        textTransform: 'uppercase',
        letterSpacing: 0.7,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
        marginTop: 9,
        marginBottom: 4,
    },

    detailRow: { flexDirection: 'row', marginBottom: 1.5 },
    detailLabel: { width: '30%', fontFamily: 'Helvetica-Bold', fontSize: 9 },
    detailValue: { width: '70%', fontSize: 9 },
    visaValue: { width: '70%', fontSize: 9, fontFamily: 'Helvetica-Bold' },

    entry: { marginBottom: 6 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    entryRole: { fontFamily: 'Helvetica-Bold', fontSize: 10, flexGrow: 1, paddingRight: 8 },
    entryDate: { fontSize: 9, fontFamily: 'Helvetica-Oblique' },
    entryOrg: { fontSize: 9.2, marginTop: 1 },

    bulletRow: { flexDirection: 'row', marginTop: 1.5 },
    bulletPoint: { width: 10, fontSize: 9 },
    bulletText: { flex: 1, fontSize: 9, textAlign: 'justify' },

    body: { fontSize: 9, textAlign: 'justify' },
    line: { fontSize: 9, marginBottom: 1.5 },
});

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

const Detail = ({ label, value, strong }) =>
    value ?
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={strong ? styles.visaValue : styles.detailValue}>{value}</Text>
        </View>
    :   null;

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

const GccResume = ({ data }) => {
    const { contact, personal, summary, experience, education, skills, tools, certificates, languages } = data;

    const contactLinks = buildContactLinks(contact || {});
    const sortedExperience = [...(experience || [])].sort(
        (a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime(),
    );

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <View style={styles.topRow}>
                    <View style={styles.topLeft}>
                        <Text style={styles.name}>{contact?.name}</Text>
                        {contact?.title ? <Text style={styles.headline}>{contact.title}</Text> : null}
                        <Text style={styles.contactLine}>
                            {contactLinks.map(l => l.label).join('  |  ')}
                        </Text>
                    </View>
                    {personal?.photo ? <Image style={styles.photo} src={personal.photo} /> : null}
                </View>

                <Section title="Personal Details">
                    <Detail label="Nationality" value={personal?.nationality} />
                    <Detail label="Date of Birth" value={personal?.dateOfBirth} />
                    <Detail label="Marital Status" value={personal?.maritalStatus} />
                    <Detail label="Visa Status" value={personal?.visaStatus} strong />
                    <Detail label="Current Location" value={personal?.address} />
                    <Detail label="Driving Licence" value={personal?.drivingLicence} />
                    <Detail label="Notice Period" value={personal?.noticePeriod} />
                    <Detail label="Willing to Relocate" value={personal?.relocation} />
                </Section>

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
                    <Section title="Work Experience">
                        {sortedExperience.map(({ role, company, location, start, end, description }, i) => (
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
                    <Section title="Technical & Software Proficiency">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {certificates?.length ?
                    <Section title="Certifications & Achievements">
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

                <Section title="References">
                    <Text style={styles.line}>Available on request.</Text>
                </Section>
            </Page>
        </Document>
    );
};

export default GccResume;
