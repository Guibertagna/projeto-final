<template >
  <div  class="all-content">
    <div class="create-coupon">
      <div class="title" v-if="!isEdit">
        <h3>Add new coupon</h3>
      </div>
      <div class="title" v-if="isEdit">
        <h3>Edit coupon</h3>
      </div>

      <div class="form">
        <label  for="code">Code of coupon</label>
        <input
          v-if="!isEdit"
          id="code"
          v-model="useCoupon.couponCode"
          type="text"
          placeholder="Enter coupon code"
        />
        <input
          v-if="isEdit"
          
        />
         
        
      </div>
      <div class="form">
        <label for="percentage">Discount Percentage</label>
        <input v-if="!isEdit"
          id="percentage"
          v-model="useCoupon.couponPercentage"
          type="number"
          placeholder="Enter discount percentage"
        />
        <input
          v-if="isEdit"/>
      </div>
      <div class="form">
        <label for="start">Start date discount</label>
        <input v-if="!isEdit" id="start" v-model="useCoupon.couponStartDate" type="date" />
        <input v-if="isEdit" type="date"/>
      </div>
      <div class="form">
        <label for="end">End date discount</label>
        <input v-if="!isEdit" id="end" v-model="useCoupon.couponEndDate" type="date" />
        <input v-if="isEdit" type="date"/>
      </div>

      <div class="buttons">
        <button
          :disabled="isFormValid"
          :class="{ disabled: isFormValid }"
          v-if="!isEdit"
          class="create-btn"
          @click="useCoupon.createCouponsStore"
        >
          Create coupon
        </button>

      </div>
    </div>
    <div>
      <button class="showCoupons" @click="isShow = !isShow">
        {{ isShow ? "Hide Coupons" : "Show Coupons" }}
      </button>
    </div>

    <div v-if="isShow" class="container-coupon">
      <h1>All coupons</h1>
      <div class="all-card-coupon">
        <div v-for="(coupons, index) in useCoupon.couponStore" :key="index">
          <div class="card-coupon">
            <div>
              <div
                class="status-flag valid"
                style="text-align: center"
                v-if="coupons.end_date > dataFormatada && coupons.start_date < dataFormatada"
              >
                VALID
           
              </div>
              <div style="text-align: center" class="status-flag invalid" v-else>
                <div v-if="coupons.end_date < dataFormatada" >
                  EXPIRED IN {{ formatDate(coupons.end_date) }}
                </div>
                <div v-if="coupons.start_date > dataFormatada"> 
                    STARTING  IN {{ formatDate(coupons.start_date) }}
                </div>
              </div>

              
              <h3 style="text-align: center">{{ coupons.code }}</h3>
              <p>
                <strong>Discount percentage:</strong>
                {{ coupons.discount_percentage }}%
              </p>
              <p>
                <strong>Start date:</strong>
                {{ formatDate(coupons.start_date) }}
           
              </p>
              <p>
                <strong>End date:</strong> {{ formatDate(coupons.end_date) }}
              
              </p>
            </div>
            <div class="coupons-actions">
              <button
                class="edit-btn"
                @click="starteditCoupon(coupons), (isEdit = true)"
              >
                Edit
              </button>
              <button
                class="delete-btn"
                @click="useCoupon.deleteCoupons(coupons.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEdit" class="modal-coupons">
        <div class="modal-content">
          <div>
            <p
          v-if="isEdit"
          style="text-align: center; font-weight: bold; font-size: 20px"
        >
          {{ useCoupon.couponCode }}
        </p>
        <div class="form">
        <label for="percentage">Discount Percentage</label>
        <input
          id="percentage"
          v-model="useCoupon.couponPercentage"
          type="number"
          placeholder="Enter discount percentage"
        />
      </div>
      <div class="form">
        
        <label for="start">Start date discount</label>
        <input id="start" v-model="useCoupon.couponStartDate" type="date" />
      </div>
      <div class="form">
        <label for="end">End date discount</label>
        <input id="end" v-model="useCoupon.couponEndDate" type="date" />
      </div>
      <div class="modal-buttons">
        <button
          :disabled="isFormValid"
          :class="{ disabled: isFormValid }"
          v-if="isEdit"
          class="send-btn"
          @click="sendEditCoupon(selectedCouponId)"
        >
          Edit coupon
        </button>
        <button
          style="background-color: red"
          v-if="isEdit"
          class="delete-btn"
          @click="cancelEdit()"
        >
          Cancel Edit
        </button>
      </div>

      </div>
    </div>
        </div>
  </div>
</template>

<script setup>
import { useCoupons } from "@/stores/cupons";
import { onMounted, ref, computed } from "vue";

const useCoupon = useCoupons();
const dataAtual = new Date();
const isEdit = ref(false);
const isShow = ref(false);
const selectedCouponId = ref(null);
const dataFormatada = ref();

onMounted(() => {
  dataFormatada.value =
    dataAtual.toISOString().split("T")[0] +
    "T" +
    dataAtual.toTimeString().split(" ")[0];
});
const isFormValid = computed(() => {
  return (
    !useCoupon.couponCode.trim() ||
    !useCoupon.couponPercentage ||
    !useCoupon.couponStartDate || 
    !useCoupon.couponEndDate
  );
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

async function starteditCoupon(coupon) {
  console.log("Iniciando edição do cupom:", coupon);
  if (coupon) {
    useCoupon.couponCode = coupon.code;
    useCoupon.couponPercentage = coupon.discount_percentage;
    useCoupon.couponStartDate = coupon.start_date.split("T")[0];
    useCoupon.couponEndDate = coupon.end_date.split("T")[0];
    selectedCouponId.value = coupon.id;
  }
}
async function sendEditCoupon(id) {
  try {
    const couponEdit = await useCoupon.editCouponStore(id);
    if (couponEdit) {
      const index = useCoupon.couponStore.findIndex(
        (coupon) => coupon.id === id
      );
      if (index !== -1) {
        useCoupon.couponStore[index] = couponEdit.data;
      } else {
        console.error("Coupon not found in the store:", id);
      }
    }
    cancelEdit();
    console.log("Coupon editada:", couponEdit);
  } catch (error) {
    console.error("Erro ao editar coupon:", error);
  }
}
function cancelEdit() {
  useCoupon.couponCode = "";
  useCoupon.couponPercentage = "";
  useCoupon.couponStartDate = "";
  useCoupon.couponEndDate = "";
  selectedCouponId.value = null;
  isEdit.value = false;
}
</script>

  <style scoped>
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
.coupons-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.all-card-coupon {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 30px;
  
  margin-top: 32px;

}

.card-coupon {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 300px;
  height: 260px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--primary-color);
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-coupon:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.status-flag {
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  margin-bottom: 12px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.valid {
  background-color: #4caf50;
}

.invalid {
  background-color: #f44336;
}

.card-coupon h3.coupon-code {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--primary-color);
}

.card-coupon p {
  font-size: 14px;
  color: #555;
  margin: 4px 0;
}

.create-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
}

.edit-btn {
  background-color: var(--secondary-color-orange);
  color: white;
}

.edit-btn:hover {
  background-color: var(--secondary-color-orange);
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
.disabled {
    background-color: #ccc;
    color: #666;
    border-color: #aaa;
    cursor: not-allowed;
}
.modal-coupons{
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content{
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.modal-buttons button {
  margin-left: 0.5rem;
}
</style>
  