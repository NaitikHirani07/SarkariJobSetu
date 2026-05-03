'use client';

import { useState } from 'react';

export default function ImageUpload({ value, onChange }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview immediately
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                onChange(data.url); // Pass Cloudinary URL back to parent
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Something went wrong during upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-bold text-gray-600 px-1">Recruitment Banner / Logo</label>
            
            <div className={`relative border-2 border-dashed rounded-[2rem] transition-all overflow-hidden ${
                preview ? 'border-blue-200 bg-blue-50/10' : 'border-gray-200 hover:border-blue-400 bg-gray-50/50'
            }`}>
                {preview ? (
                    <div className="relative group aspect-video md:aspect-[21/9]">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <label className="bg-white text-gray-800 px-6 py-2.5 rounded-xl font-bold cursor-pointer hover:bg-gray-100 transition-all">
                                Change Image
                                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                            </label>
                            <button 
                                onClick={() => { setPreview(null); onChange(''); }}
                                className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                            📸
                        </div>
                        <p className="font-bold text-gray-700">Click to upload recruitment image</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-bold text-blue-600">Uploading to Cloudinary...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
