'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [adding, setAdding] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.name) return;
        setAdding(true);

        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });

            if (res.ok) {
                setNewCategory({ name: '' });
                fetchCategories();
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setAdding(true); // Reset adding state
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This will remove this category from all jobs.')) return;

        try {
            const res = await fetch(`/api/admin/categories/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="max-w-full mx-auto space-y-8">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Category Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Add and manage job categories for your portal</p>
                </div>
            </div>

            {/* Quick Add Section */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-sm font-bold text-gray-600 px-1">New Category Name</label>
                        <input 
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ name: e.target.value })}
                            placeholder="e.g. UPSC Jobs, Engineering Jobs"
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={adding}
                        className="bg-[#1976D2] hover:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all disabled:opacity-50 whitespace-nowrap active:scale-95"
                    >
                        {adding ? 'Adding...' : '＋ Add Category'}
                    </button>
                </form>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-gray-400">Loading categories...</div>
                ) : categories.map((cat) => (
                    <CategoryCard key={cat.id} cat={cat} onDelete={handleDelete} />
                ))}

                {!loading && categories.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <span className="text-4xl block mb-4">📂</span>
                        <p className="text-gray-400 font-medium">No categories found. Start by adding one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-component for individual Category Card with Menu
function CategoryCard({ cat, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Auto-close menu when clicking anywhere else
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all relative overflow-visible min-h-[80px]">
            <div className="flex-1 pr-4">
                <h3 className="font-bold text-lg text-gray-800 break-words">{cat.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Category ID: {cat.id}</p>
            </div>

            {/* Actions Menu Container */}
            <div className="flex items-center gap-4 relative" ref={menuRef}>
                {/* Floating Capsule Menu */}
                <div className={`absolute right-12 flex items-center gap-2 bg-white border border-gray-100 shadow-2xl rounded-full px-3 py-1.5 z-50 transition-all duration-300 transform ${
                    menuOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-90 pointer-events-none'
                }`}>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#475569] hover:text-[#1976D2] transition-colors" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 text-[#475569] transition-colors" title="Stats">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                    <button 
                        onClick={() => { onDelete(cat.id); setMenuOpen(false); }}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 text-red-500 transition-colors" 
                        title="Delete"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>

                {/* Three Dots Button */}
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`w-6 h-9 rounded-lg flex flex-col items-center justify-center gap-[3px] transition-all ${
                        menuOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <div className="w-[3.5px] h-[3.5px] bg-current rounded-full"></div>
                    <div className="w-[3.5px] h-[3.5px] bg-current rounded-full"></div>
                    <div className="w-[3.5px] h-[3.5px] bg-current rounded-full"></div>
                </button>
            </div>
        </div>
    );
}
