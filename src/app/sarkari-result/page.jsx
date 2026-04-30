import { sarkariResults } from '@/data/jobsData';
import SarkariResultClient from '@/components/SarkariResultClient';

export const metadata = {
    title: 'Sarkari Result 2026 - Latest Exam Results, Merit Lists & Admit Cards',
    description: 'Check the latest Sarkari Result 2026. Find exam results for SSC, UPSC, Railway, Bank, and State government jobs. Stay updated with merit lists and scorecards.',
    keywords: ['sarkari result', 'exam results', 'government job results', 'ssc result', 'upsc result', 'railway result'],
};

export default function SarkariResultPage() {
    return <SarkariResultClient sarkariResults={sarkariResults} />;
}
