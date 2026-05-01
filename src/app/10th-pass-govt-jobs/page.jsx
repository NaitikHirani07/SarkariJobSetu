import JobPageTemplate from '@/components/JobPageTemplate';
import prisma from '@/lib/prisma';

export const metadata = {
    title: '10th Pass Govt Jobs 2026 - Latest Vacancies for 10th Pass Candidates',
    description: 'Find the latest government jobs for 10th pass candidates. Apply now for various posts in railways, banking, defence, and more. Daily updates on 10th pass vacancies.',
};

export default async function TenthPassGovtJobsPage() {
    const jobs = await prisma.job.findMany({
        where: {
            categories: {
                some: {
                    category: {
                        name: "10th Pass Govt Job"
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <JobPageTemplate 
            category="10th Pass Govt Job" 
            title="10th Pass Govt Jobs" 
            description="Find the latest government jobs for 10th pass candidates. Apply now for various posts in railways, banking, defence, and more." 
            jobs={jobs}
        />
    );
}
