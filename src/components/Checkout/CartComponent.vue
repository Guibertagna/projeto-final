<template>
  <div :class="useCart.isCheckout ? 'cart-checkout' : 'card'">
    <h2 v-if="!useCart.isCheckout">Shopping Cart</h2>
    <h2 v-if="useCart.isCheckout" style="font-weight: bold; font-size: 28px;">Products</h2>
    <!-- Cabeçalho -->
    <div :class="useCart.isCheckout ? 'cart-header-checkout' : 'cart-header'">
      <div>Product</div>
      <div>Quantity</div>
      <div>Price</div>
      <div>Subtotal</div>
    </div>

    <!-- Itens do Carrinho -->
    <div v-if="groupitems.length > 0" class="cart-items">
      <div
        v-for="item in groupitems"
        :key="item.product_id"
        :class="useCart.isCheckout ? 'cart-item-checkout' : 'cart-item-row'"
      >
        <!-- Produto -->
        <div class="product-cell" @click="goToDetails(item.product_id)">
          <img :src="getImg(item?.product_id)" alt="Product Image" />
          <p>{{ item.name }}</p>


        </div>

        <!-- Quantidade -->
        <div class="quantity-cell">
          <div :class="useCart.isCheckout ? 'quantity-checkout' : 'border'">
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
          <P class="price-responsive"><strong>Total Price: </strong></P>
          {{ formatCurrency(item.total_price) }}
        </div>
      </div>
      <div class="input-coupons" v-if="useCart.isCheckout">
        <label for="coupon">Coupon:</label>
        <input type="text" id="coupon" v-model="useCart.cuponCart" />
        <button @click="useCart.applyCoupon() ">Apply</button>
      </div>
      <div v-if="useCart.isCheckout" class="prices">
        <div class="coupon-used" v-if="useCart.isApplyCupon" >
          <div class="cupon-name">
            <label ><img class="ticket" src="@/assets/icons/ticket-percent.svg"></label>
            <h6 > {{ useCart.discountCouponView }}</h6>
          </div>
          <div class="percentage">
            <h6 id="discounted-percentage">- %{{ useCart.discountCoupon }} </h6>
          </div>
        </div>
        <div class="cart-summary" style="font-size: small;">
          <label  >Subtotal</label>
          <h5 class="final-price"  style="font-size: small;">  {{ formatCurrency(useCart.finalPrice) }}</h5>
        </div>
      
        <div class="cart-summary"  style="font-size: small;" >
        <label  > shipping value</label>
        <h5 class="final-price"  style="font-size: small;" > {{ formatCurrency(useCart.shipping) }} </h5>
      </div>
      <div class="cart-summary" style="font-size: small;" v-if="useCart.isApplyCupon">
            <label > Discounted Value:</label>
            <h6  style="font-size: small;color: red;">- {{ formatCurrency(useCart.discount) }}</h6>
          </div>
      <div class="cart-summary">
        <label >Total</label>
        <h5 class="final-price" style="font-weight: bold;"> {{ formatCurrency(useCart.finalPriceShipping) }} </h5>
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
import { useCoupons } from "@/stores/cupons";
import { useRoute, useRouter } from "vue-router";
import { useGetProducts } from "@/stores/getProducts"; 
import { useOrder } from "@/stores/order";
const useCart = useCartProducts();
const useProducts = useGetProducts()
const router = useRouter();
const order = useOrder()
const useCouponsStore = useCoupons();

function getImg(product_id) {

  const imgProduct = useProducts.products.find(p => p.id === product_id);
  
  const baseUrl = "http://35.196.79.227:8000";
  return `${baseUrl}${imgProduct?.image_path}`;
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
function goToDetails (id_product){
  router.push(`/products/${id_product}`);
}


onMounted(() => {
  order.coupom = null
  useCart.isApplyCupon = false;
  useCart.cuponCart = "";
  useCart.discountCoupon = 0;
  useCart.discount = 0;

  console.log(useCart.applyCoupon.value)

});
</script>


<style scoped>
@media (min-width: 769px) {
  .price-responsive {
    display: none; 
  }
}

.cart-checkout {
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  height: 100%;
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
  border-bottom: 2px solid #ddd;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 15px;
  margin-bottom: 15px;
}
.border{
  border: none;
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
.product-cell{
  display: flex;
  justify-content: space-between;
  justify-content: center;
}
.cart-item-checkout .product-cell img {
  width: 60%;
  height: auto;
  max-width: 200px;
}

/* Estilos compartilhados */
.input-coupons button{
  background-color: var(--primary-color);
  color: white; 
  border-radius: 10px;
  padding: 10px;
}
.input-coupons input{
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.input-coupons{ 
  justify-content: center;
  display: flex;
  gap: 10px;
  
}
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
  border: none;
  padding: 0 10px;
  min-width: 20px;
}
.cart-items{
  gap: 40px;
  display: flex;
  flex-direction: column;
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
.final-price{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 18px;

}
.prices{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  text-align: right;
  border-top: 1px solid #ddd;
  padding-top: 15px;
}
.coupon-used {
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: space-between;

}

.cupon-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: green;
}

.ticket {
  width: 20px;
  margin-bottom: 10px;
  height: 30px;
}

.button-checkout{
  background-color: var(--secondary-color-orange);
  color: white; 
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

@media (max-width: 768px) {
 
  .cart-header-checkout,
  .cart-item-row,
  .cart-item-checkout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: left;
  }
  .cart-header-checkout,.cart-heade{
    display: none;
  }

.subtotal-cell{
  display: flex;
  gap: 10px;
}
  .cart-item-checkout .product-cell img,
  .product-cell img {
    width: 100px;
    height: auto;
  }

  .cart-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .coupon-used,
  .cupon-name,
  .prices {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-coupons {
    flex-direction: column;
    align-items: stretch;
  }

  .input-coupons input,
  .input-coupons button {
    width: 100%;
  }

  .cart-checkout,
  .card {
    padding: 20px 15px;
  }

  .button-checkout {
    width: 100%;
  }
}


</style>