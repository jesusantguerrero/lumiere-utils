# Get Started
A collection of utilities to power agnostic support to either firebase or supabase as BAAS for **Vue 3**

## Installation

```bash
npm install lumiere-utils
```

## Usage
By using [lumiere template](https://github.com/jesusantguerrero/lumiere)

## Manual
in a created vite project.

`npm install lumiere-utils`

### Supabase Configuration

in .env.local
```
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_URL=
```

src/config/index.js
```
export default {
  appName: 'Lumiere',
  home: 'dashboard',
  loginRoutes: ['auth-login', 'auth-register'] // route names, no paths,
  supabaseURL: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
}

```

in App.vue

```
import { LumiereProvider } from 'lumiere-utils'
import { useSupabase } from 'lumiere-utils/useSupabase'
import config from './config'
```

in App.vue template
```
  <LumiereProvider :provider="useSupabase" :config="config">
    <router-view />
  </LumiereProvider>
```

### Firebase Configuration

in .env.local
```
VITE_FIREBASE_APP_KEY=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_SENDER_ID=
```

src/config/index.js
```
export default {
  appName: 'Lumiere',
  home: 'dashboard',
  loginRoutes: ['auth-login', 'auth-register'],
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_APP_KEY,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  FIREBASE_SENDER_ID: import.meta.env.VITE_FIREBASE_SENDER_ID,
  PUSH_PK: import.meta.env.VITE_PUSH_PK,
  MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
}

```

in App.vue

```
import { LumiereProvider } from 'lumiere-utils'
import { useFirebase } from 'lumiere-utils/useFirebase'
import config from './config'
```

in App.vue template
```
  <LumiereProvider :provider="useFirebase" :config="config">
    <router-view />
  </LumiereProvider>
```

## Router Configuration

```
// src/router.js
import config from "./config";
import { useAuth } from "lumiere-utils/useAuth";

const routes = [...] // define your routes

const myRouter = createRouter({
  history: createWebHistory(),
  routes,
});

const { isAuthenticated } = useAuth();
myRouter.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
  if (to.meta.requiresAuth !== false && !user) {
    next({ name: config.loginRoutes[0] });
  } else if (to.meta.requiresAuth == false && user && config.loginRoutes.includes(to.name)) {
    next({ name: config.home });
  } else {
    next();
  }
});s

export default myRouter;
```
