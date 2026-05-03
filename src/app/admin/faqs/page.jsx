'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminFAQsPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
    const [adding, setAdding] = useState(false);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/admin/faqs');
            if (res.ok) {
                const data = await res.json();
                setFaqs(data);
            }
        } catch (error) {
            console.error('Failed to fetch FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleAddFaq = async (e) => {
        e.preventDefault();
        if (!newFaq.question || !newFaq.answer) return;
        setAdding(true);

        try {
            const res = await fetch('/api/admin/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFaq),
            });

            if (res.ok) {
                setNewFaq({ question: '', answer: '' });
                fetchFaqs();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;

        try {
            const res = await fetch(`/api/admin/faqs/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchFaqs();
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">FAQ Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Add and manage Frequently Asked Questions for your users</p>
                </div>
            </div>

            {/* Quick Add FAQ */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <form onSubmit={handleAddFaq} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Question</label>
                            <input 
                                type="text"
                                value={newFaq.question}
                                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                placeholder="e.g. How to apply for Railway jobs?"
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Answer</label>
                            <textarea 
                                value={newFaq.answer}
                                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                placeholder="Provide a clear, detailed answer..."
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium min-h-[56px] resize-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="submit"
                            disabled={adding}
                            className="bg-[#1976D2] hover:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all disabled:opacity-50 whitespace-nowrap active:scale-95"
                        >
                            {adding ? 'Adding...' : '＋ Add FAQ Item'}
                        </button>
                    </div>
                </form>
            </div>

            {/* FAQs List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading FAQs...</div>
                ) : faqs.map((faq) => (
                    <FaqCard key={faq.id} faq={faq} onDelete={handleDelete} />
                ))}

                {!loading && faqs.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <span className="text-4xl block mb-4">❓</span>
                        <p className="text-gray-400 font-medium">No FAQs found. Add your first question above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function FaqCard({ faq, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start justify-between group hover:shadow-md transition-all relative overflow-visible">
            <div className="flex-1 pr-6">
                <h3 className="font-extrabold text-gray-800 text-lg mb-2">Q: {faq.question}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">A: {faq.answer}</p>
            </div>

            {/* Actions Menu */}
            <div className="flex items-center gap-4 relative pt-1" ref={menuRef}>
                <div className={`absolute right-10 flex items-center gap-2 bg-white border border-gray-100 shadow-2xl rounded-full px-3 py-1.5 z-50 transition-all duration-300 transform ${
                    menuOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-90 pointer-events-none'
                }`}>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#475569] hover:text-[#1976D2] transition-colors" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button 
                        onClick={() => { onDelete(faq.id); setMenuOpen(false); }}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 text-red-500 transition-colors" 
                        title="Delete"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>

                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`w-8 h-8 rounded-xl flex flex-col items-center justify-center gap-[3px] transition-all ${
                        menuOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
                </button>
            </div>
        </div>
    );
}
