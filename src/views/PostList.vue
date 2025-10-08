<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>

    <!-- Filtros -->
    <div class="filters">
      <h3>Filtrar por Autor:</h3>

      <input
        type="text"
        v-model="filters.author"
        placeholder="Escribe un autor..."
        @input="updateQueryParams"
        class="input-filter"
      />

      <button 
        v-if="hasActiveFilters" 
        @click="clearFilters" 
        class="btn-clear"
      >
        Limpiar
      </button>

      <p v-if="filters.author" class="active-filter">
        Posts filtrados por: <strong>{{ filters.author }}</strong>
      </p>
    </div>

    <!-- prueba de posts de un usuario (juan) 
    <router-link 
      :to="{ 
        name: 'posts', 
        query: { category: 'vue', author: 'juan' } 
      }"
      class="link-preset"
    >
      Ver posts de Vue por Juan
    </router-link> -->

    <!-- Lista de posts -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div 
      v-for="post in filteredPosts" 
      :key="post.id" 
      class="post-card bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
      <p class="text-gray-500 text-sm mb-4">Autor: {{ post.author }}</p>
      <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>

      <router-link 
        :to="{ 
          name: 'post-detail', 
          params: { id: post.id },
          query: route.query
        }"
        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Leer más
      </router-link>
    </div>
  </div>

    <p v-if="filteredPosts.length === 0 && filters.author">
      No se encontraron posts del autor "{{ filters.author }}".
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const filters = ref({
  category: '',
  author: '',
  search: '',
  sort: 'reciente'
})

// Posts simulados
const allPosts = ref([
  { id: 1, title: 'Introducción a Vue 3', excerpt: 'Aprende los básicos...', author: 'Juan', category: 'vue' },
  { id: 2, title: 'Composition API', excerpt: 'Nueva forma de escribir...', author: 'Maria', category: 'vue' },
  { id: 3, title: 'Vue Router 4', excerpt: 'Navegación en Vue...', author: 'Pedro', category: 'router' },
])

// Leer parametros de la URL
const readQueryParams = () => {
  filters.value.category = route.query.category || ''
  filters.value.author = route.query.author || ''
  filters.value.search = route.query.search || ''
  filters.value.sort = route.query.sort || 'reciente'
}

onMounted(() => readQueryParams())
watch(() => route.query, () => readQueryParams(), { deep: true })

const updateQueryParams = () => {
  const query = {
    ...route.query // guarda los otros filtros activos
  }

  if (filters.value.author) query.author = filters.value.author
  else delete query.author

  if (filters.value.category) query.category = filters.value.category
  else delete query.category

  if (filters.value.search) query.search = filters.value.search
  else delete query.search

  if (filters.value.sort && filters.value.sort !== 'reciente')
    query.sort = filters.value.sort
  else delete query.sort

  router.push({ name: 'posts', query })
}

const clearFilters = () => {
  filters.value = {
    category: '',
    author: '',
    search: '',
    sort: 'reciente'
  }
  router.push({ name: 'posts' }) // Limpiar URL
}

const hasActiveFilters = computed(() => {
  return (
    filters.value.category ||
    filters.value.author ||
    filters.value.search
  )
})

// Filtrar posts en tiempo real
const filteredPosts = computed(() => {
  let result = allPosts.value

  if (filters.value.category) {
    result = result.filter(
      p => p.category.toLowerCase() === filters.value.category.toLowerCase()
    )
  }

  if (filters.value.author) {
    result = result.filter(
      p => p.author.toLowerCase().includes(filters.value.author.toLowerCase())
    )
  }

  if (filters.value.search) {
    const term = filters.value.search.toLowerCase()
    result = result.filter(
      p =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
    )
  }

  // Ordenar alfabeticamente
  if (filters.value.sort === 'alfabetico') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})
</script>

<style scoped>
/* Inputs de filtros */
.input-filter {
  padding: 6px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

/* Botón para limpiar filtros */
.btn-clear {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.2s;
}

.btn-clear:hover {
  background-color: #c0392b;
}

/* Cards de posts */
.post-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-top: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s, transform 0.2s;
}

.post-card:hover {
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

/* Título de post */
.post-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.post-card p {
  margin-bottom: 8px;
  color: #555;
  font-size: 0.95rem;
}

/* Link "Leer más" */
.post-card a {
  display: inline-block;
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.post-card a:hover {
  background-color: #2980b9;
}

.link-preset {
  display: inline-block;
  margin-bottom: 12px;
  text-decoration: underline;
  color: #2c3e50;
  font-size: 14px;
}

.active-filter {
  font-size: 14px;
  color: #555;
}
</style>

