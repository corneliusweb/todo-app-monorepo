<template>
  <div class="bg-white/80 rounded-lg p-3.5 mt-2.5 shadow-md">
    <RouterLink :to="`/todos/${todo.id}`">
      <h3 class="mb-2.5 text-lg font-medium tracking-wide">
        {{ todo.todo }}
      </h3>
    </RouterLink>
    <span
      :class="`inline-block py-1 px-2 rounded-sm text-base ${
        todo.completed ? 'bg-completed-light text-completed' : 'bg-pending-light text-pending'
      }`"
    >
      {{ todo.completed ? 'Completed' : 'Pending' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ITodo } from '../../types/index'

interface Props {
  todo: ITodo
}

defineProps<Props>()
</script>
