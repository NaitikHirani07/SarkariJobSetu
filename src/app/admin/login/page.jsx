'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, phase: 'INIT' }),
            });

            const data = await res.json();

            if (res.ok && data.otpSent) {
                setOtpSent(true);
            } else {
                setError(data.error || 'Invalid admin password. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, phase: 'VERIFY' }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin/jobs');
                router.refresh();
            } else {
                setError(data.error || 'Invalid or expired OTP.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[#1976D2] py-8 px-10 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-blue-100 text-sm">
                        {otpSent ? 'Enter 2FA Verification Code' : 'Secure Access for Sarkari Rojgar Setu'}
                    </p>
                </div>
                
                <div className="py-10 px-10 space-y-6">
                    {!otpSent ? (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your secure password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 animate-shake">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                                    loading 
                                    ? 'bg-blue-300 cursor-not-allowed' 
                                    : 'bg-[#1976D2] hover:bg-[#1565C0] hover:shadow-blue-200 active:scale-95'
                                }`}
                            >
                                {loading ? 'Checking...' : 'Send OTP Code'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">6-Digit OTP Code</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-bold"
                                    placeholder="000000"
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-2 text-center">Check your registered email for the code</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 animate-shake">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                                    loading 
                                    ? 'bg-green-300 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 hover:shadow-green-200 active:scale-95'
                                }`}
                            >
                                {loading ? 'Verifying...' : 'Enter Dashboard'}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => setOtpSent(false)}
                                className="w-full text-sm text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                ← Back to Password
                            </button>
                        </form>
                    )}
                    
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Authorized Access Only</p>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake { animation: shake 0.3s ease-in-out; }
            `}</style>
        </div>
    );
}
