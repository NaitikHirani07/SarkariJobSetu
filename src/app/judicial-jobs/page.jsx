import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Judicial Jobs 2026 - Latest High Court & District Court Recruitment',
    description: 'Find the latest judicial government job notifications. Apply for Judges, Law Clerks, Process Servers, and other court posts. Daily updates on judicial vacancies.',
};

export default function JudicialJobsPage() { 
    return <JobPageTemplate category="JudicialJob" title="Judicial Jobs" description="High Court and District Court Recruitment 2026. Find latest vacancies for Judges, Law Clerks, Process Servers, and more." />; 
}
