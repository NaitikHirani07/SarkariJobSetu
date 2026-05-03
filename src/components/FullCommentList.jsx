'use client';

import { useState, useEffect } from 'react';

export default function FullCommentList({ initialComments }) {
    const [visibleCount, setVisibleCount] = useState(2);
    const [mounted, setMounted] = useState(false);
    const commentsPerPage = 2;

    useEffect(() => {
        setMounted(true);
    }, []);

    const showMore = () => {
        setVisibleCount(prev => prev + commentsPerPage);
    };

    const formatDate = (dateString) => {
        if (!mounted) return null;
        return new Date(dateString).toLocaleDateString(undefined, { dateStyle: 'long' });
    };

    const displayedComments = initialComments.slice(0, visibleCount);
    const hasMore = visibleCount < initialComments.length;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span>All Comments</span>
                <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-lg text-sm">{initialComments.length}</span>
            </h2>

            {initialComments.length === 0 ? (
                <div className="bg-white p-10 rounded-xl text-center text-gray-400 border border-dashed border-gray-200">
                    No approved comments yet.
                </div>
            ) : (
                <div className="space-y-6">
                    {displayedComments.map((comment) => (
                        <div key={comment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {comment.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-bold text-gray-800">{comment.name}</span>
                                </div>
                                <span className="text-xs text-gray-400 min-h-[1rem]">
                                    {formatDate(comment.createdAt)}
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed pl-10 border-l-2 border-gray-50 italic">
                                "{comment.content}"
                            </p>

                            {/* Replies - Shown inside the parent block */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} className="bg-gray-50/80 p-4 rounded-lg border-l-4 border-blue-600 ml-6 sm:ml-12">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-900 text-xs sm:text-sm">
                                                        Admin Reply
                                                    </span>
                                                    <span className="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase">Official</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400">{formatDate(reply.createdAt)}</span>
                                            </div>
                                            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                                {reply.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {hasMore && (
                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={showMore}
                                className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-all active:scale-95"
                            >
                                Load More Comments ({initialComments.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
