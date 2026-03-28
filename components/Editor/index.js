'use client';

import ResumeFields from '@/config/ResumeFields';
import { FaSave } from 'react-icons/fa';
import SingleEditor from './SingleEditor';
import MultiEditor from './MultiEditor';
import { useDispatch } from 'react-redux';
import { resetResumeToDefaults, saveResume } from '@/store/slices/resumeSlice';
import { useEffect } from 'react';

const Editor = ({ tab }) => {
    const { multiple } = ResumeFields[tab];
    const dispatch = useDispatch();

    const save = e => {
        e?.preventDefault();
        dispatch(saveResume());
    };

    const resetToTemplate = () => {
        if (
            !confirm(
                'Reset the entire resume to the built-in template? This replaces all sections with default content and cannot be undone.',
            )
        ) {
            return;
        }
        dispatch(resetResumeToDefaults());
    };

    useEffect(() => {
        const interval = setInterval(save, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <form onSubmit={save} className="card my-8">
                {multiple && <MultiEditor tab={tab} />}
                {!multiple && <SingleEditor tab={tab} />}

                <div className="ml-auto mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={resetToTemplate}
                        className="btn w-full px-6 text-center sm:w-auto"
                    >
                        Reset to template
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
