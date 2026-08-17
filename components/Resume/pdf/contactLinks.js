/**
 * Shared contact-line builder for every PDF format.
 *
 * ATS note: applicant tracking systems read the PDF's *text layer*. A link
 * whose visible text is just "LinkedIn" hands the parser no URL at all — the
 * address lives only in a hyperlink annotation, which most parsers ignore.
 * So social entries render the readable URL ("linkedin.com/in/janedoe") as
 * their label and keep the clickable href on top of it.
 */

export const isPlaceholderSocial = v => !v?.trim() || /johndoe|example\.com|placeholder/i.test(v);

export const toHttpUrl = raw => {
    const t = raw.trim();
    if (!t) return '';
    if (/^https?:\/\//i.test(t)) return t;
    return `https://${t.replace(/^\/+/, '')}`;
};

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
export const toReadableUrl = raw =>
    raw
        .trim()
        .replace(/^https?:\/\//i, '')
        .replace(/^www\./i, '')
        .replace(/\/+$/, '');

const SOCIAL_FIELDS = ['linkedin', 'github', 'portfolio', 'blogs', 'twitter'];

/**
 * @returns {Array<{key: string, label: string, href: string|null}>}
 *          href === null means render it as plain text, not a link.
 */
const buildContactLinks = data => {
    const items = [];

    if (data.phone?.trim()) {
        const raw = data.phone.trim();
        const digits = raw.replace(/\D/g, '');
        const label = raw.startsWith('+') ? raw : digits.length === 10 ? `+91 ${digits}` : raw;
        const href = digits.length === 10 ? `tel:+91${digits}` : digits.length > 0 ? `tel:+${digits}` : `tel:${raw}`;
        items.push({ key: 'phone', label, href });
    }

    if (data.email?.trim()) {
        const e = data.email.trim();
        items.push({ key: 'email', label: e, href: `mailto:${e}` });
    }

    // Location is plain text — ATS location filters read it from the text layer.
    if (data.location?.trim()) {
        items.push({ key: 'location', label: data.location.trim(), href: null });
    }

    SOCIAL_FIELDS.forEach(key => {
        const value = data[key];
        if (value?.trim() && !isPlaceholderSocial(value)) {
            items.push({ key, label: toReadableUrl(value), href: toHttpUrl(value) });
        }
    });

    return items;
};

export default buildContactLinks;
