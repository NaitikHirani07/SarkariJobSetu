import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'B.Tech Govt Jobs 2026 - Latest Engineering Vacancies in PSUs & Govt',
    description: 'Explore the latest government jobs for B.Tech graduates. Find opportunities in PSUs, Railways, ISRO, DRDO, and other engineering sectors. Apply now for B.Tech vacancies.',
};

export default function BTechJobsPage() { 
    return <JobPageTemplate category="B.Tech Jobs" title="B.Tech Jobs" description="Engineering government jobs for B.Tech graduates. PSUs, Railways, and more." />; 
}
