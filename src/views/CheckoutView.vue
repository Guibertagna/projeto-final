<template>
    <div class="checkout-container">
      <div class="checkout-address">
        <CheckoutAddress />
        <CheckoutPayment />
      </div>
      <div class="chekcout-cart">
        <CartComponent />
      </div>
    </div>
  </template>
  
  <script setup>
  import CartComponent from '@/components/Checkout/CartComponent.vue';
  import CheckoutAddress from '@/components/Checkout/CheckoutAddress.vue'
  import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue';
  import { useCartProducts } from '@/stores/cartStore';
  import { onMounted } from 'vue';
  const usecart = useCartProducts()
  onMounted(() => {
    usecart.isCheckout = true;
  })
  </script>
  
  <style scoped>
  .checkout-address {
    width: 100%;
    height: 100%;
  }
  
  .checkout-container {
    margin: 50px;
    height: 100%;
    gap: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  
  .chekcout-cart {
    width: 100%;
    height: 100%;
  }
  
  /* No celular (max-width: 768px) inverta a ordem dos componentes */
  @media (max-width: 768px) {
    .checkout-container {
      flex-direction: column;
    }
  
    .checkout-address {
      order: 2; /* Faz o CheckoutPayment aparecer após o CartComponent */
    }
  
    .chekcout-cart {
      order: 1; /* Faz o CartComponent aparecer primeiro */
    }
  }
  
  /* No desktop (min-width: 769px) mantenha a ordem original */
  @media (min-width: 769px) {
    .checkout-container {
      flex-direction: row;
    }
  
    .checkout-address {
      order: 1; /* No desktop, o CheckoutAddress e CheckoutPayment aparecem antes do CartComponent */
    }
  
    .chekcout-cart {
      order: 2; /* CartComponent aparece por último no desktop */
    }
  }
  </style>
  