import { inject, reactive } from "vue";

// firebase state
export const AuthState = reactive({
    user: null,
    uid: null,
    settings: {},
    provider: null,
    onLoaded: () => {},
    isLoaded: false,
})


export const useAuthState = () => {
    return inject('AuthState', AuthState)
}

export const useAuth = (provider) => {
    const isLoaded = ref(false);
    if (provider) {
        AuthState.provider = provider
    }

    const setLoaded = (loadedCallback) => {
        AuthState.onLoaded = loadedCallback   
    }

    const initAuth = (authenticatedCallback) => {
        AuthState.provider?.onAuthStateChanged((user, session) => {
            const authenticatedUser = session?.user || user;
            AuthState.settings = {};
            AuthState.user = typeof authenticatedUser !== 'string' ? authenticatedUser : {};
            AuthState.onLoaded()
            authenticatedCallback && authenticatedCallback(authenticatedUser || AuthState.user);
            AuthState.isLoaded = true;
        });
        
        if (AuthState.provider?.getUser) {
            AuthState.user = AuthState.provider.getUser();
            authenticatedCallback && authenticatedCallback(AuthState.user);
            AuthState.isLoaded = true;
        }
    };
    
    const isAuthenticated = async () => {
        if (!AuthState.user?.email) {
            await new Promise(resolve => initAuth(resolve));
        }
        return AuthState.user?.email;
    }

    const {isLoaded, provider: { register, login, logout, loginWithProvider } = {}} = toRefs(AuthState);
    
    return {
        useAuthState,
        isAuthenticated,
        initAuth,
        setLoaded,
        isLoaded,
        register,
        login,
        logout,
        loginWithProvider,
    }
}
