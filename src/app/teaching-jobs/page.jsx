import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Teaching Jobs 2026 - Latest Govt Teacher & Faculty Recruitment',
    description: 'Find the latest government teaching job notifications. Apply for Teacher, Professor, and Assistant Professor posts in various government schools and colleges. Daily updates on teaching vacancies.',
};

export default function TeachingJobsPage() { 
    return <JobPageTemplate category="TeachingJob" title="Teaching Jobs" description="Latest Teaching Jobs in India. Find Government Teacher vacancies, Professor, Assistant Professor, and other faculty positions." />; 
}
