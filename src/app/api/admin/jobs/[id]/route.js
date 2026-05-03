import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session && session.value === 'authenticated';
}

export async function GET(request, { params }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const job = await prisma.job.findUnique({
            where: { id: id },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                notifications: true,
                links: true,
                selectionProcess: true,
                ageRelaxations: true,
                applicationFees: true
            }
        });
        
        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
        
        return NextResponse.json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const data = await request.json();
        
        // Use a transaction to update the job and its relations
        const updatedJob = await prisma.$transaction(async (tx) => {
            // Delete existing relations
            await tx.jobCategory.deleteMany({ where: { jobId: id } });
            await tx.jobNotification.deleteMany({ where: { jobId: id } });
            await tx.jobLink.deleteMany({ where: { jobId: id } });
            await tx.selectionProcess.deleteMany({ where: { jobId: id } });
            await tx.ageRelaxation.deleteMany({ where: { jobId: id } });
            await tx.applicationFee.deleteMany({ where: { jobId: id } });

            // Update main job data
            return tx.job.update({
                where: { id: id },
                data: {
                    organization: data.organization,
                    postName: data.postName,
                    qualification: data.qualification,
                    vacancy: data.vacancy,
                    lastDate: data.lastDate,
                    title: data.title,
                    postDescription: data.postDescription,
                    salary: data.salary,
                    ageLimit: data.ageLimit,
                    startDate: data.startDate,
                    examDate: data.examDate,
                    image: data.image,
                    categories: {
                        create: data.categoryIds.map(catId => ({
                            categoryId: parseInt(catId)
                        }))
                    },
                    notifications: {
                        create: data.notifications.map(n => ({
                            label: n.label,
                            value: n.value
                        }))
                    },
                    links: {
                        create: data.links.map(l => ({
                            label: l.label,
                            url: l.url
                        }))
                    },
                    selectionProcess: {
                        create: data.selectionProcess.map(s => ({
                            step: s.step
                        }))
                    },
                    ageRelaxations: {
                        create: data.ageRelaxations.map(r => ({
                            rule: r.rule
                        }))
                    },
                    applicationFees: {
                        create: data.applicationFees.map(f => ({
                            fee: f.fee
                        }))
                    }
                }
            });
        });

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }
}
