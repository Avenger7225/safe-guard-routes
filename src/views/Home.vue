<template>
  <div class="home">
    <h1>Bienvenido al Blog</h1>

    <p v-if="authStore.isAuthenticated">
      Hola, {{ authStore.user.name }}!
      <span v-if="authStore.userRole === 'admin'">(Administrador)</span>
    </p>
    <p v-else>Por favor, inicia sesión para acceder a todo el contenido</p>
    
    <nav class="auth-buttons">
      <router-link to="/posts" class="btn-auth">Ver Posts</router-link>

      <router-link 
        to="/login" 
        v-if="!authStore.isAuthenticated" 
        class="btn-auth"
      >
        Login
      </router-link>

      <router-link 
        to="/dashboard" 
        v-if="authStore.userRole === 'admin'" 
        class="btn-auth"
      >
        Dashboard
      </router-link>

      <button 
        v-if="authStore.isAuthenticated" 
        @click="handleLogout" 
        class="btn-auth btn-logout"
      >
        Logout
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
//import { supabase } from '@supabase/supabase-js'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.auth-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

/* Estilo base de los botones y links */
.btn-auth {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  border: none;
  color: white;
  background-color: #3498db;
}

.btn-auth:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-logout {
  background-color: #e74c3c;
}

.btn-logout:hover {
  background-color: #c0392b;
}
</style>
