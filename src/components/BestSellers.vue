<template>
  <div class="allcontent">
    <h1 class="best">Best sellers</h1>
    <div class="all-cards">
      <div
        class="products-card"
        v-for="product in allProducts"
        :key="product.id"
      >
        <div class="img-product">
          <img :src="getImg(product.image_path)" alt="product image" />
        </div>

        <div class="name-description">
          <h4>{{ product.name }}</h4>
          <h5>{{ product.description }}</h5>
          <h5>R$ {{ product.price }}</h5>
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
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useGetProducts } from "@/stores/getProducts";
const allProducts = ref([]);
const getStoreProducts = useGetProducts();
function getImg(imagePath) {
  const baseUrl = "http://35.196.79.227:8000";
  return `${baseUrl}${imagePath}`;
}
async function getBestSellers() {
  await getStoreProducts.getProductsCategory(37);

  allProducts.value = getStoreProducts.filtredProcducts.data;
  console.log(allProducts.value);
}

onMounted(async () => {
  getBestSellers();
});
</script>
  
  <style scoped>
.best {
  font-weight: bold;
  padding-left: 40px;
}
.img-product {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.img-product img {
  max-width: 100%;
  height: auto;
}
.allcontent {
  margin-top: 80px;
}

.all-cards {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 20px;
  width: 100%;
}

.products-card {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 450px;
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

.name-description {
  width: 100%;
  text-align: start;
  padding: 10px;
}

.name-description h4,
.name-description h5 {
  text-align: left;
  font-weight: bold;
  margin: 0;
}
</style>
  