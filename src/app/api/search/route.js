import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    try {
        const results = await prisma.job.findMany({
            where: {
                OR: [
                    { organization: { contains: query } },
                    { postName: { contains: query } },
                    { 
                        categories: {
                            some: {
                                category: {
                                    name: { contains: query }
                                }
                            }
                        }
                    }
                ]
            },
            take: 10,
            select: {
                id: true,
                organization: true,
                postName: true,
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        // Format results to match the frontend expectations
        const formattedResults = results.map(job => ({
            id: job.id,
            name: job.organization,
            postName: job.postName,
            type: 'post',
            category: job.categories[0]?.category.name || 'Govt Job',
            link: `/job-details/${job.id}`
        }));

        return NextResponse.json(formattedResults);
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
