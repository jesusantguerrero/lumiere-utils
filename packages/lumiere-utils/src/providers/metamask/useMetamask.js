export function useMetamask(AuthState, config) {
  window.Web3 = Web3;
  Moralis.initialize(config.MORALIS_API_KEY);
  Moralis.serverURL = config.MORALIS_SERVER_URL  

  const login = async () => {
    const currentChainId = await window.ethereum.get_chain_id();
    if (!window.ethereum || currentChainId !== config.CHAIN_ID) {
      throw new Error("Wrong chain id");
    }
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    const user = {
      account:  accounts[0],
    }

    AuthState.user = user;
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
    console.log(AuthState.user);
    AuthState.onLoaded();
    authenticatedCallback && authenticatedCallback(AuthState.user);
  };

  const isAuthenticated = async () => {
    await initAuth();
    return AuthState.user;
  }

  const onAuthStateChanged = async (callback) => {
    Moralis.EventEmitter.on("user:login", (user) => {
      AuthState.user = user;
      AuthState.onLoaded();
      callback && callback(user);
    });
  };

  return {
    logout,
    login,
    register: login,
    isAuthenticated,
    onAuthStateChanged: (callback) => onAuthStateChanged.bind(null, callback),
    getUser: () => Moralis.user && Moralis.User.current(),

    Notifications: {
      
    }
  };
}
