'use client';

import { useState } from 'react';

export default function CommentForm({ jobId }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        comment: '',
        name: '',
        email: '',
        website: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, jobId })
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ comment: '', name: '', email: '', website: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-12 bg-[#F8FAFC] p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Leave a Comment</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Your Discussion</label>
                    <textarea 
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400 bg-white" 
                        placeholder="Type your question or feedback here..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Name *</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full Name" 
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-700" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email *</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="email@example.com" 
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-700" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Website (Optional)</label>
                        <input 
                            type="text" 
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://" 
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-700" 
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1976D2] hover:bg-[#1565C0] active:scale-95'} text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all flex items-center gap-2`}
                    >
                        <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
                        {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                    </button>
                </div>
            </form>
            
            {submitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 animate-in fade-in duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium">Thank you! Your comment has been submitted and is awaiting approval.</span>
                </div>
            )}
            
            <p className="mt-4 text-xs text-gray-500 italic ml-1">Your email address will not be published. Required fields are marked *</p>
        </div>
    );
}
