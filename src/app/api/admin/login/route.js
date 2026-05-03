import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory storage for OTPs (No database needed!)
// This map stores: { "otp_code": expiry_timestamp }
const otpStore = new Map();

// Configure SMTP Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request) {
    const { password, otp, phase } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminEmail = process.env.ADMIN_EMAIL;

    // Phase 1: Verify Password and Send OTP
    if (phase === 'INIT') {
        if (password === adminPassword) {
            // Generate 6-digit OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

            // Save to memory
            otpStore.set(generatedOtp, expiresAt);

            // Send Email via SMTP
            if (process.env.SMTP_USER && process.env.SMTP_PASS && adminEmail) {
                try {
                    await transporter.sendMail({
                        from: `"Sarkari Admin" <${process.env.SMTP_USER}>`,
                        to: adminEmail,
                        subject: 'Admin Login OTP',
                        html: `
                            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                                <h2 style="color: #1976D2;">Admin Dashboard Security</h2>
                                <p>You recently requested to access the Sarkari Rojgar Setu Admin Panel.</p>
                                <p>Your One-Time Password (OTP) is:</p>
                                <h1 style="background: #f4f7fe; padding: 15px; text-align: center; font-size: 32px; letter-spacing: 5px; color: #1976D2;">${generatedOtp}</h1>
                                <p style="color: #666; font-size: 12px;">This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
                            </div>
                        `,
                    });
                } catch (error) {
                    console.error('SMTP Email sending failed:', error);
                }
            } else {
                console.log('--- OTP DEBUG (Memory Mode) ---');
                console.log('OTP:', generatedOtp);
                console.log('--------------------------------');
            }

            return NextResponse.json({ success: true, otpSent: true });
        }
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Phase 2: Verify OTP
    if (phase === 'VERIFY') {
        const expiry = otpStore.get(otp);

        if (expiry && expiry > Date.now()) {
            // Delete the OTP after use
            otpStore.delete(otp);

            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return NextResponse.json({ success: true });
        }
        
        return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
