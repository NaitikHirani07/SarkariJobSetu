import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Incoming Comment Data:', body);
        const { content, name, email, website, jobId, parentId, approved } = body;

        if (!content || !name || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Try creating the comment
        const newComment = await prisma.comment.create({
            data: {
                content,
                name,
                email,
                website: website || null,
                jobId: jobId || null,
                parentId: parentId || null,
                approved: approved !== undefined ? approved : false,
            },
        });

        console.log('Comment saved successfully with ID:', newComment.id);
        return NextResponse.json({ message: 'Success', comment: newComment });
    } catch (error) {
        console.error('DATABASE ERROR:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Optional: GET method to fetch approved comments for a job
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get('jobId');

        const comments = await prisma.comment.findMany({
            where: {
                jobId: jobId || null,
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
                createdAt: 'desc',
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}
