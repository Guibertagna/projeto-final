import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeUserView from '@/views/HomeUserView.vue';
import CreateCategorieView from '@/views/CreateCategorieView.vue';
import { useAuthenticateStore } from '@/stores/authenticate';
import CreateProduct from '@/components/CreateProduct.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import DetailPdroduct from '@/components/DetailPdroduct.vue';

const routes = [
  { path: '/userlogin', name: 'login', component: LoginView },
  { 
    path: '/', 
    name: 'homeuser', 
    component: HomeUserView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/createcategories', 
    name: 'createcategories', 
    component: CreateCategorieView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/createproducts', 
    name: 'createproducts', 
    component: CreateProduct,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/userprofile', 
    name: 'profile', 
    component: ProfileComponent,
    meta: { requiresAuth: true } 
  },
  {
    path: '/products/:id', name: 'Details', component: DetailPdroduct, props: true, meta: {title: 'Details'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {

  const auth = useAuthenticateStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  }

  next()
});

export default router;
