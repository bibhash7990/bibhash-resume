'use client';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';

/**
 * Cruise ship / seafarer CV.
 *
 * Follows maritime crewing convention rather than any office-resume format:
 *
 *  - The position applied for and the availability date sit in the header.
 *    Crewing agents match candidates to vacancies by rank; a CV that does not
 *    name the rank on line one gets discarded.
 *  - A Maritime Documents section carries every certificate with its status,
 *    because STCW, CDC and medical validity are hard gates - an applicant
 *    without them cannot legally join a vessel regardless of experience.
 *  - Sea Service is its own section and is stated even when empty. A
 *    first-contract applicant who hides having no sea time is found out in the
 *    first phone call; stating it plainly reads as honest rather than naive.
 *  - Personal details sit at the FOOT of the document, which is the seafarer
 *    convention, not the top.
 *  - Single column, no graphics. Crewing agents print these and scan them fast.
 *
 * Document statuses are rendered verbatim from the profile. Nothing here
 * invents a certificate number: a fabricated STCW or CDC number is document
 * fraud and ends a maritime career before it starts.
 */

const NAVY = '#0f3057';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 26,
        paddingHorizontal: 32,
        fontFamily: 'Helvetica',
        fontSize: 9.4,
        lineHeight: 1.35,
    },

    name: { fontSize: 19, fontFamily: 'Helvetica-Bold', color: NAVY, letterSpacing: 0.3 },
    rankLine: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        marginTop: 2,
    },
    contactLine: { fontSize: 8.8, marginTop: 3 },
    availability: { fontSize: 9.2, fontFamily: 'Helvetica-Bold', marginTop: 3 },

    sectionTitle: {
        fontSize: 9.6,
        fontFamily: 'Helvetica-Bold',
        color: '#ffffff',
        backgroundColor: NAVY,
        textTransform: 'uppercase',
        letterSpacing: 0.7,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
        marginTop: 9,
        marginBottom: 4,
    },

    docRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        borderBottomColor: '#bbb',
        paddingVertical: 1.8,
    },
    docHeadRow: { flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: '#555', paddingBottom: 2 },
    docHeadCell: { fontSize: 8.2, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
    docName: { width: '42%', fontSize: 8.6, paddingRight: 4 },
    docDetail: { width: '28%', fontSize: 8.4, paddingRight: 4, color: '#333' },
    docStatus: { width: '30%', fontSize: 8.4 },
    docHeld: { width: '30%', fontSize: 8.4, fontFamily: 'Helvetica-Bold' },

    entry: { marginBottom: 6 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    entryRole: { fontFamily: 'Helvetica-Bold', fontSize: 9.8, flexGrow: 1, paddingRight: 8 },
    entryDate: { fontSize: 8.8, fontFamily: 'Helvetica-Oblique' },
    entryOrg: { fontSize: 9, marginTop: 1 },
    entryMeta: { fontSize: 8.4, color: '#333', marginTop: 0.5 },

    bulletRow: { flexDirection: 'row', marginTop: 1.5 },
    bulletPoint: { width: 9, fontSize: 8.8 },
    bulletText: { flex: 1, fontSize: 8.8, textAlign: 'justify' },

    body: { fontSize: 9, textAlign: 'justify' },
    line: { fontSize: 9, marginBottom: 1.5 },
    noteBox: {
        fontSize: 8.8,
        fontFamily: 'Helvetica-Oblique',
        color: '#222',
        borderLeftWidth: 2,
        borderLeftColor: NAVY,
        paddingLeft: 5,
        paddingVertical: 2,
    },

    detailRow: { flexDirection: 'row', marginBottom: 1.5 },
    detailLabel: { width: '30%', fontFamily: 'Helvetica-Bold', fontSize: 8.8 },
    detailValue: { width: '70%', fontSize: 8.8 },
});

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

const Detail = ({ label, value }) =>
    value ?
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
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

const CruiseShipResume = ({ data }) => {
    const { contact, personal, summary, experience, education, skills, tools, certificates, languages } = data;

    const documents = personal?.documents || [];
    const seaService = personal?.seaService || [];
    const sortedExperience = [...(experience || [])].sort(
        (a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime(),
    );

    const contactBits = [contact?.phone && `${contact.phone} (WhatsApp)`, contact?.email, personal?.address].filter(
        Boolean,
    );

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Text style={styles.name}>{contact?.name}</Text>
                {contact?.title ? <Text style={styles.rankLine}>Position applied for: {contact.title}</Text> : null}
                <Text style={styles.contactLine}>{contactBits.join('  |  ')}</Text>
                {personal?.availability ?
                    <Text style={styles.availability}>Availability: {personal.availability}</Text>
                :   null}

                {summary?.summary ?
                    <Section title="Profile">
                        <Text style={styles.body}>{summary.summary}</Text>
                    </Section>
                :   null}

                {documents.length ?
                    <Section title="Maritime Documents & Certification">
                        <View style={styles.docHeadRow}>
                            <Text style={[styles.docName, styles.docHeadCell]}>Document</Text>
                            <Text style={[styles.docDetail, styles.docHeadCell]}>Reference</Text>
                            <Text style={[styles.docStatus, styles.docHeadCell]}>Status</Text>
                        </View>
                        {documents.map((d, i) => (
                            <View key={i} style={styles.docRow}>
                                <Text style={styles.docName}>{d.name}</Text>
                                <Text style={styles.docDetail}>{d.detail || '-'}</Text>
                                <Text style={d.held ? styles.docHeld : styles.docStatus}>{d.status}</Text>
                            </View>
                        ))}
                        {personal?.documentsNote ?
                            <Text style={[styles.noteBox, { marginTop: 4 }]}>{personal.documentsNote}</Text>
                        :   null}
                    </Section>
                :   null}

                <Section title="Sea Service Record">
                    {seaService.length ?
                        seaService.map((s, i) => (
                            <View key={i} style={styles.entry} wrap={false}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryRole}>{s.rank}</Text>
                                    <Text style={styles.entryDate}>
                                        {formatDate(s.start)} - {formatDate(s.end) || 'Present'}
                                    </Text>
                                </View>
                                <Text style={styles.entryOrg}>
                                    {s.vessel}
                                    {s.vesselType ? `, ${s.vesselType}` : ''}
                                    {s.flag ? ` (${s.flag} flag)` : ''}
                                </Text>
                                {s.company ? <Text style={styles.entryMeta}>{s.company}</Text> : null}
                                <Bullets text={s.description} />
                            </View>
                        ))
                    :   <Text style={styles.noteBox}>
                            {personal?.seaServiceNote ||
                                'No prior sea service. Applying for a first shipboard contract.'}
                        </Text>
                    }
                </Section>

                {sortedExperience.length ?
                    <Section title="Shore-Based Work Experience">
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
                                {sector ? <Text style={styles.entryMeta}>Sector: {sector}</Text> : null}
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

                {skills?.skills ?
                    <Section title="Relevant Skills">
                        <LineList text={skills.skills} />
                    </Section>
                :   null}

                {tools?.tools ?
                    <Section title="Technical & Computer Proficiency">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {certificates?.length ?
                    <Section title="Additional Qualifications & Awards">
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

                {/* Seafarer convention: personal details sit at the foot, not the top. */}
                <Section title="Personal Details">
                    <Detail label="Date of Birth" value={personal?.dateOfBirth} />
                    <Detail label="Nationality" value={personal?.nationality} />
                    <Detail label="Marital Status" value={personal?.maritalStatus} />
                    <Detail label="Height / Weight" value={personal?.heightWeight} />
                    <Detail label="Medical Fitness" value={personal?.medical} />
                    <Detail label="Contract Preference" value={personal?.contractPreference} />
                    <Detail label="Next of Kin" value={personal?.nextOfKin} />
                </Section>

                <Section title="References">
                    <Text style={styles.line}>Available on request.</Text>
                </Section>
            </Page>
        </Document>
    );
};

export default CruiseShipResume;
