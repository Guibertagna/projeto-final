<template>
    <div class="allCart">
      <CartComponent />
      <SelectShipping/>
    </div>
  </template>
  
  
  <script setup>
  import CartComponent from "@/components/Checkout/CartComponent.vue";
  import SelectShipping from "@/components/Checkout/SelectShipping.vue";
  import { useCartProducts } from "@/stores/cartStore";
import { onMounted } from "vue";
const useCart = useCartProducts();
  onMounted(() => {
    useCart.isCheckout = false;
  });
  </script>
  
  <style scoped>
  .allCart {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 40px;
    flex-wrap: wrap;
  }
  
  
  </style>