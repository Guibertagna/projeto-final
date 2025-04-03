import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeUserView from '@/views/HomeUserView.vue';
import CreateCategorieView from '@/views/CreateCategorieView.vue';
import { useAuthenticateStore } from '@/stores/authenticate';
import CreateProduct from '@/components/CreateProduct.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import DetailPdroduct from '@/components/DetailPdroduct.vue';
import CartUser from '@/components/CartUser.vue';
import AddressesComponent from '@/components/AddressesComponent.vue';
import OrderComponent from '@/components/OrderComponent.vue';

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
    path: '/products/:id',
    name: 'Details', 
    component: DetailPdroduct, 
    props: true, 
    meta: {title: 'Details'}
  },
  {
    path: '/usercart',
    name: 'cart',
    component: CartUser,
    maeta: {title: 'Cart'}
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: AddressesComponent,
    maeta: {title: 'Addresses'}
  },
  {
    path: '/order',
    name: 'order',
    component: OrderComponent,
    maeta: {title: 'order'}
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
