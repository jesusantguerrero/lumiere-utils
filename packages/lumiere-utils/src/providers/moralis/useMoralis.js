import Moralis from "moralis/dist/moralis"

export function useMoralis(AuthState, config) {
  Moralis.initialize(config.MORALIS_API_KEY);
  Moralis.serverURL = config.MORALIS_SERVER_URL;

  const login = async () => {
    const user = await Moralis.Web3.authenticate({
      provider: window.ethereum,
      chainId: config.ETH_CHAIN_ID,
    })

    return user;
  };

  const logout = async (callback) => {
    await Moralis.User?.logOut();
    AuthState.account = "";
    AppState.user = Moralis.User.current();

    setTimeout(() => {
      callback && callback();
    })
    return AppState.user;
  }

  const initAuth = async(authenticatedCallback) => {
    AuthState.user = Moralis.Web3.getUser();
    AuthState.onLoaded();
    authenticatedCallback && authenticatedCallback(AuthState.user);
  };

  const isAuthenticated = async () => {
    await initAuth();
    return AuthState.user;
  }

  return {
    logout,
    login,
    register: login,
    isAuthenticated,
    onAuthStateChanged: onAuthStateChange.bind(null, callback),
    getUser: () => supabase.auth.user(),
  };
}
