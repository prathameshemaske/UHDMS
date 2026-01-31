import { supabase } from '../supabaseClient';

export const settingsService = {
    // Get the global settings (singleton row)
    async getSettings() {
        // We assume ID 1 or the first row is the global config
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            // If no row exists (and seed failed), return defaults silently or throw
            console.warn("Settings fetch warning:", error.message);
            return null;
        }
        return data;
    },

    // Update settings (upsert logic essentially, but we likely just update ID 1)
    async updateSettings(settingsData) {
        // First get the ID to ensure we update the correct row
        const { data: current } = await supabase.from('settings').select('id').limit(1).single();

        let query;
        if (current) {
            query = supabase.from('settings').update({
                ...settingsData,
                updated_at: new Date().toISOString()
            }).eq('id', current.id);
        } else {
            // Fallback insert if empty
            query = supabase.from('settings').insert([settingsData]);
        }

        const { data, error } = await query.select().single();
        if (error) throw error;
        return data;
    },

    // Specific updater for Payroll Config to avoid overwriting other JSON fields
    async updatePayrollConfig(config) {
        const currentSettings = await this.getSettings();
        if (!currentSettings) throw new Error("Settings not initialized");

        const newConfig = { ...currentSettings.payroll_config, ...config };

        return await this.updateSettings({
            payroll_config: newConfig
        });
    }
};
