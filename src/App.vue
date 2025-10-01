<template>
  <div id="app">
    <header>
      <nav class="main-nav">
        <router-link to="/" class="logo">Mi Blog</router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/posts">Posts</router-link>
          <router-link to="/dashboard" v-if="authStore.userRole === 'admin'">
            Dashboard
          </router-link>
          
          <div class="auth-section">
            <span v-if="authStore.isAuthenticated" class="user-info">
              {{ authStore.user }}
              <span v-if="authStore.userRole === 'admin'" class="badge">Admin</span>
            </span>
            <router-link v-if="!authStore.isAuthenticated" to="/login" class="btn-login">
              Login
            </router-link>
            <button v-else @click="handleLogout" class="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <!-- Aquí se renderizan todas las vistas según la ruta -->
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 Mi Blog - Práctica Vue Router</p>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #42b983;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.auth-section {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  color: white;
  font-weight: 500;
}

.badge {
  background: #ff6b6b;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

.btn-login,
.btn-logout {
  background: white;
  color: #42b983;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s;
}

.btn-login:hover,
.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 2rem;
}

footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
}
</style>