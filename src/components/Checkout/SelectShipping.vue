<template>
      <div class="all-frete">
      <div>
        <div class="radio-options">
          <h2>Select Shipping</h2>
          <label>
            <input type="radio" v-model="useCart.shipping" value= 0 />
            Free Shipping (R$ 00,00)
          </label>
          <label>
            <input type="radio" v-model="useCart.shipping" value= 10 />
            Standard Shipping (R$ 10,00)
          </label>
          <label>
            <input type="radio" v-model="useCart.shipping" value= 20 />
            Express Shipping (R$ 20,00)
          </label>
          <label>
            <input type="radio" v-model="useCart.shipping" value= 30  />
            Next Day Shipping (R$ 30,00)
          </label>
          <br />
          <div class="cart-summary">
            <strong
              >Subtotal:
              {{ formatCurrency(useCart.finalPriceShipping) }}</strong
            >
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useCartProducts } from "@/stores/cartStore";
const useCart = useCartProducts();

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};
</script>

<style  scoped>

.all-frete {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
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


</style>

