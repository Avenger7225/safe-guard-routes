<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>

    <div class="filters">
      <h3>Filtrar por Autor:</h3>
      
      <button @click="setAuthorFilter('')" 
              :class="{ active: !currentAuthorFilter }" 
              class="btn-filter">
        Ver Todos
      </button>

      <button v-for="author in availableAuthors" 
              :key="author"
              @click="setAuthorFilter(author)"
              :class="{ active: currentAuthorFilter === author.toLowerCase() }"
              class="btn-filter">
        {{ author }}
      </button>
      
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
    
    <p v-if="filteredPosts.length === 0">No se encontraron posts del autor "{{ currentAuthorFilter }}".</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 1. Datos con los autores completos
const allPosts = ref([
  { id: 1, title: 'Introducción a Vue 3', excerpt: 'Aprende los básicos...', author: 'Juan' },
  { id: 2, title: 'Composition API', excerpt: 'Nueva forma de escribir...', author: 'María' },
  { id: 3, title: 'Vue Router 4', excerpt: 'Navegación en Vue...', author: 'Pedro' },
])

// Autores disponibles para los botones de filtro
const availableAuthors = ['Juan', 'María', 'Pedro']

// 2. Estado reactivo para el filtro actual, basado en la URL
const currentAuthorFilter = ref('')

// Función para cambiar el filtro y actualizar la URL
const setAuthorFilter = (authorName) => {
  const query = {}
  
  // Solo añade el parámetro 'author' si hay un nombre
  if (authorName) {
    query.author = authorName.toLowerCase()
  }
  
  // Navega a la misma ruta, pero con el nuevo query param
  router.push({ 
    query: query 
  })
}

// 3. Observar la URL (Query Params) para actualizar la lista
const updateFilterFromRoute = () => {
    // Lee el parámetro 'author' de la URL y lo guarda en el estado
    currentAuthorFilter.value = route.query.author ? route.query.author.toLowerCase() : ''
}

// Inicializar y observar la ruta
onMounted(updateFilterFromRoute)
watch(() => route.query, updateFilterFromRoute)


// 4. Lógica de filtrado para mostrar los posts
const filteredPosts = computed(() => {
    if (!currentAuthorFilter.value) {
        return allPosts.value
    }
    
    return allPosts.value.filter(post => 
        post.author.toLowerCase() === currentAuthorFilter.value
    )
})
</script>