import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Engineering Jobs 2026 - Latest Govt Jobs for Engineering Graduates',
    description: 'Explore the latest government jobs for engineering graduates. Find opportunities in civil, mechanical, electrical, electronics, and computer science engineering sectors. Apply now for engineering vacancies.',
};

export default function EngineeringJobsPage() { 
    return <JobPageTemplate category="Engineering" title="Engineering Jobs" description="Latest Govt Engineering Jobs. Vacancies for Civil, Mechanical, Electrical, Electronics, and Computer Science Engineers." />; 
}
