import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '@/views/Profile.vue'
import ProfileSettings from '@/views/ProfileSettings.vue'
import ProfilePosts from '@/views/ProfilePosts.vue'

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
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/profile-settings',
    name: 'profile-settings',
    component: ProfileSettings
  },
  {
    path: '/profile-posts',
    name: 'profile-posts',
    component: ProfilePosts
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // Guard: Solo administradores
    component: () => import('../views/Dashboard.vue'),
    meta: { 
      requiresAuth: true,
      requiresRole: ['dashboard']
    }
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

// Guard Global, se ejecuta antes de cada navegacion
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // simular llamada asíncrona a un "API" que valida la sesion
  const isValid = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(authStore.isAuthenticated) 
    }, 1000) // delay de 1 segundo
  })

  // Verificar si la ruta requiere autenticacion
  if (to.meta.requiresAuth && !isValid) {
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

// Guard Global, se ejecuta después de cada navegacion
router.afterEach((to, from) => {
  document.title = to.name ? `Blog - ${to.name}` : 'Blog'
})

export default router