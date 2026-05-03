'use client';

import { useEffect, useRef } from 'react';

const AdBanner = ({ slot, format = 'auto', responsive = 'true', className = "" }) => {
    const adRef = useRef(null);

    // This is a placeholder for when you add Google AdSense
    // It will be invisible if no ad is loaded
    return (
        <div 
            className={`ad-container overflow-hidden transition-all duration-300 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4 min-h-[100px] ${className}`}
        >
            <span className="text-[10px] text-gray-400 font-bold tracking-widest mb-2 uppercase">Advertisement Slot</span>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', width: '100%' }}
                data-ad-client="YOUR_CLIENT_ID"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
            <div className="text-[9px] text-gray-300 mt-2">Space for AdSense Code</div>
        </div>
    );
};

export default AdBanner;
