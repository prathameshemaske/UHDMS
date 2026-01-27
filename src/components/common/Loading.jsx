import React from 'react';
import { useLocation } from 'react-router-dom';

const Loading = ({ type }) => {
    const location = useLocation();

    // Determine type based on path if not provided
    const loadingType = type || (
        location.pathname.includes('/employees') || location.pathname.includes('/teams') ? 'employee' :
            location.pathname.includes('/inbox') || location.pathname.includes('/chat') ? 'communication' :
                location.pathname.includes('/my-tasks') || location.pathname.includes('/deployment') ? 'task' :
                    'default'
    );

    const renderContent = () => {
        switch (loadingType) {
            case 'employee':
                return (
                    <div className="flex flex-col items-center">
                        <div className="relative size-16 mb-4">
                            <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 absolute inset-0">account_circle</span>
                            <span className="material-symbols-outlined text-6xl text-[#5048e5] absolute inset-0 animate-pulse">account_circle</span>
                        </div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading Workforce Data...</p>
                    </div>
                );
            case 'communication':
                return (
                    <div className="flex flex-col items-center">
                        <div className="relative size-16 mb-4 flex justify-center">
                            <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 absolute">forum</span>
                            <span className="material-symbols-outlined text-6xl text-[#5048e5] absolute animate-bounce" style={{ animationDuration: '1s' }}>forum</span>
                        </div>
                        <p className="text-gray-500 font-medium animate-pulse">Syncing Conversations...</p>
                    </div>
                );
            case 'task':
                return (
                    <div className="flex flex-col items-center">
                        <div className="relative size-16 mb-4">
                            <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 absolute transform rotate-12">assignment</span>
                            <span className="material-symbols-outlined text-6xl text-[#5048e5] absolute transform rotate-12 animate-pulse">assignment_turned_in</span>
                        </div>
                        <p className="text-gray-500 font-medium animate-pulse">Fetching Tasks...</p>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5048e5] mb-4"></div>
                        <p className="text-gray-500 font-medium">Loading...</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex justify-center items-center h-full min-h-[400px] w-full bg-transparent">
            {renderContent()}
        </div>
    );
};

export default Loading;
