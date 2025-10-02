<template>
  <div>
    <h3>Posts Publicados por {{ authStore.user }}</h3>
    <div v-for="i in 2" :key="i">
        <h4>Post de Ejemplo #{{ i }}</h4>
        <p>Este es el contenido resumido de un post que has publicado.</p>
    </div>
    <p v-if="authStore.userRole === 'admin'">Como administrador, puedes ver todos los posts, pero aquí solo se listan los tuyos.</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>