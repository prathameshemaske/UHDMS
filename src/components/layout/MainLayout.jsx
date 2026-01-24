import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { authService } from '../../services/authService';

const MainLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await authService.getSession();
                if (!session) {
                    navigate('/login');
                }
            } catch (error) {
                console.error("Auth check failed", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#f6f6f8] dark:bg-[#121121]">Loading...</div>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-display">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
