'use client';

import { pdfjs } from 'react-pdf';

/**
 * Pulls the text layer out of a rendered PDF the same way an ATS would.
 *
 * Text items are grouped into lines by their y coordinate, and the y order is
 * kept so the caller can detect column layouts that scramble on extraction.
 * Hyperlink annotations are returned separately — deliberately NOT merged into
 * the text, because most parsers never see them.
 *
 * @param {Blob} blob rendered PDF
 */
export default async function extractPdfText(blob) {
    if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    }

    const buffer = await blob.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;

    const pages = [];
    const annotationUrls = [];

    for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const content = await page.getTextContent();

        try {
            const annots = await page.getAnnotations();
            annots.forEach(a => a.url && annotationUrls.push(a.url));
        } catch {
            // Annotations are a nice-to-have for diagnostics; ignore failures.
        }

        const lines = [];
        const yOrder = [];
        let line = '';
        let lastY = null;

        for (const item of content.items) {
            const y = Math.round(item.transform[5]);
            if (lastY !== null && Math.abs(y - lastY) > 1.5) {
                lines.push(line);
                yOrder.push(lastY);
                line = '';
            }
            line += item.str;
            lastY = y;
        }
        if (line) {
            lines.push(line);
            yOrder.push(lastY);
        }

        pages.push({ lines, yOrder });
    }

    return {
        numPages: doc.numPages,
        pages,
        text: pages.map(p => p.lines.join('\n')).join('\n'),
        annotationUrls,
    };
}
