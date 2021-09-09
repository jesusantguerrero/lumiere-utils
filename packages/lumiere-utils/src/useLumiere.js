import { inject } from "vue"

export const useLumiere = () => {
    const notifications = inject('notificiations', []);
    const settings = inject('settings', {});
    
    return {
       notifications,
       settings
    }
}
