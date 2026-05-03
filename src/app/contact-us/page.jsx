'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] py-16 px-[40px]">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Get In Touch
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Have questions about a job notification or need help with our platform? 
                        We're here to help you navigate your government career journey.
                    </p>
                </div>

                {/* Main Contact Card */}
                <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                    
                    {/* Left Side: Contact Information */}
                    <div className="lg:w-[400px] bg-[#1976D2] py-12 px-8 text-white relative overflow-hidden flex flex-col justify-between">
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-white/80 mb-12 leading-relaxed">
                                Feel free to reach out to us. We typically respond within working 7 days.
                            </p>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">Email Support</p>
                                        <a href="mailto:jobcareeracademy0728@gmail.com" className="font-semibold text-lg transition-all hover:text-white/80">
                                            jobcareeracademy0728@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">Official Website</p>
                                        <a href="https://www.sarkarijobsetu.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-lg transition-all hover:text-white/80">
                                            www.sarkarijobsetu.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">Location</p>
                                        <p className="font-semibold text-lg">Gujarat, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/20 text-sm text-white/60">
                            SarkariJobSetu – Your Bridge to Government Jobs 🚀
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="flex-1 p-12 lg:p-16">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {status.message && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="relative">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe" 
                                        className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#1976D2] transition-colors bg-transparent text-gray-800 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your Email</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="hello@example.com" 
                                        className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#1976D2] transition-colors bg-transparent text-gray-800 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="I have a question about..." 
                                    className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#1976D2] transition-colors bg-transparent text-gray-800 font-medium placeholder:text-gray-300"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-xs font-bold text-[#1976D2] uppercase tracking-widest mb-2 block">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4" 
                                    placeholder="Write here your message..." 
                                    className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#1976D2] transition-colors bg-transparent text-gray-800 font-medium placeholder:text-gray-300 resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className={`bg-[#EF5350] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-100 hover:bg-[#d32f2f] hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

