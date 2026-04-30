import JobPageTemplate from '@/components/JobPageTemplate';

export const metadata = {
    title: 'Medical Jobs 2026 - Latest Govt Healthcare & Medical Vacancies',
    description: 'Find the latest government healthcare and medical job notifications. Apply for Doctors, Nurses, Pharmacists, and Lab Technician posts in various government hospitals. Daily updates on medical vacancies.',
};

export default function MedicalJobsPage() { 
    return <JobPageTemplate category="MedicalJob" title="Medical Jobs" description="Govt Medical and Healthcare Jobs 2026. Vacancies for Doctors, Nurses, Pharmacists, Lab Technicians, and other medical staff." />; 
}
