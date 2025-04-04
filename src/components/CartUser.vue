<template>
  <div class="allCart">
    <div class="card">
      <h2>Shopping Cart</h2>
      <div class="cart-items">
        <div
          v-for="(item, index) in groupitems"
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
                Unit Price: <span>R$ {{ item.unit_price.toFixed(2) }}</span>
              </div>
              <div class="total">
                Total: <span>R$ {{ item.total_price.toFixed(2) }}</span>
              </div>
            </div>
            <div class="quantity-container">
              <button class="quantity-btn" :disabled="useCart.isCheckout" @click="removeItemCart(item.product_id)">-</button>
              <div class="quantity">
                <span>{{ item.quantity }}</span>
              </div>
              <button class="quantity-btn" :disabled="useCart.isCheckout" @click="addToCart(item.product_id, item.unit_price)">+</button>
            </div>
          </div>
          <hr v-if="index < groupitems.length - 1" class="divider" />
        </div>
      </div>
      <div class="cart-summary">
        <strong>Cart Total:</strong> R$ {{ useCart.itemsCart.total_amount.toFixed(2) }}
      </div>
      <button class="checkout-btn" :disabled="groupitems.length === 0 || useCart.isCheckout" @click="proceedToCheckout">
        Proceed to Checkout
      </button>
      <div v-if="groupitems.length === 0" class="empty-cart">
        Your cart is empty
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCartProducts } from "@/stores/cartStore";

const useCart = useCartProducts();

function getImg(imagePath) {
  const baseUrl = "http://35.196.79.227:8000";
  return `${baseUrl}${imagePath}`;
}

async function addToCart(id, unit_price) {
  useCart.productId = id;
  useCart.quantity = 1;
  useCart.unitPrice = Number(unit_price);
  await useCart.addProducts();
}

function removeItemCart(id) {
  useCart.productId = id;
  useCart.deleteProductfromcart();
}

const groupitems = computed(() => {
  const groupedProducts = {};
  useCart.itemsCart.items?.forEach((product) => {
    if (!groupedProducts[product.product_id]) {
      groupedProducts[product.product_id] = {
        product_id: product.product_id,
        name: product.name,
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

function proceedToCheckout() {
  useCart.isCheckout =  true
}

onMounted(() => {
  useCart.isCheckout = false
  getitens();
});
</script>

<style scoped>
.allCart {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.card {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 1.5rem;
}

.card h2 {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
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
  gap: 0.5rem;
  flex-grow: 1;
}

.information div {
  font-size: 1rem;
  color: #444;
}

.information span {
  font-weight: 600;
  color: #222;
}

.price,
.total {
  font-size: 1rem;
}

.total span {
  color: #e63946;
  font-size: 1.1rem;
}

.quantity-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  min-width: 40px;
}

.quantity-btn {
  background: #e63946;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-btn:hover {
  background: #c32f3a;
}

.quantity-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.divider {
  border: none;
  height: 1px;
  background: #f0f0f0;
  margin: 0.5rem 0;
  width: 100%;
}

.cart-summary {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;
}

.checkout-btn:hover {
  background: #218838;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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

  .quantity-container {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
