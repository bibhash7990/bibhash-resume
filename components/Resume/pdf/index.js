'use client';

import Format1Resume from './Format1';
import Format2Resume from './Format2';
import Format3Resume from './Format3';

const Resume = ({ data }) => {
    const template = data?.meta?.template || 'format1';

    if (template === 'format3') {
        return <Format3Resume data={data} />;
    }

    if (template === 'format2') {
        return <Format2Resume data={data} />;
    }

    return <Format1Resume data={data} />;
};

export default Resume;
