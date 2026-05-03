'use client';

import React, { useState, useEffect } from 'react';

export default function AdminCommentsPage() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const fetchComments = async () => {
        try {
            const res = await fetch('/api/admin/comments');
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleToggleApprove = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/admin/comments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved: !currentStatus })
            });
            if (res.ok) fetchComments();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleReplySubmit = async (parentId, jobId) => {
        if (!replyText.trim()) return;
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: replyText,
                    name: 'Admin',
                    email: 'admin@sarkarirojgarsetu.com',
                    jobId: jobId,
                    parentId: parentId,
                    approved: true
                })
            });
            if (res.ok) {
                setReplyText('');
                setReplyingTo(null);
                fetchComments();
                alert('Reply sent successfully!');
            }
        } catch (error) {
            alert('Failed to send reply');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            const res = await fetch(`/api/admin/comments/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchComments();
        } catch (error) {
            alert('Failed to delete comment');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading comments...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Comment Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Review, approve, and reply to user feedback.</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">
                    Total: {comments.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Comment</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Related Job</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {comments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No comments found.</td>
                                </tr>
                            ) : (
                                [...comments].reverse().map((comment) => (
                                    <React.Fragment key={comment.id}>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-bold text-gray-800">{comment.name}</div>
                                                    {comment.parentId && (
                                                        <span className="bg-purple-100 text-purple-600 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Reply</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500">{comment.email}</div>
                                                {comment.website && <div className="text-[10px] text-blue-400 mt-1 truncate max-w-[150px]">{comment.website}</div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700 line-clamp-2 max-w-xs">{comment.content}</p>
                                                <div className="text-[10px] text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {comment.job ? (
                                                    <div className="text-xs">
                                                        <div className="font-semibold text-blue-600">{comment.job.organization}</div>
                                                        <div className="text-gray-500">{comment.job.postName}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">General Site Comment</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${comment.approved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    {comment.approved ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                        className={`p-2 rounded-lg transition-colors ${replyingTo === comment.id ? 'bg-blue-600 text-white shadow-md' : 'text-blue-500 hover:bg-blue-50'}`}
                                                        title="Reply"
                                                    >
                                                        💬
                                                    </button>
                                                    <button 
                                                        onClick={() => handleToggleApprove(comment.id, comment.approved)}
                                                        className={`p-2 rounded-lg transition-colors ${comment.approved ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                                                        title={comment.approved ? "Unapprove" : "Approve"}
                                                    >
                                                        {comment.approved ? '🚫' : '✅'}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(comment.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {replyingTo === comment.id && (
                                            <tr className="bg-blue-50/50">
                                                <td colSpan="5" className="px-6 py-4">
                                                    <div className="flex gap-3 items-end max-w-2xl mx-auto">
                                                        <div className="flex-1">
                                                            <label className="block text-[10px] font-bold text-blue-600 uppercase mb-1">Reply to {comment.name}</label>
                                                            <textarea 
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                                placeholder="Type your official response..."
                                                                className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[80px]"
                                                            />
                                                        </div>
                                                        <button 
                                                            onClick={() => handleReplySubmit(comment.id, comment.jobId)} 
                                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all mb-1 shadow-sm"
                                                        >
                                                            Send Answer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
