import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Bank Jobs 2026 - Latest IBPS, SBI, RBI & Public Sector Bank Recruitment',
    description: 'Stay updated with the latest bank job notifications. Find opportunities in IBPS, SBI, RBI, and other public sector banks. Apply for PO, Clerk, and Specialist Officer posts.',
};

export default function BankJobsPage() { 
    return <JobPageTemplate category="BankJob" title="Bank Jobs" description="Latest banking jobs notifications, IBPS, SBI & RBI recruitments." />; 
}
