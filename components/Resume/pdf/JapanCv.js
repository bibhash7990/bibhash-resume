'use client';

import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import formatDate from '@/utils/formatDate';

/**
 * Japan CV - English document following Japanese hiring conventions.
 *
 * Japanese applications normally use two documents: the rirekisho (履歴書), a
 * fixed-form personal and chronological history, and the shokumu keirekisho
 * (職務経歴書), a detailed career and achievement record. This template merges
 * both into one English document, which is what international employers and
 * bilingual recruiters in Japan accept from overseas applicants.
 *
 * The convention that most distinguishes it from every other format in this
 * app: **education and work history run oldest-first (ascending)**, not
 * reverse-chronological. Submitting a Japanese-market CV in reverse order
 * immediately reads as foreign and unfamiliar with local practice.
 *
 * Photo is standard here (typically 3 x 4 cm, business attire) and renders when
 * `personal.photo` holds a data URI.
 *
 * Honest limitation: a true rirekisho is a Japanese-language form, often on a
 * JIS-standard sheet. If a specific employer asks for a rirekisho in Japanese,
 * this English document does not replace it - it is for English-accepting and
 * international employers.
 */

const ACCENT = '#7a1c26';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 28,
        paddingHorizontal: 32,
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        lineHeight: 1.35,
    },

    topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    topLeft: { flexGrow: 1, paddingRight: 12 },
    docTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, color: ACCENT },
    name: { fontSize: 18, fontFamily: 'Helvetica-Bold', marginTop: 4 },
    headline: { fontSize: 10.5, marginTop: 2 },
    /* 3 x 4 cm proportions */
    photo: { width: 64, height: 85, objectFit: 'cover', borderWidth: 0.8, borderColor: '#666' },

    sectionTitle: {
        fontSize: 9.8,
        fontFamily: 'Helvetica-Bold',
        color: ACCENT,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginTop: 10,
        marginBottom: 2,
    },
    sectionRule: { height: 1, backgroundColor: ACCENT, marginBottom: 4 },

    detailRow: { flexDirection: 'row', marginBottom: 1.5 },
    detailLabel: { width: '28%', fontFamily: 'Helvetica-Bold', fontSize: 9 },
    detailValue: { width: '72%', fontSize: 9 },

    /* chronological history rows, oldest first */
    histRow: { flexDirection: 'row', marginBottom: 3 },
    histDate: { width: '22%', fontSize: 8.8, paddingRight: 6 },
    histBody: { width: '78%' },
    histTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Bold' },
    histOrg: { fontSize: 9, marginTop: 0.5 },

    bulletRow: { flexDirection: 'row', marginTop: 1.5 },
    bulletPoint: { width: 9, fontSize: 8.8 },
    bulletText: { flex: 1, fontSize: 8.8, textAlign: 'justify' },

    body: { fontSize: 9, textAlign: 'justify' },
    line: { fontSize: 9, marginBottom: 1.5 },
    note: { fontSize: 8.4, color: '#333', fontFamily: 'Helvetica-Oblique', marginTop: 3 },
});

const Section = ({ title, children }) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRule} />
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

/** Japanese convention: oldest entry first. */
const ascending = list =>
    [...(list || [])].sort((a, b) => new Date(a.start || 0).getTime() - new Date(b.start || 0).getTime());

const JapanCvResume = ({ data }) => {
    const { contact, personal, summary, experience, education, skills, tools, certificates, languages } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <View style={styles.topRow}>
                    <View style={styles.topLeft}>
                        <Text style={styles.docTitle}>CURRICULUM VITAE / 履歴書</Text>
                        <Text style={styles.name}>{contact?.name}</Text>
                        {contact?.title ? <Text style={styles.headline}>{contact.title}</Text> : null}
                    </View>
                    {personal?.photo ? <Image style={styles.photo} src={personal.photo} /> : null}
                </View>

                <Section title="Personal Information">
                    <Detail label="Date of Birth" value={personal?.dateOfBirth} />
                    <Detail label="Nationality" value={personal?.nationality} />
                    <Detail label="Address" value={personal?.address} />
                    <Detail label="Telephone" value={contact?.phone} />
                    <Detail label="Email" value={contact?.email} />
                    <Detail label="Visa Status" value={personal?.visaStatus} />
                    <Detail label="Japanese Ability" value={personal?.japaneseLevel} />
                </Section>

                {education?.length ?
                    <Section title="Education / 学歴">
                        {ascending(education).map(({ degree, institution, location, start, end }, i) => (
                            <View key={i} style={styles.histRow} wrap={false}>
                                <Text style={styles.histDate}>
                                    {formatDate(start)} -{'\n'}
                                    {formatDate(end)}
                                </Text>
                                <View style={styles.histBody}>
                                    <Text style={styles.histTitle}>{degree}</Text>
                                    <Text style={styles.histOrg}>
                                        {institution}
                                        {location ? `, ${location}` : ''}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </Section>
                :   null}

                {experience?.length ?
                    <Section title="Work History / 職歴">
                        {ascending(experience).map(({ role, company, location, start, end, sector }, i) => (
                            <View key={i} style={styles.histRow} wrap={false}>
                                <Text style={styles.histDate}>
                                    {formatDate(start)} -{'\n'}
                                    {formatDate(end) || 'Present'}
                                </Text>
                                <View style={styles.histBody}>
                                    <Text style={styles.histTitle}>{role}</Text>
                                    <Text style={styles.histOrg}>
                                        {company}
                                        {location ? `, ${location}` : ''}
                                        {sector ? ` - ${sector}` : ''}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        <Text style={styles.note}>Listed in chronological order, earliest first.</Text>
                    </Section>
                :   null}

                {experience?.length ?
                    <Section title="Career Detail / 職務経歴書">
                        {[...experience]
                            .sort((a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime())
                            .map(({ role, company, start, end, description }, i) => (
                                <View key={i} style={{ marginBottom: 5 }} wrap={false}>
                                    <Text style={styles.histTitle}>
                                        {company} - {role}
                                    </Text>
                                    <Text style={styles.histOrg}>
                                        {formatDate(start)} - {formatDate(end) || 'Present'}
                                    </Text>
                                    <Bullets text={description} />
                                </View>
                            ))}
                    </Section>
                :   null}

                {certificates?.length ?
                    <Section title="Licences & Certifications / 免許・資格">
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

                {skills?.skills ?
                    <Section title="Skills / スキル">
                        <LineList text={skills.skills} />
                    </Section>
                :   null}

                {tools?.tools ?
                    <Section title="Technical Tools">
                        <LineList text={tools.tools} />
                    </Section>
                :   null}

                {languages?.length ?
                    <Section title="Languages / 語学">
                        <Text style={styles.line}>
                            {languages
                                .map(l => (l.proficiency ? `${l.language} (${l.proficiency})` : l.language))
                                .join('  |  ')}
                        </Text>
                    </Section>
                :   null}

                {summary?.summary ?
                    <Section title="Self PR / 自己PR">
                        <Text style={styles.body}>{summary.summary}</Text>
                    </Section>
                :   null}
            </Page>
        </Document>
    );
};

export default JapanCvResume;
