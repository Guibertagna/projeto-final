<template>
    <div class="allcontent"> <h1 class="best">Best sellers</h1>
    <div class="all-cards">
       
      <div class="products-card" v-for="product in allProducts" :key="product.id">
        
        <div class="img-product">
          <img :src="getImg(product.image_path)" alt="product image">
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
  import { ref, onMounted } from 'vue';
  
  const allProducts = ref([]);
  
  function getImg(imagePath) {
    return imagePath.startsWith("http") ? imagePath : `http://34.138.111.33:8000${imagePath}`;
  }
  
  async function fetchMockedProducts() {
    // Simulação de API
    const products = [
      {
        "id": 1,
        "name": "Wireless Headphones",
        "price": "199.99",
        "stock": 25,
        "category_id": 1,
        "image_path": "/images/headphones1.png",
        "description": "High-quality wireless headphones with noise cancellation."
      },
      {
        "id": 2,
        "name": "Gaming Mouse",
        "price": "59.99",
        "stock": 40,
        "category_id": 2,
        "image_path": "/images/mouse1.png",
        "description": "Ergonomic gaming mouse with customizable buttons."
      },
      {
        "id": 3,
        "name": "Mechanical Keyboard",
        "price": "129.99",
        "stock": 15,
        "category_id": 3,
        "image_path": "/images/keyboard1.png",
        "description": "RGB backlit mechanical keyboard with fast response switches."
      },
      {
        "id": 4,
        "name": "Bluetooth Speaker",
        "price": "89.99",
        "stock": 30,
        "category_id": 4,
        "image_path": "/images/speaker1.png",
        "description": "Portable Bluetooth speaker with deep bass and long battery life."
      },
      {
        "id": 5,
        "name": "Smartwatch",
        "price": "149.99",
        "stock": 20,
        "category_id": 5,
        "image_path": "/images/smartwatch1.png",
        "description": "Smartwatch with health tracking and notifications."
      }
    ];
    
    allProducts.value = products;
  }
  
  onMounted(async () => {
    await fetchMockedProducts();
  });
  </script>
  
  <style scoped>
  .best{
    font-weight: bold;
    padding-left:40px;
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
  .allcontent{
    margin-top: 80px;
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
  