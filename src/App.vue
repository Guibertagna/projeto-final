<script setup>
import FooterComponent from './components/Header-Footer/FooterComponent.vue';
import HeaderComponent from './components/Header-Footer/HeaderComponent.vue';
import { onMounted } from 'vue';
import "@/service/socket"
import { useAuthenticateStore } from './stores/authenticate';
import { useCoupons } from '@/stores/cupons';
import { useCategoriesStore } from './stores/categories';
import { useGetProducts } from '@/stores/getProducts';
import { useDiscounts } from './stores/discounts';
import { useOrder } from './stores/order';
import { useAddresses } from './stores/addresses';
import { useCartProducts } from './stores/cartStore';
const useCoupon = useCoupons();
const useCategory = useCategoriesStore();
const useAuthenticate = useAuthenticateStore();
const useGet = useGetProducts();
const usediscounts = useDiscounts()
const order = useOrder()
const cart = useCartProducts()
const address = useAddresses()
onMounted(() => {
    address.getAddress()
    useGet.getProducts()
    useCoupon.getCouponsStore();
    useAuthenticate.ferifyMe(); 
    useCategory.getCategoriesStores();
    usediscounts.getDiscounts()
    order.getOrders()
    order.getOrdersAll()
    cart.getItemsCartStore()
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
