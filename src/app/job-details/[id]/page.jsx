import Link from 'next/link';
import prisma from '@/lib/prisma';
import { sidebarData } from '@/data/assets';
import { SidebarSection } from '@/components/JobPageTemplate';
import CommentForm from '@/components/CommentForm';

export async function generateMetadata({ params }) {
    const { id } = await params;
    
    const job = await prisma.job.findUnique({
        where: { id: parseInt(id) }
    });
    
    if (!job) return { title: 'Job Not Found' };

    return {
        title: `${job.organization} Recruitment 2026 - ${job.postName} (${job.vacancy})`,
        description: `${job.organization} is hiring for ${job.postName} with ${job.vacancy} vacancies. Qualification: ${job.qualification}. Last Date to Apply: ${job.lastDate}. Apply online now!`,
        keywords: [job.organization, job.postName, 'govt jobs 2026', 'sarkari result', job.qualification, 'online application'],
        alternates: {
            canonical: `/job-details/${id}`,
        },
        openGraph: {
            title: `${job.organization} ${job.postName} Recruitment`,
            description: `Apply for ${job.vacancy} vacancies at ${job.organization}. Last date: ${job.lastDate}`,
            url: `https://sarkarirojgarsetu.com/job-details/${id}`,
            type: 'article',
        }
    };
}

export default async function JobDetailsPage({ params }) {
    const { id } = await params;
    
    const job = await prisma.job.findUnique({
        where: { id: parseInt(id) },
        include: {
            notifications: true,
            links: true,
            selectionProcess: true,
            ageRelaxations: true,
            applicationFees: true
        }
    });

    if (!job) return <div className="text-center py-20">Job not found</div>;

    // Mapping back to the previous structure for UI compatibility
    const details = {
        title: job.title,
        postDescription: job.postDescription,
        notifications: job.notifications,
        postDetails: {
            title: `${job.postName} Details`,
            qualificationDetails: job.qualification,
            salary: job.salary,
            ageLimit: job.ageLimit
        },
        importantDates: {
            startDate: job.startDate,
            lastDate: job.lastDate,
            examDate: job.examDate
        },
        importantLinks: job.links,
        selectionProcess: job.selectionProcess.map(s => s.step),
        ageRelaxation: job.ageRelaxations.map(r => r.rule),
        applicationFee: job.applicationFees.map(f => f.fee)
    };

    // JSON-LD for JobPosting
    const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'JobPosting',
        'title': job.postName,
        'description': details.postDescription,
        'datePosted': details.importantDates.startDate,
        'validThrough': details.importantDates.lastDate,
        'employmentType': 'FULL_TIME',
        'hiringOrganization': {
            '@type': 'Organization',
            'name': job.organization,
            'sameAs': 'https://sarkarirojgarsetu.com'
        },
        'jobLocation': {
            '@type': 'Place',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'IN'
            }
        },
        'baseSalary': {
            '@type': 'MonetaryAmount',
            'currency': 'INR',
            'value': {
                '@type': 'QuantitativeValue',
                'value': 20000,
                'unitText': 'MONTH'
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#1976D2] mb-2">{details.title}</h1>
                    <p className="text-sm text-gray-600 mb-6">{details.postDescription}</p>
                    <div className="bg-[#EF5350] text-white text-center py-3 font-bold text-2xl mb-6 rounded-sm">{job.organization.split(' ')[0]} Recruitment</div>
                    {/* UI remains the same... using details object */}
                    <div className="flex justify-center mb-6">
                        <div className="border border-blue-500 p-2 inline-block">
                            <div className="bg-[#1976D2] text-white px-8 py-2 font-bold text-xl flex items-center justify-center gap-2">
                                <span className="text-yellow-400 text-2xl">★</span>{job.organization.split(' ')[0]}<span className="text-yellow-400 text-2xl">★</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-6">
                        <div className="bg-[#FFEB3B] text-red-600 font-bold text-xl py-2 px-6 flex-1 text-center">{job.vacancy}</div>
                        <div className="bg-[#EF5350] text-white font-bold text-xl py-2 px-6 flex-1 text-center">{job.qualification}</div>
                    </div>
                    <p className="text-sm text-gray-800 mb-4 font-medium italic">{job.organization} information for the hiring of {job.postName} has been released on the official website. Candidates planning to start their career with {job.organization} can apply Online on or before {job.lastDate}.</p>
                    <div className="border border-gray-300 mb-8">
                        <div className="bg-white text-center py-2 font-bold text-[#1976D2] border-b border-gray-300 text-lg">{job.organization.split(' ')[0]} Jobs 2026 Notification<div className="text-red-500 text-sm">Job Location: All India</div></div>
                        <div className="text-sm">{details.notifications.map((item, index) => (<div key={index} className="flex border-b border-gray-300 last:border-0"><div className="w-1/3 p-2 font-bold border-r border-gray-300 bg-gray-50">{item.label}</div><div className="w-2/3 p-2">{item.value}</div></div>))}</div>
                    </div>
                    <div className="space-y-6">
                        <div><h2 className="text-lg font-bold text-gray-800 mb-2">{job.organization.split(' ')[0]} Post Details</h2><p className="mb-2 font-bold text-sm text-gray-700">{details.postDetails.title}</p><ul className="list-disc pl-5 text-sm space-y-1 text-gray-700"><li><strong>Qualification:</strong> {details.postDetails.qualificationDetails}</li><li><strong>Salary Details:</strong> {details.postDetails.salary}</li><li><strong>Age Limit:</strong> {details.postDetails.ageLimit}</li></ul></div>
                        <div><h3 className="font-bold text-sm text-gray-800 mb-1">Age Relaxation</h3><ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">{details.ageRelaxation.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                        <div><h3 className="font-bold text-sm text-gray-800 mb-1">Application Fee</h3><ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">{details.applicationFee.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                        <div><p className="text-sm text-gray-700"><span className="font-bold">Selection Process:</span> Selection will be based on {details.selectionProcess.join(' & ')}</p></div>
                        <div><p className="text-sm text-gray-700"><span className="font-bold">How to Apply:</span> Interested and Eligible applicants may apply Online through the Official Website on from {details.importantDates.startDate} to {details.importantDates.lastDate}.</p></div>
                        <div><h3 className="font-bold text-sm text-gray-800 mb-1">Important Dates</h3><div className="text-sm text-gray-700"><div>Start Date: <span className="text-red-500">{details.importantDates.startDate}</span></div><div>Last Date: <span className="text-red-500">{details.importantDates.lastDate}</span></div></div></div>
                        <div><h3 className="font-bold text-sm text-gray-800 mb-2">Important Links</h3><div className="space-y-1">{details.importantLinks.map((link, i) => (<div key={i} className="flex text-sm"><span className="font-bold text-[#1976D2] w-32">{link.label}</span><Link href={link.url} className="text-[#1976D2] hover:underline font-bold">Click Here</Link></div>))}</div></div>
                    </div>
                    <CommentForm />
                </div>
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                        <div className="bg-gray-100 p-2 font-bold text-sm border-b border-gray-200">Search Govt Jobs Here</div>
                        <div className="p-3"><div className="flex"><input type="text" placeholder="Search..." className="flex-1 border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-l" /><button className="bg-black text-white px-3 py-1.5 rounded-r"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button></div></div>
                    </div>
                    <SidebarSection title="Government Job vacancies" items={sidebarData.jobVacancies} />
                    <SidebarSection title="Post Wise Government Vacancy" items={sidebarData.postWiseVacancy} cols={2} />
                    <SidebarSection title="State Wise Govt Jobs in India" items={sidebarData.stateWiseJobs} cols={2} />
                    <SidebarSection title="Govt Recruitment by Category" items={sidebarData.recruitmentByCategory} cols={2} />
                    <SidebarSection title="List of Jobs by Qualification" items={sidebarData.listByQualification} cols={2} />
                </div>
            </div>
        </div>
    );
}
