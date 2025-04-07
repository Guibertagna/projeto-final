<template>
    <div class="checkout-container">  
        <div>
            <CartUser/>
        </div>

        <div>
            <CheckoutPayment/>
        </div>
        <div >
            <CheckoutAddress/>
        </div> 

    </div>
</template>

<script setup>
import CartUser from '@/components/CartUser.vue';
import CheckoutAddress from '@/components/CheckoutAddress.vue'
import CheckoutPayment from '@/components/CheckoutPayment.vue';
import { useCartProducts } from '@/stores/cartStore';

</script>

<style setup>

</style>