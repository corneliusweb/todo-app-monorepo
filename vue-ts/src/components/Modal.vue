<template>
  <div
    v-if="open"
    class="fixed top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-50"
    @click="onClose"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-[90vw] sm:max-w-md shadow-md relative"
      @click.stop
    >
      <button
        class="absolute top-2.5 right-4 text-3xl font-bold cursor-pointer text-gray-800"
        @click="onClose"
        aria-label="Close"
      >
        &times;
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
  onClose: () => void
}

defineProps<Props>()
</script>
