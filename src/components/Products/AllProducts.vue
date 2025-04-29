<template>
  <div class="all-products">
    <div class="search-bar">
      <input
        v-model="typedTerm"
        @keyup.enter="applySearch"
        type="text"
        placeholder="Search product by name..."
      />
    </div>

    <div class="content">
      <!-- Sidebar de categorias -->
      <aside class="sidebar">
        <h3>Categories</h3>
        <div v-for="category in categories.categories.data" :key="category.id" class="category-item">
          <input
            type="checkbox"
            :id="`category-${category.da}`"
            :value="category.id"
            v-model="selectedCategories"
          />
          <label :for="`category-${category.id}`">{{ category.name}}</label>
        </div>
      </aside>

      <!-- Produtos -->
      <div class="product-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id">
          <div @click="goToDetails(product.id)">
            <div class="img-product">
              <div v-if="isNew" class="flag-new">New</div>
              <img :src="getImg(product.image_path)" :alt="product.name" :title="product.name">
            </div>
            <div class="name-description">
              <h4>{{ product.name.slice(0, 50) }}{{ product.name.length > 50 ? '...' : '' }}</h4>
              <h5>R$ {{ product.price }}</h5>
              <h7>Category: {{ product.category.name }}</h7>
            </div>
          </div>

          <div class="button-product">
            <AddCard :productId="product.id" :unit-price="Number(product.price)" />
          </div>

          <div class="rating">
            <span class="filled">★</span><span class="filled">★</span>
            <span class="filled">★</span><span>★</span><span>★</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGetProducts } from '@/stores/getProducts';
import AddCard from './AddCard.vue';
import { ref, computed, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';

const router = useRouter();
const categories = useCategoriesStore();
const productStore = useGetProducts();
const { products } = storeToRefs(productStore);

const searchTerm = ref('');
const typedTerm = ref('');
const allCategories = ref([]);
const selectedCategories = ref([]); // <-- categorias selecionadas

function getNameCategories() {
  allCategories.value = categories.categories;
}

function applySearch() {
  searchTerm.value = typedTerm.value;
}

// Filtro por nome e categorias
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(product.category.id);
    return matchesSearch && matchesCategory;
  });
});

function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}

function goToDetails(id_product) {
  router.push(`/products/${id_product}`);
}

onMounted(() => {
  getNameCategories();
});

const isNew = false;
</script>

  <style scoped>
  .all-products {
    min-height: 100vh;
    padding: 30px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid var(--neutral-color-03);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    background-color: var(--neutral-color-01);
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
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
  
  .flag-new {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: var(--secondary-color-orange);
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
  }
  
  .name-description {
    text-align: left;
    padding: 10px;
  }
  
  .name-description h4,
  .name-description h5 {
    margin: 5px 0;
  }
  
  .button-product {
    margin-top: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .rating span {
    font-size: 20px;
    color: #ccc;
  }
  
  .rating span.filled {
    color: gold;
  }
  .search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid var(--neutral-color-03);
}
.content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 200px;
  padding: 10px;
  border-right: 1px solid var(--neutral-color-03);
  background-color: var(--neutral-color-01);
}

.sidebar h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.category-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.category-item label {
  margin-left: 8px;
  cursor: pointer;
}

.product-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--neutral-color-03);
    margin-bottom: 20px;
  }
}
  </style>
  