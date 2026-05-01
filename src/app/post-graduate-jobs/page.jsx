import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Post Graduate Govt Jobs 2026 - Latest Jobs for PG Degree Holders',
    description: 'Find the latest government jobs for post graduates (PG). Explore high-level positions in various government departments and research institutes. Apply now for PG vacancies.',
};

export default async function PostGraduateJobsPage() { 
    const jobs = await getJobsByCategory("Post Graduate Jobs");

    return (
        <JobPageTemplate 
            category="Post Graduate Jobs" 
            title="Post Graduate Jobs" 
            description="Government jobs for Post Graduates." 
            jobs={jobs}
        />
    ); 
}
