import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Graduate Govt Jobs 2026 - Latest Government Jobs for Any Graduates',
    description: 'Find the latest government jobs for graduates from any stream. Explore opportunities in banking, administrative, railways, and other government sectors. Apply now for graduate vacancies.',
};

export default function GraduateJobsPage() { 
    return <JobPageTemplate category="Any Graduate Jobs" title="Graduate Jobs" description="Latest government jobs for graduates from any stream. Banks, administrative, and more." />; 
}
