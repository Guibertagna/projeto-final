<template>
    <div class="checkout-container">  
        <div class="checkout-address">
            <CheckoutAddress/>
            <CheckoutPayment/>
        </div>
        <div class="chekcout-cart" >
            <CartComponent/>
        </div> 
    </div>
</template>

<script setup>
import CartComponent from '@/components/CartComponent.vue';
import CheckoutAddress from '@/components/CheckoutAddress.vue'
import CheckoutPayment from '@/components/CheckoutPayment.vue';
</script>

<style setup>
.checkout-address{
        width: 100%;
        height: 100%;
    }
    .checkout-container{
        margin: 50px;
        gap: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .chekcout-cart{
        width: 100%;
        height: 100%;
    }
 

</style>