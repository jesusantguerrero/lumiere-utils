import Moralis from "moralis/dist/moralis"
import Web3 from "web3/dist/web3.min";
export function useMoralis(AuthState, config) {
  window.Web3 = Web3;
  Moralis.initialize(config.MORALIS_API_KEY);
  Moralis.serverURL = config.MORALIS_SERVER_URL  

  const login = async () => {
    const user = await Moralis.Web3.authenticate({
      provider: window.ethereum,
      chainId: config.CHAIN_ID,
    })

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
