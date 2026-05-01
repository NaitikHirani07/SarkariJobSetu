import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Gujarat Govt Jobs 2026 - Latest OJAS & GSSSB Recruitment',
    description: 'Find the latest government job notifications in Gujarat. Updates on GSSSB, GPSSB, OJAS, and other Gujarat state govt vacancies.',
};

export default async function GujaratJobsPage() {
    const jobs = await getJobsByCategory("Gujarat Jobs");

    return (
        <JobPageTemplate 
            category="Gujarat Jobs" 
            title="Gujarat Jobs" 
            description="Latest government job openings in Gujarat state." 
            jobs={jobs}
        />
    );
}
