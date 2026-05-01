'use client';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
// import { categories, educationVacancies, postWiseRecruitment, sarkariResultSections, sarkariResultInfo, images, allSearchableItems, sidebarData } from '@/data/assets';
// import { govtJobsList } from '@/data/jobsData';


// Create the context
export const ShopContext = createContext();

// Custom hook for using the context
export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopContextProvider');
    }
    return context;
};

// Context Provider Component
export const ShopContextProvider = ({ children }) => {
    // Search state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Search functions
    const openSearch = () => {
        setIsSearchOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scroll when search is open
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        document.body.style.overflow = 'unset'; // Re-enable scroll
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Handle search submission logic here
            console.log('Searching for:', searchQuery);
            // You can add navigation to search results page here
        }
    };

    // Live search results from database
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchQuery.trim() || searchQuery.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchResults, 300); // Debounce search
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // All data and logic can be managed here
    const value = {
        // Search state and functions
        isSearchOpen,
        searchQuery,
        searchResults,
        isLoading,
        openSearch,
        closeSearch,
        handleSearchChange,
        handleSearchSubmit,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
