import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeUserView from '@/views/HomeUserView.vue';
import CreateCategorieView from '@/views/CreateCategorieView.vue';

const routes = [
  { path: '/userlogin', name: 'login', component: LoginView },
  { 
    path: '/', 
    name: 'homeuser', 
    component: HomeUserView,
    meta: { requiresAuth: true } // Marca a rota como protegida
  },
  { 
    path: '/createcategories', 
    name: 'createcategories', 
    component: CreateCategorieView,
    meta: { requiresAuth: true } // Marca a rota como protegida
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verificação de autenticação antes de cada rota
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token'); // Verifica se o token está armazenado no localStorage

  // Se a rota exigir autenticação e o usuário não estiver logado, redireciona para o login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/userlogin'); // Redireciona para a página de login
  } else {
    next(); // Permite o acesso à rota
  }
});

export default router;
