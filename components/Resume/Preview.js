'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Resume from './pdf';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveResume, updateResumeValue } from '@/store/slices/resumeSlice';
import { CgSpinner } from 'react-icons/cg';

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaEye } from 'react-icons/fa6';

const Loader = () => (
    <div className="flex min-h-96 w-full items-center justify-center">
        <CgSpinner className="mx-auto mt-16 animate-spin text-center text-4xl text-primary-400 md:text-5xl" />
    </div>
);

const preview = url => {
    window.open(
        url,
        'Resume Preview',
        `toolbar=no, location=no, menubar=no, scrollbars=no, status=no, titlebar=no, resizable=no, width=600, height=800, left=${window.innerWidth / 2 - 300}, top=100`,
    );
};

/**
 * PDF preview + usePDF only run in the browser after mount.
 * Keeps @react-pdf/renderer off the Node/RSC path and avoids an extra dynamic() chunk.
 */
function ResumePdfViewer() {
    const parentRef = useRef(null);
    const resumeData = useSelector(selectActiveResume);
    const activeProfileId = useSelector(state => state.resume.activeProfileId);
    const dispatch = useDispatch();

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    }, []);

    const data = useMemo(() => ({ ...resumeData }), [resumeData]);

    const document = useMemo(() => <Resume data={data} />, [data]);
    const [instance, updateInstance] = usePDF({ document });

    useEffect(() => {
        updateInstance(document);
    }, [document, updateInstance]);

    const template = resumeData?.meta?.template || 'format1';

    const handleTemplateChange = val => {
        dispatch(
            updateResumeValue({
                tab: 'meta',
                name: 'template',
                value: val,
            })
        );
    };

    return (
        <div key={activeProfileId} ref={parentRef} className="relative w-full md:max-w-[24rem] 2xl:max-w-[28rem]">
            {/* Template Switcher */}
            <div className="mb-4 flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800/80 p-3 shadow-md backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Layout Format</span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleTemplateChange('format1')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-all duration-200 ${
                            template === 'format1'
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 ring-1 ring-primary-400'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        Format 1 (Classic)
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTemplateChange('format2')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-all duration-200 ${
                            template === 'format2'
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 ring-1 ring-primary-400'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        Format 2 (One-page)
                    </button>
                </div>
            </div>

            {instance.loading ?
                <Loader />
            :   <Document loading={<Loader />} file={instance.url}>
                    <Page
                        pageNumber={1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={<Loader />}
                        width={parentRef.current?.clientWidth}
                    />
                </Document>
            }

            {!instance.loading && (
                <div className="mt-4 flex justify-around">
                    <button type="button" onClick={() => preview(instance.url)} className="btn text-sm">
                        <span>Preview</span>
                        <FaEye />
                    </button>
                    <a
                        href={instance.url}
                        download={`${resumeData.contact?.name || 'resume'}.pdf`}
                        className="btn text-sm"
                    >
                        <span>Download</span>
                        <FaDownload />
                    </a>
                </div>
            )}
        </div>
    );
}

export default function Preview() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="relative flex min-h-96 w-full items-center justify-center md:max-w-[24rem] 2xl:max-w-[28rem]">
                <Loader />
            </div>
        );
    }

    return <ResumePdfViewer />;
}

