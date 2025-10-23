<template>
  <div v-if="isLoading" class="state-style">Loading todo details...</div>
  <div v-else-if="isError" class="state-style text-red-500">Error: {{ error?.message }}</div>
  <div v-else class="max-w-fit mx-auto flex flex-col my-10">
    <RouterLink to="/todos" class="back-link"> <IoChevronBack /> Back to Todos </RouterLink>
    <div class="bg-white rounded-lg p-6 w-96 max-w-[95vw] shadow-md sm:min-w-lg">
      <h1 class="mb-5 text-gray-800 text-3xl">{{ data?.todo }}</h1>
      <div class="flex flex-col">
        <span
          :class="`inline-block py-1 px-2 mb-2 rounded-sm text-base ${
            data?.completed ? 'bg-completed-light text-completed' : 'bg-pending-light text-pending'
          }`"
        >
          {{ data?.completed ? 'Completed' : 'Pending' }}
        </span>
        <p class="m-0 text-base text-gray-500">Todo ID: {{ data?.id }}</p>
        <p class="m-0 text-base text-gray-500">User ID: {{ data?.userId }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { IoChevronBack } from 'react-icons/io5'

const route = useRoute()
const id = computed(() => route.params.id as string)

const fetchTodo = async (id: string | undefined) => {
  const res = await fetch(`https://dummyjson.com/todos/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch todo')
  }
  return res.json()
}

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['todo', id],
  queryFn: () => fetchTodo(id.value),
})
</script>
