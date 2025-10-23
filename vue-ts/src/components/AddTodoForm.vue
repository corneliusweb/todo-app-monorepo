<template>
  <div>
    <h2 class="text-2xl font-semibold">Add New Todo</h2>
    <form @submit.prevent="handleSubmit" class="grid gap-5 mt-9">
      <input
        type="text"
        placeholder="Enter todo"
        v-model="todoText"
        class="p-2 rounded-sm border border-gray-300 block w-full"
      />
      <button
        type="submit"
        :disabled="isPending || !todoText.trim()"
        :class="`py-2 px-4 rounded-sm w-full text-white bg-page-green ${
          isPending ? 'cursor-not-allowed' : 'cursor-pointer'
        }`"
      >
        {{ isPending ? 'Adding todo...' : 'Add' }}
      </button>
    </form>
    <p v-if="isError" class="mt-4 text-red-500">Error: {{ error?.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { ITodo } from '../types/index'

interface Props {
  onSuccess: () => void
}

const props = defineProps<Props>()

const todoText = ref('')
const queryClient = useQueryClient()

const createTodo = async (newTodo: ITodo) => {
  const res = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
  if (!res.ok) throw new Error('Failed to add todo')
  return res.json()
}

const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    if (props.onSuccess) props.onSuccess()
  },
})

const handleSubmit = () => {
  if (!todoText.value.trim()) return
  const newTodo = {
    todo: todoText.value,
    completed: false,
    userId: Math.floor(Math.random() * 100) + 100,
    id: Math.floor(Math.random() * 100) + 1,
  }
  mutate(newTodo)
  todoText.value = ''
}
</script>
