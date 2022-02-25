<template>
  <header class="px-5 pb-10 text-center pt-14">
    <h1 class="text-6xl">
        {{ frontmatter.heroText }}
    </h1>
    <div class="mx-auto mb-2 description">
      {{ frontmatter.tagline }}
    </div>

    <div class="flex gap-1 mt-5 mb-15 place-content-center">
      <a href="https://www.npmjs.com/package/lumiere-utils" target="__blank"><img src="https://img.shields.io/npm/v/lumiere-utils?color=a1b858&label=" alt="NPM version"></a>
      <a href="https://www.npmjs.com/package/lumiere-utils" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/lumiere-utils?color=50a36f&label="></a>
    </div>

    <p class="flex gap-2 mt-5 place-content-center">
      <a class="px-5 py-2.5 rounded-md border-2 border-amber-700 bg-amber-600 text-white" href="/guide/">Get Started <icon-carbon:arrow-right class="icon" /></a>
      <a class="px-5 py-2.5 rounded-md border-2 border-gray-800 bg-gray-600 text-white" href="https://github.com/jesusantguerrero/lumiere-utils" target="_blank"><icon-carbon-logo-github class="icon" /> GitHub</a>
    </p>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { site, frontmatter } = useData()
</script>