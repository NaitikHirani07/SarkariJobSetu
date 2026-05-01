import JobCategories from '@/components/JobCategories';
import { 
    getAssetCategories, 
    getEducationVacancies, 
    getPostWiseRecruitment, 
    getFAQs 
} from '@/lib/fetchers';

export const metadata = {
    title: 'Sarkari Rojgar Setu - Latest Govt Jobs, Sarkari Result & Admit Cards 2026',
    description: 'Explore the latest government jobs in India. Find railway, bank, defence, and teaching jobs. Stay updated with Sarkari Result, admit cards, and answer keys.',
};

export default async function HomePage() {
    const categories = await getAssetCategories();
    const educationVacancies = await getEducationVacancies();
    const postWiseRecruitment = await getPostWiseRecruitment();
    const faqs = await getFAQs();

    return (
        <JobCategories 
            categories={categories}
            educationVacancies={educationVacancies}
            postWiseRecruitment={postWiseRecruitment}
            faqs={faqs}
        />
    );
}
