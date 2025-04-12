<script setup>
import FooterComponent from './components/Header-Footer/FooterComponent.vue';
import HeaderComponent from './components/Header-Footer/HeaderComponent.vue';
import { onMounted } from 'vue';
import { useAuthenticateStore } from './stores/authenticate';
import { useCoupons } from '@/stores/cupons';
const useCoupon = useCoupons();
const useAuthenticate = useAuthenticateStore();
onMounted(() => {
    useCoupon.getCouponsStore();
    useAuthenticate.getMe();
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
