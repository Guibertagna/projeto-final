<template>
    <div v-if="loading.isLoad" class="modal-overlay">
      <div class="modal-box">
      <div class="spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
    </div>
  </template>
  
  <script setup>
  import { useLoader } from '@/stores/loader';
  const loading = useLoader()
  </script>
 

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-box {
  background-color: white;
  padding: 30px 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid var(--secondary-color-orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>