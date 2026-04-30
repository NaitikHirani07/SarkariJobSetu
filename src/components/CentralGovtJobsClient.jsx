'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CentralGovtJobsClient({ centralGovtJobs }) {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = centralGovtJobs.slice(indexOfFirstResult, indexOfLastResult);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gray-200 py-3 text-black">Central Govt Jobs 2026</h1>
            <div className="overflow-x-auto shadow-sm border border-orange-200 rounded-lg">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-[#FFF9C4] text-black font-bold border-b border-orange-200">
                        <tr>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200 min-w-[250px]">Organization</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Post Name</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Qualification</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Vacancy</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Last Date</th>
                            <th className="py-3 px-4 font-bold text-black text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentResults.length > 0 ? currentResults.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-700 border-r border-gray-200">{job.organization}</td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{job.postName}</td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{job.qualification}</td>
                                <td className="py-4 px-4 font-medium text-green-600 border-r border-gray-200">{job.vacancy}</td>
                                <td className="py-4 px-4 font-medium text-red-600 border-r border-gray-200">{job.lastDate}</td>
                                <td className="py-4 px-4 text-center"><Link href={`/job-details/${job.id}`} className="inline-block bg-[#EF6C00] hover:bg-orange-700 text-white font-semibold py-1.5 px-4 rounded text-xs transition-colors">Apply Now</Link></td>
                            </tr>
                        )) : (<tr><td colSpan="6" className="py-8 text-center text-gray-500">No Central Government jobs available at this time.</td></tr>)}
                    </tbody>
                </table>
            </div>
            {centralGovtJobs.length > resultsPerPage && (
                <div className="flex justify-center mt-6 gap-2">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>Prev</button>
                    {Array.from({ length: Math.ceil(centralGovtJobs.length / resultsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={`px-3 py-1 rounded border ${currentPage === index + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>{index + 1}</button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(centralGovtJobs.length / resultsPerPage)} className={`px-3 py-1 rounded border ${currentPage === Math.ceil(centralGovtJobs.length / resultsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>Next</button>
                </div>
            )}
            <div className="mt-8 text-center text-gray-500 text-sm">Check back regularly for the latest Central Government job notifications.</div>
        </div>
    );
}
