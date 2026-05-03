import prisma from './prisma';

// Helper function to check if a date string is expired
function isExpired(dateStr) {
    if (!dateStr) return false;
    try {
        // Handle formats like DD/MM/YYYY or DD-MM-YYYY
        const parts = dateStr.split(/[-/]/);
        if (parts.length !== 3) return false;
        
        let day, month, year;
        if (parts[0].length === 4) {
            [year, month, day] = parts;
        } else {
            [day, month, year] = parts;
        }
        
        // Expiry at the end of the day (23:59:59)
        const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
        return expiryDate < new Date();
    } catch (e) {
        return false;
    }
}

export async function getJobsByCategory(categoryName) {
    try {
        // Extract the base name (e.g., "SSC" from "SSCJob")
        const baseName = categoryName.replace(/Job|Jobs/gi, '').trim();

        const jobs = await prisma.job.findMany({
            where: {
                categories: {
                    some: {
                        category: {
                            OR: [
                                { name: { contains: baseName } },
                                { name: { contains: baseName.toUpperCase() } },
                                { name: { contains: baseName.toLowerCase() } }
                            ]
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        // Temporarily disabled expiry filtering so user can see their data
        // return jobs.filter(job => !isExpired(job.lastDate));
        return jobs;
    } catch (error) {
        console.error(`Error fetching jobs for category ${categoryName}:`, error);
        return [];
    }
}

export async function getAssetCategories() {
    try {
        const categories = await prisma.assetCategory.findMany({
            orderBy: { id: 'asc' }
        });

        // Define the requested priority order
        const priorityOrder = ['LATEST JOB', 'SSC JOB', 'BANK JOB', 'GUJARAT JOB'];

        // Sort categories based on the priority list
        return categories.sort((a, b) => {
            const indexA = priorityOrder.indexOf(a.name.toUpperCase());
            const indexB = priorityOrder.indexOf(b.name.toUpperCase());

            // If both are in the priority list, sort by their position in that list
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            // If only A is in the list, it comes first
            if (indexA !== -1) return -1;
            // If only B is in the list, it comes first
            if (indexB !== -1) return 1;
            // Otherwise maintain original order
            return 0;
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
            take: 100 // Take more to allow for filtering
        });

        // Filter and map
        return jobs
            .filter(job => !isExpired(job.lastDate))
            .slice(0, 50) // Return top 50 active jobs
            .map(job => ({
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
