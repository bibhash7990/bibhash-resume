'use client';

import ResumeFields from '@/config/ResumeFields';
import { FaSave } from 'react-icons/fa';
import SingleEditor from './SingleEditor';
import MultiEditor from './MultiEditor';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile, resetProfileToDefaults, saveResume } from '@/store/slices/resumeSlice';
import { useEffect, useMemo, useState } from 'react';

const TEMPLATE_IDS = ['profile-4-5-years', 'profile-2-5-years', 'profile-talleflow-25yr'];

const Editor = ({ tab }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { multiple } = ResumeFields[tab];
    const dispatch = useDispatch();
    const activeProfileId = useSelector(state => state.resume.activeProfileId);
    const activeProfile = useSelector(state => state.resume.profiles[state.resume.activeProfileId]);

    const isTemplateProfile = useMemo(() => TEMPLATE_IDS.includes(activeProfileId), [activeProfileId]);

    const save = e => {
        e?.preventDefault();
        dispatch(saveResume());
    };

    const resetToTemplate = () => {
        if (isTemplateProfile) {
            if (
                !confirm(
                    'Reset this template resume to its original content? All your edits will be lost and cannot be undone.',
                )
            ) {
                return;
            }
            dispatch(resetProfileToDefaults(activeProfileId));
        } else {
            if (
                !confirm(
                    'Clear all data from this resume? This will leave it blank.\n\nTip: Use "Duplicate" if you want a fresh copy of a template instead.',
                )
            ) {
                return;
            }
            dispatch(clearProfile(activeProfileId));
        }
    };

    useEffect(() => {
        const interval = setInterval(save, 10000);
        return () => clearInterval(interval);
    }, []);

    const template = mounted ? (activeProfile?.meta?.template || 'format1') : 'format1';

    return (
        <>
            {(template === 'format2' || template === 'format3') && (
                <div className="mb-4 rounded-lg border border-teal-800 bg-teal-950/40 p-3.5 text-sm text-teal-200 shadow-md">
                    <span className="font-semibold">{template === 'format2' ? 'Format 2' : 'Format 3'} ({template === 'format2' ? 'One-page layout' : 'One-page merged layout'}) is active:</span> Technical Skills and Software Tools are combined in the PDF. Projects are automatically nested under their respective companies (Techfidants or Sourcecube) in the Professional Experience section. Certificates and Languages are hidden in this layout.
                </div>
            )}
            <form onSubmit={save} className="card my-8">
                {multiple && <MultiEditor tab={tab} />}
                {!multiple && <SingleEditor tab={tab} />}

                <div className="ml-auto mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={resetToTemplate}
                        className="btn w-full px-6 text-center sm:w-auto"
                    >
                        {isTemplateProfile ? 'Reset to template' : 'Clear all data'}
                    </button>
                    <button type="submit" className="btn-filled w-full gap-2 px-6 text-center sm:w-auto">
                        <span>Save</span> <FaSave />
                    </button>
                </div>
            </form>
        </>
    );
};

export default Editor;

