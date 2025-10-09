<template>
  <div class="post-detail" v-if="post">
    <h2>{{ post.title }}</h2>
    <p class="author">Por: {{ post.author }}</p>
    <div class="content">{{ post.excerpt }}</div>
    <button @click="$router.back()">Volver</button>
  </div>
  <div v-else-if="post === null && !loading">
    <p>Post no encontrado</p>
  </div>
  <div v-else>
    <p>Cargando post...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { supabase } from '@/supabase'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const post = ref(null)
const loading = ref(false)

const fetchPostById = async (postId) => {
  loading.value = true
  post.value = null // Limpiar el post anterior

  const idToFetch = Number(postId) 

  // Verificar que el ID sea válido antes de la consulta
  if (isNaN(idToFetch) || idToFetch <= 0) {
    console.error("ID de post no válido:", postId);
    loading.value = false;
    return;
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, author, excerpt') 
    .eq('id', idToFetch)
    .single() 

  if (error && error.code !== 'PGRST116') { // PGRST116 = No Results
    console.error('Error al obtener post:', error)
  } 
  
  // Si data es null (PGRST116) post.value sera null, mostrara "Post no encontrado"
  post.value = data
  loading.value = false
}

let entryTime = Date.now()

onMounted(() => {
  fetchPostById(props.id)
})
watch(() => props.id, (newId) => {
  fetchPostById(newId)
})


// Guard de Componente
onBeforeRouteLeave((to, from, next) => {
  const elapsedTime = (Date.now() - entryTime)
  console.log('Tiempo transcurrido (ms):', elapsedTime)

  // recordatorio: 5000 milisegundos = 5 segundos
  if (elapsedTime < 5000){
    const answer = window.confirm('Seguro de que quieres salir?')
    if (answer){
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>