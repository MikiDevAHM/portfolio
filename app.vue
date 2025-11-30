<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script>

<template>
  <Analytics />
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>



