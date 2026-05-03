import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Approve or Update a comment
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { approved } = body;

        const updatedComment = await prisma.comment.update({
            where: { id: id },
            data: { approved: approved }
        });

        return NextResponse.json(updatedComment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }
}

// Delete a comment
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await prisma.comment.delete({
            where: { id: id }
        });
        return NextResponse.json({ message: 'Comment deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
}
