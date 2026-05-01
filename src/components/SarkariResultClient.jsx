'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SarkariResultClient({ sarkariResults }) {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = (sarkariResults || []).slice(indexOfFirstResult, indexOfLastResult);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!sarkariResults || sarkariResults.length === 0) {
        return (
            <div className="max-w-[1400px] mx-auto px-4 py-8 bg-white min-h-screen text-center">
                <h1 className="text-3xl font-bold mb-6 bg-gray-200 py-3 text-black">Sarkari Results</h1>
                <p className="text-gray-600 mt-10">No results found at the moment. Check back later!</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gray-200 py-3 text-black">Sarkari Results</h1>
            <div className="overflow-x-auto shadow-sm border border-orange-200 rounded-lg">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-[#FFF9C4] text-black font-bold border-b border-orange-200">
                        <tr>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200 min-w-[250px]">Job Title</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">State</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Qualification</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Salary</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200">Important Date</th>
                            <th className="py-3 px-4 font-bold text-black border-r border-orange-200 text-center">Vacancies</th>
                            <th className="py-3 px-4 font-bold text-black text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentResults.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-700 border-r border-gray-200">{result.jobTitle}</td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{result.state}</td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{result.qualification}</td>
                                <td className="py-4 px-4 font-medium text-green-600 border-r border-gray-200">{result.salary}</td>
                                <td className="py-4 px-4 font-medium text-red-600 border-r border-gray-200">{result.importantDate}</td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200 text-center">{result.vacancies}</td>
                                <td className="py-4 px-4 text-center"><Link href={result.link} className="inline-block bg-[#E3F2FD] hover:bg-blue-100 text-[#1976D2] font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-blue-200">Check Result</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {sarkariResults.length > resultsPerPage && (
                <div className="flex justify-center mt-6 gap-2">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>Prev</button>
                    {Array.from({ length: Math.ceil(sarkariResults.length / resultsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={`px-3 py-1 rounded border ${currentPage === index + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>{index + 1}</button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sarkariResults.length / resultsPerPage)} className={`px-3 py-1 rounded border ${currentPage === Math.ceil(sarkariResults.length / resultsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'}`}>Next</button>
                </div>
            )}
            <div className="mt-8 text-center text-gray-500 text-sm">Check back regularly for the latest exam results and merit lists.</div>
        </div>
    );
}
