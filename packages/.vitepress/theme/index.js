import { VPTheme } from "@vue/theme"
import { h } from "vue"
import Home from "./components/Home.vue"

import "./styles/main.css";

export default {
    ...VPTheme,
    Layout() {
        return h(VPTheme.Layout, null, {
            // uncomment to test layout slots

            // 'sidebar-top': () => h('div', 'hello top'),
            // 'sidebar-bottom': () => h('div', 'hello bottom'),
            // 'content-top': () => h('h1', 'Announcement!'),
            // 'content-bottom': () => h('div', 'Some ads'),
            // 'aside-top': () => h('div', 'this could be huge'),
            // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
            // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
        })
    },
    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from `createApp()`. router is VitePress'
        // custom router. `siteData` is a `ref` of current site-level metadata.
        app.component("Home", Home)
    }
}