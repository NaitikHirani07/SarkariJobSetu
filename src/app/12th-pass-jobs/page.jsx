import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: '12th Pass Govt Jobs 2026 - Latest Vacancies for 12th Pass Candidates',
    description: 'Explore the latest government jobs for 12th pass candidates. Find opportunities in banking, railways, police, and state government sectors. Apply now for 12th pass vacancies.',
};

export default async function TwelfthPassJobsPage() {
    const jobs = await getJobsByCategory("12th Pass Job");

    return (
        <JobPageTemplate 
            category="12th Pass Job" 
            title="12th Pass Jobs" 
            description="Latest government jobs for 12th pass candidates. Apply now for various posts." 
            jobs={jobs}
        />
    );
}
