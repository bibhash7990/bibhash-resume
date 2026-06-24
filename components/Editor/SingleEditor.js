'use client';

import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import { updateResumeValue, selectActiveTab } from '@/store/slices/resumeSlice';
import ResumeFields from '@/config/ResumeFields';

const SingleEditor = ({ tab }) => {
    const { fields } = ResumeFields[tab];

    const dispatch = useDispatch();
    const resumeData = useSelector(selectActiveTab(tab));

    const handleChange = e => {
        const { name, value } = e.target;

        dispatch(
            updateResumeValue({
                tab,
                name,
                value,
            }),
        );
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 md:gap-x-8">
            {fields.map(field => (
                <Input key={field.name} {...field} onChange={handleChange} value={resumeData?.[field?.name]} />
            ))}
        </div>
    );
};

export default SingleEditor;
