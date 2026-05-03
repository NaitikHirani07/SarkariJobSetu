import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        await prisma.contact.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        console.error('Admin Contact Delete Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
