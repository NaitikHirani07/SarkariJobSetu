import prisma from '@/lib/prisma';
import Link from 'next/link';
import JobCard from '@/components/admin/JobCard';

export default async function AdminJobsPage() {
    // Fetch jobs with their categories
    const jobs = await prisma.job.findMany({
        orderBy: { id: 'desc' },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    });

    return (
        <div className="space-y-8 pb-10 px-2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Job Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and track all government job vacancies</p>
                </div>
                <Link 
                    href="/admin/jobs/add" 
                    className="bg-[#1976D2] hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95"
                >
                    <span className="text-lg">＋</span> Add New Job
                </Link>
            </div>

            {/* Grid Layout for the New Design Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}

                {jobs.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <span className="text-4xl block mb-4">📭</span>
                        <p className="text-gray-400 font-medium">No jobs found in the database. Start by adding one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
