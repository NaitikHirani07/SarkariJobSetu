'use client';

import { useState, useEffect } from 'react';

export default function QuickLinksManager() {
    const [educationItems, setEducationItems] = useState([]);
    const [postItems, setPostItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('education'); // 'education' or 'post'
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', link: '' });

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [eduRes, postRes] = await Promise.all([
                fetch('/api/admin/education-vacancies'),
                fetch('/api/admin/post-wise-recruitment')
            ]);
            if (eduRes.ok) setEducationItems(await eduRes.json());
            if (postRes.ok) setPostItems(await postRes.json());
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = activeTab === 'education' ? 'education-vacancies' : 'post-wise-recruitment';
        const method = editingItem ? 'PUT' : 'POST';
        const url = editingItem ? `/api/admin/${endpoint}/${editingItem.id}` : `/api/admin/${endpoint}`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setModalOpen(false);
                setEditingItem(null);
                setFormData({ name: '', link: '' });
                fetchAll();
            }
        } catch (error) {
            alert('Failed to save item');
        }
    };

    const handleDelete = async (id, type) => {
        if (!confirm('Are you sure you want to delete this link?')) return;
        const endpoint = type === 'education' ? 'education-vacancies' : 'post-wise-recruitment';
        try {
            const res = await fetch(`/api/admin/${endpoint}/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAll();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const openEdit = (item, type) => {
        setEditingItem(item);
        setFormData({ name: item.name, link: item.link });
        setActiveTab(type);
        setModalOpen(true);
    };

    const currentItems = activeTab === 'education' ? educationItems : postItems;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Homepage Quick Links</h1>
                    <p className="text-gray-500 mt-1">Manage Education-wise and Post-wise navigation links</p>
                </div>
                <button 
                    onClick={() => { setEditingItem(null); setFormData({ name: '', link: '' }); setModalOpen(true); }}
                    className="bg-[#1976D2] hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2 justify-center"
                >
                    <span>➕</span> Add New Link
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab('education')}
                    className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'education' ? 'bg-white text-[#1976D2] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Education Vacancies
                </button>
                <button 
                    onClick={() => setActiveTab('post')}
                    className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'post' ? 'bg-white text-[#1976D2] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Post Wise Recruitment
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Link Display Name</th>
                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">URL Destination</th>
                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan="3" className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                                </tr>
                            ))
                        ) : currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-medium">
                                    No links found in this category. Click "Add New Link" to get started.
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-800">{item.name}</div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <code className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-medium">{item.link}</code>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEdit(item, activeTab)} className="bg-white hover:bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-gray-100 transition-all shadow-sm">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(item.id, activeTab)} className="bg-white hover:bg-red-50 text-red-500 p-2.5 rounded-xl border border-gray-100 transition-all shadow-sm">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-[#1976D2] p-8 text-white">
                            <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'Add New'} Quick Link</h2>
                            <p className="opacity-80 text-sm mt-1">
                                {activeTab === 'education' ? 'Configure Education-wise link' : 'Configure Post-wise link'}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Display Label</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    placeholder={activeTab === 'education' ? 'e.g. 10th Pass Jobs' : 'e.g. Clerk Vacancy'} 
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Target URL</label>
                                <input 
                                    type="text" 
                                    value={formData.link} 
                                    onChange={e => setFormData({...formData, link: e.target.value})} 
                                    placeholder="e.g. /10th-pass-govt-jobs" 
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                                    required 
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95">
                                    {editingItem ? 'Save Changes' : 'Add Link'}
                                </button>
                                <button type="button" onClick={() => setModalOpen(false)} className="px-8 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
