'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { categories, educationVacancies, postWiseRecruitment, sarkariResultSections, sarkariResultInfo, images, allSearchableItems, sidebarData } from '@/data/assets';
import { govtJobsList } from '@/data/jobsData';


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

    // Live search results - filters items based on search query
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }

        const query = searchQuery.toLowerCase().trim();

        // Filter all searchable items based on the query
        const results = allSearchableItems.filter(item => {
            const name = item.name.toLowerCase();
            const category = item.category?.toLowerCase() || '';

            // Check if query matches name or category
            return name.includes(query) || category.includes(query);
        });

        // Sort results - exact matches first, then partial matches
        results.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStartsWith = aName.startsWith(query);
            const bStartsWith = bName.startsWith(query);

            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return 0;
        });

        // Limit results to 8 items for better UX
        return results.slice(0, 8);
    }, [searchQuery]);

    // All data and logic can be managed here
    const value = {
        // Categories data
        categories,

        // Education Vacancies data
        educationVacancies,

        // Post Wise Recruitment data
        postWiseRecruitment,

        // Sarkari Result Info data
        sarkariResultSections,
        sarkariResultInfo,

        // Images
        images,

        // All searchable items
        allSearchableItems,

        // Govt Jobs data
        govtJobsList,
        sidebarData,


        // Search state and functions
        isSearchOpen,
        searchQuery,
        searchResults,
        openSearch,
        closeSearch,
        handleSearchChange,
        handleSearchSubmit,

        // Helper functions
        getCategoryById: (id) => categories.find((cat) => cat.id === id),
        getCategoryByName: (name) => categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase()),
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
