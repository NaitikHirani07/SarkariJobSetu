import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Defence Jobs 2026 - Join Indian Army, Navy, Air Force & Paramilitary',
    description: 'Find the latest recruitment notifications for Indian Army, Navy, Air Force, BSF, CRPF, and other paramilitary forces. Apply now for defence vacancies.',
};

export default function DefenceJobsPage() { 
    return <JobPageTemplate category="DefenceJob" title="Defence Jobs" description="Latest defence jobs notifications, Army, Navy & Air Force recruitments." />; 
}
