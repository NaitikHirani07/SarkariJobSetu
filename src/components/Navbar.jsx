'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';

const Navbar = ({ categories = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGovtJobsOpen, setIsGovtJobsOpen] = useState(false);
    const { isSearchOpen, searchQuery, searchResults, openSearch, closeSearch, handleSearchChange, handleSearchSubmit } = useShop();
    const searchInputRef = useRef(null);
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleGovtJobs = () => setIsGovtJobsOpen(!isGovtJobsOpen);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [isSearchOpen]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape' && isSearchOpen) closeSearch(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isSearchOpen, closeSearch]);

    const handleResultClick = (link) => { closeSearch(); router.push(link); };

    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'category': return 'bg-blue-500';
            case 'education': return 'bg-green-500';
            case 'menu': return 'bg-orange-500';
            case 'post': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'category': return 'Category';
            case 'education': return 'Education';
            case 'menu': return 'Menu';
            case 'post': return 'Post';
            default: return 'Other';
        }
    };

    return (
        <>
            <nav className="bg-[#1976D2] shadow-lg sticky top-0 z-40">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-yellow-400 text-2xl font-bold tracking-wide">Sabhi</span>
                                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded ml-1 font-medium">JOBS</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link href="/" className="text-white bg-[#1565C0] px-4 py-2 text-sm font-medium hover:bg-[#1565C0] transition-colors">Home</Link>
                            <div className="relative group">
                                <button className="text-white px-4 py-2 text-sm font-medium flex items-center hover:bg-[#1565C0] transition-colors" onMouseEnter={() => setIsGovtJobsOpen(true)} onMouseLeave={() => setIsGovtJobsOpen(false)}>
                                    Govt Jobs
                                    <svg className={`ml-1 w-4 h-4 transition-transform ${isGovtJobsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <div className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-200 ${isGovtJobsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onMouseEnter={() => setIsGovtJobsOpen(true)} onMouseLeave={() => setIsGovtJobsOpen(false)}>
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <Link key={cat.id} href={cat.link} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">{cat.name}</Link>
                                        ))
                                    ) : (
                                        <>
                                            <Link href="/railway-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Railway Jobs</Link>
                                            <Link href="/bank-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Bank Jobs</Link>
                                            <Link href="/defence-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Defence Jobs</Link>
                                            <Link href="/police-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Police Jobs</Link>
                                            <Link href="/teaching-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Teaching Jobs</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Link href="/sarkari-result" className="text-white px-4 py-2 text-sm font-medium hover:bg-[#1565C0] transition-colors">Sarkari Result</Link>
                            <Link href="/central-govt-jobs" className="text-white px-4 py-2 text-sm font-medium hover:bg-[#1565C0] transition-colors">Central Govt Jobs</Link>
                            <button onClick={openSearch} className="text-white p-2 hover:bg-[#1565C0] transition-colors rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        <div className="md:hidden flex items-center gap-2">
                            <button onClick={openSearch} className="text-white p-2 hover:bg-[#1565C0] transition-colors rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            <button onClick={toggleMenu} className="text-white p-2 rounded-md hover:bg-[#1565C0] focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-4 pt-2 pb-4 space-y-1 bg-[#1976D2]">
                        <Link href="/" className="block text-white bg-[#1565C0] px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <div>
                            <button onClick={toggleGovtJobs} className="w-full text-left text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#1565C0] flex items-center justify-between">
                                Govt Jobs
                                <svg className={`w-4 h-4 transition-transform ${isGovtJobsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className={`pl-4 space-y-1 transition-all duration-200 ${isGovtJobsOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <Link key={cat.id} href={cat.link} className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>{cat.name}</Link>
                                    ))
                                ) : (
                                    <>
                                        <Link href="/railway-jobs" className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>Railway Jobs</Link>
                                        <Link href="/bank-jobs" className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>Bank Jobs</Link>
                                        <Link href="/defence-jobs" className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>Defence Jobs</Link>
                                        <Link href="/police-jobs" className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>Police Jobs</Link>
                                        <Link href="/teaching-jobs" className="block text-white/80 px-3 py-2 text-sm hover:text-white hover:bg-[#1565C0] rounded-md" onClick={() => setIsMenuOpen(false)}>Teaching Jobs</Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <Link href="/sarkari-result" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#1565C0]" onClick={() => setIsMenuOpen(false)}>Sarkari Result</Link>
                        <Link href="/central-govt-jobs" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#1565C0]" onClick={() => setIsMenuOpen(false)}>Central Govt Jobs</Link>
                    </div>
                </div>
            </nav>
            {/* Search Overlay */}
            <SearchOverlay searchInputRef={searchInputRef} isSearchOpen={isSearchOpen} closeSearch={closeSearch} searchQuery={searchQuery} searchResults={searchResults} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} handleResultClick={handleResultClick} getTypeBadgeColor={getTypeBadgeColor} getTypeLabel={getTypeLabel} />
        </>
    );
};

const SearchOverlay = ({ searchInputRef, isSearchOpen, closeSearch, searchQuery, searchResults, handleSearchChange, handleSearchSubmit, handleResultClick, getTypeBadgeColor, getTypeLabel }) => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-[#1976D2] to-[#1565C0] shadow-2xl transition-all duration-300 ease-out transform ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <button onClick={closeSearch} className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6">Search Jobs</h2>
                <form onSubmit={handleSearchSubmit} className="relative">
                    <input ref={searchInputRef} type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for government jobs, results, notifications..." className="w-full px-6 py-4 sm:py-5 text-lg sm:text-xl rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg" />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FF9800] hover:bg-[#F57C00] text-white p-3 sm:p-4 rounded-full transition-colors shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </form>
                {searchQuery.trim() && (
                    <div className="mt-4">
                        {searchResults.length > 0 ? (
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                                <div className="p-2">
                                    <p className="text-xs text-gray-500 px-3 py-2">Found {searchResults.length} result{searchResults.length > 1 ? 's' : ''}</p>
                                    {searchResults.map((result, index) => (
                                        <button key={`${result.type}-${result.id}-${index}`} onClick={() => handleResultClick(result.link)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl transition-colors text-left group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">{result.name}</p>
                                                    {result.category && <p className="text-xs text-gray-500">{result.category}</p>}
                                                </div>
                                            </div>
                                            <span className={`text-xs text-white px-2 py-1 rounded-full ${getTypeBadgeColor(result.type)}`}>{getTypeLabel(result.type)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/10 rounded-2xl p-6 text-center">
                                <svg className="w-12 h-12 text-white/50 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-white/70">No results found for &quot;{searchQuery}&quot;</p>
                                <p className="text-white/50 text-sm mt-1">Try different keywords</p>
                            </div>
                        )}
                    </div>
                )}
                {!searchQuery.trim() && (
                    <div className="mt-8 text-center">
                        <p className="text-white/70 text-sm mb-3">Popular Searches:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {['Railway Jobs', 'Bank Jobs', 'SSC', 'UPSC', 'Defence Jobs', 'Teaching Jobs'].map((term) => (
                                <button key={term} onClick={() => handleSearchChange({ target: { value: term } })} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">{term}</button>
                            ))}
                        </div>
                    </div>
                )}
                <p className="text-white/50 text-sm text-center mt-6">Press <span className="px-2 py-1 bg-white/10 rounded text-white/70">ESC</span> to close</p>
            </div>
        </div>
    </div>
);

export default Navbar;
