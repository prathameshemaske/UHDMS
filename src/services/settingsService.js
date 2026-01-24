export const settingsService = {
    // Get Settings
    getSettings: () => {
        const settings = localStorage.getItem('user_settings');
        return settings ? JSON.parse(settings) : {
            notifications: {
                email: true,
                push: true,
                slack: false
            },
            theme: 'system',
            language: 'en-US'
        };
    },

    // Save Settings
    saveSettings: (newSettings) => {
        localStorage.setItem('user_settings', JSON.stringify(newSettings));
        return newSettings;
    },

    // Update specific setting
    updateSetting: (key, value) => {
        const current = settingsService.getSettings();
        const updated = { ...current, [key]: value };
        settingsService.saveSettings(updated);
        return updated;
    }
};
