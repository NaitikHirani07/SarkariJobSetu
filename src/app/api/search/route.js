import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to check if a date string is expired
function isExpired(dateStr) {
    if (!dateStr) return false;
    try {
        const parts = dateStr.split(/[-/]/);
        if (parts.length !== 3) return false;
        let day, month, year;
        if (parts[0].length === 4) {
            [year, month, day] = parts;
        } else {
            [day, month, year] = parts;
        }
        const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
        return expiryDate < new Date();
    } catch (e) {
        return false;
    }
}

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
            take: 20, // Fetch more to allow for filtering
            select: {
                id: true,
                organization: true,
                postName: true,
                lastDate: true,
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

        // Filter out expired jobs and format results
        const formattedResults = results
            .filter(job => !isExpired(job.lastDate))
            .map(job => ({
                id: job.id,
                name: job.organization,
                postName: job.postName,
                type: 'post',
                category: job.categories[0]?.category.name || 'Govt Job',
                link: `/job-details/${job.id}`
            }));

        return NextResponse.json(formattedResults.slice(0, 10)); // Return top 10 active results
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
