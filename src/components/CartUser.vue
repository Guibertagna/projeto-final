<template>
  <div class="allCart">
    <div class="card">
      <h2>Shopping Cart</h2>
      <div class="cart-items">
        <div v-for="(item, index) in groupitems" :key="item.product_id" class="cart-item">
          <div class="productd">
            <div class="img">
              <img :src="getImg(item.image_path)" alt="Product Image">
            </div>
            <div class="information">
              <div class="price">Preço unitário: <span>R$ {{ item.unit_price.toFixed(2) }}</span></div>
              <div class="quantity">Quantidade: <span>{{ item.quantity }}</span></div>
              <div class="total">Total: <span>R$ {{ item.total_price.toFixed(2) }}</span></div>
            </div>
            <div>
                <button @click="removeItemCart(item.product_id)" >Remove</button>
            </div>
          </div>
          <hr v-if="index < groupitems.length - 1" class="divider"/> 
        </div>
      </div>
      <div v-if="groupitems.length === 0" class="empty-cart">
        Seu carrinho está vazio
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCartProducts } from "@/stores/cartStore";

const useCart = useCartProducts();

function getImg(imagePath) {
    const baseUrl = 'http://35.196.79.227:8000';
    return `${baseUrl}${imagePath}`;
}
function removeItemCart(id){
    useCart.productId = id 
    console.log(useCart.productId)
    useCart.deleteProductfromcart()
    getitens()
}
const groupitems = computed(() => {
    const groupedProducts = {};

    useCart.itemsCart.items?.forEach((product) => {
        if (!groupedProducts[product.product_id]) {
            groupedProducts[product.product_id] = {
                product_id: product.product_id,
                quantity: 0,
                unit_price: product.unit_price,
                total_price: 0,
                image_path: product.image_path,
            };
        }
        groupedProducts[product.product_id].quantity += product.quantity;
        groupedProducts[product.product_id].total_price += product.unit_price * product.quantity;
    });

    return Object.values(groupedProducts);
});

function getitens() {
    useCart.getItemsCartStore();
}

onMounted(() => {
    getitens();
});
</script>

<style scoped>
.allCart {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.card {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  background-color: var(--neutral-color-03, white);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 1.5rem;
}

.card h2 {
  text-align: center;
  width: 100%;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-item {
  padding: 0.5rem 0;
}

.productd {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
}

.img {
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.img img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  transition: transform 0.2s ease;
}

.img img:hover {
  transform: scale(1.05);
}

.information {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
}

.information div {
  font-size: 0.95rem;
  color: #555;
}

.information span {
  font-weight: 600;
  color: #333;
  margin-left: 0.25rem;
}

.price, .quantity, .total {
  display: flex;
  align-items: center;
}

.total span {
  color: var(--primary-color, #e63946);
  font-size: 1.1rem;
}

.divider {
  border: none;
  height: 1px;
  background: #f0f0f0;
  margin: 0.5rem 0;
  width: 100%;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #888;
  font-style: italic;
}

@media (max-width: 600px) {
  .card {
    padding: 1rem;
  }
  
  .productd {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .img {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .img img {
    width: 150px;
    height: 150px;
  }
  
  .information {
    width: 100%;
  }
}
</style>