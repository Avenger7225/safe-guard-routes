<template>
  <div class="settings-view">
    <h3 class="text-2xl font-semibold mb-4 text-gray-800">Configuración de la Cuenta</h3>

    <div class="setting-group pt-4">
      <h4 class="text-lg font-medium mb-2 text-red-600">Cerrar Sesión</h4>
      <button 
        @click="handleLogout" 
        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-150 shadow-md">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>