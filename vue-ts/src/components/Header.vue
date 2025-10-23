<template>
  <header v-if="!isErrorPage" class="px-4 py-4 max-w-2xl mx-auto sm:px-0">
    <Modal :open="showModal" :onClose="() => setShowModal(false)">
      <AddTodoForm :onSuccess="handleAddSuccess" />
    </Modal>
    <SuccessModal :open="showSuccess" />
    <nav>
      <div v-if="isHome">
        <button type="button" class="sm:hidden cursor-pointer" @click="setIsMenuOpen(!isMenuOpen)">
          <Menu :size="32" />
        </button>
        <ul
          :class="`sm:flex sm:justify-center sm:items-center ${
            isMenuOpen ? 'grid gap-5 bg-white p-4 rounded-md shadow-md' : 'hidden'
          }`"
        >
          <li>
            <RouterLink class="nav-link" to="/todos"> Todos </RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" to="/test-error"> Test Error Boundary </RouterLink>
          </li>
          <li>
            <button type="button" class="nav-btn w-full mt-7 sm:mt-0" @click="setShowModal(true)">
              Add Todo
            </button>
          </li>
        </ul>
      </div>

      <div v-if="!isHome">
        <ul class="flex justify-between items-center">
          <li>
            <RouterLink to="/">
              <span class="sr-only">Home</span>
              <Home :size="32" />
            </RouterLink>
          </li>
          <li v-if="!isErrorPage">
            <button type="button" class="nav-btn" @click="setShowModal(true)">Add Todo</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Home } from 'lucide-vue-next'
import Modal from './Modal.vue'
import AddTodoForm from './AddTodoForm.vue'
import SuccessModal from './SuccessModal.vue'

const route = useRoute()
const router = useRouter()
const path = computed(() => route.path)

const isHome = computed(() => path.value === '/')
const isErrorPage = computed(() => path.value === '/test-error')

const showModal = ref(false)
const showSuccess = ref(false)
const isMenuOpen = ref(false)

const setShowModal = (value: boolean) => {
  showModal.value = value
}

const setIsMenuOpen = (value: boolean) => {
  isMenuOpen.value = value
}

const handleAddSuccess = () => {
  setShowModal(false)
  showSuccess.value = true
  setTimeout(() => (showSuccess.value = false), 1000)
  if (path.value !== '/todos') router.push('/todos')
}
</script>
