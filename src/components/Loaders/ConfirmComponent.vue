<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-icon">🗑️</span>
          <p class="modal-title">
            Confirm deletion</p>
        </div>
        <p class="modal-message">Are you sure you want to delete <strong>{{nameconfirm}}</strong>?</p> 
        <div class="modal-actions">
          <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
          <button class="confirm-btn" @click="$emit('confirm')">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    visible: Boolean,
    nameconfirm: String,
    
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .modal-box {
    background-color: #fff;
    padding: 30px 40px;
    border-radius: 16px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    animation: scaleIn 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .modal-icon {
    font-size: 24px;
  }
  
  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #c0392b;
  }
  
  .modal-message {
    font-size: 16px;
    color: #444;
    margin: 15px 0 25px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  
  .cancel-btn,
  .confirm-btn {
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cancel-btn {
    background-color: #bdc3c7;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #95a5a6;
  }
  
  .confirm-btn {
    background-color: #e74c3c;
    color: white;
  }
  
  .confirm-btn:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  