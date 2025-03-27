<template>
  <div class="all-cards">
    <div class="products-card" v-for="products in allProducts" :key="products.id">
      <div class="img-product">
           {{products.name}} 
      </div>
      <div class="button-product">
        <button>Add to cart</button>
      </div>
      <div class="rating">
        esrtrelinhas
      </div>
      <div class="name-discription">
          <h4>  {{products.name}} </h4>
          <h5>{{ products.discribe }}</h5>
          <h5>{{ products.price }}</h5>
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
.all-cards{
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
}
.products-card{
  border: 3px solid black;
  
}

</style>

 