import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session && session.value === 'authenticated';
}

export async function GET() {
    try {
        const assets = await prisma.assetCategory.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(assets);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const asset = await prisma.assetCategory.create({
            data: {
                name: body.name,
                link: body.link,
                icon: body.icon,
                useEmoji: body.useEmoji
            }
        });
        return NextResponse.json(asset);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
