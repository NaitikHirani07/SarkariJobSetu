'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AddJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
        officialWebsite: '',
        mode: 'Online',
        paymentMode: 'Online',
        howToApply: '',
        selectionProcess: [{ step: '' }],
        ageRelaxations: [{ rule: '' }],
        applicationFees: [{ fee: '' }],
        links: [
            { label: 'Notification Link', url: '' },
            { label: 'Application Link', url: '' },
            { label: 'Official Website', url: '' }
        ],
    });
    const [categories, setCategories] = useState([]);
    const [educationCategories, setEducationCategories] = useState([]);
    const [postCategories, setPostCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Fetch all types of categories from DB on mount
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const [catRes, eduRes, postRes] = await Promise.all([
                    fetch('/api/admin/categories'),
                    fetch('/api/admin/education-vacancies'),
                    fetch('/api/admin/post-wise-recruitment')
                ]);
                
                if (catRes.ok) setCategories(await catRes.json());
                if (eduRes.ok) setEducationCategories(await eduRes.json());
                if (postRes.ok) setPostCategories(await postRes.json());
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchAllCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (catId) => {
        setSelectedCategories(prev => 
            prev.includes(catId) 
                ? prev.filter(id => id !== catId) 
                : [...prev, catId]
        );
    };

    // Helper to handle selection by name for the new dynamic lists
    const handleNameCategoryChange = (name) => {
        // We will pass names to the API, and the API will handle linking them
        setSelectedCategories(prev => 
            prev.includes(name) 
                ? prev.filter(n => n !== name) 
                : [...prev, name]
        );
    };

    const handleDynamicChange = (index, field, value, listName) => {
        const newList = [...formData[listName]];
        newList[index][field] = value;
        setFormData(prev => ({ ...prev, [listName]: newList }));
    };

    const addListItem = (listName, emptyItem) => {
        setFormData(prev => ({ 
            ...prev, 
            [listName]: [...prev[listName], emptyItem] 
        }));
    };

    const removeListItem = (index, listName) => {
        if (formData[listName].length <= 1 && listName !== 'links') return;
        const newList = formData[listName].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [listName]: newList }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, categories: selectedCategories }),
            });

            if (res.ok) {
                router.push('/admin/jobs');
                router.refresh();
            } else {
                alert('Failed to add job');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20 px-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add New Job</h1>
                    <p className="text-gray-500">Create a new government job listing</p>
                </div>
                <Link href="/admin/jobs" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 transition-colors">
                    <span>←</span> Back to List
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Information Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-blue-50 px-8 py-4 border-b border-blue-100">
                        <h2 className="text-blue-700 font-bold flex items-center gap-2">
                            <span>📋</span> 1. Basic Information
                        </h2>
                    </div>
                    <div className="p-8 space-y-8">
                        <ImageUpload 
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Organization Name</label>
                                <input
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    placeholder="e.g. Staff Selection Commission"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Post Name</label>
                                <input
                                    name="postName"
                                    value={formData.postName}
                                    onChange={handleChange}
                                    placeholder="e.g. Multi Tasking Staff"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Qualification</label>
                                <input
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    placeholder="e.g. 10th Pass / Graduate"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Total Vacancy</label>
                                <input
                                    name="vacancy"
                                    value={formData.vacancy}
                                    onChange={handleChange}
                                    placeholder="e.g. 5000+ Posts"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Official Website URL</label>
                                <input
                                    name="officialWebsite"
                                    value={formData.officialWebsite}
                                    onChange={handleChange}
                                    placeholder="e.g. https://ssc.gov.in"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Application Mode</label>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                                >
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Selection Process & Age Relaxation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-rose-50 px-8 py-4 border-b border-rose-100">
                            <h2 className="text-rose-700 font-bold flex items-center gap-2">
                                <span>🎯</span> 2. Selection Process
                            </h2>
                        </div>
                        <div className="p-8 space-y-4">
                            {formData.selectionProcess.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={item.step}
                                        onChange={(e) => handleDynamicChange(idx, 'step', e.target.value, 'selectionProcess')}
                                        placeholder={`Step ${idx + 1}: e.g. Written Exam`}
                                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeListItem(idx, 'selectionProcess')}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={() => addListItem('selectionProcess', { step: '' })}
                                className="w-full py-2 border-2 border-dashed border-rose-200 rounded-xl text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
                            >
                                + Add Step
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-indigo-50 px-8 py-4 border-b border-indigo-100">
                            <h2 className="text-indigo-700 font-bold flex items-center gap-2">
                                <span>⏳</span> 2b. Age Relaxation
                            </h2>
                        </div>
                        <div className="p-8 space-y-4">
                            {formData.ageRelaxations.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={item.rule}
                                        onChange={(e) => handleDynamicChange(idx, 'rule', e.target.value, 'ageRelaxations')}
                                        placeholder="e.g. OBC: 3 Years"
                                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeListItem(idx, 'ageRelaxations')}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={() => addListItem('ageRelaxations', { rule: '' })}
                                className="w-full py-2 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
                            >
                                + Add Rule
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Application Fee & Payment Mode */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-teal-50 px-8 py-4 border-b border-teal-100 flex justify-between items-center">
                        <h2 className="text-teal-700 font-bold flex items-center gap-2">
                            <span>💰</span> 3. Application Fees
                        </h2>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-semibold text-teal-700">Payment Mode:</label>
                            <input 
                                name="paymentMode"
                                value={formData.paymentMode}
                                onChange={handleChange}
                                placeholder="e.g. Online / Net Banking"
                                className="px-4 py-1 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="p-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.applicationFees.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={item.fee}
                                        onChange={(e) => handleDynamicChange(idx, 'fee', e.target.value, 'applicationFees')}
                                        placeholder="e.g. Gen/OBC: Rs. 500/-"
                                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeListItem(idx, 'applicationFees')}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button 
                            type="button"
                            onClick={() => addListItem('applicationFees', { fee: '' })}
                            className="w-full py-2 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 font-semibold hover:bg-teal-50 transition-colors"
                        >
                            + Add Fee Category
                        </button>
                    </div>
                </div>

                {/* 4. Full Description & How to Apply */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-purple-50 px-8 py-4 border-b border-purple-100">
                        <h2 className="text-purple-700 font-bold flex items-center gap-2">
                            <span>📝</span> 4. Detailed Content
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Page Title (SEO)</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. SSC MTS Recruitment 2026 Online Form"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Full Job Description</label>
                                <textarea
                                    name="postDescription"
                                    value={formData.postDescription}
                                    onChange={handleChange}
                                    placeholder="Enter detailed information about the job..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">How to Apply</label>
                                <textarea
                                    name="howToApply"
                                    value={formData.howToApply}
                                    onChange={handleChange}
                                    placeholder="Step by step instructions to apply..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Important Links */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-cyan-50 px-8 py-4 border-b border-cyan-100">
                        <h2 className="text-cyan-700 font-bold flex items-center gap-2">
                            <span>🔗</span> 5. Important Links
                        </h2>
                    </div>
                    <div className="p-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.links.map((link, idx) => (
                                <div key={idx} className="flex gap-2 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <div className="flex-1 space-y-2">
                                        <input
                                            value={link.label}
                                            onChange={(e) => handleDynamicChange(idx, 'label', e.target.value, 'links')}
                                            placeholder="Label (e.g. Apply Online)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                        />
                                        <input
                                            value={link.url}
                                            onChange={(e) => handleDynamicChange(idx, 'url', e.target.value, 'links')}
                                            placeholder="URL (https://...)"
                                            className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => removeListItem(idx, 'links')}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button 
                            type="button"
                            onClick={() => addListItem('links', { label: '', url: '' })}
                            className="w-full py-2 border-2 border-dashed border-cyan-200 rounded-xl text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors"
                        >
                            + Add Link
                        </button>
                    </div>
                </div>

                {/* 6. Important Dates Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-orange-50 px-8 py-4 border-b border-orange-100">
                        <h2 className="text-orange-700 font-bold flex items-center gap-2">
                            <span>📅</span> 6. Important Dates & Details
                        </h2>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Start Date</label>
                            <input
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                placeholder="e.g. 01/05/2026"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Last Date</label>
                            <input
                                name="lastDate"
                                value={formData.lastDate}
                                onChange={handleChange}
                                placeholder="e.g. 31/05/2026"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Salary / Pay Scale</label>
                            <input
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. Rs. 21,700 - 69,100/-"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Age Limit</label>
                            <input
                                name="ageLimit"
                                value={formData.ageLimit}
                                onChange={handleChange}
                                placeholder="e.g. 18 - 27 Years"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* 7. Job Categories Selection */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-emerald-50 px-8 py-4 border-b border-emerald-100">
                        <h2 className="text-emerald-700 font-bold flex items-center gap-2">
                            <span>🏷️</span> 7. Department Categories
                        </h2>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((cat) => (
                                <label 
                                    key={cat.id} 
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                        selectedCategories.includes(cat.id)
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                                        : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <input 
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.id)}
                                        onChange={() => handleCategoryChange(cat.id)}
                                        className="w-4 h-4 rounded accent-emerald-600"
                                    />
                                    <span className="text-sm">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. Education Categories Selection */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-amber-50 px-8 py-4 border-b border-amber-100">
                        <h2 className="text-amber-700 font-bold flex items-center gap-2">
                            <span>🎓</span> 8. Education Categories
                        </h2>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {educationCategories.map((cat) => (
                                <label 
                                    key={cat.id} 
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                        selectedCategories.includes(cat.name)
                                        ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold'
                                        : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <input 
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => handleNameCategoryChange(cat.name)}
                                        className="w-4 h-4 rounded accent-amber-600"
                                    />
                                    <span className="text-sm">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. Post Categories Selection */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-sky-50 px-8 py-4 border-b border-sky-100">
                        <h2 className="text-sky-700 font-bold flex items-center gap-2">
                            <span>🏢</span> 9. Post Wise Categories
                        </h2>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {postCategories.map((cat) => (
                                <label 
                                    key={cat.id} 
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                        selectedCategories.includes(cat.name)
                                        ? 'bg-sky-50 border-sky-200 text-sky-700 font-bold'
                                        : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <input 
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => handleNameCategoryChange(cat.name)}
                                        className="w-4 h-4 rounded accent-sky-600"
                                    />
                                    <span className="text-sm">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-12 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                            loading ? 'bg-blue-300' : 'bg-[#1976D2] hover:bg-blue-700 active:scale-95'
                        }`}
                    >
                        {loading ? 'Saving...' : 'Publish Job'}
                    </button>
                </div>
            </form>
        </div>
    );
}
