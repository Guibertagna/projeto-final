<template>
  <div>
    <div class="products-card" v-for="products in allProducts" :key="products.id">
      <div>
           {{products.name}} 
           {{ products.id }}  
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { useGetProducts } from '@/stores/getProducts';

import { onMounted, ref } from 'vue';
const getStoreProducts = useGetProducts()
const allProducts = ref([]);  

onMounted(async () => {
  await getStoreProducts.getProducts()
  allProducts.value = getStoreProducts.products.data
})

</script>

<style scoped>


</style>

 