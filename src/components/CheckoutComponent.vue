<template>
    <div class="checkout-section" v-if="useCart.isCheckout">
      <h3>Finalizar Pedido</h3>
      <label for="addresses">Selecione um Endereço</label>
      <select v-model="userorder.address" id="addresses" class="address-select">
        <option v-for="address in useAddress.userAddresses" :key="address.id" :value="address.id">
          {{ address.number }}, {{ address.zip }} - {{ address.city }}, {{ address.state }}, {{ address.country }}
        </option>
      </select>
  
      <div class="checkout-buttons">
        <button class="cancel-btn" @click="useCart.isCheckout = false">Cancelar Pedido</button>
        <button class="send-btn" @click="sendOrder()">Enviar Pedido</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAddresses } from '@/stores/addresses';
  import { useCartProducts } from '@/stores/cartStore';
  import { useOrder } from '@/stores/order';
  import { onMounted } from 'vue';
  
  const userorder = useOrder();
  const useAddress = useAddresses();
  const useCart = useCartProducts();
  
  function sendOrder() {
        userorder.addOrder();
  }
  
  onMounted(async () => {
 
    await useAddress.getAddress();
  });
  </script>
  
  <style scoped>
  .checkout-section {
    margin-top: 2rem;
    padding: 1rem;
    background: #fdfdfd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
  
  .checkout-section h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
  }
  
  .address-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  .checkout-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .cancel-btn,
  .send-btn {
    flex: 1;
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease;
  }
  
  .cancel-btn {
    background: #dc3545;
    color: white;
  }
  
  .cancel-btn:hover {
    background: #c82333;
  }
  
  .send-btn {
    background: #007bff;
    color: white;
  }
  
  .send-btn:hover {
    background: #0069d9;
  }
  </style>
  