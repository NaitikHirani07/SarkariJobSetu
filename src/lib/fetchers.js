import prisma from './prisma';

export async function getJobsByCategory(categoryName) {
    try {
        const jobs = await prisma.job.findMany({
            where: {
                categories: {
                    some: {
                        category: {
                            name: categoryName
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return jobs;
    } catch (error) {
        console.error(`Error fetching jobs for category ${categoryName}:`, error);
        return [];
    }
}
export async function getAssetCategories() {
    try {
        return await prisma.assetCategory.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching asset categories:', error);
        return [];
    }
}

export async function getEducationVacancies() {
    try {
        return await prisma.educationVacancy.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching education vacancies:', error);
        return [];
    }
}

export async function getPostWiseRecruitment() {
    try {
        return await prisma.postWiseRecruitment.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching post wise recruitment:', error);
        return [];
    }
}

export async function getFAQs() {
    try {
        return await prisma.fAQ.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return [];
    }
}

export async function getSarkariResults() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return jobs.map(job => ({
            id: job.id,
            jobTitle: job.postName,
            state: "India", 
            qualification: job.qualification,
            salary: job.salary || "As per rules",
            importantDate: job.lastDate,
            vacancies: job.vacancy,
            link: `/job-details/${job.id}`
        }));
    } catch (error) {
        console.error('Error fetching Sarkari results:', error);
        return [];
    }
}
