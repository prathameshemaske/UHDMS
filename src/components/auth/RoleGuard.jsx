import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

const RoleGuard = ({ allowedRoles, children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const profile = await authService.getCurrentUser();
                setUser(profile);

                if (profile && allowedRoles.includes(profile.role)) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.error("RoleGuard Error:", error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };
        checkAccess();
    }, [allowedRoles]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#f6f6f8] dark:bg-[#121121]">Loading permissions...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!authorized) {
        return <div className="flex flex-col items-center justify-center h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-[#656487]">You do not have permission to view this page.</p>
            <a href="/" className="mt-4 text-primary hover:underline">Return to Dashboard</a>
        </div>;
    }

    return children ? children : <Outlet />;
};

export default RoleGuard;
