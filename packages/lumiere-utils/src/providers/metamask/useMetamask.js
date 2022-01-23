export function useMetamask(AuthState, config) {

  const authenticate = async( config= {}, chainId ) => {
    const msgParams = {
      message: {
        contents: config.message || 'Hi sign to my website'
      }
    }
    await ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [config.from , JSON.stringify(msgParams)]
    })
  }

  const login = async () => {
    const accounts = await authenticate({ message: "Login to the site", from: "0xE58823715C71513B90Bdff7F89483f2809D18A68" });

    const user = {
      account:  accounts[0],
    }

    AuthState.user = user;
    return user;
  };

  const logout = async (callback) => {
    AuthState.user = {};

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
    ethereum.on("user:login", (user) => {
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
    getUser: () => AuthState.user,

    Notifications: {
      
    }
  };
}
