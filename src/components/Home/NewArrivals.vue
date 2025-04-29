<template>
    <div v-if="loading" class="products">
      <SkeletonComponent/>
    </div>
    <div v-else class="allcontent">
        <CardComponentProducts :productsProps="allProducts" :isNew="true"/>
      
    </div>
</template>

<script setup>
import CardComponentProducts from "@/components/Products/CardComponentProducts.vue";
import {  computed, onMounted, ref } from "vue";
import SkeletonComponent from "@/components/Loaders/SkeletonComponent.vue"
import { useGetProducts } from "@/stores/getProducts";

const loading = ref(true); // Aqui começa como true
const allProducts = computed(() => getStoreProducts.products.filter(
    product => product.category.id === 199
  ));
const getStoreProducts = useGetProducts();

onMounted(async () => {
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // só pra efeito visual
  loading.value = false
});
</script>

<style scoped>
.allcontent {
    width: 100%;
    height: auto;
}
</style>
