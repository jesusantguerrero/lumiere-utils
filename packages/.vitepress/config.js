import Base from "@vue/theme/config"


const Ecosystem = [
    { text: 'Lumiere-template', link: 'ecosystem/template' },
    { text: 'Atmosphere UI', link: 'ecosystem/atmosphere-ui' }
]


const config = {
    extends: Base,
    title: 'Lumiere',
    description: 'Frontend app packages',
    lang: 'en-US',

    themeConfig: {
        logo: '/fire.png',
        repo: 'vitepress/lumiere',
        docsDir: 'packages',

        algolia: {
            indexName: 'lumiere',
            appId: 'YSRC0ITN47',
            apiKey: '79c60a71960658cedaf5555c2929f0a9'
        },
        
        editLinks: false,

        socialLinks: [
            { icon: 'github', link: ''}
        ],

        nav: [
            { text: 'Guide', 
            items: [
                { text: 'Guide', items: []},
                { text: 'Links', items: []}
            ]}
        ],
        head: [
            ['meta', { name: 'theme-color', content: '#ffffff' }],
            ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
            ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
            ['meta', { name: 'author', content: 'Anthony Fu' }],
            ['meta', { property: 'og:title', content: 'VueUse' }],
            ['meta', { property: 'og:image', content: 'https://vueuse.org/og.png' }],
            ['meta', { property: 'og:description', content: 'Collection of essential Vue Composition Utilities' }],
            ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
            ['meta', { name: 'twitter:creator', content: '@antfu7' }],
            ['meta', { name: 'twitter:image', content: 'https://vueuse.org/og.png' }],
        
            ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
            ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
            ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
            ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
        ],
    }
}

export default  config