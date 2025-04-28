<template>
    <div v-if="visible" class="error-alert-overlay">
      <div class="error-alert-box">
 

        <p class="error-alert-message">{{ message }}</p>
        <button class="error-close-btn" @click="$emit('close')">Close</button>
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
  .error-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .error-alert-box {
    background-color: #ff4d4d;
    padding: 25px 35px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(255, 0, 0, 0.3);
    text-align: center;
    max-width: 300px;
    position: relative;
  }
  
  .error-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }
  
  .error-alert-message {
    font-size: 16px;
    color: white;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .error-close-btn {
    background-color: white;
    color: #ff4d4d;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .error-close-btn:hover {
    background-color: #e60000;
    color: white;
  }
  </style>
  