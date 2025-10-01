import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    // Guard: Si ya está autenticado, redirigir a home
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostList
  },
  {
    // Ruta dinámica con parámetro :id
    path: '/posts/:id',
    name: 'post-detail',
    component: PostDetail,
    // Guard: Requiere autenticación para ver detalles
    meta: { requiresAuth: true },
    // Pasar el id como prop al componente
    props: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    // Guard: Solo administradores
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    // Ruta catch-all para 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard Global - Se ejecuta antes de cada navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta a la que intentaba acceder
    next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Verificar si la ruta requiere rol de admin
  if (to.meta.requiresAdmin && authStore.userRole !== 'admin') {
    alert('No tienes permisos de administrador')
    next({ name: 'home' })
    return
  }
  
  next()
})

// Guard Global - Se ejecuta después de cada navegación
router.afterEach((to, from) => {
  // Útil para analytics, scroll, cambiar título, etc.
  document.title = to.name ? `Blog - ${to.name}` : 'Blog'
})

export default router