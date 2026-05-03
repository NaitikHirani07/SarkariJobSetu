import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session && session.value === 'authenticated';
}

export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

export async function POST(request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { question, answer } = await request.json();
        const faq = await prisma.fAQ.create({
            data: { question, answer }
        });
        return NextResponse.json(faq);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}
