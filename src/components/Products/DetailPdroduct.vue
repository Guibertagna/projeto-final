<template>
    <div class="all-content"> 
        <div class="back">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <button @click="goBack" class="back-button">
        <span class="material-icons">arrow_back</span>
        </button>
    </div>
        <div class="all-card" v-if="product">
            <div class="image-product">
                <img :src="getImg(product.image_path)" class="image" alt="Product Image">
            </div>
            <div class="information">
                <h1 class="name">{{ product.name }}</h1>
                <div class="description">
                    <h3>Description:</h3> 
                    <span>{{ product.description }}</span>
                </div>
                <div class="price-stock">
                    <h2 class="price">R$ {{ product.price }}</h2>
                    <h4 class="stock">Stock: {{ product.stock }}</h4>
                </div>
                <div class="button-container">
                    <AddCard :productId=" product.id" :unit-price="Number(  product.price)" />
                    <button class="buy-now">Buy Now</button>
                </div>
            </div>
    </div>
    </div>
</template>

<script setup>
    import { useCartProducts } from "@/stores/cartStore";
    import { useGetProducts } from "@/stores/getProducts";
    import { onMounted, ref, watch, computed } from "vue";
    import { useRouter } from "vue-router";
import AddCard from "./AddCard.vue";
    const props = defineProps({
    idProps: {
        required: true
    },
    }); 
    const router = useRouter()
    const useProducts = useGetProducts();
    const id = computed(() => Number(props.idProps.id));
    const product = computed(() => {
        return useProducts.products.find(p => p.id === id.value);
    });
function goBack() {
  router.back(); // Ou router.go(-1) também funciona
}

    
    function getImg(imagePath) {
        const baseUrl = "http://35.196.79.227:8000";
        return `${baseUrl}${imagePath}`;
    }

    watch(
  [() => useProducts.products, () => props.idProps.id],
  ([newProducts, newId]) => {
    const id = Number(newId);
    if (newProducts.length > 0) {
      product.value = newProducts.find(p => p.id === id);
    }
  },
  { immediate: true }
);
</script>

<style scoped>

.all-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
    height: auto;
    width: 100%;
}


.back {
    align-self: flex-start;
}
.back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    text-decoration: none;
}

    .back-button .material-icons {
        font-size: 24px;
        color: black;
    }

.all-card {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 100%;
    height: auto;
    margin-top: 40px;
}


.image-product {
    border-radius: 10px;
    background-color: var(--neutral-color-03);
    flex: 0 0 400px;
    display: flex;
    justify-content: center;
}

.image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}
.information {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 500px;
}

.name {
    font-size: 24px;
    font-weight: bold;
}

.description {
    font-size: 16px;
    line-height: 1.5;
}

.price-stock {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-size: 22px;
    color: #4CAF50;
}

.stock {
    font-size: 16px;
    color: #777;
}


.button-container {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.buy-now {
    padding: 10px 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s ease;
} 


.buy-now {
    background-color: var(--secondary-color-orange);
    color: white;
}

.buy-now:hover {
    background-color: #e64a19;
}

@media (max-width: 768px) {
  .all-card {
    flex-direction: column;
    align-items: center;
  }

  .image-product {
    width: 100%;
    max-width: 400px;
    animation: moveImageUp 0.5s ease-in-out;
  }

  .information {
    width: 100%;
    max-width: 100%;
    animation: moveImageUp 0.5s ease-in-out;
  }

  .price-stock {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .button-container {
    flex-direction: column;
    width: 100%;
  }

  .buy-now {
    width: 100%;
    text-align: center;
  }
}

</style>