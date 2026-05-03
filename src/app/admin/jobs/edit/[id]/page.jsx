'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditJobPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const jobId = params.id;

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        organization: '',
        postName: '',
        qualification: '',
        vacancy: '',
        lastDate: '',
        title: '',
        postDescription: '',
        salary: '',
        ageLimit: '',
        startDate: '',
        examDate: '',
        image: '',
        categoryIds: [],
        notifications: [{ label: '', value: '' }],
        links: [{ label: '', url: '' }],
        selectionProcess: [{ step: '' }],
        ageRelaxations: [{ rule: '' }],
        applicationFees: [{ fee: '' }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const catRes = await fetch('/api/admin/categories');
                const catData = await catRes.json();
                setCategories(catData);

                // Fetch job data
                const jobRes = await fetch(`/api/admin/jobs/${jobId}`);
                if (jobRes.ok) {
                    const jobData = await jobRes.json();
                    
                    // Map existing data to form state
                    setFormData({
                        ...jobData,
                        categoryIds: jobData.categories.map(c => c.categoryId),
                        notifications: jobData.notifications.length > 0 ? jobData.notifications : [{ label: '', value: '' }],
                        links: jobData.links.length > 0 ? jobData.links : [{ label: '', url: '' }],
                        selectionProcess: jobData.selectionProcess.length > 0 ? jobData.selectionProcess : [{ step: '' }],
                        ageRelaxations: jobData.ageRelaxations.length > 0 ? jobData.ageRelaxations : [{ rule: '' }],
                        applicationFees: jobData.applicationFees.length > 0 ? jobData.applicationFees : [{ fee: '' }]
                    });
                } else {
                    router.push('/admin/jobs');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [jobId, router]);

    const handleCategoryToggle = (id) => {
        setFormData(prev => ({
            ...prev,
            categoryIds: prev.categoryIds.includes(id)
                ? prev.categoryIds.filter(cId => cId !== id)
                : [...prev.categoryIds, id]
        }));
    };

    const addField = (field, defaultValue) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultValue] }));
    };

    const removeField = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const updateDynamicField = (field, index, subField, value) => {
        setFormData(prev => {
            const newList = [...prev[field]];
            if (subField) newList[index][subField] = value;
            else newList[index] = value;
            return { ...prev, [field]: newList };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/jobs/${jobId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/jobs');
                router.refresh();
            } else {
                alert('Failed to update job');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center text-gray-400">Loading job data...</div>;

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20 px-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Edit Job Post</h1>
                    <p className="text-gray-500 mt-1">Modify the details for Job ID: {jobId}</p>
                </div>
                <Link href="/admin/jobs" className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2">
                    ← Back to List
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* 1. Basic Information */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-4">Basic Details</h2>
                    
                    <ImageUpload 
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Organization Name</label>
                            <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Post Name</label>
                            <input type="text" value={formData.postName} onChange={e => setFormData({...formData, postName: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Total Vacancy</label>
                            <input type="text" value={formData.vacancy} onChange={e => setFormData({...formData, vacancy: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Last Date (DD/MM/YYYY)</label>
                            <input type="text" value={formData.lastDate} onChange={e => setFormData({...formData, lastDate: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
                        </div>
                    </div>
                </section>

                {/* 2. Categories Selection */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-4">Job Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryToggle(cat.id)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                                    formData.categoryIds.includes(cat.id)
                                    ? 'bg-[#1976D2] text-white shadow-lg shadow-blue-100'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. Detailed Information */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-4">Full Specifications</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 px-1">Display Title (Public)</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 px-1">Detailed Description</label>
                        <textarea value={formData.postDescription} onChange={e => setFormData({...formData, postDescription: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium min-h-[150px]" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-sm font-bold text-gray-600 px-1">Qualification</label><input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50" /></div>
                        <div className="space-y-2"><label className="text-sm font-bold text-gray-600 px-1">Salary Range</label><input type="text" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50" /></div>
                    </div>
                </section>

                {/* Submit Actions */}
                <div className="flex gap-4">
                    <button type="submit" disabled={saving} className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50 text-lg">
                        {saving ? 'Saving Changes...' : '💾 Update Job Post'}
                    </button>
                    <Link href="/admin/jobs" className="px-10 bg-gray-100 hover:bg-gray-200 text-gray-600 py-5 rounded-[2rem] font-bold transition-all flex items-center">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
