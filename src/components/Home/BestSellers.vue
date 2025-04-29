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
import SkeletonComponent from "@/components/Loaders/SkeletonComponent.vue"
import { ref, onMounted, computed } from "vue";
import { useGetProducts } from "@/stores/getProducts";

const loading = ref(true);

const getStoreProducts = useGetProducts();

const allProducts = computed(() => getStoreProducts.products.filter(
  product => product.category.id === 197
));

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // só pra efeito visual
  loading.value = false
});
</script>

<style scoped>
.allcontent {
  margin-top: 90px;
  width: 100%;
  height: auto;
}
.all-cards {
  display: flex;
  gap: 20px;

}
.best {
  font-weight: bold;
  padding-left: 40px;
} 
.products{
  width: 100%
}

</style>
