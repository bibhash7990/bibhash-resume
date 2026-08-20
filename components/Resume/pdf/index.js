'use client';

import Format1Resume from './Format1';
import Format2Resume from './Format2';
import Format3Resume from './Format3';
import Format4Resume from './Format4';
import EuropassResume from './Europass';
import GccResume from './Gcc';
import LebenslaufResume from './Lebenslauf';
import AnzResume from './Anz';
import JapanCvResume from './JapanCv';

/**
 * A profile can carry different content per layout via meta.templateOverrides.
 * One career can need two different framings - e.g. a domain-targeted summary
 * in one layout and a neutral one in another - without splitting it into two
 * profiles that then drift apart.
 *
 * Section values are merged shallowly; arrays and primitives replace outright.
 */
const applyTemplateOverrides = (data, template) => {
    const override = data?.meta?.templateOverrides?.[template];
    if (!override) return data;

    const merged = { ...data };
    Object.entries(override).forEach(([section, value]) => {
        const isPlainObject = value && typeof value === 'object' && !Array.isArray(value);
        merged[section] = isPlainObject ? { ...data[section], ...value } : value;
    });
    return merged;
};

const Resume = ({ data: rawData }) => {
    const template = rawData?.meta?.template || 'format1';
    const data = applyTemplateOverrides(rawData, template);

    if (template === 'europass') {
        return <EuropassResume data={data} />;
    }

    if (template === 'gcc') {
        return <GccResume data={data} />;
    }

    if (template === 'lebenslauf') {
        return <LebenslaufResume data={data} />;
    }

    if (template === 'anz') {
        return <AnzResume data={data} />;
    }

    if (template === 'japan') {
        return <JapanCvResume data={data} />;
    }

    if (template === 'format4') {
        return <Format4Resume data={data} />;
    }

    if (template === 'format3') {
        return <Format3Resume data={data} />;
    }

    if (template === 'format2') {
        return <Format2Resume data={data} />;
    }

    return <Format1Resume data={data} />;
};

export default Resume;
