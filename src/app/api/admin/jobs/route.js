import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Helper to check authentication
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
        const body = await request.json();
        const {
            organization,
            postName,
            qualification,
            vacancy,
            lastDate,
            title,
            postDescription,
            salary,
            ageLimit,
            startDate,
            examDate,
            officialWebsite,
            mode,
            paymentMode,
            howToApply,
            categories, // Array of category IDs
            selectionProcess, // Array of { step: string }
            ageRelaxations, // Array of { rule: string }
            applicationFees, // Array of { fee: string }
            links // Array of { label: string, url: string }
        } = body;

        const newJob = await prisma.job.create({
            data: {
                organization,
                postName,
                qualification,
                vacancy,
                lastDate,
                title,
                postDescription,
                salary,
                ageLimit,
                startDate,
                examDate,
                officialWebsite,
                mode,
                paymentMode,
                howToApply,
                image: body.image,
                categories: {
                    create: (categories || []).map(cat => {
                        // Check if it's an ID (number) or a Name (string)
                        const isId = typeof cat === 'number' || (typeof cat === 'string' && !isNaN(cat));
                        
                        if (isId) {
                            return {
                                category: {
                                    connect: { id: parseInt(cat) }
                                }
                            };
                        } else {
                            // If it's a name, use connectOrCreate to find or create the category automatically
                            return {
                                category: {
                                    connectOrCreate: {
                                        where: { name: cat },
                                        create: { name: cat }
                                    }
                                }
                            };
                        }
                    })
                },
                selectionProcess: {
                    create: (selectionProcess || []).map(item => ({
                        step: item.step
                    }))
                },
                ageRelaxations: {
                    create: (ageRelaxations || []).map(item => ({
                        rule: item.rule
                    }))
                },
                applicationFees: {
                    create: (applicationFees || []).map(item => ({
                        fee: item.fee
                    }))
                },
                links: {
                    create: (links || []).map(item => ({
                        label: item.label,
                        url: item.url
                    }))
                }
            }
        });

        return NextResponse.json(newJob);
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}
