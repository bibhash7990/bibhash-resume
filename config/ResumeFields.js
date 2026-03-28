export default {
    contact: {
        name: 'Contact',
        name: 'Contact',
        fields: [
            { name: 'name', label: 'Full Name', placeholder: 'John Doe', required: true },
            { name: 'title', label: 'Your Job Title', placeholder: 'Software Developer' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'john.doe@example.com' },
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1234567890' },
            // { name: 'address', label: 'Address', placeholder: '123 Street, City, Country' },
            { name: 'linkedin', label: 'Linked', placeholder: 'linkedin.com/in/johndoe' },
            { name: 'github', label: 'Github', placeholder: 'github.com/johndoe' },
            { name: 'blogs', label: 'Blogs', placeholder: 'github.com/johndoe' },
            { name: 'twitter', label: 'Twitter', placeholder: 'github.com/johndoe' },
            { name: 'portfolio', label: 'Portfolio', placeholder: 'johndoe.com' },
        ],
    },
    summary: {
        name: 'Summary',
        fields: [
            {
                name: 'summary',
                label: 'Summary',
                type: 'textarea',
                placeholder: 'Brief summary of your skills and experience...',
                span: true,
                rows: 5,
            },
        ],
    },
    education: {
        name: 'Education',
        multiple: true,
        fields: [
            { name: 'degree', label: 'Study Program', placeholder: 'Bachelor of Computer Science' },
            { name: 'institution', label: 'Institution', placeholder: 'University Name' },
            { name: 'start', label: 'Start Date', type: 'month', placeholder: 'MM/YYYY' },
            { name: 'end', label: 'End Date', type: 'month', placeholder: 'MM/YYYY' },
            { name: 'location', label: 'Location', placeholder: 'City, Country' },
            { name: 'gpa', label: 'GPA', placeholder: '3.8/4.0' },
            {
                name: 'note',
                label: 'Note (optional — e.g. career pivot context for ATS)',
                type: 'textarea',
                placeholder: 'Short context for recruiters (shown under this degree on the PDF)...',
                span: true,
                rows: 2,
            },
        ],
    },

    experience: {
        name: 'Experience',
        multiple: true,
        fields: [
            { name: 'role', label: 'Title / Position', span: true, placeholder: 'Software Engineer' },
            { name: 'company', label: 'Workplace / Company', placeholder: 'Company Name' },
            { name: 'location', label: 'Location', placeholder: 'City, Country' },
            { name: 'start', label: 'Start Date', type: 'month', placeholder: 'MM/DD/YYYY' },
            { name: 'end', label: 'End Date', type: 'month', placeholder: 'MM/DD/YYYY' },
            {
                name: 'description',
                label: 'Responsibility',
                type: 'textarea',
                placeholder: 'Brief description of your responsibilities...',
                span: true,
                rows: 4,
                multipoints: true,
            },
        ],
    },

    projects: {
        name: 'Projects',
        multiple: true,
        fields: [
            { name: 'title', label: 'Project Title', placeholder: 'Project Name' },
            { name: 'url', label: 'Project Url', placeholder: 'https://example.com/project' },
            {
                name: 'start',
                label: 'Start Date',
                type: 'month',
                placeholder: 'MM/DD/YYYY',
            },
            {
                name: 'end',
                label: 'End Date',
                type: 'month',
                placeholder: 'MM/DD/YYYY',
            },
            {
                name: 'description',
                label: 'Now Describe What you did',
                type: 'textarea',
                placeholder: 'Briefly describe your project...',
                span: true,
                multipoints: true,
            },
        ],
    },

    skills: {
        name: 'Skills',
        fields: [
            {
                name: 'skills',
                label: 'Skills (stack & practices)',
                type: 'textarea',
                placeholder:
                    'One line per category, e.g.\nLanguages: TypeScript, JavaScript\nFrontend: React, Vite, Tailwind\n…',
                span: true,
                rows: 10,
            },
        ],
    },

    tools: {
        name: 'Tools',
        fields: [
            {
                name: 'tools',
                label: 'Tools / software (desktop & workflow)',
                type: 'textarea',
                placeholder:
                    'One line per category, e.g.\nDesign: Figma\nEditors: VS Code, Cursor\n…',
                span: true,
                rows: 8,
            },
        ],
    },

    certificates: {
        name: 'Certificates',
        multiple: true,
        fields: [
            { name: 'title', label: 'Certificate Title', placeholder: 'Certificate Name', span: true },
            { name: 'issuer', label: 'Issuing Organization', placeholder: 'Organization Name' },
            { name: 'date', label: 'Issuance Date', type: 'month', placeholder: 'MM/DD/YYYY' },
        ],
    },

    languages: {
        name: 'Languages',
        multiple: true,
        fields: [
            { name: 'language', label: 'Language', placeholder: 'Language Name' },
            {
                name: 'proficiency',
                label: 'Proficiency',
                placeholder: 'e.g., Fluent, Intermediate, Beginner',
                type: 'select',
                options: [
                    {
                        value: 'Elementary Proficiency',
                    },
                    {
                        value: 'Limited Working Proficiency',
                    },
                    {
                        value: 'Professional Working Proficiency',
                    },
                    {
                        value: 'Full Professional Proficiency',
                    },
                    {
                        value: 'Native or Bilingual Proficiency',
                    },
                ],
            },
        ],
    },
};
