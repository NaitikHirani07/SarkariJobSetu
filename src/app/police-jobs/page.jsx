import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Police Jobs 2026 - Latest Constable, SI & Head Constable Recruitment',
    description: 'Find the latest state police recruitment notifications. Apply for Constable, Sub-Inspector (SI), and Head Constable posts in Delhi, UP, Bihar, and other state police departments.',
};

export default async function PoliceJobsPage() {
    const jobs = await getJobsByCategory("PoliceJob");

    return (
        <JobPageTemplate 
            category="PoliceJob" 
            title="Police Jobs" 
            description="Latest police recruitment notifications, Constable & SI vacancies." 
            jobs={jobs}
        />
    );
}
