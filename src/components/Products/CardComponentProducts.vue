<template>
  <div class="carousel-wrapper">
    <button class="scroll-btn left" @click="scrollLeft" >‹</button>

    <div class="all-cards" ref="cardContainer">
      <div class="products-card" v-for="products in productsProps" :key="products.id">
        <div @click="goToDetails(products.id)">
          <div class="img-product">
            <div v-if="isNew" class="flag-new">New</div>
            <img :src="getImg(products.image_path)" :alt="products.name" :title="products.name">
          </div>
          <div class="name-discription">
            <h4>{{ products.name.slice(0, 50) }}{{ products.name.length > 50 ? '...' : '' }}</h4>
            <h5>R$ {{ products.price }}</h5>
          </div>
        </div>

        <div class="button-product">
          <AddCard :productId="products.id" :unit-price="Number(products.price)" />
        </div>

        <div class="rating">
          <span class="filled">★</span><span class="filled">★</span>
          <span class="filled">★</span><span>★</span><span>★</span>
        </div>
      </div>
    </div>

    <button class="scroll-btn right" @click="scrollRight">›</button>
  </div>
</template>

<script setup>

import AddCard from './AddCard.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const showLeftButton = ref(false);
const showRightButton = ref(false);
const cardContainer = ref(null);
const router = useRouter();
onMounted(() => {
  const container = cardContainer.value;
  if (!container) return;

  updateButtonVisibility();

  container.addEventListener('scroll', updateButtonVisibility);
  window.addEventListener('resize', updateButtonVisibility);
});

function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}
function goToDetails (id_product){
  router.push(`/products/${id_product}`);
}
function updateButtonVisibility() {
  const container = cardContainer.value;
  if (!container) return;
  showLeftButton.value = container.scrollLeft > 0;
  showRightButton.value = container.scrollLeft + container.clientWidth < container.scrollWidth;
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



function scrollLeft() {
  cardContainer.value.scrollBy({ left: -250, behavior: 'smooth' });
}
function scrollRight() {
  cardContainer.value.scrollBy({ left: 250, behavior: 'smooth' });
}
</script>

<style scoped>
.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding: 30px;
}
.all-cards {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  padding-bottom: 10px;
}
.img-product {
  width: 100%;
  height: 200px; 
  display: flex;
  align-items: center;
  overflow: hidden; 
}

.all-cards {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  padding-bottom: 10px;
}


.products-card {
  display: flex;
  flex: 0 0 auto;
  border: 1px solid var(--neutral-color-03);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: var(--neutral-color-01);
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  width: 250px; 
  max-height:500px;
  min-height: 300px;
  padding-top:10px ;
  text-align: center;
  
}
.scroll-btn.left {
  
  margin-right: 10px;
}

.scroll-btn.right {
  margin-left: 10px;
}
.scroll-btn {
  color: rgb(0, 0, 0);
  border: none;
  font-size: 5rem;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
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
