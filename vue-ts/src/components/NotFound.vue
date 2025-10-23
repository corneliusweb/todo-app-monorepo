<template>
  <div
    class="text-center grid place-content-center py-15 absolute h-screen w-screen bg-black top-0 left-0"
  >
    <div>
      <h1 class="text-5xl text-filter-blue mb-0">404</h1>
      <h2 class="text-white/60 mt-2">Page Not Found</h2>
      <p class="text-white/60 mt-7.5">Sorry, the page you are looking for does not exist.</p>
      <RouterLink
        to="/"
        class="inline-block py-2.5 px-6 bg-filter-blue mt-25 text-white rounded-sm font-medium"
      >
        Go Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
