import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import HomeUserView from '@/views/HomeUserView.vue';
import CreateCategorieView from '@/views/CreateCategorieView.vue';
import { useAuthenticateStore } from '@/stores/authenticate';
import CreateProduct from '@/components/Moderator/CreateProduct.vue';
import ModeratorView from '@/views/ModeratorView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CartUserView from '@/views/CartUserView.vue';
import DetailsProductView from '@/views/DetailsProductView.vue';
import ProfileView from '@/views/ProfileView.vue';
import AllProducsView from '@/views/AllProducsView.vue';
import OdersView from '@/views/OdersView.vue';
import OrderDetail from '@/components/User/OrderDetail.vue';
import TrackOrders from '@/components/Moderator/TrackOrders.vue';
import CreateModerator from '@/components/User/CreateModerator.vue';

const routes = [
  { path: '/userlogin', name: 'login', component: LoginView, meta: { title: 'Login', requiresAuth: false } },
  {
    path: '/',
    name: 'homeuser',
    component: HomeUserView,
    meta: { title: 'Home' }
  },
  {
    path: '/createcategories',
    name: 'createcategories',
    component: CreateCategorieView,
    meta: { title: 'Create Categories', requiresAuth: true }
  },
  {
    path: '/createproducts',
    name: 'createproducts',
    component: CreateProduct,
    meta: { title: 'Create Products', requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'Details',
    component: DetailsProductView,
    props: true,
    meta: { title: 'Details', requiresAuth: false }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartUserView,
    props: true,
    meta: { title: 'cart', requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    props: true,
    meta: { title: 'Checkout', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profie',
    component: ProfileView,
    meta: { title: 'Profile', requiresAuth: true }
  },
  {
    path: '/moderator',
    name: 'Moderator',
    component: ModeratorView,
    meta: {
      title: 'Moderator',
      requiresAuth: true,
      allowedRoles: ['MODERATOR', 'ADMIN'] 
    }
  },
  {
    path: '/trackOrders',
    name: 'track',
    component: TrackOrders,
    meta: {
      title: 'Track',
      requiresAuth: true,
      allowedRoles: ['MODERATOR', 'ADMIN'] 
    }
  },
  {
    path: '/products',
    name: 'All Products',
    component: AllProducsView,
    meta: { title: 'Products' }
  },
  {
    path: '/orders',
    name: 'All Orders',
    component: OdersView,
    meta: { title: 'Orders', requiresAuth: false }
  },
  {
    path: '/order-detail/:id',
    name: 'Details order',
    component: OrderDetail,
    props: true,
    meta: { title: 'Order', requiresAuth: true }
  },
  {
    path: '/create-moderator',
    name: 'Create Moderator',
    component: CreateModerator,
    props: true,
    meta: { title: 'Create Moderator', requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.afterEach((to) => {
  const defaultTitle = 'Cozy Store';
  document.title = to.meta.title || defaultTitle;
});

router.beforeEach((to, from, next) => {
  const auth = useAuthenticateStore();
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.allowedRoles;
const userRole = auth.user.role; 
 
console.log(auth.user.role)
  if (requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login' });
  }

  if (requiresAuth && allowedRoles && !allowedRoles.includes(userRole)) {
    return next({ name: 'homeuser' }); 
  }

  next();
});

export default router;
