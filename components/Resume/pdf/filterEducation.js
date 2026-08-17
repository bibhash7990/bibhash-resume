/**
 * Drops school-level qualifications (SSC / HSC / secondary) from the education
 * list. For a candidate with professional experience these add length without
 * adding signal, and the extra page they push a resume onto is itself a
 * negative with recruiters and ATS length heuristics.
 */
const filterEducation = (education = []) =>
    education.filter(edu => {
        const degree = edu.degree?.toLowerCase() || '';
        return (
            !degree.includes('secondary') &&
            !degree.includes('school') &&
            !degree.includes('hsc') &&
            !degree.includes('ssc')
        );
    });

export default filterEducation;
