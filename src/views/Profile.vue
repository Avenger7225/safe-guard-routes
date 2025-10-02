<template>
  <div>
    <nav v-if="authStore.isAuthenticated">      
      <router-link to="/profile-settings">
        Configuración
      </router-link>
      <router-link to="/profile-posts">
        Mis Posts
      </router-link>
    </nav>

    <h3 v-if="authStore.isAuthenticated">
      Bienvenido, {{ authStore.user }}
      <p>Aquí puedes ver un resumen de tu actividad reciente.</p>
      <ul>
        <li>Último inicio de sesión: Hoy</li>
        <li>Rol actual: {{ authStore.userRole }}</li>
        <li>Posts publicados: 4</li>
        </ul>
      <p>Usa la barra de navegación superior para acceder a tus Posts o Configuración.</p>
    </h3>

    <div v-else>
      <p>Por favor, inicia sesión para ver tu perfil completo.</p>
    </div>

    <div v-if="authStore.isAuthenticated">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
</script>
