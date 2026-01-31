import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Active'
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            // Fetch from new DB table
            const data = await projectService.getProjects();

            // If DB is empty, might return empty array. 
            // Current code maps existing folders to projects, but we want to shift to the 'projects' table relative to the new requirement.
            // We can still look up folder counts if needed, but let's focus on the 'projects' table first.
            setProjects(data);
        } catch (error) {
            console.error("Error loading projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await projectService.createProject(formData);
            await loadProjects();
            setIsModalOpen(false);
            setFormData({ name: '', description: '', status: 'Active' });
        } catch (error) {
            alert('Failed to create project: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full bg-[#f6f6f8] dark:bg-[#121121]">
                <p className="text-gray-500 font-medium">Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            <main className="flex-1 px-6 lg:px-10 py-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">All Projects</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage your projects and verify statuses.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#5048e5] hover:bg-[#4338ca] text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Create Project
                        </button>
                    </div>

                    {projects.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-[#1a192d] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">folder_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No projects found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by creating your first project.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-[#5048e5] font-bold hover:underline"
                            >
                                Create New Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-gray-100 dark:border-[#2d2c44] p-6 hover:shadow-md transition-shadow group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-12 w-12 bg-[#5048e5]/10 rounded-lg flex items-center justify-center text-[#5048e5]">
                                            <span className="material-symbols-outlined text-2xl">folder_special</span>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{project.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 h-10">
                                        {project.description || 'No description provided.'}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                            <span>{project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-[#2d2c44] flex items-center justify-between">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${project.status === 'Active'
                                            ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                                            : 'text-gray-500 bg-gray-100 dark:bg-gray-800'
                                            }`}>
                                            {project.status}
                                        </span>
                                        <Link to={`/test-suites`} className="text-sm font-bold text-[#5048e5] hover:underline">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-md rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2d2c44] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Project Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. HRMS Redesign"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none transition-all h-24 resize-none"
                                    placeholder="Brief description of the project..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                                <select
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none transition-all"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 rounded-lg font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 rounded-lg font-bold text-white bg-[#5048e5] hover:bg-[#4338ca] shadow-lg shadow-[#5048e5]/20 transition-all"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
