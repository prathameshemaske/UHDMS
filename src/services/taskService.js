import { supabase } from '../supabaseClient';
import { notificationService } from './notificationService';

export const taskService = {
    // Get Tasks for current user (My Tasks)
    getMyTasks: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .or(`assignee_id.eq.${user.id},reporter_id.eq.${user.id}`)
            .order('due_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get ALL Tasks (Project View)
    getTasks: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('due_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Create a new task
    createTask: async (taskData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .insert({
                ...taskData,
                reporter_id: user.id
            })
            .select()
            .single();

        if (error) throw error;

        // Notify Assignee
        // Notify Assignee (Modified for Debug: Allow Self-Notification)
        console.log(`Debug: Task Created. Assignee: ${taskData.assignee_id}, Creator: ${user.id}`);

        if (taskData.assignee_id) { // Removed '&& taskData.assignee_id !== user.id' to test self-notification
            console.log("Debug: Triggering Notification for Task Assignee...");
            await notificationService.createNotification({
                userId: taskData.assignee_id,
                title: 'New Task Assigned',
                message: `You have been assigned a new task: ${taskData.title}`,
                type: 'task',
                related_id: data.id
            });
        } else {
            console.warn("Debug: No Assignee ID found. Notification skipped.");
        }

        return data;
    },

    // Update task (generic)
    updateTask: async (taskId, updates) => {
        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete task
    deleteTask: async (taskId) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;
    },

    // Assign a single task
    assignTask: async (taskId, assigneeId) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({ assignee_id: assigneeId })
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;

        // Notify Assignee
        if (assigneeId) {
            await notificationService.createNotification({
                userId: assigneeId,
                title: 'Task Assigned',
                message: `You have been assigned a task.`,
                type: 'task',
                related_id: taskId
            });
        }

        return data;
    },

    // Bulk assign tasks
    bulkAssignTasks: async (taskIds, assigneeId) => {
        if (!taskIds || taskIds.length === 0) return;

        const { data, error } = await supabase
            .from('tasks')
            .update({ assignee_id: assigneeId })
            .in('id', taskIds)
            .select();

        if (error) throw error;

        // Notify Assignee (Grouped notification would be better but simple loop for now)
        if (assigneeId) {
            await notificationService.createNotification({
                userId: assigneeId,
                title: 'Tasks Assigned',
                message: `You have been assigned ${taskIds.length} new tasks.`,
                type: 'task',
                related_id: taskIds[0] // Link to one of them
            });
        }

        return data;
    }
};
