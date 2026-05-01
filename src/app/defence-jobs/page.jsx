import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Defence Jobs 2026 - Join Indian Army, Navy, Air Force & Paramilitary',
    description: 'Find the latest recruitment notifications for Indian Army, Navy, Air Force, BSF, CRPF, and other paramilitary forces. Apply now for defence vacancies.',
};

export default async function DefenceJobsPage() {
    const jobs = await getJobsByCategory("DefenceJob");

    return (
        <JobPageTemplate 
            category="DefenceJob" 
            title="Defence Jobs" 
            description="Latest defence jobs notifications, Army, Navy & Air Force recruitments." 
            jobs={jobs}
        />
    );
}
