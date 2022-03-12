<template>
<main>
    <slot />
</main>
</template>

<script setup>
import { inject, nextTick, provide, ref, toRefs, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AuthState, useAuth } from "../useAuth";
import { avoidLoginRoutes } from "../avoidLoginRoutes";

const props = defineProps({
    provider: {
        type: Function,
        required: true
    },
    config: {
        type: Object,
        required: true
    },
});
const { provider, config } = toRefs(props);
const globalProvider = inject('globalProvider', null);
const providerInstance = globalProvider || provider.value(AuthState, config.value);
const authInstance = inject('globalState', AuthState);

if (!globalProvider) {
    const { initAuth } = useAuth(providerInstance);    
    initAuth();
}
// Initialize the auth state 
watch(() => authInstance.user, (user, oldUser) => {
    if (oldUser && !user) {
      const route = useRoute();
      avoidLoginRoutes(route, user, config.value)
  } 
}, { deep: true,immediate: true });

// notifications
const notifications = ref([])
const { Notifications } = props.provider

const fetchNotifications = async () => {
    notifications.value = await Notifications.getAll();
}

const updateNotification = (notificationId, notification) => {
    Notifications.update(notificationId, {
        user_uid: notification.user_uid,
        read_at: Notifications.getServerTime()
    })

    fetchNotifications();
}

watchEffect(async () => {
    if (Notifications && AuthState.user.id) {
        fetchNotifications();
    }
})

provide('AuthState', authInstance);
provide('notifications', notifications);
provide('updateNotification', updateNotification);
</script>
