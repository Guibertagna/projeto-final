<template>
<div class="all-content">
    <div class="create-coupon">
      <div class="title" v-if="!isEdit">
        <h3>Add new Discount</h3>
      </div>
      <div class="title" v-if="isEdit">
        <h3>Edit Discount</h3>
      </div>

      <div class="form">
        <label  for="description">Description of discount</label>
        <input
          v-if="!isEdit"
          id="description"
          v-model="usediscounts.discountDescription"
          type="text"
          placeholder="Enter Description of discount"
        />
        <input
          v-if="isEdit"
          
        />
         
        
      </div>
      <div class="form">
        <label for="percentage">Discount Percentage</label>
        <input v-if="!isEdit"
          id="percentage"
          v-model="usediscounts.discountPercentage"
          type="number"
          placeholder="Enter discount percentage"
        />
        <input
          v-if="isEdit"/>
      </div>
      <div class="form">
        <label for="start">Start date discount</label>
        <input v-if="!isEdit" id="start" v-model="usediscounts.discountStartDate" type="date" />
        <input v-if="isEdit" type="date"/>
      </div>
      <div class="form">
        <label for="end">End date discount</label>
        <input v-if="!isEdit" id="end" v-model="usediscounts.discountEndDate" type="date" />
        <input v-if="isEdit" type="date"/>
      </div>
      <div class="form">
                <label for="category">Products</label>
                <select placeholder="category name" v-model="usediscounts.discountProduct_id" id="category">
                    <option v-for="product in products.products " :key="product.id" :value="product.id">
                        {{ product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name }}

                    </option>
                </select>
            </div>
      <div class="buttons">
        <button
          :disabled="isFormValid"
          :class="{ disabled: isFormValid }"
          v-if="!isEdit"
          class="create-btn"
          @click="usediscounts.createDiscountsStore"
        >
          Create coupon
        </button>

      </div>
    </div>

</div>

</template>

<script setup>
import { useDiscounts } from '@/stores/discounts';
import { useGetProducts } from '@/stores/getProducts';
import { ref } from 'vue';

    const products = useGetProducts()
    const usediscounts = useDiscounts()
    const isEdit = ref(false)

</script>

<style  scoped>

.send-btn {
  margin-top: 20px;
  padding: 10px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.all-content {
  display: flex;
  gap: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  margin: 40px;
}
.container-coupon {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.create-coupon {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  border: 1px solid gray;
  width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.title {
  text-align: center;
}

.form {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
button {
  margin-top: 20px;
  padding: 10px 16px;
  background-color: var(--secondary-color-orange);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--neutral-color-04);
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
</style>