import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                job: {
                    select: {
                        id: true,
                        organization: true,
                        postName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Admin Fetch Comments Error:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}
