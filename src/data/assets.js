// Image paths (public directory - no bundler imports needed in Next.js)
const GovtJobs = '/images/Govt-Jobs.png';
const RailwayJobs = '/images/Railway_Jobs.png';
const BankJobs = '/images/Bank_Jobs.png';
const PostalJobs = '/images/Postal_Jobs.png';
const JudicialJobs = '/images/Judicial_Jobs.png';
const TeachingJobs = '/images/Teaching_Faculty.png';
const EngineeringJobs = '/images/Engineering_Jobs.png';
const ClericalJobs = '/images/Clerical_Jobs.png';
const MedicalJobs = '/images/Medical_Biotech.png';
const Logo = '/images/cropped-sabhijobs.png';
const LogoWebp = '/images/cropped-sabhijobs.webp';

// Categories data
export const categories = [
    { id: 1, name: 'GOVT JOBS', icon: GovtJobs, link: '/govt-jobs' },
    { id: 2, name: 'RAILWAY JOBS', icon: RailwayJobs, link: '/railway-jobs' },
    { id: 3, name: 'BANK JOBS', icon: BankJobs, link: '/bank-jobs' },
    { id: 4, name: 'DEFENCE JOBS', icon: null, link: '/defence-jobs', useEmoji: true },
    { id: 5, name: 'POSTAL JOBS', icon: PostalJobs, link: '/postal-jobs' },
    { id: 6, name: 'JUDICIAL JOBS', icon: JudicialJobs, link: '/judicial-jobs' },
    { id: 7, name: 'TEACHING JOBS', icon: TeachingJobs, link: '/teaching-jobs' },
    { id: 8, name: 'ENGINEERING', icon: EngineeringJobs, link: '/engineering-jobs' },
    { id: 9, name: 'CLERICAL JOBS', icon: ClericalJobs, link: '/clerical-jobs' },
    { id: 10, name: 'MEDICAL JOBS', icon: MedicalJobs, link: '/medical-jobs' },
];

// Education Wise Govt Vacancies data
export const educationVacancies = [
    { id: 1, name: '10th Pass Govt Job', link: '/10th-pass-govt-jobs' },
    { id: 2, name: '12th Pass Govt Job', link: '/12th-pass-govt-jobs' },
    { id: 3, name: 'ITI Govt Jobs', link: '/iti-govt-jobs' },
    { id: 4, name: 'Diploma Govt Jobs', link: '/diploma-govt-jobs' },
    { id: 5, name: 'Any Graduate Jobs', link: '/graduate-jobs' },
    { id: 6, name: 'Post Graduate Jobs', link: '/post-graduate-jobs' },
    { id: 7, name: 'B.Tech Jobs', link: '/btech-jobs' },
    { id: 8, name: 'M.Tech Govt Jobs', link: '/mtech-jobs' },
    { id: 9, name: 'BCA Govt Jobs', link: '/bca-govt-jobs' },
    { id: 10, name: 'B.Sc Govt Jobs', link: '/bsc-govt-jobs' },
    { id: 11, name: 'MBA Govt Jobs', link: '/mba-govt-jobs' },
    { id: 12, name: 'MBBS Govt Jobs', link: '/mbbs-govt-jobs' },
];

// Navbar Menu Items data
export const navbarMenuItems = [
    { id: 1, name: 'Railway Jobs', link: '/railway-jobs', category: 'Govt Jobs' },
    { id: 2, name: 'Bank Jobs', link: '/bank-jobs', category: 'Govt Jobs' },
    { id: 3, name: 'Defence Jobs', link: '/defence-jobs', category: 'Govt Jobs' },
    { id: 4, name: 'Police Jobs', link: '/police-jobs', category: 'Govt Jobs' },
    { id: 5, name: 'Teaching Jobs', link: '/teaching-jobs', category: 'Govt Jobs' },
    { id: 6, name: 'Sarkari Result', link: '/sarkari-result', category: 'Results' },
    { id: 7, name: 'Central Govt Jobs', link: '/central-govt-jobs', category: 'Govt Jobs' },
];

// Post Wise Recruitment List data
export const postWiseRecruitment = [
    { id: 1, name: 'Clerk Vacancy', link: '/clerk-vacancy' },
    { id: 2, name: 'Driver Vacancy', link: '/driver-vacancy' },
    { id: 3, name: 'Technician Vacancy', link: '/technician-vacancy' },
    { id: 4, name: 'Apprentices Vacancy', link: '/apprentices-vacancy' },
    { id: 5, name: 'Data Entry Vacancy', link: '/data-entry-vacancy' },
    { id: 6, name: 'Steno Vacancy', link: '/steno-vacancy' },
    { id: 7, name: 'Staff Nurse Vacancy', link: '/staff-nurse-vacancy' },
    { id: 8, name: 'Office Assistant Vacancy', link: '/office-assistant-vacancy' },
    { id: 9, name: 'Typist Vacancy', link: '/typist-vacancy' },
    { id: 10, name: 'Peon Vacancy', link: '/peon-vacancy' },
    { id: 11, name: 'Electrician Vacancy', link: '/electrician-vacancy' },
    { id: 12, name: 'Store Keeper Vacancy', link: '/store-keeper-vacancy' },
];

// Sarkari Result Info Sections Data
export const sarkariResultSections = [
    { id: 1, title: 'Sarkari Results 10+2 Latest Job', content: 'Stay updated with the latest government job notifications for 10+2 (12th pass) candidates. Find various opportunities across central and state government departments. We provide accurate and timely information about upcoming vacancies, application deadlines, and exam schedules.' },
    { id: 2, title: 'Sarkari Results', content: 'SabhiJob is a popular website that provides the latest information about Sarkari Result, government jobs, and competitive exam results. We cover all major recruitment boards including SSC, UPSC, Railway, Banking, Defence, and State-level examinations. Our team works round the clock to bring you the most accurate and up-to-date information.' },
    { id: 3, title: 'Sarkari Job on SabhiJob', content: 'All the candidates who are searching for Sarkari Naukri can find all the details here. We cover recruitments from various government organizations including:', listItems: ['I. ITBP, BSF, CRPF, SSB, CISF, NSG and other paramilitary forces', 'II. SBI, IBPS, RBI and other banking organizations', 'III. SSC CGL, CHSL, MTS, GD Constable and other SSC examinations', 'IV. UPSC Civil Services, CDS, NDA, CAPF and other UPSC exams', 'V. Railway RRB NTPC, Group D, ALP, JE and other railway recruitments'] },
    { id: 4, title: 'Sarkari Result Hindi', content: 'SabhiJob Hindi section provides all government job information in Hindi language for the convenience of Hindi-speaking candidates. सभी सरकारी नौकरी की जानकारी हिंदी में उपलब्ध है।' },
    { id: 5, title: 'Sarkari Result UP', content: 'Uttar Pradesh government job seekers can find all UP state government vacancies here. We cover UPPSC, UPSSSC, UP Police, UP Board, and other UP state recruitment notifications.' },
    { id: 6, title: 'Sarkari Result Bihar', content: 'You can find all Bihar government job notifications including BPSC, BSSC, Bihar Police, Bihar Board results and other Bihar state recruitment updates on SabhiJob.' }
];

// Sarkari Result Info Section with FAQs
export const sarkariResultInfo = {
    title: 'Sarkari Result Info',
    intro: 'SabhiJob Info provides comprehensive information about all government job results, admit cards, answer keys, and recruitment notifications. We are committed to providing accurate and timely information to help job seekers stay updated with the latest government job opportunities across India.',
    disclaimer: 'Please note: While we strive to provide accurate information, candidates are advised to always verify details from the official websites of the respective recruitment organizations before making any decisions.',
    faqs: [
        { question: 'Q 1. What is Sarkari Result 2026?', answer: 'Ans. SabhiJob (Sarkari Result) is a leading online platform that provides comprehensive information about Government Jobs, competitive exam results, admit cards, and answer keys. It covers all major government recruitment organizations across India.' },
        { question: 'Q 2. Why is SabhiJob.com better than others?', answer: 'Ans. SabhiJob.com stands out because of its user-friendly interface, timely updates, accurate information, and comprehensive coverage of all Government Jobs across central and state levels. We verify all information before publishing.' },
        { question: 'Q 3. How to Check Sarkari Result 2026 for Government Jobs?', answer: 'Ans. Kindly visit SabhiJob.com and navigate to the Sarkari Result section. You can search for specific Government Jobs results using the search bar or browse through categories.' },
        { question: 'Q 4. Does the Sarkari Result Information update on a daily basis?', answer: 'Ans. Yes, our team updates the Sarkari Result information on a daily basis. We monitor all major recruitment websites and Government Jobs portals to bring you the latest updates as soon as they are released.' }
    ]
};

// Sidebar Data
export const sidebarData = {
    jobVacancies: [
        { name: 'Railway Jobs', link: '/railway-jobs' },
        { name: 'Bank Jobs', link: '/bank-jobs' },
        { name: 'Defence Jobs', link: '/defence-jobs' },
        { name: 'Police Jobs', link: '/police-jobs' },
        { name: 'Engineering Jobs', link: '/engineering-jobs' },
        { name: 'Teaching Jobs', link: '/teaching-jobs' },
        { name: 'Judicial Jobs', link: '/judicial-jobs' },
        { name: 'University Jobs', link: '/university-jobs' }
    ],
    postWiseVacancy: [
        { name: 'Clerk Govt Jobs', link: '/clerk-vacancy' },
        { name: 'Assistant Jobs', link: '/assistant-vacancy' },
        { name: 'Driver Govt Jobs', link: '/driver-vacancy' },
        { name: 'Technician Jobs', link: '/technician-vacancy' },
        { name: 'Apprentices Jobs', link: '/apprentices-vacancy' },
        { name: 'Data Entry Jobs', link: '/data-entry-vacancy' },
        { name: 'Stenographer Jobs', link: '/steno-vacancy' },
        { name: 'Staff Nurse Jobs', link: '/staff-nurse-vacancy' },
        { name: 'Office Assistant Jobs', link: '/office-assistant-vacancy' },
        { name: 'Tech Officer Jobs', link: '/tech-officer-vacancy' },
        { name: 'Typist Govt Jobs', link: '/typist-vacancy' },
        { name: 'Peon Govt Jobs', link: '/peon-vacancy' },
        { name: 'Electrician Jobs', link: '/electrician-vacancy' },
        { name: 'Storekeeper Jobs', link: '/store-keeper-vacancy' }
    ],
    stateWiseJobs: [
        { name: 'Andhra Pradesh', link: '/andhra-pradesh-jobs' },
        { name: 'Arunachal Pradesh', link: '/arunachal-pradesh-jobs' },
        { name: 'Assam', link: '/assam-jobs' },
        { name: 'Bihar', link: '/bihar-jobs' },
        { name: 'Chandigarh', link: '/chandigarh-jobs' },
        { name: 'Chhattisgarh', link: '/chhattisgarh-jobs' },
        { name: 'Delhi', link: '/delhi-jobs' },
        { name: 'Goa', link: '/goa-jobs' },
        { name: 'Gujarat Govt jobs', link: '/gujarat-jobs' },
        { name: 'Haryana', link: '/haryana-jobs' },
        { name: 'Himachal Pradesh', link: '/himachal-pradesh-jobs' },
        { name: 'Jammu & Kashmir', link: '/jammu-kashmir-jobs' },
        { name: 'Jharkhand', link: '/jharkhand-jobs' },
        { name: 'Karnataka', link: '/karnataka-jobs' },
        { name: 'Kerala', link: '/kerala-jobs' },
        { name: 'Madhya Pradesh', link: '/madhya-pradesh-jobs' },
        { name: 'Maharashtra', link: '/maharashtra-jobs' },
        { name: 'Manipur', link: '/manipur-jobs' },
        { name: 'Meghalaya', link: '/meghalaya-jobs' },
        { name: 'Mizoram', link: '/mizoram-jobs' },
        { name: 'Nagaland', link: '/nagaland-jobs' },
        { name: 'Odisha', link: '/odisha-jobs' },
        { name: 'Punjab', link: '/punjab-jobs' },
        { name: 'Puducherry', link: '/puducherry-jobs' },
        { name: 'Rajasthan', link: '/rajasthan-jobs' },
        { name: 'Sikkim', link: '/sikkim-jobs' },
        { name: 'Tamil Nadu', link: '/tamil-nadu-jobs' },
        { name: 'Telangana', link: '/telangana-jobs' },
        { name: 'Tripura', link: '/tripura-jobs' },
        { name: 'Uttarakhand', link: '/uttarakhand-jobs' },
        { name: 'Uttar Pradesh', link: '/uttar-pradesh-jobs' },
        { name: 'West Bengal', link: '/west-bengal-jobs' }
    ],
    recruitmentByCategory: [
        { name: 'PSC Recruitment', link: '/psc-recruitment' },
        { name: 'PSU Jobs', link: '/psu-jobs' },
        { name: 'Forest Jobs', link: '/forest-jobs' },
        { name: 'Municipal Jobs', link: '/municipal-jobs' },
        { name: 'UPSC Recruitment', link: '/upsc-recruitment' },
        { name: 'SSC Recruitment', link: '/ssc-recruitment' },
        { name: 'Postal Jobs', link: '/postal-jobs' },
        { name: 'Airport Jobs', link: '/airport-jobs' },
        { name: 'Join Indian Army', link: '/indian-army-jobs' },
        { name: 'Indian Navy Jobs', link: '/indian-navy-jobs' }
    ],
    listByQualification: [
        { name: '10th Pass', link: '/10th-pass-govt-jobs' },
        { name: '12th Pass', link: '/12th-pass-govt-jobs' },
        { name: 'B Arch', link: '/b-arch-jobs' },
        { name: 'B Com', link: '/b-com-jobs' },
        { name: 'B Ed', link: '/b-ed-jobs' },
        { name: 'B Pharma', link: '/b-pharma-jobs' },
        { name: 'B.Tech', link: '/btech-jobs' },
        { name: 'B.Sc', link: '/bsc-govt-jobs' },
        { name: 'BA', link: '/ba-jobs' },
        { name: 'BBA', link: '/bba-jobs' },
        { name: 'BCA', link: '/bca-govt-jobs' },
        { name: 'BDS', link: '/bds-jobs' },
        { name: 'BVSc', link: '/bvsc-jobs' },
        { name: 'CA Jobs', link: '/ca-jobs' },
        { name: 'ITI Govt Jobs', link: '/iti-govt-jobs' },
        { name: 'Diploma', link: '/diploma-govt-jobs' },
        { name: 'Graduate', link: '/graduate-jobs' },
        { name: 'ICWA', link: '/icwa-jobs' }
    ]
};

// All searchable items combined
export const allSearchableItems = [
    ...categories.map(item => ({ ...item, type: 'category' })),
    ...educationVacancies.map(item => ({ ...item, type: 'education' })),
    ...navbarMenuItems.map(item => ({ ...item, type: 'menu' })),
    ...postWiseRecruitment.map(item => ({ ...item, type: 'post' })),
];

// Export individual images
export const images = {
    GovtJobs,
    RailwayJobs,
    BankJobs,
    PostalJobs,
    JudicialJobs,
    TeachingJobs,
    EngineeringJobs,
    ClericalJobs,
    MedicalJobs,
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
