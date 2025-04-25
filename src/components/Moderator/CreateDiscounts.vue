<template>
<div class="all-content">
    <div class="create-discounts">
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
                <label>Products</label>
                <select   v-if="!isEdit" placeholder="category name" v-model="usediscounts.discountProduct_id" id="category">
                    <option     class="select-costumize" v-for="product in products.products " :key="product.id" :value="product.id">
                        {{ product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name }}
                    </option>
                </select>
                <select v-if="isEdit" ></select>
            </div>
      <div class="buttons">
        <button
          :disabled="isFormValid"
          :class="{ disabled: isFormValid }"
          v-if="!isEdit"
          class="create-btn"
          @click="createDiscount()"
        >
          Create discount
        </button>

      </div>
    </div>
    <div>
      <button class="showCoupons" @click="isShow = !isShow">
        {{ isShow ? "Hide Coupons" : "Show Coupons" }}
      </button>
    </div>

    <div v-if="isShow" class="container-discounts">
      <h1>All Discounts</h1>
      <div class="all-card-discount">
        <div v-for="(discount, index) in usediscounts.discountStore" :key="index">
          <div class="card-coupon">
            <div>
              <div
                class="status-flag valid"
                style="text-align: center"
                v-if="discount.end_date > dataFormatada && discount.start_date < dataFormatada"
              >
                VALID
           
              </div>
              <div style="text-align: center" class="status-flag invalid" v-else>
                <div v-if="discount.end_date < dataFormatada" >
                  EXPIRED IN {{ formatDate(discount.end_date) }}
                </div>
                <div v-if="discount.start_date > dataFormatada"> 
                    STARTING  IN {{ formatDate(discount.start_date) }}
                </div>
              </div>
     
              <h3 style="text-align: center">{{ discount.description }}</h3>
              <p>
                <strong>Discount percentage:</strong>
                {{ discount.discount_percentage }}%
              </p>
              <p>
                <strong>Start date:</strong>
                {{ formatDate(discount.start_date) }}
           
              </p>
              <p>
                <strong>End date:</strong> {{ formatDate(discount.end_date) }}
              
              </p>
              <div>
                {{ getNameProduct(discount.product_id) }}
             
              </div>
            </div>
            <div class="coupons-actions">
              <button
                class="edit-btn"
                @click="starteditDiscounts(discount), (isEdit = true)"
              >
                Edit
              </button>
              <button
                class="delete-btn"
                @click="confirmDelete(discount)"
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
          {{ usediscounts.discountDescription }}
        </p>
        <div class="form">
        <label for="percentage">Discount Percentage</label>
        <input
          id="percentage"
          v-model="usediscounts.discountPercentage"
          type="number"
          placeholder="Enter discount percentage"
        />
      </div>
      <div class="form">
        
        <label for="start">Start date discount</label>
        <input id="start" v-model="usediscounts.discountStartDate" type="date" />
      </div>
      <div class="form">
        <label for="end">End date discount</label>
        <input id="end" v-model="usediscounts.discountEndDate" type="date" />
      </div>
      <div class="form">
                <label>Products</label>
                <select placeholder="category name" v-model="usediscounts.discountProduct_id" id="category">
                    <option v-for="product in products.products " :key="product.id" :value="product.id">
                        {{ product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name }}

                    </option>
                </select>
            </div>
      <div class="modal-buttons">
        <button
          :disabled="isFormValid"
          :class="{ disabled: isFormValid }"
          v-if="isEdit"
          class="send-btn"
          @click="sendEditDiscounts(selecteddiscount)"
        >
          Edit Discounts
        </button>
        <button
          style="background-color: red"
          v-if="isEdit"
          class="delete-btn"
          @click="cancel()"
        >
          Cancel Edit
        </button>
      </div>

      </div>
    </div>
        </div>
        <LoaderComponent/>
<AlertBoxComponent :visible="showAlert" :message="massageOK" @close="showAlert = false"/>
<ConfirmComponent
:nameconfirm="confirMessage"
  :visible="showConfirm"
  @cancel="showConfirm = false"
@confirm="() => { deleteDiscounts(discountDelete); showConfirm = false }"
/>
</div>


</template>

<script setup>
  import { useDiscounts } from '@/stores/discounts';
  import { useGetProducts } from '@/stores/getProducts';
  import { ref, onMounted, computed} from 'vue';
  import { useLoader } from '@/stores/loader';
  import LoaderComponent from '../Loaders/LoaderComponent.vue';
  import AlertBoxComponent from '../Loaders/AlertBoxComponent.vue';
  import ConfirmComponent from '../Loaders/ConfirmComponent.vue';
  const loading = useLoader()
  const isShow = ref(false)
  const discountDelete = ref()
  const dataAtual = new Date();
  const products = useGetProducts()
  const usediscounts = useDiscounts()
  const isEdit = ref(false)
  const selecteddiscount = ref(null)
  const dataFormatada = ref();
  const showConfirm = ref(false)
  const confirMessage = ref()
  const showAlert = ref(false)
  const massageOK = ref('')
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
function confirmDelete(discounts) {

    discountDelete.value = discounts;
    console.log(discountDelete.value.id)
    confirMessage.value = discounts.description;
    showConfirm.value = true;
}
async function deleteDiscounts(discountDelete){
  console.log(discountDelete.id)
  try{
    loading.startLoading()
    const response = await usediscounts.deleteDiscounts(discountDelete.id)
    loading.endLoading()
    massageOK.value =`${discountDelete.description} deleted successfully!` 
    showAlert.value = true
    return response

  }catch(error){
    console.log(error)
  }
}
const isFormValid = computed(() => {
  return (
    !usediscounts.discountDescription.trim() ||
    !usediscounts.discountPercentage ||
    !usediscounts.discountEndDate || 
    !usediscounts.discountStartDate
  );
});
async function starteditDiscounts(discount) {
  console.log("Iniciando edição do discount:", discount);
  if (discount) {
    usediscounts.discountDescription= discount.description;
    usediscounts.discountPercentage = discount.discount_percentage;
    usediscounts.discountProduct_id = discount.product_id;
    usediscounts.discountStartDate = discount.start_date.split("T")[0];
    usediscounts.discountEndDate = discount.end_date.split("T")[0];
    selecteddiscount.value = discount.id;
  }
}
 function cancel() {
    usediscounts.discountDescription= "";
    usediscounts.discountPercentage = 0;
    usediscounts.discountStartDate = "";
    usediscounts.discountEndDate = "";
    usediscounts.discountProduct_id = 0;
    isEdit.value = false;
    selecteddiscount.value = 0;
}
async function createDiscount() {
  try{
    loading.startLoading()
    const response = await usediscounts.createDiscountsStore()
    loading.endLoading()
    massageOK.value ="Discount created successfully!"
    showAlert.value = true
    return response
  }

  catch(error){
    loading.endLoading()
    console.log(error)
  }
  
}

async function sendEditDiscounts(id) {
  try {
    loading.startLoading()
    const discountsEdit = await usediscounts.editDiscounts(id);
    console.log(discountsEdit)
    cancel();
    if (discountsEdit) {
      const index = usediscounts.discountStore.findIndex(
        (deiscounts) => deiscounts.id === id
      );
      if (index !== -1) {
        usediscounts.discountStore.splice(index, 1, discountsEdit);
        console.log(usediscounts.discountStore)
      } else {
        console.error("not found", id);
      }
    }
    cancel();
    loading.endLoading()
    massageOK.value = "Discounts edited successfully!"
    showAlert.value = true
    console.log("Coupon editado:", discountsEdit);
  } catch (error) {
    console.error("Erro ao editar coupon:", error);
  }
}

function getNameProduct(id){
  const index = products.products.findIndex(
    (product)=> product.id == id
  )
  return products.products[index]?.name
}
onMounted(() => {
  dataFormatada.value =
    dataAtual.toISOString().split("T")[0] +
    "T" +
    dataAtual.toTimeString().split(" ")[0];
});
</script>

<style  scoped>
/* Botões base */
button,
.send-btn,
.create-btn,
.edit-btn,
.delete-btn {
  margin-top: 20px;
  padding: 10px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

/* Botões com cores específicas */
.send-btn,
.create-btn {
  background-color: var(--primary-color);
}

button,
.edit-btn,
.edit-btn:hover {
  background-color: var(--secondary-color-orange);
}

.delete-btn {
  background-color: #f44336;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.create-btn {
  width: 100%;
  padding: 10px 20px;
  border-radius: 6px;
}

.disabled {
  background-color: #ccc;
  color: #666;
  border-color: #aaa;
  cursor: not-allowed;
}

/* Inputs */
input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--neutral-color-04);
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* Layout Flex e Grid */
.buttons,
.coupons-actions,
.modal-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.coupons-actions {
  justify-content: space-around;
  width: 100%;
}
.form{
  
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.all-content {
  flex-direction: row;
  gap: 50px;
  width: 100%;
  padding-top: 30px;
  margin: 40px;
}

.create-discounts {
  gap: 10px;
  border: 1px solid gray;
  width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.form {
  padding-top: 30px;
  gap: 8px;
}
select{
  width: 100%;
}
.container-discounts{
  text-align: center;
  width: 100%;
  flex-direction:column ;
  display: flex;
}
/* Grids */
.all-card-discount{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: start;
  align-items: start;
  gap: 30px;
  margin-top: 32px;
}

/* Cartões */
.card-coupon {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 300px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--primary-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-coupon:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
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

/* Flags de status */
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

/* Modal */
.modal-coupons {
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

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-buttons {
  justify-content: flex-end;
  margin-top: 1rem;
}

.modal-buttons button {
  margin-left: 0.5rem;
}


/* Outros */
.title {
  text-align: center;
}
</style>