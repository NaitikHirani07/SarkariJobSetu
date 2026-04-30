import { govtJobsList } from '@/data/jobsData';
import CentralGovtJobsClient from '@/components/CentralGovtJobsClient';

export const metadata = {
    title: 'Latest Government Jobs 2026 - All Govt Jobs Notifications',
    description: 'Find the latest government job notifications from all sectors. Explore opportunities in Railways, Banking, Defence, SSC, UPSC, and State government departments. Apply now for govt vacancies.',
    keywords: ['government jobs', 'sarkari naukri', 'govt job notifications', 'latest govt jobs', 'railway jobs', 'bank jobs'],
};

export default function GovtJobsPage() {
    // For general GovtJobsPage, we show all jobs or filter as needed.
    // For now, mirroring central govt jobs but with broader metadata.
    const centralGovtJobs = govtJobsList.filter(job => 
        Array.isArray(job.category) ? job.category.includes('CentralGovtJob') : job.category === 'CentralGovtJob'
    );

    return <CentralGovtJobsClient centralGovtJobs={centralGovtJobs} />;
}
