<template>
    <div v-if="isCartOpen" class="cart-overlay" @click.self="closeCart">
      <div class="allCart">
        <div class="card">
          <h2>Shopping Cart</h2>
          <div class="cart-items">
            <div
         v-for="(item, index) in useCart.groupedProducts"
              :key="item.product_id"
              class="cart-item"
            >
              <div class="productd">
                <div class="img">
                  <img :src="getImg(item.image_path)" alt="Product Image" />
                </div>
                <div class="information">
                  <div class="name">{{ item.name }}</div>
                  <div class="price">
                    Preço unitário: <span>R$ {{ item.unit_price.toFixed(2) }}</span>
                  </div>
                  <div class="total">
                    Total: <span>R$ {{ item.total_price.toFixed(2) }}</span>
                  </div>
                </div>
                <div class="quantity-container">
                  <div class="quantity">
                    <span>{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="useCart.groupedProducts.length === 0" class="empty-cart">
          Seu carrinho está vazio
        </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import { useCartProducts } from '@/stores/cartStore';
import { onMounted } from 'vue';
import { defineProps, computed} from "vue";

const useCart = useCartProducts()
const props = defineProps({
    isCartOpen: Boolean,
})
function getImg(imagePath) {
  const baseUrl = "http://35.196.79.227:8000";
  return `${baseUrl}${imagePath}`;
}
onMounted(async () => {
    await useCart.getItemsCartStore();
    console.log("Itens do carrinho carregados");
});

</script>

<style scoped>
.cart-overlay {
    margin-top: 100px;
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 70vh;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto;
}

.allCart {
  padding: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-cart {
  text-align: center;
  color: #777;
}
</style>