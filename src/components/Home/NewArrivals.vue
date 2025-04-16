<template>
    <div class="allcontent">
        <CardComponentProducts :productsProps="allProducts" :isNew="true"/>
      
    </div>
</template>

<script setup>
import CardComponentProducts from "@/components/Products/CardComponentProducts.vue";
import {  computed } from "vue";
import { useGetProducts } from "@/stores/getProducts";

const allProducts = computed(() => getStoreProducts.products.filter(
    product => product.category.id === 125
  ));
const getStoreProducts = useGetProducts();


</script>

<style scoped>
.allcontent {
    width: 100%;
    height: auto;
}
</style>
