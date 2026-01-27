import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const showSuccess = (message) => addToast(message, 'success');
    const showError = (message) => addToast(message, 'error');

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError }}>
            {children}
            <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl transform transition-all animate-slide-in ${toast.type === 'success'
                                ? 'bg-white dark:bg-gray-800 border-l-4 border-green-500 text-gray-800 dark:text-white'
                                : 'bg-white dark:bg-gray-800 border-l-4 border-red-500 text-gray-800 dark:text-white'
                            }`}
                        role="alert"
                    >
                        <div className={`p-1 rounded-full ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {toast.type === 'success' ? (
                                <span className="material-symbols-outlined text-[20px]">check</span>
                            ) : (
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            )}
                        </div>
                        <p className="font-semibold text-sm">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
