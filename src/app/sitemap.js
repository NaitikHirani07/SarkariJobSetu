import prisma from '@/lib/prisma';
import { 
    categories, 
    educationVacancies, 
    navbarMenuItems, 
    postWiseRecruitment,
    sidebarData
} from '@/data/assets';

export default async function sitemap() {
    const baseUrl = 'https://sarkarirojgarsetu.com';

    // Base routes
    const routes = [
        '',
        '/sarkari-result',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    // Category routes from assets
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}${cat.link}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const educationRoutes = educationVacancies.map((edu) => ({
        url: `${baseUrl}${edu.link}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const menuRoutes = navbarMenuItems.map((menu) => ({
        url: `${baseUrl}${menu.link}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const postRoutes = postWiseRecruitment.map((post) => ({
        url: `${baseUrl}${post.link}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Sidebar additional routes
    const sidebarRoutes = [
        ...sidebarData.stateWiseJobs,
        ...sidebarData.recruitmentByCategory,
    ].map((item) => ({
        url: `${baseUrl}${item.link}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Dynamic Job Detail routes from Database
    const jobs = await prisma.job.findMany({
        select: { id: true }
    });

    const jobRoutes = jobs.map((job) => ({
        url: `${baseUrl}/job-details/${job.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // Combine all and remove duplicates (based on URL)
    const allRoutes = [
        ...routes,
        ...categoryRoutes,
        ...educationRoutes,
        ...menuRoutes,
        ...postRoutes,
        ...sidebarRoutes,
        ...jobRoutes,
    ];

    const uniqueRoutes = Array.from(new Map(allRoutes.map(item => [item.url, item])).values());

    return uniqueRoutes;
}
