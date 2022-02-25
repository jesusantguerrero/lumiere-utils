import { VPTheme } from "@vue/theme"

import "./styles/main.css";

export default {
    ...VPTheme,
    enhanceApp({ app }) {
        app.component('AppHome', () => import('./components/AppHome.vue'))
    }
}