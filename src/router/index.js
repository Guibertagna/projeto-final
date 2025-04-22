import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeUserView from '@/views/HomeUserView.vue';
import CreateCategorieView from '@/views/CreateCategorieView.vue';
import { useAuthenticateStore } from '@/stores/authenticate';
import CreateProduct from '@/components/Moderator/CreateProduct.vue';

import DetailPdroduct from '@/components/Products/DetailPdroduct.vue';
import ModeratorView from '@/views/ModeratorView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CartUserView from '@/views/CartUserView.vue';
import DetailsProductView from '@/views/DetailsProductView.vue';

const routes = [
  { path: '/userlogin', name: 'login', component: LoginView },
  { 
    path: '/', 
    name: 'homeuser', 
    component: HomeUserView,
    meta: {title: 'Home', requiresAuth: false}
  },
  { 
    path: '/createcategories', 
    name: 'createcategories', 
    component: CreateCategorieView,
    meta: {title: 'Create Categories', requiresAuth: true}
  },
  { 
    path: '/createproducts', 
    name: 'createproducts', 
    component: CreateProduct,
    meta: {title: 'Create Products', requiresAuth: true}
  },

  {
    path: '/products/:id',
    name: 'Details', 
    component: DetailsProductView, 
    props: true, 
    meta: {title: 'Details', requiresAuth: false}
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartUserView,
    props: true,
    meta: {title: 'cart', requiresAuth: true}
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    props: true,
    meta: {title: 'Checkout', requiresAuth: true}
    
  },
  
  { 
    path: '/moderator', 
    name: 'Moderator', 
    component: ModeratorView,
    meta: {title: 'Moderator', requiresAuth: true}

  },

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
