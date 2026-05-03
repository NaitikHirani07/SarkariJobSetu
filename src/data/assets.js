// Image paths (public directory - no bundler imports needed in Next.js)
const GovtJobs = 'https://res.cloudinary.com/dy4utoupn/image/upload/q_auto/f_auto/v1777568995/Railway_Jobs_efby50.webp';
const RailwayJobs = '/images/Railway_Jobs.png';
const BankJobs = '/images/Bank_Jobs.png';
const SSCJobs = '/images/Clerical_Jobs.png'; 
const Logo = '/images/cropped-sabhijobs.png';
const LogoWebp = '/images/cropped-sabhijobs.webp';

// Categories data
export const categories = [
    { id: 1, name: 'LATEST JOBS', icon: GovtJobs, link: '/latest-jobs' },
    { id: 2, name: 'RAILWAY JOBS', icon: RailwayJobs, link: '/railway-jobs' },
    { id: 3, name: 'BANK JOBS', icon: BankJobs, link: '/bank-jobs' },
    { id: 4, name: 'SSC JOBS', icon: SSCJobs, link: '/ssc-jobs' },
    { id: 5, name: 'GUJARAT JOBS', icon: GovtJobs, link: '/gujarat-jobs' },
];

// Education Wise Govt Vacancies data
export const educationVacancies = [
    { id: 1, name: '10th Pass Govt Job', link: '/10th-pass-jobs' },
    { id: 2, name: '12th Pass Govt Job', link: '/12th-pass-jobs' },
    { id: 3, name: 'Graduation Jobs', link: '/any-graduate-jobs' },
    { id: 4, name: 'Post Graduation Jobs', link: '/post-graduate-jobs' },
];

// Navbar Menu Items data
export const navbarMenuItems = [
    { id: 1, name: 'Latest Jobs', link: '/latest-jobs', category: 'Govt Jobs' },
    { id: 2, name: 'Railway Jobs', link: '/railway-jobs', category: 'Govt Jobs' },
    { id: 3, name: 'Bank Jobs', link: '/bank-jobs', category: 'Govt Jobs' },
    { id: 4, name: 'SSC Jobs', link: '/ssc-jobs', category: 'Govt Jobs' },
    { id: 5, name: 'Gujarat Jobs', link: '/gujarat-jobs', category: 'State Jobs' },
];

// Post Wise Recruitment List data
export const postWiseRecruitment = [];

// Sarkari Result Info Sections Data
export const sarkariResultSections = [
    { 
        id: 1, 
        title: 'Latest Government Jobs 2026 – SarkariJobSetu', 
        content: 'Welcome to the Latest Government Jobs section of SarkariJobSetu. Here you will find all the newest Sarkari job notifications released by Central and State Government departments across India. We update this page daily to ensure you never miss any important opportunity.',
        listItems: [
            'Latest Govt Job Notifications',
            'Online Application Forms',
            'Eligibility Criteria & Age Limit',
            'Important Dates & Deadlines',
            'Admit Card & Exam Updates'
        ]
    },
    { 
        id: 2, 
        title: 'SSC Jobs 2026 – SarkariJobSetu', 
        content: 'Explore all SSC (Staff Selection Commission) Jobs including SSC CGL, CHSL, MTS, GD, and other recruitments. Stay updated with every SSC notification in one place.',
        listItems: [
            'SSC New Vacancies',
            'SSC Exam Dates',
            'SSC Admit Cards',
            'SSC Results & Cut-Off'
        ]
    },
    { 
        id: 3, 
        title: 'Bank Jobs 2026 – SarkariJobSetu', 
        content: 'Find the latest updates for Banking Jobs such as IBPS, SBI, RBI, and other public sector banks.',
        listItems: [
            'Clerk & PO Jobs',
            'Specialist Officer (SO) Jobs',
            'Bank Exam Notifications',
            'Results & Interview Updates'
        ]
    },
    { 
        id: 4, 
        title: 'Gujarat Government Jobs 2026 – SarkariJobSetu', 
        content: 'Get all the latest Gujarat Govt Jobs updates including state-level recruitments and district-level vacancies. Perfect for candidates looking for jobs in Gujarat.',
        listItems: [
            'GPSC Jobs',
            'Gujarat Police Jobs',
            'GSRTC & Government Department Jobs',
            'State Board Results & Notifications'
        ]
    },
    { 
        id: 5, 
        title: 'Railway Jobs 2026 – SarkariJobSetu', 
        content: 'Check the latest Railway Recruitment (RRB Jobs) updates across India. We provide fast and accurate updates for all railway vacancies.',
        listItems: [
            'RRB NTPC Jobs',
            'Group D Recruitment',
            'Railway Apprentice Jobs',
            'Exam Dates & Admit Cards'
        ]
    }
];

// Sarkari Result Info Section with FAQs
export const sarkariResultInfo = {
    title: '⚠️ Important Note',
    intro: 'SarkariJobSetu is not a government website. All information is collected from official sources.',
    disclaimer: 'Candidates are advised to verify details from the official website before applying.',
    faqs: [
        { question: 'Is SarkariJobSetu a government website?', answer: 'Ans. No, SarkariJobSetu is an independent platform that collects and shares information from various official government sources for user convenience.' },
        { question: 'How often is the information updated?', answer: 'Ans. We update our platform daily to ensure you get the latest government job alerts, admit cards, and results as soon as they are announced.' }
    ]
};

// Sidebar Data
export const sidebarData = {
    jobVacancies: [
        { name: 'Latest Jobs', link: '/latest-jobs' },
        { name: 'Railway Jobs', link: '/railway-jobs' },
        { name: 'Bank Jobs', link: '/bank-jobs' },
        { name: 'SSC Jobs', link: '/ssc-jobs' },
        { name: 'Gujarat Jobs', link: '/gujarat-jobs' },
    ],
    postWiseVacancy: [],
    stateWiseJobs: [],
    recruitmentByCategory: [],
    listByQualification: [
        { name: '10th Pass', link: '/10th-pass-jobs' },
        { name: '12th Pass', link: '/12th-pass-jobs' },
        { name: 'Graduation', link: '/any-graduate-jobs' },
        { name: 'Post Graduation', link: '/post-graduate-jobs' },
    ]
};

// All searchable items combined
export const allSearchableItems = [
    ...categories.map(item => ({ ...item, type: 'category' })),
    ...educationVacancies.map(item => ({ ...item, type: 'education' })),
    ...navbarMenuItems.map(item => ({ ...item, type: 'menu' })),
];

// Export individual images
export const images = {
    GovtJobs,
    RailwayJobs,
    BankJobs,
    SSCJobs,
    Logo,
    LogoWebp,
};

export default {
    categories,
    educationVacancies,
    navbarMenuItems,
    allSearchableItems,
    images,
};
