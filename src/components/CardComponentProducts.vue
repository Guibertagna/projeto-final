<template>
  <div class="all-cards">
    <div class="products-card" v-for="products in allProducts" :key="products.id">
      
      <div class="img-product">
         <img :src="getImg(products.image_path)" alt="prodct image">
      </div>
      
      <div class="name-discription">
        <h4>{{ products.name }}</h4>
        
        <h5>R$ {{ products.price }}</h5>
    </div>

      <div class="button-product">
        <button>Add to cart</button>
      </div>

      <div class="rating">
        <span class="filled">★</span>
        <span class="filled">★</span>
        <span class="filled">★</span>
        <span>★</span>
        <span>★</span>
      </div>

    </div>
  </div>
  
</template>

<script setup>
import { useGetProducts } from '@/stores/getProducts';
import { onMounted, ref } from 'vue';

const getStoreProducts = useGetProducts()
const allProducts = ref([]);  

function getImg(imagePath) {
  const baseUrl = 'http://34.138.111.33:8000';
  return `${baseUrl}${imagePath}`;
}

onMounted(async () => {
  await getStoreProducts.getProducts();
  allProducts.value = getStoreProducts.products.data;
});
</script>

<style scoped>

.img-product {
  width: 100%;
  height: 200px; 
  display: flex;
  align-items: center;
  overflow: hidden; 
}

.all-cards {
    text-align: start;
    display: grid;
    padding-top: 30px;
    padding-left:30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-items: center;
    width: 100%;
  }

.products-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px; 
  height: 450px;
  padding: 20px;
  text-align: center;
  
}

.button-product {
  margin-top: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Espaço entre o botão e a parte inferior */
}

.button-product button {
  height: 40px;
  width: 160px;
  color: var(--neutral-color-01);
  background-color: var(--primary-color);
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.rating {
  display: inline-block;
}

.rating span {
  font-size: 20px;
  color: #ccc;
}

.rating span.filled {
  color: gold;
}
.img-product img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
}

.name-discription {
  width: 100%;
  text-align: start;
  padding: 10px;
}

.name-discription h4, 
.name-discription h5 {
  text-align: left;
  font-weight: bold;
  margin: 0; 
}

</style>
