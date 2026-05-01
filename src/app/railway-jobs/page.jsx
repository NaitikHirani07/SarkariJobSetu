import JobPageTemplate from '@/components/JobPageTemplate';
import { getJobsByCategory } from '@/lib/fetchers';

export const metadata = {
    title: 'Railway Jobs 2026 - Latest RRB & RRC Recruitment Notifications',
    description: 'Find the latest Railway Recruitment Board (RRB) and Railway Recruitment Cell (RRC) job notifications. Apply for NTPC, Group D, ALP, and Technician posts in Indian Railways.',
};

export default async function RailwayJobsPage() {
    const jobs = await getJobsByCategory("RailwayJob");

    return (
        <JobPageTemplate 
            category="RailwayJob" 
            title="Railway Jobs" 
            description="Latest railway jobs notifications, RRB & RRC recruitments." 
            jobs={jobs}
        />
    );
}
