<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <Header />
    <main class="px-3 mb-4 mt-8 sm:px-20 sm:mb-6">
      <RouterView />
    </main>
  </ErrorBoundary>
</template>
