import { createSlice } from '@reduxjs/toolkit';

const defaultResume = {
    contact: {
        name: 'Bibhash lenka',
        email: 'bibhash.reactjsdev@gmail.com',
        phone: '7990721091',
        // address: '68 a shiv vatika near nansad gav kamrej surat',
        title: 'Frontend Developer',
        linkedin: 'https://www.linkedin.com/in/bibhash-dev/',
        github: 'https://github.com/bibhash7990',
        portfolio: 'https://bibhash-lenka.netlify.app/',
    },
    summary: {
        summary:
            'I am a React.js Developer with 1.6 years of experience in designing and developing responsive web applications. Proficient in HTML,\nCSS, JavaScript, and React.js, I specialize in building user-friendly interfaces and optimizing performance. I excel in integrating APIs,\ndebugging issues, and collaborating in agile teams to deliver high-quality solutions. Passionate about learning new technologies, I aim\nto create innovative and impactful applications.',
    },
    education: [
        {
            degree: 'Bachelor of Engineering in Chemical Engineering',
            institution: 'Prime institute of engineering and technology',
            start: '2016-06',
            end: '2020-08',
            location: 'Navsari, Gujarat',
            gpa: '9.1/10',
        },
        {
            degree: 'Higher secondary certificate',
            institution: 'Gyan jyot vidyalaya',
            start: '2014-06',
            end: '2016-08',
            location: 'Surat, Gujarat',
        },
        {
            degree: 'Secondary school certificate',
            institution: 'Adarsh hindi vidyalaya',
            start: '2013-06',
            end: '2014-06',
            location: 'Surat, Gujarat',
        },
    ],
    experience: [
        {
            role: 'Jr. Software Developer',
            company: 'Sourcecube Technology Pvt. Ltd.',
            location: 'Surat, Gujarat',
            start: '2023-11',
            end: '2025-06',
            description:
                'Designed, developed, and maintained responsive web applications using React.js, ensuring seamless integration with RESTful APIs.\nOptimized application performance, adhered to best practices, and conducted thorough testing to deliver high-quality solutions.\nCollaborated within Agile teams, managed state using Redux, and actively participated in code reviews to enhance overall code quality and user experience.',
        },
        {
            role: 'Jr Software developer Trainee',
            company: '3Elixir software solution',
            location: 'Surat, Gujarat',
            start: '2023-09',
            end: '2023-10',
            description:
                'Acquired foundational knowledge of React.js, Git workflows, and best practices for organizing and structuring project folders.\nStrengthened skills in HTML, CSS, and JavaScript by building interactive and visually appealing user interfaces.',
        },
        {
            role: 'Production Officer/Executive',
            company: 'Sun Pharma, Lupin Industries Ltd.',
            location: 'Ankleswar, Gujarat',
            start: '2020-11',
            end: '2023-05',
            description:
                'Supervised large-scale chemical production, ensuring safety, quality, and schedule adherence while optimizing efficiency and resolving issues. Led teams, maintained documentation, and drove improvements to exceed targets.',
        },
    ],
    projects: [
        {
            title: 'SANAD-HUB',
            url: 'https://sanadhub-frontend.netlify.app/login',
            description:
                'Built an invoice management platform with multi-language support (Arabic and English).\nDesigned a user-friendly UI using JOY UI, enabling admins to customize templates and manage financial data efficiently.',
        },
        {
            title: 'Unode',
            url: 'https://unode.unification.io/',
            description:
                'Contributed to a decentralized Web3 platform offering private and scalable RPC services.\nIntegrated MetaMask login, NowPayments, and Superfluid payment systems to enhance blockchain capabilities.\nBuilt responsive UI components using React.js, ensuring a seamless user experience across devices.',
        },
        {
            title: 'Xplorx',
            url: 'https://cloud.xplorx.app/',
            description:
                'Developed a platform for deploying web services like Docker images, GitHub repositories, and PostgreSQL databases.\nImplemented features like live URLs, log monitoring, and custom domains to streamline workflows.\nLeveraged React.js and GitHub API integration to deliver a seamless user experience.',
        },
        {
            title: 'DBLYSER',
            url: 'https://dba-fe-xxxvii-ptbu.onxplorx.app/',
            description:
                'Developed an AI-powered platform to optimize PostgreSQL database performance with real-time monitoring, schema analysis, and query optimization.\nImplemented intelligent insights and actionable recommendations to identify and resolve performance bottlenecks efficiently.\nEnsured data security through encrypted credentials while delivering a user-friendly interface for database administrators and developers.',
        },
        {
            title: 'Book-My-Band',
            url: 'https://bookmyband.live',
            description:
                'Created a dual-panel platform for bands and fans, with features like profile creation, gig updates, and fan engagement.\nIntegrated Razorpay for secure payment processing and enhanced user interaction.',
        },
    ],
    skills: {
        skills: 'React.js, JavaScript, HTML5, CSS3, JSX, ES6+, Styled Components, SASS, Bootstrap, Material UI, Joy UI, Chakra UI, Tailwind CSS, Responsive Web Design, Cross-browser Compatibility, REST APIs, Git, GitHub, NPM/Yarn, Agile Methodology, UI/UX Design, Version Control, Deployment (Vercel, Netlify, Railway), and Web Performance Optimization.',
    },
    tools: {},
    certificates: [
        {
            title: 'Dedicated Employee',
            date: '2020-11',
        },
        {
            title: 'Rising Start of the Month',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-01',
        },
        {
            title: 'Quarter of the year',
            issuer: 'Sourcecube Technology Pvt. Ltd.',
            date: '2024-06',
        },
    ],
    languages: [
        {
            language: 'English',
            proficiency: 'Professional Working Proficiency',
        },
        {
            language: 'Hindi',
            proficiency: 'Full Professional Proficiency',
        },
        {
            language: 'Oriya',
            proficiency: 'Native or Bilingual Proficiency',
        },
        {
            language: 'Gujarati',
            proficiency: 'Full Professional Proficiency',
        },
    ],
    saved: true,
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState: defaultResume,
    reducers: {
        updateResumeValue: (state, action) => {
            const { tab, name, value, index } = action.payload;
            if (index != null) {
                state[tab][index][name] = value;
            } else {
                state[tab][name] = value;
            }

            state.saved = false;
        },

        addNewIndex: (state, action) => {
            const { tab, name, value } = action.payload;
            state[tab].push({});
            // state[tab].push({ [name]: [value] });
            state.saved = false;
        },

        deleteIndex: (state, action) => {
            const { index, tab } = action.payload;
            console.log('deleting', index, 'from', tab);
            state[tab].splice(index, 1);
            state.saved = false;
        },

        // for move index
        moveIndex: (state, action) => {
            const { index, tab, dir } = action.payload;

            const newIndex = dir === 'up' ? index - 1 : index + 1;

            const temp = state[tab][index];
            state[tab][index] = state[tab][newIndex];
            state[tab][newIndex] = temp;
            state.saved = false;
        },

        saveResume: state => {
            state.saved = true;
        },
    },
});

export const { updateResumeValue, addNewIndex, deleteIndex, saveResume, moveIndex } = resumeSlice.actions;
export default resumeSlice.reducer;
