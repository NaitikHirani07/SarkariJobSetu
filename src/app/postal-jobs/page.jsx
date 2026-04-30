import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Postal Jobs 2026 - Latest India Post & GDS Recruitment Notifications',
    description: 'Stay updated with the latest India Post recruitment notifications. Find vacancies for Gramin Dak Sevak (GDS), Postman, and Mail Guard. Apply now for postal jobs.',
};

export default function PostalJobsPage() { 
    return <JobPageTemplate category="PostalJob" title="Postal Jobs" description="India Post Recruitment 2026. Find latest Post Office jobs, Gramin Dak Sevak (GDS), Postman, and Mail Guard vacancies." />; 
}
