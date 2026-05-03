import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Graduate Govt Jobs 2026 - Latest Government Jobs for Any Graduates',
    description: 'Find the latest government jobs for graduates from any stream. Explore opportunities in banking, administrative, railways, and other government sectors. Apply now for graduate vacancies.',
};

export default async function AnyGraduateJobsPage() { 
    const jobs = await getJobsByCategory("Any Graduate Job");

    return (
        <JobPageTemplate 
            category="Any Graduate Job" 
            title="Graduate Jobs" 
            description="Latest government jobs for graduates from any stream." 
            jobs={jobs}
        />
    ); 
}
