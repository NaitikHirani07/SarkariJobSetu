'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CommentList({ jobId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comments?jobId=${jobId || ''}`, { cache: 'no-store' });
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [jobId]);

    if (loading) return <div className="p-4 text-center text-xs text-gray-400 italic">Loading discussion...</div>;
    
    if (comments.length === 0) return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 text-center text-xs text-gray-400 italic">
            No discussions yet. Be the first to comment!
        </div>
    );

    const formatDate = (dateString) => {
        if (!mounted) return null;
        return new Date(dateString).toLocaleDateString();
    };

    const displayedComments = comments.slice(0, 2);

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            <div className="bg-gray-100 p-2 font-bold text-xs uppercase text-gray-800 border-b border-gray-200 flex justify-between items-center">
                <span>User Discussion</span>
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[9px]">{comments.length}</span>
            </div>
            <div className="p-3 space-y-4">
                {displayedComments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-[#1976D2] text-[11px]">{comment.name}</span>
                            <span className="text-[9px] text-gray-400">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed italic">"{comment.content}"</p>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-3 ml-4 space-y-3 border-l-2 border-blue-100 pl-3">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="bg-blue-50/50 p-2 rounded">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-blue-700 text-[10px] flex items-center gap-1">
                                                <span className="bg-blue-600 text-white text-[8px] px-1 rounded">ADMIN</span> {reply.name}
                                            </span>
                                            <span className="text-[8px] text-gray-400">{formatDate(reply.createdAt)}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-600 leading-relaxed">{reply.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {comments.length > 2 && (
                <Link 
                    href={`/job-details/${jobId}/comments`} 
                    className="block text-center p-2 bg-blue-50 text-[#1976D2] text-[11px] font-bold hover:bg-blue-100 transition-colors border-t border-gray-100"
                >
                    Read all {comments.length} discussions →
                </Link>
            )}
        </div>
    );
}
