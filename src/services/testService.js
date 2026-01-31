import { supabase } from '../supabaseClient';

export const testService = {
    // --- FOLDERS ---
    getFolders: async () => {
        const { data, error } = await supabase
            .from('test_folders')
            .select('*')
            .order('name');
        if (error) throw error;
        return data; // Tree structure logic can be processed in UI
    },

    createFolder: async (name, parentId = null) => {
        const { data, error } = await supabase
            .from('test_folders')
            .insert({ name, parent_id: parentId })
            .select();
        if (error) throw error;
        return data[0];
    },

    updateFolder: async (id, name) => {
        const { data, error } = await supabase
            .from('test_folders')
            .update({ name })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // --- CASES ---
    getCasesByFolder: async (folderId) => {
        const { data: cases, error } = await supabase
            .from('test_cases')
            .select(`
                *,
                test_steps (*)
            `)
            .eq('folder_id', folderId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!cases || cases.length === 0) return [];

        // Fetch Profiles manually
        const userIds = [...new Set(cases.map(c => c.assigned_to).filter(Boolean))];
        let profiles = [];
        if (userIds.length > 0) {
            const { data: profileData } = await supabase
                .from('profiles')
                .select('id, first_name, last_name')
                .in('id', userIds);
            profiles = profileData || [];
        }

        return cases.map(c => ({
            ...c,
            assignee: profiles.find(p => p.id === c.assigned_to) || null,
            test_steps: c.test_steps.sort((a, b) => a.step_number - b.step_number)
        }));
    },

    createCase: async (caseData, steps = []) => {
        // 1. Create Case
        const { data: newCase, error: caseError } = await supabase
            .from('test_cases')
            .insert(caseData)
            .select()
            .single();

        if (caseError) throw caseError;

        // 2. Create Steps if any
        if (steps.length > 0) {
            const stepsToInsert = steps.map((s, idx) => ({
                case_id: newCase.id,
                step_number: idx + 1,
                action: s.action,
                expected_result: s.expected_result
            }));
            const { error: stepsError } = await supabase
                .from('test_steps')
                .insert(stepsToInsert);

            if (stepsError) console.error("Error saving steps", stepsError);
        }

        return newCase;
    },

    updateCase: async (caseId, caseData, steps = []) => {
        // 1. Update Case
        const { data: updatedCase, error: caseError } = await supabase
            .from('test_cases')
            .update(caseData)
            .eq('id', caseId)
            .select()
            .single();

        if (caseError) throw caseError;

        // 2. Replace Steps (Simplest strategy: Delete all and re-insert)
        // Note: In production you might want to diff steps, but this works for now
        await supabase.from('test_steps').delete().eq('case_id', caseId);

        if (steps.length > 0) {
            const stepsToInsert = steps.map((s, idx) => ({
                case_id: caseId,
                step_number: idx + 1,
                action: s.action,
                expected_result: s.expected_result
            }));
            const { error: stepsError } = await supabase
                .from('test_steps')
                .insert(stepsToInsert);

            if (stepsError) console.error("Error saving steps", stepsError);
        }

        return updatedCase;
    },

    // --- RUNS & EXECUTIONS ---
    createRun: async (name, environment, caseIds) => {
        // 1. Create Run
        const { data: run, error: runError } = await supabase
            .from('test_runs')
            .insert({ name, environment, status: 'In Progress' })
            .select()
            .single();

        if (runError) throw runError;

        // 2. Create Executions (snapshots)
        const executions = caseIds.map(id => ({
            run_id: run.id,
            case_id: id,
            status: 'Untested'
        }));

        const { error: execError } = await supabase
            .from('test_executions')
            .insert(executions);

        if (execError) throw execError;

        return run;
    },

    getRunDetails: async (runId) => {
        const { data, error } = await supabase
            .from('test_runs')
            .select(`
                *,
                test_executions (
                    *,
                    test_cases (
                        *,
                        test_steps (*)
                    )
                )
            `)
            .eq('id', runId)
            .single();
        if (error) throw error;
        return data;
    },

    updateExecution: async (executionId, status, actualResult, comment, duration) => {
        const { data, error } = await supabase
            .from('test_executions')
            .update({
                status,
                actual_result: actualResult,
                comment,
                duration_seconds: duration,
                executed_at: new Date().toISOString()
            })
            .eq('id', executionId)
            .select();
        if (error) throw error;
        return data[0];
    },

    getRuns: async () => {
        const { data, error } = await supabase
            .from('test_runs')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    getAllCasesFlat: async () => {
        // 1. Fetch Cases
        const { data: cases, error } = await supabase
            .from('test_cases')
            .select(`
                *,
                test_steps (*)
            `)
            .neq('status', 'Deprecated')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!cases || cases.length === 0) return [];

        // 2. Fetch Profiles for Assignees
        const userIds = [...new Set(cases.map(c => c.assigned_to).filter(Boolean))];
        let profiles = [];

        if (userIds.length > 0) {
            const { data: profileData } = await supabase
                .from('profiles')
                .select('id, first_name, last_name')
                .in('id', userIds);
            profiles = profileData || [];
        }

        // 3. Map Assignee Data
        return cases.map(c => ({
            ...c,
            assignee: profiles.find(p => p.id === c.assigned_to) || null
        }));
    },

    deleteCases: async (ids) => {
        const { error } = await supabase
            .from('test_cases')
            .delete()
            .in('id', ids);
        if (error) throw error;
    },

    assignCases: async (ids, userId) => {
        const { error } = await supabase
            .from('test_cases')
            .update({ assigned_to: userId })
            .in('id', ids);
        if (error) throw error;
    },

    createSmartFolder: async (name, priority, type) => {
        // 1. Create Folder
        const { data: folder, error: folderError } = await supabase
            .from('test_folders')
            .insert({ name })
            .select()
            .single();
        if (folderError) throw folderError;

        // 2. Import Cases
        await testService.importSmartCases(folder.id, priority, type);

        return folder;
    },

    importSmartCases: async (folderId, priority, type) => {
        // 1. Fetch Matching Cases (Templates)
        let query = supabase.from('test_cases').select('*, test_steps(*)').eq('status', 'Active');
        if (priority) query = query.eq('priority', priority);
        if (type) query = query.eq('type', type);

        const { data: sourceCases, error: fetchError } = await query;
        if (fetchError) throw fetchError;

        if (!sourceCases || sourceCases.length === 0) return;

        // 2. Duplicate Cases into Target Folder
        for (const src of sourceCases) {
            // Check if already exists in this folder to avoid duplicates? 
            // For now, let's assume user wants to add them. 
            // Or ideally check title + folder_id.

            // Insert Case
            const { data: newCase, error: caseError } = await supabase
                .from('test_cases')
                .insert({
                    title: src.title,
                    description: src.description,
                    priority: src.priority,
                    type: src.type,
                    status: 'Active',
                    folder_id: folderId,
                    preconditions: src.preconditions,
                    function_name: src.function_name // Preserve Function/Module
                })
                .select()
                .single();

            if (caseError) {
                console.error("Failed to copy case", src.title, caseError);
                continue;
            }

            // Insert Steps
            if (src.test_steps && src.test_steps.length > 0) {
                const steps = src.test_steps.map(s => ({
                    case_id: newCase.id,
                    step_number: s.step_number,
                    action: s.action,
                    expected_result: s.expected_result
                }));
                await supabase.from('test_steps').insert(steps);
            }
        }
    },

    updateStepStatus: async (stepId, status) => {
        // Note: Assuming we are updating a step result in an EXECUTION context, 
        // but the user requirement implies updating the step status on the case itself?
        // "Once test case is open there should be display all test steps with Dropdown"
        // If this is the "Master" case, updating status on the step definition is unusual (definitions don't have pass/fail status).
        // However, I added 'status' column to test_steps table in my migration to support this user request directly 
        // on the definition or we treat 'opening a test case' as an ad-hoc run.
        // Let's support updating the 'status' column on 'test_steps' I added.

        const { error } = await supabase
            .from('test_steps')
            .update({ status })
            .eq('id', stepId);
        if (error) throw error;
    }
};
