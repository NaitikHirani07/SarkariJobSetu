'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AssetManagerPage() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        icon: '',
        useEmoji: false
    });

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await fetch('/api/admin/asset-categories');
            if (res.ok) {
                const data = await res.json();
                setAssets(data);
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingAsset ? 'PUT' : 'POST';
        const url = editingAsset ? `/api/admin/asset-categories/${editingAsset.id}` : '/api/admin/asset-categories';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setModalOpen(false);
                setEditingAsset(null);
                setFormData({ name: '', link: '', icon: '', useEmoji: false });
                fetchAssets();
            }
        } catch (error) {
            alert('Failed to save asset');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this asset box?')) return;
        try {
            const res = await fetch(`/api/admin/asset-categories/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAssets();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const openEdit = (asset) => {
        setEditingAsset(asset);
        setFormData({
            name: asset.name,
            link: asset.link,
            icon: asset.icon || '',
            useEmoji: asset.useEmoji
        });
        setModalOpen(true);
    };

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20 px-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Homepage Asset Manager</h1>
                    <p className="text-gray-500 mt-1">Manage the icon boxes displayed on your landing page</p>
                </div>
                <button 
                    onClick={() => { setEditingAsset(null); setFormData({ name: '', link: '', icon: '', useEmoji: false }); setModalOpen(true); }}
                    className="bg-[#1976D2] hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span>➕</span> Add New Box
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-3xl animate-pulse" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {assets.map((asset) => (
                        <div key={asset.id} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all border-b-4 border-b-transparent hover:border-b-blue-500">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100 group-hover:scale-110 transition-transform">
                                    {asset.useEmoji ? (
                                        <span className="text-4xl">🏢</span>
                                    ) : (
                                        asset.icon ? (
                                            <img src={asset.icon} alt={asset.name} className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <span className="text-gray-300 text-2xl font-bold">?</span>
                                        )
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg uppercase">{asset.name}</h3>
                                    <p className="text-xs font-medium text-blue-500 mt-1 truncate max-w-[200px]">{asset.link}</p>
                                </div>
                                <div className="flex gap-2 w-full pt-2">
                                    <button onClick={() => openEdit(asset)} className="flex-1 bg-gray-50 hover:bg-blue-50 text-blue-600 py-2.5 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-blue-100">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(asset.id)} className="px-4 bg-gray-50 hover:bg-red-50 text-red-500 py-2.5 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-red-100">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Premium Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-blue-600 p-8 text-white">
                            <h2 className="text-2xl font-bold">{editingAsset ? 'Edit' : 'Add New'} Asset Box</h2>
                            <p className="opacity-80 text-sm mt-1">Configure homepage category card</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Display Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    placeholder="e.g. Railway Jobs" 
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Link URL</label>
                                <input 
                                    type="text" 
                                    value={formData.link} 
                                    onChange={e => setFormData({...formData, link: e.target.value})} 
                                    placeholder="e.g. /railway-jobs" 
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                                    required 
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <input 
                                    type="checkbox" 
                                    id="useEmoji" 
                                    checked={formData.useEmoji} 
                                    onChange={e => setFormData({...formData, useEmoji: e.target.checked})}
                                    className="w-6 h-6 rounded-lg accent-blue-600"
                                />
                                <label htmlFor="useEmoji" className="font-bold text-gray-700 cursor-pointer select-none">
                                    Use Default Icon (Emoji)
                                </label>
                            </div>

                            {!formData.useEmoji && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 px-1">Custom Icon Image</label>
                                    <ImageUpload 
                                        value={formData.icon}
                                        onChange={(url) => setFormData(prev => ({ ...prev, icon: url }))}
                                    />
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95">
                                    {editingAsset ? 'Save Changes' : 'Create Asset Box'}
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
