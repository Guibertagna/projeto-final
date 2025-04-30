<template>
  <div class="checkout-payment">
    <h2 style="font-weight: bold; font-size: 28px">Payment</h2>
    <div >
      <div class="form-group">
        <label>Método de Pagamento:</label>
        <div class="radio-options">
          <label class="option" for="credit-card">
            <input type="radio" id="credit-card" v-model="selectedMethod" value="credit-card" />
            Credit card
          </label>
         
          <label class="option" for="paypal">
            <input type="radio" id="paypal" v-model="selectedMethod" value="paypal" />
            PayPal
          </label>
          
        </div>
      </div>

      <div
        v-if="selectedMethod === 'credit-card'"
        class="form-group"
      >
        <label for="card-number">Card number:</label>
        <input class="input"
          type="number"
          id="card-number"
          v-model="cardNumber"
          placeholder=" Enter your card number"
          required
        />
      </div>

      <div v-if="selectedMethod === 'credit-card'" class="form-group">
        <label for="installments">Installments:</label>
        <select v-model="installments" id="installments" required>
          <option value="" disabled>Select the number of installments</option>
          <option v-for="n in 12" :key="n" :value="n">{{ n }}x</option>
        </select>
      </div>

      <div v-if="selectedMethod === 'paypal'" class="form-group info-box">
        <p>Use the QR Code to make the payment via PAYPAL.</p>
      </div>

      
      <button class="submity" @click="submitPayment()">Confirmar Pagamento</button>
    </div>
    <LoaderComponent/>
    <AlertBoxComponent :visible="showAlert" :message="massageOK" @close="showAlert = false"/>
    
  </div>
</template>
  
  <script setup>
  import LoaderComponent from '../Loaders/LoaderComponent.vue';
  import AlertBoxComponent from '../Loaders/AlertBoxComponent.vue';
import { ref } from "vue";
import { useOrder } from "@/stores/order";
import { useLoader } from '@/stores/loader';
import { useRouter } from 'vue-router';
const router = useRouter()
const selectedMethod = ref("");
const loading = useLoader()
const cardNumber = ref("");
const showAlert = ref(false)
const massageOK = ref()
const installments = ref(null);
const order = useOrder();
async function submitPayment() {
  loading.startLoading()
    if ( !order.address ||!selectedMethod.value || (selectedMethod.value === 'credit-card' && (cardNumber.value === '' || installments.value === null)) // Caso seja 'credit-card' e os campos estejam vazios
    ) {
      showAlert.value= true
      massageOK.value = 'Fill in the payment and address details'
      loading.endLoading()
        return;
    } else {
       try{
         const response = await order.addOrder();
         console.log(response)
         if(response.status === 201 ){
          goToDetails(response.data.id)
          loading.endLoading()
         }
       
         
         return response
       }catch(error){
        
        loading.endLoading()
       }
    }
}
function goToDetails (id_product){
  router.push(`/order-detail/${id_product}`);
}
</script>
  
  <style scoped>
  
.checkout-payment {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  padding: 30px;
  background-color: var(--neutral-color-01);
  border-radius: 5px;
  height: auto;
  border: 1px solid var(--primary-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  color: var(--neutral-color-07);
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: var(--neutral-color-06);
  font-weight: 500;
}

input,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--neutral-color-04);
  border-radius: 6px;
  background-color: var(--neutral-color-01);
  color: var(--neutral-color-07);
  font-size: 14px;
  transition: border 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
}



.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: var(--primary-color);
}


.radio-options {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

.radio-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  cursor: pointer;
}

.radio-options input[type="radio"] {
  accent-color: var(--primary-color);
  width: 18px;
  height: 18px;
}

/* Estilo do botão de envio */
.submity{
  display: block;
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  background-color: var(--primary-color);

  border-radius: 4px;
  color: var(--neutral-color-01);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.option{
  width: 100%;
  padding: 7px ;
  border: 1px solid var(--primary-color);
  border-radius: 4px ;
}
.submity:hover {
  background-color: var(--neutral-color-05)
}




.info-box {
  background-color: var(--neutral-color-02);
  border-left: 4px solid var(--secondary-color-blue);
  padding: 10px 12px;
  border-radius: 6px;
  color: var(--neutral-color-06);
  font-size: 14px;
}



</style>
  