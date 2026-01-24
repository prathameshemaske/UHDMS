import React from 'react';

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all ${className}`}
            {...props}
        />
    );
};

export default Input;
