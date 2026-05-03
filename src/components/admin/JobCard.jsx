'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import JobViewModal from './JobViewModal';

export default function JobCard({ job }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const menuRef = useRef(null);
    const firstCategory = job.categories[0]?.category?.name || 'General';
    
    // Robust date check
    const isExpiredCheck = () => {
        if (!job.lastDate) return false;
        try {
            const parts = job.lastDate.split(/[-/]/);
            if (parts.length !== 3) return false;
            let day, month, year;
            if (parts[0].length === 4) {
                [year, month, day] = parts;
            } else {
                [day, month, year] = parts;
            }
            const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
            return expiryDate < new Date();
        } catch (e) {
            return false;
        }
    };
    
    const isExpired = isExpiredCheck();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col h-full group transition-all hover:shadow-md">
            {/* Top Blue Border */}
            <div className="h-1.5 bg-[#1976D2] w-full"></div>

            <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-xl font-extrabold text-gray-800 leading-tight">{job.organization}</h3>
                        <p className="text-[#1976D2] font-medium text-sm">
                            {job.startDate || 'Started'} to {job.lastDate}
                        </p>
                    </div>
                    
                    {/* Three Dots Menu */}
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in duration-200">
                                <Link 
                                    href={`/admin/jobs/edit/${job.id}`}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#1976D2] transition-colors"
                                >
                                    <span>✏️</span> Edit
                                </Link>
                                <button 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <span>🗑️</span> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <span className="text-gray-400">🎗️</span>
                        <span className="font-medium text-gray-600 flex gap-1">
                            Type : <span className="text-gray-400 font-normal">{firstCategory}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <span className="text-gray-400">📅</span>
                        <span className="font-medium text-gray-600">ID: {job.id}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="pt-1">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                        isExpired 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-[#00BFA5] text-white shadow-sm shadow-emerald-100'
                    }`}>
                        {isExpired ? 'EXPIRED' : 'APPROVED'}
                    </span>
                </div>
            </div>

            {/* Bottom Link */}
            <div className="p-4 border-t border-gray-50 text-center bg-gray-50/30">
                <button 
                    onClick={() => setShowViewModal(true)}
                    className="w-full text-[#1976D2] font-bold text-sm hover:underline flex items-center justify-center gap-2 group/link transition-all"
                >
                    View Details <span className="group-hover/link:translate-x-1 transition-transform">›</span>
                </button>
            </div>

            {/* View Modal */}
            {showViewModal && (
                <JobViewModal job={job} onClose={() => setShowViewModal(false)} />
            )}
        </div>
    );
}
