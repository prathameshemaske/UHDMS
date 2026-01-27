import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return 'check_circle';
            case 'error': return 'error';
            case 'info': return 'info';
            case 'warning': return 'warning';
            default: return 'info';
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success': return 'bg-white dark:bg-slate-800 border-l-4 border-green-500 text-slate-800 dark:text-white';
            case 'error': return 'bg-white dark:bg-slate-800 border-l-4 border-red-500 text-slate-800 dark:text-white';
            case 'warning': return 'bg-white dark:bg-slate-800 border-l-4 border-orange-500 text-slate-800 dark:text-white';
            default: return 'bg-white dark:bg-slate-800 border-l-4 border-blue-500 text-slate-800 dark:text-white';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success': return 'text-green-500';
            case 'error': return 'text-red-500';
            case 'warning': return 'text-orange-500';
            default: return 'text-blue-500';
        }
    };

    return (
        <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg shadow-slate-200/50 dark:shadow-black/50 min-w-[300px] animate-in slide-in-from-right duration-300 ${getStyles()}`}>
            <span className={`material-symbols-outlined ${getIconColor()}`}>
                {getIcon()}
            </span>
            <p className="text-sm font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
        </div>
    );
};

export default Toast;
