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
    { id: 1, name: '10th Pass Govt Job', link: '/10th-pass-govt-jobs' },
    { id: 2, name: '12th Pass Govt Job', link: '/12th-pass-govt-jobs' },
    { id: 3, name: 'Graduation Jobs', link: '/graduate-jobs' },
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
    { id: 1, title: 'Sarkari Results 10+2 Latest Job', content: 'Stay updated with the latest government job notifications for 10+2 (12th pass) candidates. Find various opportunities across central and state government departments.' },
    { id: 2, title: 'Sarkari Results', content: 'SabhiJob is a popular website that provides the latest information about Sarkari Result, government jobs, and competitive exam results.' }
];

// Sarkari Result Info Section with FAQs
export const sarkariResultInfo = {
    title: 'Sarkari Result Info',
    intro: 'SabhiJob Info provides comprehensive information about all government job results, admit cards, answer keys, and recruitment notifications.',
    disclaimer: 'Please note: While we strive to provide accurate information, candidates are advised to always verify details from the official websites.',
    faqs: [
        { question: 'Q 1. What is Sarkari Result 2026?', answer: 'Ans. SabhiJob (Sarkari Result) is a leading online platform that provides comprehensive information about Government Jobs.' },
        { question: 'Q 2. Why is SabhiJob.com better than others?', answer: 'Ans. SabhiJob.com stands out because of its user-friendly interface and timely updates.' }
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
        { name: '10th Pass', link: '/10th-pass-govt-jobs' },
        { name: '12th Pass', link: '/12th-pass-govt-jobs' },
        { name: 'Graduation', link: '/graduate-jobs' },
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
