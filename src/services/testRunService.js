import { supabase } from '../supabaseClient';

export const testRunService = {
    // Get all runs
    getAll: async () => {
        const { data, error } = await supabase
            .from('test_runs')
            .select(`
                *,
                executed_by_profile:executed_by (first_name, last_name, avatar_url)
            `)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Get a specific run with its results
    getRunDetails: async (runId) => {
        // Get Run Info
        const { data: run, error: runError } = await supabase
            .from('test_runs')
            .select('*')
            .eq('id', runId)
            .single();

        if (runError) throw runError;

        // Get Results for this run
        // Changed: fetch test_steps via the relation
        const { data: results, error: resultsError } = await supabase
            .from('test_run_results')
            .select(`
                *,
                test_case:case_id (
                    title, 
                    priority, 
                    test_steps (*)
                ),
                bug:bug_id (id, title, status)
            `)
            .eq('run_id', runId)
            .order('id', { ascending: true }); // Ensure stable order

        if (resultsError) throw resultsError;

        // Sort steps for each case
        const processedResults = results.map(r => {
            if (r.test_case?.test_steps) {
                r.test_case.test_steps.sort((a, b) => a.step_number - b.step_number);
            }
            return r;
        });

        return { run, results: processedResults };
    },

    // ... createRun ...

    // ... addResultsToRun ...

    // Update Step Status
    updateStepStatus: async (resultId, stepId, status, currentStepResults = []) => {
        // 1. Update the specific step in the array
        const newStepResults = [...(currentStepResults || [])];
        const existingIndex = newStepResults.findIndex(s => s.step_id === stepId);

        if (existingIndex >= 0) {
            newStepResults[existingIndex] = { ...newStepResults[existingIndex], status };
        } else {
            newStepResults.push({ step_id: stepId, status });
        }

        // 2. Calculate aggregate status for the Test Case
        // Rules: 
        // - If ANY step Failed -> Fail
        // - If ANY step Blocked -> Blocked
        // - If ALL steps Passed -> Pass
        // - Else -> In Progress (or Not Run if empty, but here we have at least one)

        // To do this correctly, we need the total number of steps. 
        // We'll calculate the aggregate status on the Client Side or require passing all steps count here.
        // For now, we will purely update the step_results column and let the client determine the aggregate status to pass to `updateResult`.
        // OR: We return the updated array and let the client decide. 
        // Better: Just update the column.

        const { data, error } = await supabase
            .from('test_run_results')
            .update({ step_results: newStepResults })
            .eq('id', resultId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update Result (Aggregate)
    updateResult: async (resultId, status, comment, bugId = null, stepResults = null) => {
        const updatePayload = { status, comment };
        if (bugId !== null) updatePayload.bug_id = bugId;
        if (stepResults !== null) updatePayload.step_results = stepResults;

        const { data, error } = await supabase
            .from('test_run_results')
            .update(updatePayload)
            .eq('id', resultId)
            .select(`
                *,
                test_case:case_id (title, priority, test_steps (*)),
                bug:bug_id (id, title, status)
            `)
            .single();
        if (error) throw error;
        return data;
    },

    // Complete a run
    completeRun: async (runId) => {
        const { data, error } = await supabase
            .from('test_runs')
            .update({
                status: 'Completed',
                completed_at: new Date()
            })
            .eq('id', runId)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};
