'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sidebarData } from '@/data/assets';
import { useShop } from '@/context/ShopContext';

const JobPageTemplate = ({ category, title, description, jobs = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
    const { openSearch } = useShop();
    const totalPages = Math.ceil(jobs.length / postsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">{title}</h1>
                    <div className="text-sm text-gray-700 mb-6 font-medium">
                        <p className="mb-2 italic">{description}</p>
                        <h2 className="text-xl font-bold text-[#1976D2] mt-4">Latest {category || 'Government'} Jobs Vacancy 2026</h2>
                    </div>
                    {currentPosts.length > 0 ? (
                        <div className="space-y-6">
                            {currentPosts.map((job) => (
                                <div key={job.id} className="border border-orange-400 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-[#EF6C00] text-white py-2 px-4 text-center font-bold text-lg uppercase">{job.organization}</div>
                                    <div className="p-0">
                                        <table className="w-full text-sm border-collapse">
                                            <tbody>
                                                <tr className="border-b border-gray-200"><td className="w-1/3 py-2 px-4 font-bold text-black border-r border-gray-200">Post Name</td><td className="py-2 px-4 text-gray-800">{job.postName}</td></tr>
                                                <tr className="border-b border-gray-200 bg-gray-50"><td className="w-1/3 py-2 px-4 font-bold text-black border-r border-gray-200">Qualification</td><td className="py-2 px-4 text-gray-800">{job.qualification}</td></tr>
                                                <tr className="border-b border-gray-200"><td className="w-1/3 py-2 px-4 font-bold text-black border-r border-gray-200">No. of Vacancy</td><td className="py-2 px-4 text-gray-800">{job.vacancy}</td></tr>
                                                <tr className="border-b border-gray-200 bg-gray-50"><td className="w-1/3 py-2 px-4 font-bold text-black border-r border-gray-200">Last Date to Apply</td><td className="py-2 px-4 text-gray-800">{job.lastDate}</td></tr>
                                            </tbody>
                                        </table>
                                        <div className="flex justify-center p-3">
                                            <Link href={`/job-details/${job.id}`} className="bg-[#EF6C00] hover:bg-orange-700 text-white font-bold py-1.5 px-8 rounded shadow text-sm transition-colors inline-block">Apply Now</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">No jobs found for this category.</div>
                    )}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10 mb-4">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 border rounded font-medium text-sm transition-colors ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' : 'bg-white text-[#1976D2] border-[#E3F2FD] hover:bg-[#E3F2FD]'}`}>Previous</button>
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 flex items-center justify-center rounded border font-medium text-sm transition-colors ${currentPage === index + 1 ? 'bg-[#1976D2] text-white border-[#1976D2]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#1976D2] hover:text-[#1976D2]'}`}>{index + 1}</button>
                                ))}
                            </div>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 border rounded font-medium text-sm transition-colors ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' : 'bg-white text-[#1976D2] border-[#E3F2FD] hover:bg-[#E3F2FD]'}`}>Next</button>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                        <div className="bg-gray-100 p-2 font-bold text-sm border-b border-gray-200">Search Govt Jobs Here</div>
                        <div className="p-3">
                            <div className="flex cursor-pointer" onClick={openSearch}>
                                <div className="flex-1 border border-gray-300 px-3 py-1.5 text-sm text-gray-400 bg-white rounded-l">Search...</div>
                                <button className="bg-black text-white px-3 py-1.5 rounded-r">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
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
};

const SidebarSection = ({ title, items, cols = 1 }) => (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="bg-gray-100 p-2 font-bold text-xs uppercase text-gray-800 border-b border-gray-200">{title}</div>
        <div className={`p-1 grid ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-1 gap-y-1`}>
            {items.map((item, index) => (
                <Link key={index} href={item.link} className="text-[11px] font-medium text-blue-600 hover:text-blue-800 border border-blue-100 bg-[#F5F9FF] p-2 text-center hover:bg-blue-100 transition-colors">{item.name}</Link>
            ))}
        </div>
    </div>
);

export { SidebarSection };
export default JobPageTemplate;
