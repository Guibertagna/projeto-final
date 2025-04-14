<template>
  <div>
    <h2>Mensagens do socket:</h2>
    <ul>
      <li v-for="(mensagem, index) in order.order_socket" :key="index">
        {{ mensagem.order_id }} - {{ mensagem.status }} - {{ mensagem.created_at }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useOrder } from '@/stores/order';

import { onMounted } from 'vue';
const order = useOrder();

</script>
