import { supabase } from '../supabaseClient';

export const testCaseService = {
    // Get all test cases
    getAll: async () => {
        const { data, error } = await supabase
            .from('test_cases')
            .select('*')
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Get cases by Suite ID
    getBySuiteId: async (suiteId) => {
        const { data, error } = await supabase
            .from('test_cases')
            .select('*')
            .eq('suite_id', suiteId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Get single case details (including steps)
    getById: async (id) => {
        const { data: caseData, error: caseError } = await supabase
            .from('test_cases')
            .select('*')
            .eq('id', id)
            .single();

        if (caseError) throw caseError;

        // Fetch steps
        const { data: stepsData, error: stepsError } = await supabase
            .from('test_steps')
            .select('*')
            .eq('case_id', id)
            .order('step_number', { ascending: true });

        if (stepsError) throw stepsError;

        return { ...caseData, steps: stepsData };
    },

    // Create a new test case
    create: async (testCase) => {
        const { data, error } = await supabase
            .from('test_cases')
            .insert([testCase])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update a test case
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('test_cases')
            .update({
                ...updates,
                updated_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Add Step
    addStep: async (stepData) => {
        const { data, error } = await supabase
            .from('test_steps')
            .insert([stepData])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update Steps (Batch replace or individual - simple implementation here)
    updateSteps: async (caseId, steps) => {
        // Delete existing
        await supabase.from('test_steps').delete().eq('case_id', caseId);

        // Insert new
        const { data, error } = await supabase
            .from('test_steps')
            .insert(steps.map((s, index) => ({
                case_id: caseId,
                step_number: index + 1,
                action: s.action,
                expected_result: s.expected_result,
                status: s.status || 'Not Run' // Fix: Persist status
            })))
            .select();

        if (error) throw error;
        return data;
    },

    // Copy a test case
    copy: async (caseId, targetSuiteId) => {
        // 1. Fetch Original Case
        const { data: originalCase, error: fetchError } = await supabase
            .from('test_cases')
            .select('*')
            .eq('id', caseId)
            .single();

        if (fetchError || !originalCase) throw new Error("Test Case not found");

        // Fetch steps
        const { data: steps, error: stepsError } = await supabase
            .from('test_steps')
            .select('*')
            .eq('case_id', caseId)
            .order('step_number', { ascending: true });

        if (stepsError) throw stepsError;

        // 2. Prepare New Case Data
        const { id, created_at, updated_at, ...caseData } = originalCase;

        // Append (Copy) if same suite
        const newTitle = (originalCase.suite_id === targetSuiteId)
            ? `${originalCase.title} (Copy)`
            : originalCase.title;

        const newCaseData = {
            ...caseData,
            title: newTitle,
            suite_id: targetSuiteId,
            execution_status: 'Not Run', // Reset status
            bug_id: null, // Don't copy linked bug
            created_at: new Date(),
            updated_at: new Date()
        };

        // 3. Create New Case
        const { data: newCase, error: createError } = await supabase
            .from('test_cases')
            .insert([newCaseData])
            .select()
            .single();

        if (createError) throw createError;

        // 4. Duplicate Steps
        if (steps && steps.length > 0) {
            const newSteps = steps.map(s => ({
                case_id: newCase.id,
                step_number: s.step_number,
                action: s.action,
                expected_result: s.expected_result,
                status: 'Not Run'
            }));

            const { error: stepError } = await supabase
                .from('test_steps')
                .insert(newSteps);

            if (stepError) throw stepError;
        }

        return newCase;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('test_cases')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    // Comments
    getComments: async (caseId) => {
        const { data, error } = await supabase
            .from('test_case_comments')
            .select(`
                *,
                user:user_id (email)
            `)
            .eq('case_id', caseId)
            .order('created_at', { ascending: false }); // Newest first

        if (error) throw error;
        return data;
    },

    addComment: async (commentData) => {
        const { data, error } = await supabase
            .from('test_case_comments')
            .insert([commentData])
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
