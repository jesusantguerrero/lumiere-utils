# lumiere-utils

A collection of utilities to power agnostic support to either firebase or supabase as BAAS [lumiere](https://github.com/jesusantguerrero/lumiere-utils)

Roadmap
- [ ] useAuth
  - [x] supabase provider
  - [x] firebase provider
  - [ ] eth provider
- [x] useLumiere
 - [ ] notifications
 - [ ] settings
 - [ ] user
- [ ] utils


### Usage
By using [lumiere template](https://github.com/jesusantguerrero/lumiere)

### Manual
in a created vite project.

`npm install lumiere-utils`

in .env.local
```
VITE_FIREBASE_APP_KEY=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_SENDER_ID=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_URL=
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
  supabaseURL: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
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
