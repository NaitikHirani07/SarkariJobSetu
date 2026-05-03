'use client';

import { useEffect } from 'react';

export default function JobViewModal({ job, onClose }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    if (!job) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#1976D2] text-white">
                    <div>
                        <h2 className="text-2xl font-black">{job.organization}</h2>
                        <p className="text-blue-100 font-medium">Job Preview - ID: {job.id}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-colors text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    
                    {/* Recruitment Image */}
                    {job.image && (
                        <div className="w-full rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm aspect-video md:aspect-[21/9]">
                            <img src={job.image} alt="Recruitment Banner" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Hero Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoBox label="Post Name" value={job.postName} icon="📋" />
                        <InfoBox label="Total Vacancy" value={job.vacancy} icon="👥" />
                        <InfoBox label="Last Date" value={job.lastDate} icon="⏰" color="text-red-500" />
                    </div>

                    {/* Specifications */}
                    <div className="space-y-6">
                        <SectionTitle title="Detailed Specifications" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                            <DetailRow label="Qualification" value={job.qualification} />
                            <DetailRow label="Salary" value={job.salary || 'Not Specified'} />
                            <DetailRow label="Age Limit" value={job.ageLimit || 'As per rules'} />
                            <DetailRow label="Exam Date" value={job.examDate || 'To be announced'} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <SectionTitle title="Post Description" />
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
                            {job.postDescription}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <SectionTitle title="Assigned Categories" />
                        <div className="flex flex-wrap gap-2">
                            {job.categories?.map((c, i) => (
                                <span key={i} className="px-5 py-2 bg-blue-50 text-[#1976D2] rounded-full font-bold text-sm">
                                    {c.category?.name || 'Category'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-10 py-3.5 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-700 transition-all active:scale-95"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
}

function InfoBox({ label, value, icon, color = "text-gray-800" }) {
    return (
        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{label}</p>
                <p className={`font-extrabold ${color}`}>{value}</p>
            </div>
        </div>
    );
}

function SectionTitle({ title }) {
    return (
        <div className="flex items-center gap-4">
            <div className="h-px bg-gray-100 flex-1"></div>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">{title}</h3>
            <div className="h-px bg-gray-100 flex-1"></div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="space-y-1">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{label}</p>
            <p className="font-extrabold text-gray-800 text-lg">{value}</p>
        </div>
    );
}
