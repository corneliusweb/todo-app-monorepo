<template>
  <div v-if="hasError" class="text-center h-screen grid place-content-center">
    <div class="w-full">
      <h2 class="text-lg">Something went wrong globally.</h2>
      <pre class="text-red-500 text-lg mt-4">
				{{ error?.toString() }}
			</pre>

      <div class="w-full flex gap-6 mt-45 justify-center">
        <RouterLink to="/" class="back-link justify-between" @click="resetError">
          <ChevronLeft /> Back to Home
        </RouterLink>
        <button @click="resetError" class="cursor-pointer back-link">Try again</button>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

const hasError = ref(false)
const error = ref<Error | null>(null)

const resetError = () => {
  hasError.value = false
  error.value = null
}

onErrorCaptured((err) => {
  hasError.value = true
  error.value = err
  return false
})
</script>
