import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'SSC Jobs 2026 - Latest Staff Selection Commission Recruitment',
    description: 'Find the latest SSC job notifications. Apply for CGL, CHSL, MTS, and GD Constable posts.',
};

export default async function SSCJobsPage() {
    const jobs = await getJobsByCategory("SSCJob");

    return (
        <JobPageTemplate 
            category="SSCJob" 
            title="SSC Jobs" 
            description="Latest Staff Selection Commission recruitment notifications." 
            jobs={jobs}
        />
    );
}
