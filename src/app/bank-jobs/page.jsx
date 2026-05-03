import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Bank Jobs 2026 - Latest IBPS, SBI, RBI & Public Sector Bank Recruitment',
    description: 'Stay updated with the latest bank job notifications. Find opportunities in IBPS, SBI, RBI, and other public sector banks. Apply for PO, Clerk, and Specialist Officer posts.',
};

export default async function BankJobsPage() { 
    // Use the central fetcher to get jobs (handles database sync + expiration filtering)
    const jobs = await getJobsByCategory("BankJob");

    return (
        <JobPageTemplate 
            category="BankJob" 
            title="Bank Jobs" 
            description="Latest banking jobs notifications, IBPS, SBI & RBI recruitments." 
            jobs={jobs}
        />
    ); 
}
