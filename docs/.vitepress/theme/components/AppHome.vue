<template>
  <main class="home" aria-labelledby="main-title">
    
    <slot name="hero" >
      <HomeHero />
    </slot>
    <slot name="features">
      <HomeFeatures />
    </slot>
    <slot name="footer">
      <HomeFooter />
    </slot>
  </main>
</template>

<script setup>
import HomeHero from './HomeHero.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeFooter from './HomeFooter.vue'
</script>