<template>
    <div class="allcontent">
      <div v-if="loading" class="products">
      <SkeletonComponent/>
     
    </div>
    <div v-else class="all-cards">
      <CardComponentProducts :productsProps="allProducts"/>
    </div>
    </div>
  </template>
  <script setup>
  
    import CardComponentProducts from '@/components/Products/CardComponentProducts.vue';
    import { ref, onMounted, computed } from "vue";
    import { useGetProducts } from "@/stores/getProducts";
    import SkeletonComponent from "@/components/Loaders/SkeletonComponent.vue"
    const allProducts = computed(() => getStoreProducts.products.filter(
      product => product.category.id === 200
    ));
    const loading = ref(true)
    const getStoreProducts = useGetProducts();
    onMounted(async () => {
      window.scrollTo(0, 0);
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  loading.value = false
});
  </script>
    
  <style scoped>
    .allcontent {
      width: 100%;
      height: auto;
    }

  </style>
  