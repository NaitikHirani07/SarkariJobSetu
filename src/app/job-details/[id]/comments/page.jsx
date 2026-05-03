import prisma from '@/lib/prisma';
import Link from 'next/link';
import CommentForm from '@/components/CommentForm';
import FullCommentList from '@/components/FullCommentList';

export const dynamic = 'force-dynamic';

async function getJobData(id) {
    return await prisma.job.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            organization: true,
            postName: true,
        }
    });
}

async function getComments(jobId) {
    return await prisma.comment.findMany({
        where: {
            jobId,
            approved: true,
            parentId: null, // Only top-level comments
        },
        include: {
            replies: {
                where: { approved: true },
                orderBy: { createdAt: 'asc' }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export default async function JobCommentsPage({ params }) {
    const { id } = await params;
    const job = await getJobData(id);
    
    if (!job) return <div className="text-center py-20 text-gray-500">Job not found.</div>;
    
    const allComments = await getComments(id);

    return (
        <div className="max-w-screen-2xl mx-auto px-[40px] py-12">
            <Link href={`/job-details/${id}`} className="text-blue-600 hover:underline flex items-center gap-1 mb-6 text-sm font-medium">
                ← Back to Job Details
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{job.organization}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600 text-sm">{job.postName}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Discussion & Feedback</h1>
                <p className="text-gray-500">Full conversation for: <span className="font-semibold text-gray-700">{job.title}</span></p>
            </div>

            <div className="mb-12">
                <FullCommentList initialComments={allComments} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Join the conversation</h3>
                <p className="text-sm text-gray-500 mb-6">Have a question? Leave a comment below.</p>
                <CommentForm jobId={id} />
            </div>
        </div>
    );
}
