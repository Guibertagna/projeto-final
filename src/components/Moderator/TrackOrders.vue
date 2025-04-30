<template>
    <div class="all-content">
      <h1>Track Orders</h1>
      <div v-if="orderSocket.length">
        <h2>Novos Pedidos:</h2>
        <ul>
          <li v-for="(order, index) in orderSocket" :key="index">
            {{ order }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Nenhum pedido novo.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { useOrder } from '@/stores/order'

  const orderStore = useOrder()
  const { order_socket: orderSocket } = storeToRefs(orderStore)
  </script>
  
  <style scoped>
  .all-content{
    display: flex ;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  h1 {
    margin-bottom: 1rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background: #f5f5f5;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
  }
  </style>
  