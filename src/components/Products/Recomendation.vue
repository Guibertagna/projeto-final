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
      product => product.category.id === 170
    ));
    const getStoreProducts = useGetProducts();
    
  </script>
    
  <style scoped>
    .allcontent {
      width: 100%;
      height: auto;
    }

  </style>
  