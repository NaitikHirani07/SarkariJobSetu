import { govtJobsList } from '@/data/jobsData';
import CentralGovtJobsClient from '@/components/CentralGovtJobsClient';

export const metadata = {
    title: 'Central Govt Jobs 2026 - Latest Central Government Recruitment Notifications',
    description: 'Find the latest Central Government job notifications. Explore opportunities in SSC, UPSC, Railway, Bank, and other central departments. Apply now for central govt vacancies.',
    keywords: ['central govt jobs', 'government recruitment', 'upsc recruitment', 'ssc recruitment', 'central government vacancies'],
};

export default function CentralGovtJobsPage() {
    const centralGovtJobs = govtJobsList.filter(job => 
        Array.isArray(job.category) ? job.category.includes('CentralGovtJob') : job.category === 'CentralGovtJob'
    );

    return <CentralGovtJobsClient centralGovtJobs={centralGovtJobs} />;
}
