import React, { useState, useEffect, useMemo } from 'react';
import { teamsService } from '../services/teamsService';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import Loading from '../components/common/Loading';

const Teams = () => {
    const { showSuccess, showError } = useToast();
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Form State
    const [newTeam, setNewTeam] = useState({
        name: '',
        description: '',
        leader_id: '',
        type: 'Department', // Default
        member_ids: [] // Array of user IDs
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        let fetchedUsers = [];

        try {
            // 1. Load Users first (needed for enrichment)
            try {
                fetchedUsers = await authService.getAllProfiles();
                setUsers(fetchedUsers || []);
            } catch (err) {
                console.error("TeamsPage: Error loading users:", err);
            }

            // 2. Load Teams
            const teamsData = await teamsService.getAllTeams();

            // 3. Enrich teams with user data manually
            const enrichedTeams = (teamsData || []).map(team => ({
                ...team,
                leader: fetchedUsers.find(u => u.id === team.leader_id) || null,
                team_members: (team.team_members || []).map(tm => ({
                    ...tm,
                    profile: fetchedUsers.find(u => u.id === tm.user_id) || null
                }))
            }));

            setTeams(enrichedTeams);
        } catch (err) {
            console.error("TeamsPage: Error loading teams:", err);
            setError(err.message || "Failed to load teams");
        } finally {
            setLoading(false);
        }
    };


    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            // 1. Create Team
            const teamPayload = {
                name: newTeam.name,
                description: newTeam.description,
                leader_id: newTeam.leader_id,
                type: newTeam.type
            };

            const createdTeam = await teamsService.createTeam(teamPayload);

            // 2. Add Members
            if (newTeam.member_ids.length > 0 && createdTeam) {
                await Promise.all(newTeam.member_ids.map(userId =>
                    teamsService.addMember(createdTeam.id, userId, 'Member')
                ));
            }

            setShowCreateModal(false);
            setNewTeam({ name: '', description: '', leader_id: '', type: 'Department', member_ids: [] });
            setShowCreateModal(false);
            setNewTeam({ name: '', description: '', leader_id: '', type: 'Department', member_ids: [] });
            showSuccess("Team created successfully!");
            loadData(); // Refresh
        } catch (error) {
            console.error("Error creating team:", error);
            showError("Failed to create team: " + (error.message || "Unknown error"));
        }
    };

    const toggleMemberSelection = (userId) => {
        setNewTeam(prev => {
            const currentMembers = prev.member_ids;
            if (currentMembers.includes(userId)) {
                return { ...prev, member_ids: currentMembers.filter(id => id !== userId) };
            } else {
                return { ...prev, member_ids: [...currentMembers, userId] };
            }
        });
    };

    // Group Teams by Type
    const groupedTeams = useMemo(() => {
        const groups = {};
        teams.forEach(team => {
            const type = team.type || 'Other';
            if (!groups[type]) groups[type] = [];
            groups[type].push(team);
        });
        return groups;
    }, [teams]);

    const OrgChartNode = ({ member }) => (
        <div className="flex flex-col items-center mx-4 mb-4 min-w-[100px]">
            <div className="relative pt-6">
                {/* Connector Line (Vertical Top) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center w-36 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="size-10 rounded-full bg-center bg-cover mb-2 border-2 border-white dark:border-gray-700 shadow-sm" style={{ backgroundImage: `url("${member.profile?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                    <p className="font-bold text-xs text-center text-gray-900 dark:text-white truncate w-full">{member.profile?.first_name} {member.profile?.last_name}</p>
                    <p className="text-[10px] text-[#5048e5] text-center truncate w-full uppercase tracking-wider font-semibold">{member.role || 'Member'}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Teams & Hierarchy</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Visualize departmental structures and project squads.</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-5 h-11 rounded-lg bg-[#5048e5] text-white font-bold text-sm shadow-lg shadow-[#5048e5]/20 hover:bg-[#5048e5]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Create New Team
                        </button>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                            <strong>Error loading teams:</strong> {error}
                        </div>
                    )}

                    {loading ? (
                        <Loading type="employee" />
                    ) : teams.length === 0 ? (
                        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">groups</span>
                            <p className="text-gray-500 text-lg mb-4">No teams defined yet.</p>
                            <button onClick={() => setShowCreateModal(true)} className="text-[#5048e5] font-bold hover:underline">Create your first team</button>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedTeams).map(([type, typeTeams]) => (
                                <div key={type} className="animate-fade-in">
                                    <div className="flex items-center gap-4 mb-6">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{type}s</h2>
                                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{typeTeams.length} Teams</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-10">
                                        {typeTeams.map(team => (
                                            <div key={team.id} className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto">
                                                {/* Org Chart Layout */}
                                                <div className="flex flex-col items-center min-w-max mx-auto">

                                                    {/* Level 1: Leader / Head */}
                                                    <div className="relative z-10 mb-8">
                                                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border-2 border-[#5048e5]/20 flex flex-col items-center w-72 text-center shadow-sm">
                                                            <div className="size-20 rounded-full bg-white dark:bg-gray-800 border-4 border-[#5048e5]/10 p-1 mb-4 shadow-sm">
                                                                <div className="size-full rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[#5048e5]">
                                                                    {team.leader ? (
                                                                        <img src={team.leader.avatar_url || 'https://via.placeholder.com/150'} alt="Leader" className="size-full rounded-full object-cover" />
                                                                    ) : (
                                                                        <span className="material-symbols-outlined text-3xl">groups</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{team.name}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{team.description}</p>
                                                            {team.leader ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5048e5] text-white text-xs font-bold shadow-sm shadow-[#5048e5]/30">
                                                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                                                    Lead: {team.leader.first_name}
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs font-bold text-gray-400">No Leader Assigned</span>
                                                            )}
                                                        </div>
                                                        {/* Connector to children */}
                                                        {team.team_members && team.team_members.length > 0 && (
                                                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                                        )}
                                                    </div>

                                                    {/* Level 2: Members */}
                                                    {team.team_members && team.team_members.length > 0 && (
                                                        <div className="relative pt-8 border-t-2 border-gray-300 dark:border-gray-600">
                                                            {/* Vertical connection from group line to nodes handled in OrgChartNode */}
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {team.team_members.map(member => (
                                                                    <OrgChartNode key={member.user_id} member={member} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {(!team.team_members || team.team_members.length === 0) && (
                                                        <div className="mt-4 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 text-sm font-medium">
                                                            No members added yet
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                            <div>
                                <h3 className="font-black text-xl text-gray-900 dark:text-white">Create New Team</h3>
                                <p className="text-sm text-gray-500 m-0">Setup a new group and assign members.</p>
                            </div>
                            <button onClick={() => setShowCreateModal(false)} className="size-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreateTeam} className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Team Name *</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#5048e5]/50 transition-all font-medium"
                                        value={newTeam.name}
                                        onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                                        placeholder="e.g. Mobile App Squad"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Team Type *</label>
                                    <select
                                        className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#5048e5]/50 transition-all cursor-pointer font-medium"
                                        value={newTeam.type}
                                        onChange={e => setNewTeam({ ...newTeam, type: e.target.value })}
                                    >
                                        <option value="Department">Department (Permanent)</option>
                                        <option value="Project">Project (Temporary)</option>
                                        <option value="Squad">Squad (Agile)</option>
                                        <option value="Committee">Committee</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    className="w-full h-20 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#5048e5]/50 transition-all resize-none"
                                    value={newTeam.description}
                                    onChange={e => setNewTeam({ ...newTeam, description: e.target.value })}
                                    placeholder="What is this team responsible for?"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Assign Team Lead</label>
                                    <select
                                        className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#5048e5]/50 transition-all cursor-pointer"
                                        value={newTeam.leader_id}
                                        onChange={e => setNewTeam({ ...newTeam, leader_id: e.target.value })}
                                    >
                                        <option value="">Select a leader...</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.first_name} {u.last_name} ({u.role || 'Emp'})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Add Members ({newTeam.member_ids.length} selected)
                                </label>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
                                    {users.length === 0 ? (
                                        <div className="p-4 text-center text-gray-400 text-sm">No employees available.</div>
                                    ) : (
                                        users.map(u => (
                                            <div
                                                key={u.id}
                                                onClick={() => toggleMemberSelection(u.id)}
                                                className={`flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${newTeam.member_ids.includes(u.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                            >
                                                <div className={`size-5 rounded border flex items-center justify-center transition-all ${newTeam.member_ids.includes(u.id) ? 'bg-[#5048e5] border-[#5048e5]' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                                                    {newTeam.member_ids.includes(u.id) && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                                                </div>
                                                <div className="size-8 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-700" style={{ backgroundImage: `url('${u.avatar_url || 'https://via.placeholder.com/150'}'` }}></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{u.first_name} {u.last_name}</p>
                                                    <p className="text-xs text-gray-500">{u.job_title || 'Employee'}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3">
                            <button type="button" onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                            <button type="button" onClick={handleCreateTeam} className="px-8 py-2.5 rounded-lg bg-[#5048e5] text-white font-bold text-sm hover:bg-[#5048e5]/90 shadow-md transform active:scale-95 transition-all">Create Team</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teams;
