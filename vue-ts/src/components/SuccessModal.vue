<template>
  <div
    v-if="open"
    class="fixed top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 min-w-3xs max-w-[90vw] shadow-md text-center">
      <h2 class="text-page-green m-0">
        {{ message || 'Todo added successfully!' }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
  message?: string
}

defineProps<Props>()
</script>
