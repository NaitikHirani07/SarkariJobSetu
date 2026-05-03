import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session && session.value === 'authenticated';
}

export async function POST(request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert file to base64 for Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
            folder: 'SarkariJobSetu', // Organized folder in your Cloudinary
        });

        return NextResponse.json({
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        });
    } catch (error) {
        console.error('--- CLOUDINARY UPLOAD ERROR ---');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Error Stack:', error.stack);
        return NextResponse.json({ 
            error: 'Upload failed', 
            details: error.message 
        }, { status: 500 });
    }
}
