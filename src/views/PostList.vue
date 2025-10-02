<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>

    <div class="filters">
      <h3>Filtrar por Autor:</h3>
      
      <input
        type="text"
        v-model="authorInput"
        placeholder="Escribe un autor..."
        @input="updateAuthorFilter"
        class="input-filter"
      />

      <p v-if="currentAuthorFilter" class="active-filter">
        Posts filtrados por: <strong>{{ currentAuthorFilter }}</strong>
      </p>
    </div>

    <div v-for="post in filteredPosts" :key="post.id" class="post-card">
      <h3>{{ post.title }}</h3>
      <p>Autor: {{ post.author }}</p>
      <p>{{ post.excerpt }}</p>
      
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
        Leer más
      </router-link>
    </div>
    
    <p v-if="filteredPosts.length === 0 && currentAuthorFilter">
      No se encontraron posts del autor "{{ currentAuthorFilter }}".
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const allPosts = ref([
  { id: 1, title: 'Introducción a Vue 3', excerpt: 'Aprende los básicos...', author: 'Juan' },
  { id: 2, title: 'Composition API', excerpt: 'Nueva forma de escribir...', author: 'Maria' },
  { id: 3, title: 'Vue Router 4', excerpt: 'Navegación en Vue...', author: 'Pedro' },
])

const currentAuthorFilter = ref('')
const authorInput = ref('')

const updateAuthorFilter = () => {
  const query = {}
  if (authorInput.value.trim()) {
    query.author = authorInput.value.toLowerCase()
  }
  router.push({ query })
}

const updateFilterFromRoute = () => {
  currentAuthorFilter.value = route.query.author ? route.query.author.toLowerCase() : ''
  authorInput.value = currentAuthorFilter.value
}

onMounted(updateFilterFromRoute)
watch(() => route.query, updateFilterFromRoute)

const filteredPosts = computed(() => {
  if (!currentAuthorFilter.value) {
    return allPosts.value
  }
  
  return allPosts.value.filter(post => 
    post.author.toLowerCase().includes(currentAuthorFilter.value)
  )
})
</script>

<style scoped>
.input-filter {
  padding: 6px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
