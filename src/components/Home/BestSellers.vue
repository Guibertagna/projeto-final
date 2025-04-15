<template>
  <div class="allcontent">
    <CardComponentProducts :productsProps="allProducts"/>
  </div>
</template>
<script setup>
  import CardComponentProducts from '@/components/Products/CardComponentProducts.vue';
  import { ref, onMounted } from "vue";
  import { useGetProducts } from "@/stores/getProducts";
 
  const allProducts = ref([]);
  const getStoreProducts = useGetProducts();

  async function getBestSellers() {
    await getStoreProducts.getProductsCategory(39);
    allProducts.value = getStoreProducts.filtredProcducts.data;
    console.log(allProducts.value);
  }

  onMounted(async () => {
    getBestSellers();
  });
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
