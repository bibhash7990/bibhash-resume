'use client';

import ResumeFields from '@/config/ResumeFields';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectActiveResume } from '@/store/slices/resumeSlice';


import { useState, useEffect } from 'react';

const Tabs = ({ activeTab }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const activeResume = useSelector(selectActiveResume);
    const template = mounted ? (activeResume?.meta?.template || 'format1') : 'format1';

    let tabs = Object.keys(ResumeFields);
    if (template === 'format2' || template === 'format3') {
        tabs = tabs.filter(tab => tab !== 'certificates' && tab !== 'languages');
    }

    return (
        <div className="flex w-full gap-2 overflow-y-auto md:gap-3">
            {tabs.map(tab => (
                <Link
                    key={tab}
                    className={`tabs relative cursor-pointer rounded-md px-4 py-1.5 text-sm capitalize md:text-base 2xl:text-lg ${activeTab === tab ? 'bg-primary-400 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
                    href={`/editor/?tab=${tab}`}
                >
                    {tab}
                </Link>
            ))}
        </div>
    );
};

export default Tabs;

