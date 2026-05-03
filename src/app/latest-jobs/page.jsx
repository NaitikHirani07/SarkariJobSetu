import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Latest Govt Jobs 2026 - Sarkari Result & Latest Recruitment Notifications',
    description: 'Find all the latest government job notifications in one place. Daily updates on banking, railway, SSC, and other central/state govt vacancies.',
};

export default async function LatestJobsPage() {
    // Search for "LatestJob" to match the homepage branding
    const jobs = await getJobsByCategory("LatestJob");

    return (
        <JobPageTemplate 
            category="LatestJob" 
            title="Latest Government Jobs" 
            description="Explore the newest government job openings across India." 
            jobs={jobs}
        />
    );
}
