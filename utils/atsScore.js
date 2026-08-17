/**
 * Rule-based ATS parseability scoring.
 *
 * Applicant tracking systems read a PDF's *text layer*. Anything conveyed only
 * by visual styling, column position, or a hyperlink annotation is invisible to
 * them — so every check below runs against extracted text, not the source data.
 *
 * Pure and environment-agnostic: feed it the output of extractPdfText (browser)
 * or the equivalent Node extraction, and it returns the same score either way.
 */

export const SECTION_SYNONYMS = {
    summary: [/professional\s+summary/i, /^summary$/im, /\babout\b/i, /profile/i],
    experience: [/professional\s+experience/i, /work\s+experience/i, /^experience$/im, /employment/i],
    education: [/education/i],
    skills: [/technical\s+skills/i, /^skills/im, /core\s+competenc/i],
};

/** Signals a recruiter search or ATS keyword filter is likely to look for. */
export const KEYWORDS = [
    'javascript', 'typescript', 'react', 'next.js', 'angular', 'react native',
    'node', 'express', 'rest', 'api', 'sql', 'mysql', 'postgresql', 'mongodb',
    'aws', 'docker', 'git', 'agile', 'ci/cd', 'testing',
];

const MONTHS =
    '(january|february|march|april|may|june|july|august|september|october|november|december)';
const DATE_RANGE = new RegExp(`${MONTHS}\\s+\\d{4}\\s*[-–—]\\s*(${MONTHS}\\s+\\d{4}|present)`, 'i');

export const CATEGORY_MAX = {
    readability: 25,
    contact: 25,
    sections: 20,
    experience: 15,
    keywords: 15,
};

export const CATEGORY_LABELS = {
    readability: 'Machine readability',
    contact: 'Contact details',
    sections: 'Section headings',
    experience: 'Experience structure',
    keywords: 'Keywords & hygiene',
};

/**
 * @param {{numPages: number, pages: Array<{lines: string[], yOrder: number[]}>, text: string, annotationUrls: string[]}} doc
 * @returns {{total: number, max: number, scores: object, findings: Array<{severity: string, category: string, message: string}>, numPages: number, words: number}}
 */
export default function scoreResume({ numPages, pages, text, annotationUrls = [] }) {
    const findings = [];
    const scores = {};
    const lower = text.toLowerCase();
    const add = (severity, category, message) => findings.push({ severity, category, message });

    /* ---------- Machine readability ---------- */
    let readability = 0;
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length > 150) readability += 10;
    else add('critical', 'readability', `Only ${words.length} words of extractable text — an ATS may treat this as a scanned image.`);

    let orderBreaks = 0;
    pages.forEach(p => {
        for (let i = 1; i < p.yOrder.length; i++) {
            if (p.yOrder[i] > p.yOrder[i - 1] + 2) orderBreaks++;
        }
    });
    if (orderBreaks === 0) readability += 10;
    else if (orderBreaks <= 2) {
        readability += 6;
        add('low', 'readability', `${orderBreaks} place(s) where text jumps back up the page — usually a side-by-side row.`);
    } else {
        add('high', 'readability', `${orderBreaks} reading-order breaks — column layouts get scrambled when text is extracted.`);
    }

    if (numPages <= 2) readability += 5;
    else add('medium', 'readability', `${numPages} pages. Two or fewer is the safe target.`);
    scores.readability = readability;

    /* ---------- Contact details ---------- */
    let contact = 0;
    if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(text)) contact += 6;
    else add('critical', 'contact', 'No email address in the text layer.');

    if (/(\+\d{1,3}[\s-]?)?\d{10}|\+\d{1,3}[\s-]?\d{4,}/.test(text)) contact += 6;
    else add('critical', 'contact', 'No phone number in the text layer.');

    const firstLine = (pages[0]?.lines[0] || '').trim();
    if (firstLine && firstLine.length < 60 && !/@|\d{5}/.test(firstLine)) contact += 5;
    else add('high', 'contact', `First line does not read as a clean name: "${firstLine.slice(0, 60)}"`);

    if (/linkedin\.com\/in\/|github\.com\//i.test(text)) contact += 5;
    else if (annotationUrls.some(u => /linkedin\.com|github\.com/i.test(u))) {
        add('high', 'contact', 'LinkedIn/GitHub exist only as clickable links — the visible text carries no URL, so a text-extracting ATS captures nothing.');
    } else {
        add('high', 'contact', 'No LinkedIn or GitHub URL found.');
    }

    if (/\b(remote|surat|gujarat|india|bangalore|mumbai|delhi|pune)\b/i.test(text.slice(0, 600))) contact += 3;
    else add('medium', 'contact', 'No city or location near the top. Many ATS filter candidates by location.');
    scores.contact = contact;

    /* ---------- Section headings ---------- */
    let sections = 0;
    Object.entries(SECTION_SYNONYMS).forEach(([name, patterns]) => {
        if (patterns.some(re => re.test(text))) sections += 5;
        else add('high', 'sections', `No recognizable "${name}" heading — ATS section splitters key off standard headings.`);
    });
    scores.sections = sections;

    /* ---------- Experience structure ---------- */
    let experience = 0;
    const dateRanges = text.match(new RegExp(DATE_RANGE.source, 'gi')) || [];
    if (dateRanges.length >= 3) experience += 8;
    else if (dateRanges.length >= 1) {
        experience += 4;
        add('medium', 'experience', `Only ${dateRanges.length} parseable "Month YYYY - Month YYYY" range(s).`);
    } else {
        add('high', 'experience', 'No parseable date ranges — an ATS cannot compute tenure.');
    }

    const bullets = (text.match(/•/g) || []).length;
    if (bullets >= 5) experience += 7;
    else add('medium', 'experience', `Only ${bullets} bullet markers. Bulleted achievements parse better than prose.`);
    scores.experience = experience;

    /* ---------- Keywords & hygiene ---------- */
    let keywords = 0;
    const hits = KEYWORDS.filter(k => lower.includes(k));
    keywords += Math.round((hits.length / KEYWORDS.length) * 10);
    if (hits.length < KEYWORDS.length * 0.7) {
        add('medium', 'keywords', `Only ${hits.length}/${KEYWORDS.length} common stack keywords present. Missing: ${KEYWORDS.filter(k => !hits.includes(k)).join(', ')}`);
    }

    const badGlyphs = [...new Set(text.match(/[^\x00-\x7F•–—’‘“”]/g) || [])];
    if (badGlyphs.length === 0) keywords += 5;
    else add('low', 'keywords', `Non-ASCII glyphs that some parsers mangle: ${badGlyphs.slice(0, 12).join(' ')}`);
    scores.keywords = keywords;

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const max = Object.values(CATEGORY_MAX).reduce((a, b) => a + b, 0);

    return { total, max, scores, findings, numPages, words: words.length };
}
