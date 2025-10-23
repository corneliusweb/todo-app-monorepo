<template>
  <div class="my-0 mx-auto">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { ITodo } from '../../types/index'

interface Props {
  todos: ITodo[]
}

defineProps<Props>()
</script>
