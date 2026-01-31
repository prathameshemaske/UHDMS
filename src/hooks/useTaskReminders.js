import { useEffect } from 'react';
import { taskService } from '../services/taskService';
import { notificationService } from '../services/notificationService';

export const useTaskReminders = () => {
    useEffect(() => {
        const checkReminders = async () => {
            try {
                // 1. Get My Tasks
                const tasks = await taskService.getMyTasks();
                const now = new Date();
                const todayStr = now.toISOString().split('T')[0];
                const currentHour = now.getHours();

                // Only run check if it's after 9 AM
                if (currentHour < 9) return;

                // 2. Get existing notifications to prevent duplicates today
                const notifications = await notificationService.getNotifications();
                // Filter notifications created TODAY
                const todayNotifications = notifications.filter(n =>
                    n.created_at.startsWith(todayStr)
                );

                for (const task of tasks) {
                    if (!task.due_date) continue;

                    const dueDate = new Date(task.due_date);
                    const isDueToday = task.due_date === todayStr;
                    const isOverdue = new Date(task.due_date) < new Date(todayStr); // strictly less than today (i.e. yesterday or before)
                    const isCompleted = task.status === 'completed';

                    if (isCompleted) continue;

                    // 9 AM Reminder for Due Today
                    if (isDueToday) {
                        const hasNotification = todayNotifications.some(n =>
                            n.related_id === task.id && n.type === 'due_today'
                        );

                        if (!hasNotification) {
                            await notificationService.createNotification({
                                title: 'Task Due Today',
                                message: `Your task "${task.title}" is due today.`,
                                type: 'due_today',
                                related_id: task.id
                            });
                        }
                    }

                    // Overdue Reminder
                    if (isOverdue) {
                        const diffTime = Math.abs(new Date(todayStr) - dueDate);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        const hasNotification = todayNotifications.some(n =>
                            n.related_id === task.id && n.type === 'overdue'
                        );

                        if (!hasNotification) {
                            await notificationService.createNotification({
                                title: 'Task Overdue',
                                message: `Task "${task.title}" is pending from ${diffDays} days.`,
                                type: 'overdue',
                                related_id: task.id
                            });
                        }
                    }
                }

            } catch (error) {
                console.error("Error checking task reminders:", error);
            }
        };

        // Run once on mount (reload)
        checkReminders();

        // Optional: Set interval to check periodically (e.g., every hour) if the user keeps the tab open
        const interval = setInterval(checkReminders, 60 * 60 * 1000);
        return () => clearInterval(interval);

    }, []);
};
