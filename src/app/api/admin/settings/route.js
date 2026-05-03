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
        // Get settings or create default if not exists
        let settings = await prisma.siteSettings.findFirst();
        
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    siteName: "Sarkari Rojgar Setu",
                    supportEmail: "support@sarkari.com",
                    logoText: "Sabhi Jobs"
                }
            });
        }
        
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        
        // Upsert settings (we only ever have one row with ID 1)
        const settings = await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: {
                siteName: body.siteName,
                supportEmail: body.supportEmail,
                logoText: body.logoText,
                announcementText: body.announcementText,
            },
            create: {
                id: 1,
                siteName: body.siteName,
                supportEmail: body.supportEmail,
                logoText: body.logoText,
                announcementText: body.announcementText,
            }
        });
        
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
