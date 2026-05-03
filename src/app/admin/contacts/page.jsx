'use client';

import { useState, useEffect } from 'react';

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const res = await fetch('/api/admin/contacts');
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (error) {
            console.error('Failed to fetch inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchContacts();
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Contact Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage messages received from the Contact Us page</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading inquiries...</div>
                ) : contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} onDelete={handleDelete} />
                ))}

                {!loading && contacts.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <span className="text-4xl block mb-4">✉️</span>
                        <p className="text-gray-400 font-medium">No inquiries found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ContactCard({ contact, onDelete }) {
    const date = new Date(contact.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1976D2] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-blue-50 text-[#1976D2] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {contact.subject}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">
                            {date}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl text-gray-500 font-bold uppercase">
                            {contact.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg leading-none mb-1">{contact.name}</h3>
                            <a href={`mailto:${contact.email}`} className="text-[#1976D2] text-sm hover:underline font-medium">
                                {contact.email}
                            </a>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                        <svg className="absolute -top-3 left-6 w-8 h-8 text-gray-200 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21V18M10.017 21L10.017 18C10.017 16.8954 9.12158 16 8.01697 16H5.01697C3.9124 16 3.01697 16.8954 3.01697 18V21C3.01697 22.1046 3.9124 23 5.01697 23H8.01697C9.12158 23 10.017 22.1046 10.017 21ZM10.017 21V18" />
                        </svg>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            {contact.message}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => onDelete(contact.id)}
                    className="self-end md:self-start bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                    title="Delete Inquiry"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
