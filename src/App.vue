<script setup>
import FooterComponent from './components/Header-Footer/FooterComponent.vue';
import HeaderComponent from './components/Header-Footer/HeaderComponent.vue';
import { onMounted } from 'vue';
import "@/service/socket"
import { useAuthenticateStore } from './stores/authenticate';
import { useCoupons } from '@/stores/cupons';
import { useCategoriesStore } from './stores/categories';
import { useGetProducts } from '@/stores/getProducts';
const useCoupon = useCoupons();
const useCategory = useCategoriesStore();
const useAuthenticate = useAuthenticateStore();
const useGet = useGetProducts();
onMounted(() => {
    useGet.getProducts()
    useCoupon.getCouponsStore();
    useAuthenticate.ferifyMe(); 
    useCategory.getCategoriesStores();
    console.log("Verificando autenticação do usuário...");
});
</script>

<template>
  <div>
    <HeaderComponent/>
    <router-view></router-view>
    <FooterComponent/>
  </div>

    


</template>

<style scoped>

</style>
