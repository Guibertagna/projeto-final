<template>
  <div class="all-content">
    
    <div class="checkout-section" >
      <h2 class="tittle">Shipping Address</h2>
      <div class="address-options">
        <label class="label-title">Select your address</label>
      <div 
        v-for="address in useAddress.userAddresses" 
        :key="address.id" 
        class="radio-option">
        <input
      
          type="radio"
          :id="'address-' + address.id"
          :value="address.id"
          v-model="userorder.address"
          name="address-options"
        />
        <label :for="'address-' + address.id" >
          {{ address.street }}, {{ address.number }}, {{ address.zip }} - {{ address.city }}, {{ address.state }}, {{ address.country }}
        </label>
  </div>
    </div>
    <button class="create-button" @click="creatAdress()">Or create a new address</button>
    </div>
  <div v-if="useAddress.isCreateAddress">
    <AddressesComponent />
  </div>
  </div>
</template>

<script setup>
import { useAddresses } from '@/stores/addresses';
import { useCartProducts } from '@/stores/cartStore';
import { useOrder } from '@/stores/order';
import { onMounted } from 'vue';

import AddressesComponent from './AddressesComponent.vue';

const userorder = useOrder();
const useAddress = useAddresses();
const useCart = useCartProducts();

function sendOrder() {
      userorder.addOrder();
}
function creatAdress() {
  useAddress.isCreateAddress = true;
  console.log(useAddress.userAddresses.length != 0);
}


onMounted(async () => {

  await useAddress.getAddress();
  if (useAddress.userAddresses.length == 0) {
    useAddress.isCreateAddress = true;
  }
});
</script>

<style scoped>
.checkout-section {
  text-align: start;
  padding: 1rem;
  background: #fdfdfd;
  border-radius: 5px;
  border: 1px solid var(--primary-color);
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.create-button{
  background: var(--secondary-color-orange);
  padding:0.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  color: var(--neutral-color-02);
}
.checkout-section h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
}
.address-options {
  display: flex;
  flex-direction: column;
  gap:10px;
  width: 100%;
  margin-bottom: 1rem;
}

.label-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio-option input[type="radio"] {
  accent-color: var(--primary-color);
  width: 16px;
  height: 16px;
}

.radio-option label {
  font-size: 1rem;
  cursor: pointer;
}
.tittle {
  text-align: start;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 1rem; /* Adiciona espaçamento inferior */
}
</style>
