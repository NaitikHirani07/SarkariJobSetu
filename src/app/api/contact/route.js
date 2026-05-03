import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });

        return NextResponse.json(
            { message: 'Message sent successfully', contact },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
