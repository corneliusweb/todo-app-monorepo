<template>
  <div v-if="isLoading" class="loading">Loading todos...</div>
  <div v-else-if="isError" class="error">Error: {{ error?.message }}</div>
  <div v-else-if="!data || !data.todos" class="error">No data available</div>
  <div v-else class="max-w-2xl mx-auto mt-20">
    <h1 class="font-bold text-2xl mb-4">My Todos</h1>
    <div class="p-5 bg-white rounded-lg shadow-md">
      <div class="mb-6">
        <input
          type="text"
          placeholder="Search todos..."
          v-model="searchQuery"
          @input="handleSearch"
          class="search-input"
        />
      </div>

      <div class="flex gap-2.5">
        <button
          :class="`filter-btn ${statusFilter === FILTER_OPTIONS.ALL ? 'active' : ''}`"
          @click="() => handleFilterChange(FILTER_OPTIONS.ALL)"
        >
          All
        </button>
        <button
          :class="`filter-btn ${statusFilter === FILTER_OPTIONS.COMPLETED ? 'active' : ''}`"
          @click="() => handleFilterChange(FILTER_OPTIONS.COMPLETED)"
        >
          Completed
        </button>
        <button
          :class="`filter-btn ${statusFilter === FILTER_OPTIONS.INCOMPLETE ? 'active' : ''}`"
          @click="() => handleFilterChange(FILTER_OPTIONS.INCOMPLETE)"
        >
          Incomplete
        </button>
      </div>
    </div>

    <TodoList :todos="currentTodos" />

    <div v-if="filteredTodos.length === 0" class="no-results">
      No todos found matching your search query
    </div>
    <div v-else class="pagination">
      <button
        @click="() => handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Previous
      </button>

      <span class="text-lg text-gray-600"> Page {{ currentPage }} of {{ totalPages }} </span>

      <button
        @click="() => handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { ITodo } from '../types/index'
import TodoList from '../components/todo/TodoList.vue'

const fetchTodos = async () => {
  const res = await fetch('https://dummyjson.com/todos')
  if (!res.ok) {
    throw new Error('Failed to fetch todos')
  }
  const data = await res.json()
  return data
}

const ITEMS_PER_PAGE = 10

const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
}

const currentPage = ref(1)
const searchQuery = ref('')
const statusFilter = ref(FILTER_OPTIONS.ALL)

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})

const filteredTodos = computed(() => {
  if (!data.value || !data.value.todos) return []
  return data.value.todos.filter((todo: ITodo) => {
    const matchesSearch = todo.todo.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter =
      statusFilter.value === FILTER_OPTIONS.ALL ||
      (statusFilter.value === FILTER_OPTIONS.COMPLETED && todo.completed) ||
      (statusFilter.value === FILTER_OPTIONS.INCOMPLETE && !todo.completed)
    return matchesSearch && matchesFilter
  })
})

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / ITEMS_PER_PAGE))
const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE)
const endIndex = computed(() => startIndex.value + ITEMS_PER_PAGE)
const currentTodos = computed(() => filteredTodos.value.slice(startIndex.value, endIndex.value))

const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber
}

const handleSearch = () => {
  currentPage.value = 1 // Reset to first page when search
}

const handleFilterChange = (filter: string) => {
  statusFilter.value = filter
  currentPage.value = 1 // Reset to first page when filter change
}
</script>
