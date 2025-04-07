<template>
    <div class="checkout-payment">
      <h1>Payment</h1>
  
      <form @submit.prevent="submitPayment">
        <div class="form-group">
          <label for="payment-method">Método de Pagamento:</label>
          <select v-model="selectedMethod" id="payment-method" required>
            <option value="" disabled>Selecione um método</option>
            <option value="credit-card">Cartão de Crédito</option>
            <option value="debit-card">Cartão de Débito</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
        </div>
  
        <div
          v-if="selectedMethod === 'credit-card' || selectedMethod === 'debit-card'"
          class="form-group"
        >
          <label for="card-number">Número do Cartão:</label>
          <input
            type="text"
            id="card-number"
            v-model="cardNumber"
            placeholder="Digite o número do cartão"
            required
          />
        </div>
  
        <div v-if="selectedMethod === 'credit-card'" class="form-group">
          <label for="installments">Parcelas:</label>
          <select v-model="installments" id="installments" required>
            <option value="" disabled>Selecione o número de parcelas</option>
            <option v-for="n in 12" :key="n" :value="n">{{ n }}x</option>
          </select>
        </div>
  
        <div v-if="selectedMethod === 'pix'" class="form-group info-box">
          <p>Use o QR Code gerado para realizar o pagamento via PIX.</p>
        </div>
  
        <div v-if="selectedMethod === 'boleto'" class="form-group info-box">
          <p>O boleto será gerado após a confirmação.</p>
        </div>
  
        <button type="submit">Confirmar Pagamento</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedMethod = ref("");
  const cardNumber = ref("");
  const installments = ref(null);
  
  function submitPayment() {
    if (selectedMethod.value === "credit-card") {
      alert(`Pagamento com Cartão de Crédito confirmado! Parcelas: ${installments.value}`);
    } else if (selectedMethod.value === "debit-card") {
      alert("Pagamento com Cartão de Débito confirmado!");
    } else if (selectedMethod.value === "pix") {
      alert("Pagamento via PIX confirmado!");
    } else if (selectedMethod.value === "boleto") {
      alert("Boleto gerado com sucesso!");
    } else {
      alert("Selecione um método de pagamento.");
    }
  }
  </script>
  
  <style scoped>
  .checkout-payment {
    max-width: 460px;
    margin: 40px auto;
    padding: 30px;
    background-color: var(--neutral-color-01);
    border: 1px solid var(--neutral-color-03);
    border-radius: 12px;
    font-family: 'Segoe UI', sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  h1 {
    color: var(--neutral-color-07);
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
  }
  
  .form-group {
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
    border: 1px solid var(--neutral-color-03);
    border-radius: 6px;
    background-color: var(--neutral-color-01);
    color: var(--neutral-color-07);
    font-size: 14px;
    transition: border 0.3s ease;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: var(--secondary-color-blue);
  }
  
  .info-box {
    background-color: var(--neutral-color-02);
    border-left: 4px solid var(--secondary-color-blue);
    padding: 10px 12px;
    border-radius: 6px;
    color: var(--neutral-color-06);
    font-size: 14px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: var(--secondary-color-blue);
    color: var(--neutral-color-01);
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 15px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: var(--secondary-color-green);
  }
  </style>
  