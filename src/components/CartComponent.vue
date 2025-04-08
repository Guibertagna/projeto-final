<template>
  <div :class="useCart.isCheckout ? 'cart-checkout' : 'card'">
    <h2>Shopping Cart</h2>
    
    <!-- Cabeçalho -->
    <div :class="useCart.isCheckout ? 'cart-header-checkout' : 'cart-header'">
      <div>Product</div>
      <div>Quantity</div>
      <div>Price</div>
      <div>Subtotal</div>
    </div>

    <!-- Itens do Carrinho -->
    <div v-if="groupitems.length > 0">
      <div
        v-for="item in groupitems"
        :key="item.product_id"
        :class="useCart.isCheckout ? 'cart-item-checkout' : 'cart-item-row'"
      >
        <!-- Produto -->
        <div class="product-cell">
          <img :src="getImg(item.image_path)" alt="Product Image" />
          <p class="product-name">{{ item.name }}</p>
        </div>

        <!-- Quantidade -->
        <div class="quantity-cell">
          <div  :class="useCart.isCheckout ? 'quantity-checkout' : 'border'">
            <button
              v-if="!useCart.isCheckout"
              class="quantity-btn"
              @click="removeItemCart(item.product_id)"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              v-if="!useCart.isCheckout"
              class="quantity-btn"
              @click="addToCart(item.product_id, item.unit_price)"
            >
              +
            </button>
          </div>
        </div>

        <!-- Preço -->
        <div class="price-cell">
          {{ formatCurrency(item.unit_price) }}
        </div>

        <!-- Subtotal -->
        <div class="subtotal-cell">
          {{ formatCurrency(item.total_price) }}
        </div>
      </div>

      <button 
        v-if="!useCart.isCheckout"
        class="button-checkout" 
        @click="proceedCheckout()"
      >
        Proceed to Checkout
      </button>
    </div>

    <div v-else class="empty-cart">
      Your cart is empty
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCartProducts } from "@/stores/cartStore";
const useCart = useCartProducts();
import { useRouter } from "vue-router";
const router = useRouter();
function getImg(imagePath) {
  const baseUrl = "http://35.196.79.227:8000";
  return `${baseUrl}${imagePath}`;
}
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};
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
function proceedCheckout() {
  useCart.isCheckout = true;
  router.push({
    name: "Checkout",
  });
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
    groupedProducts[product.product_id].total_price +=
      product.unit_price * product.quantity;
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


/* Layout de checkout (vertical) */
.cart-checkout {
  margin: auto;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.cart-header-checkout {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  flex-direction: row;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item-checkout {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.cart-item-checkout > div {
  display: flex;
  justify-content: space-between;
}



.cart-item-checkout .product-cell {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.cart-item-checkout .product-cell img {
  width: 60%;
  height: auto;
  max-width: 200px;
}

/* Estilos compartilhados */



.allCart {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 40px;
  flex-wrap: wrap;
  background-color: #f9f9f9;
}

.card {
    flex: 1 1 auto;;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.cart-header,
.cart-item-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  padding: 12px 0;
}

.cart-header {
  font-weight: bold;
  font-size: 18px;
  border-bottom: 2px solid #ddd;
  color: #333;
}

.cart-item-row {
  border-bottom: 1px solid #e0e0e0;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-cell img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}



.quantity-btn {
  background-color: #f0f0f0;
  border: none;
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}


.quantity {
  padding: 0 10px;
  min-width: 20px;
}

.radio-options {
  flex: 1 1 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.radio-options h2 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}

.radio-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background 0.2s;
}

.radio-options label:hover {
  background-color: #f5f5f5;
}

.cart-summary {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.button-checkout{
  background-color: var(--secondary-color-orange);
  color: white; 
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

</style>