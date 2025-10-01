<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <input 
        v-model="username" 
        type="text" 
        placeholder="Usuario"
        required
      />
      <select v-model="role">
        <option value="user">Usuario Normal</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const role = ref('user')
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogin = () => {
  if (username.value) {
    authStore.login(username.value, role.value)
    
    // Redirigir a donde intentaba ir originalmente
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
}
</script>

