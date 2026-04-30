'use client';

export default function CommentForm() {
    return (
        <div className="mt-8">
            <h3 className="font-medium text-gray-700 mb-2">Leave a Comment</h3>
            <textarea className="w-full border border-gray-300 p-2 rounded h-24 mb-2" placeholder="Start the discussion..."></textarea>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input type="text" placeholder="Name *" className="border border-gray-300 p-2 rounded" />
                <input type="email" placeholder="Email *" className="border border-gray-300 p-2 rounded" />
                <input type="text" placeholder="Website" className="border border-gray-300 p-2 rounded" />
            </div>
            <button className="bg-black text-white px-4 py-2 text-sm font-bold shadow-md hover:bg-gray-800">Post Comment</button>
        </div>
    );
}
