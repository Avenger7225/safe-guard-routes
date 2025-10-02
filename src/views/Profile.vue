<template>
  <div>
    <nav v-if="authStore.isAuthenticated">      
      
      <!-- Enlace a los posts del usuario (/profile/posts) -->
      <router-link to="/profile-settings" class="nav-button" active-class="active">
        <i class="fas fa-cog mr-1"></i> Configuración
      </router-link>
      
      <!-- Enlace a los posts del usuario (/profile/posts) -->
      <router-link to="/profile-posts" class="nav-button" active-class="active">
        <i class="fas fa-clipboard-list mr-1"></i> Mis Posts
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

<style>
.nav-button {
    text-decoration: none;
    color: #4A5568; /* Gris oscuro */
    padding: 0.5rem 1rem;
    border-radius: 6px 6px 0 0; /* Bordes redondeados en la parte superior */
    transition: all 0.2s;
    font-weight: 500;
    margin-bottom: -2px; /* Superpone un poco el borde inferior del nav */
}
</style>
