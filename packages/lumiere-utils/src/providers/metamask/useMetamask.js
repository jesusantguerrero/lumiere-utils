export function useMetamask(AuthState, config) {

  const logout = async (callback) => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error);
    }

    AuthState.user = {};
    setTimeout(() => {
      callback && callback();
    })
    return data;
  };

  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const login = async () => {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
    return data;
  };

  const initAuth = async() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  }

  const isAuthenticated = () => {
    return supabaseState.user.id ? true : false;
  };

  return {
    logout,
    login,
    register,
    isAuthenticated,
    onAuthStateChanged: (callback) => supabase.auth.onAuthStateChange(callback),
    getUser: () => supabase.auth.user(),
  };
}
