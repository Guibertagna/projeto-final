<template>
  <div class="all-cards">
    <div class="products-card" v-for="products in productsProps" :key="products.id">
      <div  @click="goToDetails(products.id)">
        <div class="img-product">
          <div v-if="isNew" class="flag-new">New</div>
          <img :src="getImg(products.image_path)" :alt="products.name" :title="products.name">
        </div>
      <div class="name-discription"  alt="products.name">
        <h4 alt="products.name">{{ products.name.slice(0, 50) }}{{ products.name.length > 50 ? '...' : '' }}</h4>
        <h5>R$ {{ products.price }}</h5>
    </div>
</div>
<div class="button-product" >
  <AddCard :productId="products.id" :unit-price="Number(products.price)" />
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

import AddCard from './AddCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}
function goToDetails (id_product){
  router.push(`/products/${id_product}`);
}
const props = defineProps({
  productsProps: {
    type: Array,
    required: true
  },
  isNew: {
    type: Boolean,
    required: false
  }
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

    max-height:500px;
    padding-left:30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-items: center;
    
  }

.products-card {
  display: flex;
  border: 1px solid var(--neutral-color-03);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: var(--neutral-color-01);
  padding: 10px;
  margin: 10px;
 
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  width: 300px; 
  max-height:500px;
  min-height: 300px;
  padding-top:10px ;
  text-align: center;
  
}

.button-product {
  margin-top: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
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
.flag-new {
  position: absolute;
  background-color: var(--secondary-color-orange);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
    top: 10px;
    left: 10px;
  border-radius: 4px;
}
.img-product {
  position: relative; 
  width: 100%;
  height: 200px; 
  display: flex;
  align-items: center;
  justify-content: center;
 
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
