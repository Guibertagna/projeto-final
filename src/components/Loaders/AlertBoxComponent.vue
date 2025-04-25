<template>
    <div v-if="visible" class="alert-overlay">
      <div class="alert-box">
        <p class="alert-message">{{ message }}</p>
        <button class="close-btn" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  })
  </script>
  
  <style scoped>
  .alert-overlay {
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
  
  .alert-box {
    background-color: white;
    padding: 25px 35px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 300px;
  }
  
  .alert-message {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .close-btn {
    background-color: var(--secondary-color-orange);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .close-btn:hover {
    background-color: #e4bb06;
  }
  </style>
  