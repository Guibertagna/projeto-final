<template>
    <div class="checkout-container">
        <div class="cart-items">
            <CartUser/>
        </div>
        <div v-if="useCart.isCheckout" class="order">
            <CheckoutComponent/>
        </div>
    </div>
</template>

<script setup>
import CartUser from '@/components/CartUser.vue';
import CheckoutComponent from '@/components/CheckoutComponent.vue'
import { useCartProducts } from "@/stores/cartStore";

const useCart = useCartProducts();

</script>

<style setup>

</style>