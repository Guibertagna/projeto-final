

<template>
    <div class="allcontent">
        <CardComponentProducts :productsProps="allProducts" :isNew="true"/>
    </div>
</template>
<script setup>
    import CardComponentProducts from "@/components/Products/CardComponentProducts.vue";
    import { ref, onMounted } from "vue";
    import { useGetProducts } from "@/stores/getProducts";
    
    const allProducts = ref([]);
    const getStoreProducts = useGetProducts();
    async function getProducts() {
        await getStoreProducts.getProductsCategory(125);
        allProducts.value = getStoreProducts.filtredProcducts.data;
        console.log(allProducts.value);
    }
  
    onMounted(async () => {
        getProducts();
    });
</script>
    
<style scoped>
   .allcontent{
        width: 100%;
        height: auto;
    }
    
</style>
  