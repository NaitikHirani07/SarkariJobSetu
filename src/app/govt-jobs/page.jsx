import { getJobsByCategory } from '@/lib/fetchers';
import CentralGovtJobsClient from '@/components/CentralGovtJobsClient';

export const metadata = {
    title: 'Latest Government Jobs 2026 - All Govt Jobs Notifications',
    description: 'Find the latest government job notifications from all sectors. Explore opportunities in Railways, Banking, Defence, SSC, UPSC, and State government departments. Apply now for govt vacancies.',
    keywords: ['government jobs', 'sarkari naukri', 'govt job notifications', 'latest govt jobs', 'railway jobs', 'bank jobs'],
};

export default async function GovtJobsPage() {
    // We can show all 'GovtJob' category jobs here
    const allGovtJobs = await getJobsByCategory("GovtJob");

    return <CentralGovtJobsClient centralGovtJobs={allGovtJobs} />;
}
