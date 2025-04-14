<template>
    <div class="all-content">
      <!-- Navegação das Abas -->
      <div class="tabs">
        <button :class="{ active: activeTab === 1 }" @click="activeTab = 1">Categories</button>
        <button :class="{ active: activeTab === 2 }" @click="activeTab = 2">Coupons</button>
        <button :class="{ active: activeTab === 3 }" @click="activeTab = 3">Products</button>
      </div>
  
      <!-- Conteúdo das Abas -->
      <div v-if="activeTab === 1">
        <CreateNewCategorie />
      </div>
      <div v-if="activeTab === 2">
        <CreateCoupons />
      </div>
      <div v-if="activeTab === 3">
        <CreateProduct />
      </div>
    </div>
  </template>
  
  <script setup>
  import CreateCoupons from '@/components/Moderator/CreateCoupons.vue';
  import CreateNewCategorie from '@/components/Moderator/CreateNewCategorie.vue';
  import CreateProduct from '@/components/Moderator/CreateProduct.vue';
  
  import { ref } from 'vue';
  
  const activeTab = ref(1);  // Começa na aba 1
  </script>
  
  <style scoped>
  .all-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
  
  .tabs {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-right: 2px solid #ccc;
  }
  
  .tabs button {
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    font-size: 16px;
    color: #555;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .tabs button.active {
    padding: 2px;
    border-bottom: 2px solid var(--secondary-color-orange);
    
    font-weight: bold;
  }
  
  .tabs button:hover {
    color: #888;
  }
  
  div {
    margin-top: 20px;
  }
  </style>
  