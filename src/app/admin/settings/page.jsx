'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: '',
        supportEmail: '',
        logoText: '',
        announcementText: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings updated successfully! ✨' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Loading settings...</div>;

    return (
        <div className="max-w-full mx-auto space-y-8 pb-20 px-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">System Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Configure your global website preferences and branding</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-2xl font-bold text-center animate-bounce ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Branding */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">🎨</div>
                            <h2 className="text-xl font-bold text-gray-800">Website Branding</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Site Name</label>
                                <input 
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 px-1">Logo Text</label>
                                <input 
                                    type="text"
                                    value={settings.logoText}
                                    onChange={(e) => setSettings({...settings, logoText: e.target.value})}
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Support Email Address</label>
                            <input 
                                type="email"
                                value={settings.supportEmail}
                                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Announcement Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl">📢</div>
                            <h2 className="text-xl font-bold text-gray-800">Announcement Banner</h2>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 px-1">Banner Text (Scrolling)</label>
                            <textarea 
                                value={settings.announcementText}
                                onChange={(e) => setSettings({...settings, announcementText: e.target.value})}
                                placeholder="Enter a message to show at the top of your website..."
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium min-h-[120px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Info/Actions */}
                <div className="space-y-8">
                    <div className="bg-[#1976D2] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 space-y-6">
                        <h3 className="text-xl font-bold">Save Changes</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Updating these settings will change the information displayed on your public website immediately.
                        </p>
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-white text-[#1976D2] py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-70 shadow-lg"
                        >
                            {saving ? 'Saving...' : '💾 Update Settings'}
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-800">Admin Security</h3>
                        <p className="text-gray-500 text-sm">
                            To update your Admin Password or Email OTP settings, please modify the <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">.env</code> file directly for maximum security.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
