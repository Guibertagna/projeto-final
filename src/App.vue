<script setup>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import { onMounted } from 'vue';
import { useCoupons } from '@/stores/cupons';
const useCoupon = useCoupons();
onMounted(() => {
    useCoupon.getCouponsStore();
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
