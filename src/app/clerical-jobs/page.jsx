import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Clerical Jobs 2026 - Latest Govt Clerk & Assistant Vacancies',
    description: 'Find the latest clerical government job notifications. Apply for Clerk, Assistant, and Data Entry Operator posts in various government departments and PSUs. Daily updates on clerical vacancies.',
};

export default function ClericalJobsPage() { 
    return <JobPageTemplate category="ClericalJob" title="Clerical Jobs" description="Latest Clerk, Assistant, and Data Entry Operator jobs in various Government departments and PSUs." />; 
}
