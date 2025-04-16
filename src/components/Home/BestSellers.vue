<template>
  <div class="allcontent">
    <CardComponentProducts :productsProps="allProducts"/>
  </div>
</template>
<script setup>
  import CardComponentProducts from '@/components/Products/CardComponentProducts.vue';
  import { ref, onMounted, computed } from "vue";
  import { useGetProducts } from "@/stores/getProducts";
  
  const allProducts = computed(() => getStoreProducts.products.filter(
    product => product.category.id === 39
  ));
  const getStoreProducts = useGetProducts();

</script>
  
<style scoped>
  .allcontent {
    margin-top: 90px;
    width: 100%;
    height: auto;

  }
  .best {
    font-weight: bold;
    padding-left: 40px;
  } 
</style>
